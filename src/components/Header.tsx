import type { UserRole, ViewMode } from '../types';
import {
  Plus, Download, Eye, BookOpen,
  Search,
} from 'lucide-react';
import { useState } from 'react';

interface Props {
  role: UserRole;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  onExport: () => void;
  onAddRow: () => void;
  activePage: string;
  totalRows: number;
}

const pageTitles: Record<string, { en: string; ja: string }> = {
  requirements: { en: 'All Requirements', ja: '全要件一覧' },
  screens: { en: 'Screen List', ja: '画面一覧' },
  features: { en: 'Feature List', ja: '機能一覧' },
  api: { en: 'API Endpoints', ja: 'APIエンドポイント一覧' },
};

export function Header({ role, viewMode, onViewModeChange, onExport, onAddRow, activePage, totalRows }: Props) {
  const [searchQuery, setSearchQuery] = useState('');
  const title = pageTitles[activePage] || pageTitles.requirements;

  return (
    <header className="bg-surface-900 border-b border-surface-700 px-6 py-3">
      <div className="flex items-center gap-4">
        <div className="min-w-0">
          <h1 className="text-lg font-semibold text-white truncate">{title.en}</h1>
          <p className="text-xs text-gray-500">{title.ja} &middot; {totalRows} items</p>
        </div>

        <div className="flex-1 max-w-sm mx-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search / 検索..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-surface-800 border border-surface-700 rounded-lg pl-9 pr-4 py-2 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-500/40 transition"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          {role !== 'client' && (
            <div className="flex items-center bg-surface-800 rounded-lg p-0.5 border border-surface-700">
              <button
                onClick={() => onViewModeChange('internal')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                  viewMode === 'internal'
                    ? 'bg-brand-600 text-white shadow-sm'
                    : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                Internal
              </button>
              <button
                onClick={() => onViewModeChange('client')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                  viewMode === 'client'
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                Client
              </button>
            </div>
          )}

          <button
            onClick={onExport}
            className="flex items-center gap-1.5 px-3 py-2 bg-surface-800 border border-surface-700 rounded-lg text-gray-300 hover:text-white hover:border-surface-200 text-xs font-medium transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            Export
          </button>

          {role !== 'client' && (
            <button
              onClick={onAddRow}
              className="flex items-center gap-1.5 px-3 py-2 bg-brand-600 hover:bg-brand-500 text-white rounded-lg text-xs font-medium transition-all shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Row
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
