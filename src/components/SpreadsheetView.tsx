import { useState } from 'react';
import type { Requirement, ViewMode, UserRole, SyncStatus } from '../types';
import { columns } from '../data';
import {
  ChevronUp, ChevronDown, Trash2,
  ArrowRightLeft, Check, Clock, AlertTriangle, Loader,
} from 'lucide-react';

interface Props {
  requirements: Requirement[];
  viewMode: ViewMode;
  role: UserRole;
  onSelectRow: (req: Requirement) => void;
  onUpdateRequirement: (id: string, updates: Partial<Requirement>) => void;
  onDeleteRequirement: (id: string) => void;
  selectedRowId: string | null;
}

const statusConfig: Record<string, { label: string; labelJa: string; color: string; bg: string }> = {
  draft: { label: 'Draft', labelJa: '下書き', color: 'text-gray-400', bg: 'bg-gray-500/10 border-gray-500/20' },
  review: { label: 'Review', labelJa: 'レビュー', color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20' },
  approved: { label: 'Approved', labelJa: '承認済', color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
  in_progress: { label: 'In Progress', labelJa: '進行中', color: 'text-brand-400', bg: 'bg-brand-500/10 border-brand-500/20' },
  completed: { label: 'Completed', labelJa: '完了', color: 'text-green-400', bg: 'bg-green-500/10 border-green-500/20' },
};

const priorityConfig: Record<string, { label: string; color: string; dot: string }> = {
  low: { label: 'Low', color: 'text-gray-400', dot: 'bg-gray-400' },
  medium: { label: 'Medium', color: 'text-brand-400', dot: 'bg-brand-400' },
  high: { label: 'High', color: 'text-amber-400', dot: 'bg-amber-400' },
  critical: { label: 'Critical', color: 'text-red-400', dot: 'bg-red-400' },
};

const syncIcons: Record<SyncStatus, { icon: typeof Check; color: string; label: string }> = {
  synced: { icon: Check, color: 'text-emerald-500', label: 'Synced' },
  pending: { icon: Clock, color: 'text-amber-500', label: 'Pending translation' },
  translating: { icon: Loader, color: 'text-brand-500', label: 'Translating...' },
  conflict: { icon: AlertTriangle, color: 'text-red-500', label: 'Conflict' },
};

export function SpreadsheetView({ requirements, viewMode, role, onSelectRow, onUpdateRequirement, onDeleteRequirement, selectedRowId }: Props) {
  const [sortKey, setSortKey] = useState<string>('code');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [editingCell, setEditingCell] = useState<{ id: string; key: string } | null>(null);
  const [editValue, setEditValue] = useState('');

  const visibleColumns = columns.filter(col => {
    if (viewMode === 'client' && col.internalOnly) return false;
    return true;
  });

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDir(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  const getCellValue = (req: Requirement, key: string): string => {
    if (key === 'title_en') return req.title.en;
    if (key === 'title_ja') return req.title.ja;
    if (key === 'description_en') return req.description.en;
    if (key === 'description_ja') return req.description.ja;
    if (key === 'internalNotes_en') return req.internalNotes.en;
    if (key === 'internalNotes_ja') return req.internalNotes.ja;
    if (key === 'techSpec_en') return req.techSpec.en;
    if (key === 'techSpec_ja') return req.techSpec.ja;
    return String((req as unknown as Record<string, unknown>)[key] ?? '');
  };

  const sorted = [...requirements].sort((a, b) => {
    const av = getCellValue(a, sortKey);
    const bv = getCellValue(b, sortKey);
    const cmp = av.localeCompare(bv);
    return sortDir === 'asc' ? cmp : -cmp;
  });

  const startEdit = (id: string, key: string, value: string) => {
    setEditingCell({ id, key });
    setEditValue(value);
  };

  const commitEdit = () => {
    if (!editingCell) return;
    const { id, key } = editingCell;
    const req = requirements.find(r => r.id === id);
    if (!req) return;

    if (key === 'title_en' || key === 'title_ja') {
      const lang = key === 'title_en' ? 'en' : 'ja';
      onUpdateRequirement(id, {
        title: { ...req.title, [lang]: editValue, syncStatus: 'pending', lastEditedLang: lang },
      });
    } else if (key === 'description_en' || key === 'description_ja') {
      const lang = key === 'description_en' ? 'en' : 'ja';
      onUpdateRequirement(id, {
        description: { ...req.description, [lang]: editValue, syncStatus: 'pending', lastEditedLang: lang },
      });
    } else if (key === 'internalNotes_en' || key === 'internalNotes_ja') {
      const lang = key === 'internalNotes_en' ? 'en' : 'ja';
      onUpdateRequirement(id, {
        internalNotes: { ...req.internalNotes, [lang]: editValue, syncStatus: 'pending', lastEditedLang: lang },
      });
    } else if (key === 'techSpec_en' || key === 'techSpec_ja') {
      const lang = key === 'techSpec_en' ? 'en' : 'ja';
      onUpdateRequirement(id, {
        techSpec: { ...req.techSpec, [lang]: editValue, syncStatus: 'pending', lastEditedLang: lang },
      });
    } else {
      onUpdateRequirement(id, { [key]: editValue } as Partial<Requirement>);
    }
    setEditingCell(null);
  };

  const canEdit = (_colKey: string, col: typeof columns[0]) => {
    if (role === 'client') return col.clientEditable;
    return col.editable;
  };

  const getSyncStatusForField = (req: Requirement, key: string) => {
    if (key.startsWith('title')) return req.title.syncStatus;
    if (key.startsWith('description')) return req.description.syncStatus;
    if (key.startsWith('internalNotes')) return req.internalNotes.syncStatus;
    if (key.startsWith('techSpec')) return req.techSpec.syncStatus;
    return null;
  };

  return (
    <div className="h-full overflow-auto">
      <table className="w-full border-collapse min-w-max">
        <thead className="sticky top-0 z-10">
          <tr className="bg-surface-900 border-b border-surface-700">
            <th className="w-10 px-3 py-2.5 text-left sticky left-0 bg-surface-900 z-20">
              <span className="text-gray-500 text-xs">#</span>
            </th>
            {visibleColumns.map(col => (
              <th
                key={col.key}
                className="px-3 py-2.5 text-left cursor-pointer group select-none"
                style={{ minWidth: col.width }}
                onClick={() => handleSort(col.key)}
              >
                <div className="flex items-center gap-1.5">
                  <div>
                    <span className="text-xs font-medium text-gray-300 group-hover:text-white transition-colors">{col.label}</span>
                    <span className="block text-[10px] text-gray-600">{col.labelJa}</span>
                  </div>
                  {col.type === 'bilingual' && (
                    <ArrowRightLeft className="w-3 h-3 text-brand-500/50" />
                  )}
                  {sortKey === col.key && (
                    sortDir === 'asc'
                      ? <ChevronUp className="w-3.5 h-3.5 text-brand-400" />
                      : <ChevronDown className="w-3.5 h-3.5 text-brand-400" />
                  )}
                </div>
              </th>
            ))}
            {role !== 'client' && (
              <th className="w-10 px-3 py-2.5" />
            )}
          </tr>
        </thead>
        <tbody>
          {sorted.map((req, idx) => (
            <tr
              key={req.id}
              className={`border-b border-surface-800 grid-row-hover cursor-pointer transition-colors ${
                selectedRowId === req.id ? 'bg-brand-600/8 border-brand-500/20' : ''
              }`}
              onClick={() => onSelectRow(req)}
            >
              <td className="px-3 py-2 text-xs text-gray-600 sticky left-0 bg-surface-950/80 backdrop-blur-sm">
                {idx + 1}
              </td>
              {visibleColumns.map(col => {
                const value = getCellValue(req, col.key);
                const isEditing = editingCell?.id === req.id && editingCell?.key === col.key;
                const syncSt = getSyncStatusForField(req, col.key);
                const syncInfo = syncSt ? syncIcons[syncSt] : null;

                return (
                  <td
                    key={col.key}
                    className="px-3 py-2 text-sm"
                    style={{ minWidth: col.width }}
                    onDoubleClick={(e) => {
                      e.stopPropagation();
                      if (canEdit(col.key, col)) startEdit(req.id, col.key, value);
                    }}
                  >
                    {isEditing ? (
                      <input
                        autoFocus
                        value={editValue}
                        onChange={e => setEditValue(e.target.value)}
                        onBlur={commitEdit}
                        onKeyDown={e => { if (e.key === 'Enter') commitEdit(); if (e.key === 'Escape') setEditingCell(null); }}
                        className="w-full bg-surface-800 border border-brand-500 rounded px-2 py-1 text-sm text-white focus:outline-none"
                        onClick={e => e.stopPropagation()}
                      />
                    ) : col.type === 'code' ? (
                      <span className="font-mono text-xs bg-surface-800 px-2 py-1 rounded text-brand-300 border border-surface-700">
                        {value}
                      </span>
                    ) : col.type === 'status' ? (
                      <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full border ${statusConfig[value]?.bg} ${statusConfig[value]?.color}`}>
                        {statusConfig[value]?.label}
                      </span>
                    ) : col.type === 'priority' ? (
                      <span className={`inline-flex items-center gap-1.5 text-xs ${priorityConfig[value]?.color}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${priorityConfig[value]?.dot}`} />
                        {priorityConfig[value]?.label}
                      </span>
                    ) : col.type === 'bilingual' ? (
                      <div className="flex items-center gap-1.5 min-w-0">
                        <span className="truncate text-gray-200">{value || <span className="text-gray-600 italic">Empty</span>}</span>
                        {syncInfo && (
                          <syncInfo.icon className={`w-3 h-3 shrink-0 ${syncInfo.color}`} />
                        )}
                      </div>
                    ) : col.type === 'date' ? (
                      <span className="text-gray-400 text-xs">{value}</span>
                    ) : (
                      <span className="text-gray-300 truncate block">{value}</span>
                    )}
                  </td>
                );
              })}
              {role !== 'client' && (
                <td className="px-3 py-2">
                  <button
                    onClick={(e) => { e.stopPropagation(); onDeleteRequirement(req.id); }}
                    className="text-gray-600 hover:text-red-400 transition-colors p-1 rounded hover:bg-red-500/10"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {sorted.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-gray-500">
          <p className="text-lg font-medium">No requirements found</p>
          <p className="text-sm mt-1">要件が見つかりません</p>
        </div>
      )}
    </div>
  );
}
