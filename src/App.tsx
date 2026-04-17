import { useState, useCallback, useMemo } from 'react';
import type { UserProfile, SheetRow, Project } from './types';
import { sheetTabs, projects as defaultProjects, projectSheetData, generateCode } from './data';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { GenericSheet } from './components/GenericSheet';
import { SheetRowDetail } from './components/SheetRowDetail';
import { ExportModal } from './components/ExportModal';
import { LoginScreen } from './components/LoginScreen';
import { ProjectDashboard } from './components/ProjectSelector';
import { PurposeView } from './components/PurposeView';
import { MasterScheduleView } from './components/MasterScheduleView';
import { AdminDashboard } from './components/AdminDashboard';

export default function App() {
  const [loggedInUser, setLoggedInUser] = useState<UserProfile | null>(null);
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const [activeTabId, setActiveTabId] = useState<string>('purpose');
  const [selectedRow, setSelectedRow] = useState<SheetRow | null>(null);
  const [showExport, setShowExport] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sheetData, setSheetData] = useState<Record<string, Record<string, SheetRow[]>>>(projectSheetData);
  const [showAdminDashboard, setShowAdminDashboard] = useState(false);
  const [projects, setProjects] = useState<Project[]>(defaultProjects);

  const role = loggedInUser?.role ?? null;

  const visibleProjects = useMemo(() => {
    if (!loggedInUser) return [];
    if (role === 'administrator') return projects;
    if (role === 'pm') return projects.filter(p => p.pmId === loggedInUser.id);
    if (role === 'developer') return projects.filter(p => p.assignedDevIds.includes(loggedInUser.id));
    if (role === 'client') return projects.filter(p => p.clientId === loggedInUser.id);
    return projects;
  }, [loggedInUser, role, projects]);

  const activeProject = useMemo(() => projects.find(p => p.id === activeProjectId) ?? null, [projects, activeProjectId]);

  const visibleTabs = useMemo(() =>
    role ? sheetTabs.filter(t => t.visibleTo.includes(role)) : [],
    [role]
  );

  const activeTab = useMemo(() =>
    sheetTabs.find(t => t.id === activeTabId) ?? null,
    [activeTabId]
  );

  const currentRows = useMemo(() => {
    if (!activeProjectId || !activeTabId) return [];
    return sheetData[activeProjectId]?.[activeTabId] ?? [];
  }, [activeProjectId, activeTabId, sheetData]);

  const handleLogin = useCallback((user: UserProfile) => {
    setLoggedInUser(user);
    if (user.role === 'administrator') {
      setShowAdminDashboard(true);
    }
  }, []);

  const handleSelectProject = useCallback((projectId: string) => {
    setActiveProjectId(projectId);
    setSelectedRow(null);
    setShowAdminDashboard(false);
    const firstTab = role ? sheetTabs.find(t => t.visibleTo.includes(role)) : sheetTabs[0];
    setActiveTabId(firstTab?.id ?? 'purpose');
  }, [role]);

  const handleTabChange = useCallback((tabId: string) => {
    setActiveTabId(tabId);
    setSelectedRow(null);
  }, []);

  const handleBackToProjects = useCallback(() => {
    setActiveProjectId(null);
    setSelectedRow(null);
    if (role === 'administrator') setShowAdminDashboard(true);
  }, [role]);

  const handleUpdateRow = useCallback((rowId: string, key: string, value: string) => {
    if (!activeProjectId || !activeTabId) return;
    setSheetData(prev => {
      const projData = { ...prev[activeProjectId] };
      const tabRows = [...(projData[activeTabId] ?? [])];
      const idx = tabRows.findIndex(r => r.id === rowId);
      if (idx >= 0) tabRows[idx] = { ...tabRows[idx], [key]: value };
      projData[activeTabId] = tabRows;
      return { ...prev, [activeProjectId]: projData };
    });
    if (selectedRow?.id === rowId) {
      setSelectedRow(prev => prev ? { ...prev, [key]: value } : null);
    }
  }, [activeProjectId, activeTabId, selectedRow]);

  const handleAddRow = useCallback(() => {
    if (!activeProjectId || !activeTab) return;
    const newRow: SheetRow = { id: String(Date.now()) };
    for (const c of activeTab.columns) {
      if (c.type === 'code') {
        const prefix = c.key === 'taskCode' ? 'TSK' : c.key === 'screenCode' ? 'SCR' : c.key === 'functionCode' ? 'FNC' : 'ITM';
        newRow[c.key] = generateCode(prefix, activeProjectId);
      } else if (c.type === 'status' && c.options?.length) {
        newRow[c.key] = c.options[0];
      } else {
        newRow[c.key] = '';
      }
    }
    setSheetData(prev => {
      const projData = { ...prev[activeProjectId] };
      projData[activeTabId] = [...(projData[activeTabId] ?? []), newRow];
      return { ...prev, [activeProjectId]: projData };
    });
    setSelectedRow(newRow);
  }, [activeProjectId, activeTab, activeTabId]);

  const handleDeleteRow = useCallback((rowId: string) => {
    if (!activeProjectId || !activeTabId) return;
    setSheetData(prev => {
      const projData = { ...prev[activeProjectId] };
      projData[activeTabId] = (projData[activeTabId] ?? []).filter(r => r.id !== rowId);
      return { ...prev, [activeProjectId]: projData };
    });
    if (selectedRow?.id === rowId) setSelectedRow(null);
  }, [activeProjectId, activeTabId, selectedRow]);

  const getSheetDataForProject = useCallback((projectId: string, sheetId: string) => {
    return sheetData[projectId]?.[sheetId] ?? [];
  }, [sheetData]);

  const handleUpdateProject = useCallback((projectId: string, updates: Partial<Project>) => {
    setProjects(prev => prev.map(p => p.id === projectId ? { ...p, ...updates } : p));
  }, []);

  const handleAddProject = useCallback((newProject: Project) => {
    setProjects(prev => [...prev, newProject]);
    setSheetData(prev => ({ ...prev, [newProject.id]: {} }));
  }, []);

  if (!loggedInUser || !role) return <LoginScreen onLogin={handleLogin} />;

  const getTabRowCount = (tabId: string) => {
    if (!activeProjectId) return 0;
    return (sheetData[activeProjectId]?.[tabId] ?? []).length;
  };

  return (
    <div className="flex h-screen bg-surface-950 text-gray-100 overflow-hidden">
      <Sidebar
        role={role}
        user={loggedInUser}
        activeTabId={activeTabId}
        visibleTabs={visibleTabs}
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        onTabChange={handleTabChange}
        onLogout={() => { setLoggedInUser(null); setActiveProjectId(null); setShowAdminDashboard(false); }}
        activeProject={activeProject}
        onBackToProjects={handleBackToProjects}
        getTabRowCount={getTabRowCount}
        showAdminDashboard={showAdminDashboard && !activeProjectId}
      />

      <div className="flex-1 flex flex-col min-w-0">
        {activeProjectId && activeProject ? (
          activeTab?.isSpecialView ? (
            activeTab.id === 'purpose' ? (
              <PurposeView project={activeProject} />
            ) : (
              <MasterScheduleView />
            )
          ) : activeTab ? (
            <>
              <Header
                role={role}
                user={loggedInUser}
                tab={activeTab}
                totalRows={currentRows.length}
                projectName={activeProject.name}
                onExport={() => setShowExport(true)}
              />
              <div className="flex-1 overflow-hidden relative">
                <GenericSheet
                  tab={activeTab}
                  rows={currentRows}
                  role={role}
                  onSelectRow={setSelectedRow}
                  onUpdateRow={handleUpdateRow}
                  onDeleteRow={handleDeleteRow}
                  onAddRow={handleAddRow}
                  selectedRowId={selectedRow?.id ?? null}
                />
              </div>
            </>
          ) : null
        ) : showAdminDashboard && role === 'administrator' ? (
          <AdminDashboard
            projects={projects}
            getSheetData={getSheetDataForProject}
            onSelectProject={handleSelectProject}
            onUpdateProject={handleUpdateProject}
            onAddProject={handleAddProject}
          />
        ) : (
          <ProjectDashboard
            projects={visibleProjects}
            onSelectProject={handleSelectProject}
          />
        )}
      </div>

      {selectedRow && activeTab && !activeTab.isSpecialView && (
        <SheetRowDetail
          tab={activeTab}
          row={selectedRow}
          role={role}
          onClose={() => setSelectedRow(null)}
          onUpdate={(key, value) => handleUpdateRow(selectedRow.id, key, value)}
        />
      )}

      {showExport && activeTab && (
        <ExportModal
          tab={activeTab}
          rows={currentRows}
          onClose={() => setShowExport(false)}
        />
      )}
    </div>
  );
}
