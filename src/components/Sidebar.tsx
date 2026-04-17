import type { UserRole, ViewMode } from '../types';
import {
  LayoutGrid, Monitor, Puzzle, Server,
  ChevronLeft, ChevronRight, LogOut,
} from 'lucide-react';

interface Props {
  role: UserRole;
  viewMode: ViewMode;
  activePage: 'requirements' | 'screens' | 'features' | 'api';
  collapsed: boolean;
  onToggle: () => void;
  onPageChange: (page: 'requirements' | 'screens' | 'features' | 'api') => void;
  onLogout: () => void;
  requirementCounts: { all: number; screens: number; features: number; api: number };
}

const pages = [
  { key: 'requirements' as const, label: 'All Requirements', labelJa: '全要件', icon: LayoutGrid, countKey: 'all' as const },
  { key: 'screens' as const, label: 'Screen List', labelJa: '画面一覧', icon: Monitor, countKey: 'screens' as const },
  { key: 'features' as const, label: 'Feature List', labelJa: '機能一覧', icon: Puzzle, countKey: 'features' as const },
  { key: 'api' as const, label: 'API Endpoints', labelJa: 'APIエンドポイント', icon: Server, countKey: 'api' as const },
];

export function Sidebar({ role, viewMode, activePage, collapsed, onToggle, onPageChange, onLogout, requirementCounts }: Props) {
  const roleColors: Record<UserRole, string> = {
    admin: 'bg-brand-600',
    developer: 'bg-emerald-600',
    client: 'bg-amber-600',
  };

  const roleLabels: Record<UserRole, string> = {
    admin: 'Admin',
    developer: 'Developer',
    client: 'Guest',
  };

  return (
    <div className={`${collapsed ? 'w-16' : 'w-64'} bg-surface-900 border-r border-surface-700 flex flex-col transition-all duration-200 shrink-0`}>
      <div className="p-4 flex items-center gap-3 border-b border-surface-700">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shrink-0">
          <span className="text-white font-bold text-sm">C</span>
        </div>
        {!collapsed && (
          <div className="min-w-0">
            <h2 className="text-white font-semibold text-sm truncate">CyberConnect</h2>
            <p className="text-gray-500 text-xs truncate">Platform Demo</p>
          </div>
        )}
        <button onClick={onToggle} className="ml-auto text-gray-500 hover:text-gray-300 transition-colors shrink-0">
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {!collapsed && (
        <div className="px-4 py-3 border-b border-surface-700">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${roleColors[role]}`} />
            <span className="text-gray-400 text-xs">{roleLabels[role]}</span>
            {viewMode === 'client' && (
              <span className="ml-auto text-xs px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                Client View
              </span>
            )}
          </div>
        </div>
      )}

      <nav className="flex-1 p-2 space-y-0.5">
        {pages.map(({ key, label, labelJa, icon: Icon, countKey }) => {
          if (key === 'api' && role === 'client') return null;
          const isActive = activePage === key;
          return (
            <button
              key={key}
              onClick={() => onPageChange(key)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all ${
                isActive
                  ? 'bg-brand-600/15 text-brand-300'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-surface-800'
              }`}
              title={collapsed ? label : undefined}
            >
              <Icon className={`w-4.5 h-4.5 shrink-0 ${isActive ? 'text-brand-400' : ''}`} />
              {!collapsed && (
                <>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-medium truncate">{label}</div>
                    <div className="text-xs text-gray-500 truncate">{labelJa}</div>
                  </div>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                    isActive ? 'bg-brand-500/20 text-brand-300' : 'bg-surface-800 text-gray-500'
                  }`}>
                    {requirementCounts[countKey]}
                  </span>
                </>
              )}
            </button>
          );
        })}
      </nav>

      <div className="p-2 border-t border-surface-700">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-500/5 transition-colors"
          title={collapsed ? 'Logout' : undefined}
        >
          <LogOut className="w-4.5 h-4.5 shrink-0" />
          {!collapsed && <span className="text-sm">Switch Role</span>}
        </button>
      </div>
    </div>
  );
}
