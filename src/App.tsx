import { useState, useCallback } from 'react';
import type { UserRole, ViewMode, Requirement } from './types';
import { initialRequirements, generateCode } from './data';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { SpreadsheetView } from './components/SpreadsheetView';
import { RowDetail } from './components/RowDetail';
import { ExportModal } from './components/ExportModal';
import { LoginScreen } from './components/LoginScreen';

export default function App() {
  const [role, setRole] = useState<UserRole | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('internal');
  const [requirements, setRequirements] = useState<Requirement[]>(initialRequirements);
  const [selectedRow, setSelectedRow] = useState<Requirement | null>(null);
  const [showExport, setShowExport] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activePage, setActivePage] = useState<'requirements' | 'screens' | 'features' | 'api'>('requirements');

  const handleLogin = useCallback((selectedRole: UserRole) => {
    setRole(selectedRole);
    setViewMode(selectedRole === 'client' ? 'client' : 'internal');
  }, []);

  const handleUpdateRequirement = useCallback((id: string, updates: Partial<Requirement>) => {
    setRequirements(prev => prev.map(r => r.id === id ? { ...r, ...updates, updatedAt: new Date().toISOString().split('T')[0] } : r));
    if (selectedRow?.id === id) {
      setSelectedRow(prev => prev ? { ...prev, ...updates } : null);
    }
  }, [selectedRow]);

  const handleAddRequirement = useCallback(() => {
    const prefix = activePage === 'screens' ? 'SCR' : activePage === 'api' ? 'API' : 'FTR';
    const category = activePage === 'screens' ? 'UI/Screen' : activePage === 'api' ? 'API' : 'Feature';
    const newReq: Requirement = {
      id: String(Date.now()),
      code: generateCode(prefix),
      category,
      title: { en: '', ja: '', syncStatus: 'pending', lastEditedLang: 'en' },
      description: { en: '', ja: '', syncStatus: 'pending', lastEditedLang: 'en' },
      status: 'draft',
      priority: 'medium',
      assignee: '',
      internalNotes: { en: '', ja: '', syncStatus: 'pending', lastEditedLang: 'en' },
      techSpec: { en: '', ja: '', syncStatus: 'pending', lastEditedLang: 'en' },
      apiEndpoint: '',
      clientVisible: true,
      clientEditable: false,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      attachments: 0,
      comments: 0,
    };
    setRequirements(prev => [...prev, newReq]);
    setSelectedRow(newReq);
  }, [activePage]);

  const handleDeleteRequirement = useCallback((id: string) => {
    setRequirements(prev => prev.filter(r => r.id !== id));
    if (selectedRow?.id === id) setSelectedRow(null);
  }, [selectedRow]);

  if (!role) return <LoginScreen onLogin={handleLogin} />;

  const filteredRequirements = requirements.filter(r => {
    if (viewMode === 'client' && !r.clientVisible) return false;
    if (activePage === 'screens') return r.category === 'UI/Screen';
    if (activePage === 'features') return r.category === 'Feature';
    if (activePage === 'api') return r.category === 'API';
    return true;
  });

  return (
    <div className="flex h-screen bg-surface-950 text-gray-100 overflow-hidden">
      <Sidebar
        role={role}
        viewMode={viewMode}
        activePage={activePage}
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        onPageChange={setActivePage}
        onLogout={() => setRole(null)}
        requirementCounts={{
          all: requirements.filter(r => viewMode !== 'client' || r.clientVisible).length,
          screens: requirements.filter(r => r.category === 'UI/Screen' && (viewMode !== 'client' || r.clientVisible)).length,
          features: requirements.filter(r => r.category === 'Feature' && (viewMode !== 'client' || r.clientVisible)).length,
          api: requirements.filter(r => r.category === 'API' && (viewMode !== 'client' || r.clientVisible)).length,
        }}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <Header
          role={role}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          onExport={() => setShowExport(true)}
          onAddRow={handleAddRequirement}
          activePage={activePage}
          totalRows={filteredRequirements.length}
        />

        <div className="flex-1 overflow-hidden relative">
          <SpreadsheetView
            requirements={filteredRequirements}
            viewMode={viewMode}
            role={role}
            onSelectRow={setSelectedRow}
            onUpdateRequirement={handleUpdateRequirement}
            onDeleteRequirement={handleDeleteRequirement}
            selectedRowId={selectedRow?.id ?? null}
          />
        </div>
      </div>

      {selectedRow && (
        <RowDetail
          requirement={selectedRow}
          viewMode={viewMode}
          role={role}
          onClose={() => setSelectedRow(null)}
          onUpdate={(updates) => handleUpdateRequirement(selectedRow.id, updates)}
        />
      )}

      {showExport && (
        <ExportModal
          viewMode={viewMode}
          onClose={() => setShowExport(false)}
          requirements={filteredRequirements}
        />
      )}
    </div>
  );
}
