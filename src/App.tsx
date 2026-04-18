import { useState, useCallback, useMemo, useEffect } from 'react';
import type { UserProfile, SheetRow, Project, UserRole } from './types';
import {
  sheetTabs,
  projects as defaultProjects,
  projectSheetData,
  generateCode,
  userSeesProjectAsTeamMember,
  setPersonalNameResolver,
  type Language,
} from './data';
import { getDemoGateEmailForUserId } from './data';
import { loadPersonalWorkspace, savePersonalWorkspace, trimSheetDataToProjects } from './personalWorkspace';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { GenericSheet } from './components/GenericSheet';
import { SheetRowDetail } from './components/SheetRowDetail';
import { ExportModal } from './components/ExportModal';
import { LoginScreen } from './components/LoginScreen';
import { ProjectDashboard, PERSONAL_COLORS } from './components/ProjectSelector';
import { PurposeView } from './components/PurposeView';
import { MasterScheduleView } from './components/MasterScheduleView';
import { AdminDashboard } from './components/AdminDashboard';
import { clearLoginSessionStorage, saveDemoGateEmail, setResumeRoleSelection } from './loginSession';

type WorkspaceScope = 'team' | 'personal';

export default function App() {
  const [loggedInUser, setLoggedInUser] = useState<UserProfile | null>(null);
  const [workspaceScope, setWorkspaceScope] = useState<WorkspaceScope>('team');
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const [activeTabId, setActiveTabId] = useState<string>('purpose');
  const [selectedRow, setSelectedRow] = useState<SheetRow | null>(null);
  const [showExport, setShowExport] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  /** Company team workspace (demo seed + session edits). */
  const [teamProjects, setTeamProjects] = useState<Project[]>(defaultProjects);
  const [teamSheetData, setTeamSheetData] = useState<Record<string, Record<string, SheetRow[]>>>(() =>
    structuredClone(projectSheetData)
  );

  /** Personal sandbox for team members (same browser, keyed by team user id). */
  const [personalProjects, setPersonalProjects] = useState<Project[]>([]);
  const [personalSheetData, setPersonalSheetData] = useState<Record<string, Record<string, SheetRow[]>>>({});

  /** Sign-up-only personal accounts (no team roster). */
  const [soloProjects, setSoloProjects] = useState<Project[]>([]);
  const [soloSheetData, setSoloSheetData] = useState<Record<string, Record<string, SheetRow[]>>>({});

  const [showAdminDashboard, setShowAdminDashboard] = useState(false);
  const [language, setLanguage] = useState<Language>('en');
  const [loginScreenKey, setLoginScreenKey] = useState(0);

  const role = loggedInUser?.role ?? null;
  const isTeamAccount = loggedInUser?.accountKind === 'team';
  const isSoloAccount = loggedInUser?.accountKind === 'personal';

  const projects = useMemo(() => {
    if (!loggedInUser) return [];
    if (isSoloAccount) return soloProjects;
    if (isTeamAccount) return workspaceScope === 'team' ? teamProjects : personalProjects;
    return soloProjects;
  }, [loggedInUser, isSoloAccount, isTeamAccount, workspaceScope, soloProjects, teamProjects, personalProjects]);

  const sheetData = useMemo(() => {
    if (!loggedInUser) return {};
    if (isSoloAccount) return soloSheetData;
    if (isTeamAccount) return workspaceScope === 'team' ? teamSheetData : personalSheetData;
    return soloSheetData;
  }, [loggedInUser, isSoloAccount, isTeamAccount, workspaceScope, soloSheetData, teamSheetData, personalSheetData]);

  const setActiveSheetData = useCallback(
    (updater: (prev: Record<string, Record<string, SheetRow[]>>) => Record<string, Record<string, SheetRow[]>>) => {
      if (!loggedInUser) return;
      if (isSoloAccount) setSoloSheetData(updater);
      else if (isTeamAccount) {
        if (workspaceScope === 'team') setTeamSheetData(updater);
        else setPersonalSheetData(updater);
      }
    },
    [loggedInUser, isSoloAccount, isTeamAccount, workspaceScope]
  );

  const effectiveRole: UserRole = useMemo(() => {
    if (!loggedInUser || !role) return role ?? 'pm';
    if (isSoloAccount) return 'pm';
    if (isTeamAccount && workspaceScope === 'personal') return 'pm';
    return role;
  }, [loggedInUser, role, isSoloAccount, isTeamAccount, workspaceScope]);

  const visibleProjects = useMemo(() => {
    if (!loggedInUser) return [];
    if (isSoloAccount) return soloProjects;
    if (isTeamAccount && workspaceScope === 'personal') return personalProjects;
    if (role === 'administrator') return teamProjects;
    if (role === 'pm' || role === 'developer') {
      return teamProjects.filter(p => userSeesProjectAsTeamMember(loggedInUser.id, p));
    }
    if (role === 'client') return teamProjects.filter(p => p.clientId === loggedInUser.id);
    return teamProjects;
  }, [loggedInUser, isSoloAccount, isTeamAccount, workspaceScope, soloProjects, personalProjects, teamProjects, role]);

  const activeProject = useMemo(
    () => projects.find(p => p.id === activeProjectId) ?? null,
    [projects, activeProjectId]
  );

  const visibleTabs = useMemo(
    () => (effectiveRole ? sheetTabs.filter(t => t.visibleTo.includes(effectiveRole)) : []),
    [effectiveRole]
  );

  const activeTab = useMemo(() => sheetTabs.find(t => t.id === activeTabId) ?? null, [activeTabId]);

  const currentRows = useMemo(() => {
    if (!activeProjectId || !activeTabId) return [];
    return sheetData[activeProjectId]?.[activeTabId] ?? [];
  }, [activeProjectId, activeTabId, sheetData]);

  const handleLogin = useCallback((user: UserProfile) => {
    setLoggedInUser(user);
    setWorkspaceScope('team');
    setActiveProjectId(null);
    setSelectedRow(null);

    if (user.accountKind === 'personal') {
      const { projects: persisted, sheetData: personalSheets } = loadPersonalWorkspace(user.id);
      setSoloProjects(persisted);
      const sd: Record<string, Record<string, SheetRow[]>> = { ...personalSheets };
      for (const p of persisted) {
        if (!sd[p.id]) sd[p.id] = {};
      }
      setSoloSheetData(sd);
      setShowAdminDashboard(false);
      return;
    }

    setTeamProjects(defaultProjects);
    setTeamSheetData(structuredClone(projectSheetData));
    const { projects: pp, sheetData: ps } = loadPersonalWorkspace(user.id);
    const psd: Record<string, Record<string, SheetRow[]>> = { ...ps };
    for (const p of pp) {
      if (!psd[p.id]) psd[p.id] = {};
    }
    setPersonalProjects(pp);
    setPersonalSheetData(psd);

    if (user.role === 'administrator') {
      setShowAdminDashboard(true);
    } else {
      setShowAdminDashboard(false);
    }
  }, []);

  useEffect(() => {
    if (!loggedInUser) {
      setPersonalNameResolver(null);
      return;
    }
    const personalContext =
      loggedInUser.accountKind === 'personal' ||
      (loggedInUser.accountKind === 'team' && workspaceScope === 'personal');
    if (personalContext) {
      setPersonalNameResolver(id => (id === loggedInUser.id ? loggedInUser.name : null));
    } else {
      setPersonalNameResolver(null);
    }
    return () => setPersonalNameResolver(null);
  }, [loggedInUser, workspaceScope]);

  useEffect(() => {
    if (!loggedInUser) return;
    if (loggedInUser.accountKind === 'personal') {
      savePersonalWorkspace(loggedInUser.id, soloProjects, trimSheetDataToProjects(soloSheetData, soloProjects));
    } else if (loggedInUser.accountKind === 'team') {
      savePersonalWorkspace(
        loggedInUser.id,
        personalProjects,
        trimSheetDataToProjects(personalSheetData, personalProjects)
      );
    }
  }, [loggedInUser, soloProjects, soloSheetData, personalProjects, personalSheetData]);

  const personalStatsSheets = isSoloAccount ? soloSheetData : personalSheetData;

  const getPersonalTaskStats = useCallback(
    (projectId: string) => {
      const tasks = personalStatsSheets[projectId]?.['tasks'] ?? [];
      const total = tasks.length;
      const done = tasks.filter(t => t.status === 'Done').length;
      const inProgress = tasks.filter(t => t.status === 'In progress').length;
      const notStarted = tasks.filter(t => t.status === 'Not started').length;
      return { total, done, inProgress, notStarted };
    },
    [personalStatsSheets]
  );

  const handlePersonalCreateProject = useCallback(
    (fields: { name: string; description: string }) => {
      if (!loggedInUser) return;
      const inPersonalContext =
        loggedInUser.accountKind === 'personal' ||
        (loggedInUser.accountKind === 'team' && workspaceScope === 'personal');
      if (!inPersonalContext) return;

      const id = `proj-${Date.now()}`;
      const count = loggedInUser.accountKind === 'personal' ? soloProjects.length : personalProjects.length;
      const color = PERSONAL_COLORS[count % PERSONAL_COLORS.length]!;
      const newProject: Project = {
        id,
        name: fields.name,
        nameJa: fields.name,
        client: 'Personal',
        clientId: 'client-internal',
        pmId: loggedInUser.id,
        assignedDevIds: [loggedInUser.id],
        description: fields.description || 'Private workspace project',
        descriptionJa: '',
        color,
        status: 'active',
        createdAt: new Date().toISOString().split('T')[0],
      };
      if (loggedInUser.accountKind === 'personal') {
        setSoloProjects(prev => [...prev, newProject]);
        setSoloSheetData(prev => ({ ...prev, [id]: {} }));
      } else {
        setPersonalProjects(prev => [...prev, newProject]);
        setPersonalSheetData(prev => ({ ...prev, [id]: {} }));
      }
    },
    [loggedInUser, workspaceScope, soloProjects.length, personalProjects.length]
  );

  const handleWorkspaceScope = useCallback((scope: WorkspaceScope) => {
    setWorkspaceScope(scope);
    setActiveProjectId(null);
    setSelectedRow(null);
    if (scope === 'team' && loggedInUser?.role === 'administrator') {
      setShowAdminDashboard(true);
    } else {
      setShowAdminDashboard(false);
    }
  }, [loggedInUser?.role]);

  const handleSelectProject = useCallback(
    (projectId: string) => {
      setActiveProjectId(projectId);
      setSelectedRow(null);
      setShowAdminDashboard(false);
      const r = effectiveRole;
      const firstTab = r ? sheetTabs.find(t => t.visibleTo.includes(r)) : sheetTabs[0];
      setActiveTabId(firstTab?.id ?? 'purpose');
    },
    [effectiveRole]
  );

  const handleTabChange = useCallback((tabId: string) => {
    setActiveTabId(tabId);
    setSelectedRow(null);
  }, []);

  const handleBackToProjects = useCallback(() => {
    setActiveProjectId(null);
    setSelectedRow(null);
    if (role === 'administrator' && isTeamAccount && workspaceScope === 'team') setShowAdminDashboard(true);
  }, [role, isTeamAccount, workspaceScope]);

  const handleUpdateRow = useCallback(
    (rowId: string, key: string, value: string) => {
      if (!activeProjectId || !activeTabId) return;
      setActiveSheetData(prev => {
        const projData = { ...prev[activeProjectId] };
        const tabRows = [...(projData[activeTabId] ?? [])];
        const idx = tabRows.findIndex(r => r.id === rowId);
        if (idx >= 0) tabRows[idx] = { ...tabRows[idx], [key]: value };
        projData[activeTabId] = tabRows;
        return { ...prev, [activeProjectId]: projData };
      });
      if (selectedRow?.id === rowId) {
        setSelectedRow(prev => (prev ? { ...prev, [key]: value } : null));
      }
    },
    [activeProjectId, activeTabId, selectedRow, setActiveSheetData]
  );

  const handleAddRow = useCallback(() => {
    if (!activeProjectId || !activeTab) return;
    const newRow: SheetRow = { id: String(Date.now()) };
    for (const c of activeTab.columns) {
      if (c.type === 'code') {
        const prefix =
          c.key === 'taskCode' ? 'TSK' : c.key === 'screenCode' ? 'SCR' : c.key === 'functionCode' ? 'FNC' : 'ITM';
        newRow[c.key] = generateCode(prefix, activeProjectId);
      } else if (c.type === 'status' && c.options?.length) {
        newRow[c.key] = c.options[0];
      } else {
        newRow[c.key] = '';
      }
    }
    setActiveSheetData(prev => {
      const projData = { ...prev[activeProjectId] };
      projData[activeTabId] = [...(projData[activeTabId] ?? []), newRow];
      return { ...prev, [activeProjectId]: projData };
    });
    setSelectedRow(newRow);
  }, [activeProjectId, activeTab, activeTabId, setActiveSheetData]);

  const handleDeleteRow = useCallback(
    (rowId: string) => {
      if (!activeProjectId || !activeTabId) return;
      setActiveSheetData(prev => {
        const projData = { ...prev[activeProjectId] };
        projData[activeTabId] = (projData[activeTabId] ?? []).filter(r => r.id !== rowId);
        return { ...prev, [activeProjectId]: projData };
      });
      if (selectedRow?.id === rowId) setSelectedRow(null);
    },
    [activeProjectId, activeTabId, selectedRow, setActiveSheetData]
  );

  const getSheetDataForProject = useCallback(
    (projectId: string, sheetId: string) => {
      return teamSheetData[projectId]?.[sheetId] ?? [];
    },
    [teamSheetData]
  );

  const handleAddProject = useCallback(
    (newProject: Project) => {
      setTeamProjects(prev => [...prev, newProject]);
      setTeamSheetData(prev => ({ ...prev, [newProject.id]: {} }));
    },
    []
  );
 
  const handleDeleteProject = useCallback((projectId: string) => {
    setTeamProjects(prev => prev.filter(p => p.id !== projectId));
    setTeamSheetData(prev => {
      const copy = { ...prev };
      delete copy[projectId];
      return copy;
    });
  }, []);

  const resetAfterLeave = useCallback(() => {
    setPersonalNameResolver(null);
    setLoggedInUser(null);
    setActiveProjectId(null);
    setShowAdminDashboard(false);
    setWorkspaceScope('team');
    setTeamProjects(defaultProjects);
    setTeamSheetData(structuredClone(projectSheetData));
    setPersonalProjects([]);
    setPersonalSheetData({});
    setSoloProjects([]);
    setSoloSheetData({});
    setLoginScreenKey(k => k + 1);
  }, []);

  const handleLogout = useCallback(() => {
    clearLoginSessionStorage();
    resetAfterLeave();
  }, [resetAfterLeave]);

  /** Team demo: return to role picker while keeping gate email for session. */
  const handleSwitchRole = useCallback(() => {
    if (!loggedInUser || loggedInUser.accountKind !== 'team') return;
    // Prefer the demo Gmail mapped to this user id (e.g. "angel@gmail.com").
    const demoEmail = getDemoGateEmailForUserId(loggedInUser.id);
    if (demoEmail) {
      saveDemoGateEmail(demoEmail);
      setResumeRoleSelection();
      resetAfterLeave();
    } else {
      // Fallback: if we can't resolve a demo gate email, perform a normal logout.
      clearLoginSessionStorage();
      resetAfterLeave();
    }
  }, [loggedInUser, resetAfterLeave]);

  if (!loggedInUser || !role) return <LoginScreen key={loginScreenKey} onLogin={handleLogin} />;

  const getTabRowCount = (tabId: string) => {
    if (!activeProjectId) return 0;
    return (sheetData[activeProjectId]?.[tabId] ?? []).length;
  };

  const showPersonalDashboard =
    isSoloAccount || (isTeamAccount && workspaceScope === 'personal');

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
        workspaceScope={isTeamAccount ? workspaceScope : undefined}
        onWorkspaceScopeChange={isTeamAccount ? handleWorkspaceScope : undefined}
        onSwitchRole={isTeamAccount ? handleSwitchRole : undefined}
        onLogout={handleLogout}
        activeProject={activeProject}
        onBackToProjects={handleBackToProjects}
        getTabRowCount={getTabRowCount}
        showAdminDashboard={showAdminDashboard && !activeProjectId && isTeamAccount && workspaceScope === 'team'}
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
                role={effectiveRole}
                user={loggedInUser}
                tab={activeTab}
                totalRows={currentRows.length}
                projectName={activeProject.name}
                language={language}
                onLanguageChange={setLanguage}
                onExport={() => setShowExport(true)}
              />
              <div className="flex-1 overflow-hidden relative">
                <GenericSheet
                  tab={activeTab}
                  rows={currentRows}
                  role={effectiveRole}
                  language={language}
                  projectId={activeProjectId}
                  onSelectRow={setSelectedRow}
                  onUpdateRow={handleUpdateRow}
                  onDeleteRow={handleDeleteRow}
                  onAddRow={handleAddRow}
                  selectedRowId={selectedRow?.id ?? null}
                />
              </div>
            </>
          ) : null
        ) : showAdminDashboard && role === 'administrator' && isTeamAccount && workspaceScope === 'team' ? (
          <AdminDashboard
            projects={teamProjects}
            getSheetData={getSheetDataForProject}
            onSelectProject={handleSelectProject}
            onUpdateProject={(id, u) => {
              setTeamProjects(prev => prev.map(p => (p.id === id ? { ...p, ...u } : p)));
            }}
            onAddProject={handleAddProject}
            onDeleteProject={handleDeleteProject}
          />
        ) : (
          <ProjectDashboard
            projects={visibleProjects}
            onSelectProject={handleSelectProject}
            mode={showPersonalDashboard ? 'personal' : 'team'}
            getTaskStats={showPersonalDashboard ? getPersonalTaskStats : undefined}
            onPersonalCreateProject={showPersonalDashboard ? handlePersonalCreateProject : undefined}
          />
        )}
      </div>

      {selectedRow && activeTab && !activeTab.isSpecialView && (
        <SheetRowDetail
          tab={activeTab}
          row={selectedRow}
          role={effectiveRole}
          language={language}
          projectId={activeProjectId!}
          onClose={() => setSelectedRow(null)}
          onUpdate={(key, value) => handleUpdateRow(selectedRow.id, key, value)}
        />
      )}

      {showExport && activeTab && (
        <ExportModal tab={activeTab} rows={currentRows} onClose={() => setShowExport(false)} />
      )}
    </div>
  );
}
