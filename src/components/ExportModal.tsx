import { useState } from 'react';
import type { ViewMode, Requirement } from '../types';
import { X, FileText, Table, Download, Check } from 'lucide-react';

interface Props {
  viewMode: ViewMode;
  onClose: () => void;
  requirements: Requirement[];
}

export function ExportModal({ viewMode, onClose, requirements }: Props) {
  const [format, setFormat] = useState<'pdf' | 'csv'>('csv');
  const [includeTranslations, setIncludeTranslations] = useState(true);
  const [exporting, setExporting] = useState(false);
  const [exported, setExported] = useState(false);

  const handleExport = () => {
    setExporting(true);

    if (format === 'csv') {
      const headers = ['Code', 'Category', 'Title (EN)', 'Title (JA)', 'Description (EN)', 'Description (JA)', 'Internal Notes (EN)', 'Internal Notes (JA)', 'Tech Spec (EN)', 'Tech Spec (JA)', 'Status', 'Priority', 'Updated'];
      const rows = requirements.map(r => [
        r.code, r.category, r.title.en, r.title.ja, r.description.en, r.description.ja,
        r.internalNotes.en, r.internalNotes.ja, r.techSpec.en, r.techSpec.ja,
        r.status, r.priority, r.updatedAt,
      ]);

      const bom = '\uFEFF';
      const csvContent = bom + [headers, ...rows].map(row =>
        row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',')
      ).join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `requirements_${viewMode}_${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    }

    setTimeout(() => {
      setExporting(false);
      setExported(true);
      setTimeout(() => setExported(false), 2000);
    }, format === 'csv' ? 200 : 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-surface-900 border border-surface-700 rounded-2xl w-full max-w-md p-6 animate-fade-in shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-white">Export Data</h2>
            <p className="text-xs text-gray-500 mt-0.5">データのエクスポート</p>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors p-1 rounded-lg hover:bg-surface-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-xs text-gray-500 mb-2 block">Format / フォーマット</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setFormat('csv')}
                className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                  format === 'csv'
                    ? 'border-brand-500 bg-brand-500/10 text-brand-300'
                    : 'border-surface-700 text-gray-400 hover:border-surface-200'
                }`}
              >
                <Table className="w-5 h-5" />
                <div className="text-left">
                  <div className="text-sm font-medium">CSV</div>
                  <div className="text-xs opacity-60">Spreadsheet</div>
                </div>
              </button>
              <button
                onClick={() => setFormat('pdf')}
                className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                  format === 'pdf'
                    ? 'border-brand-500 bg-brand-500/10 text-brand-300'
                    : 'border-surface-700 text-gray-400 hover:border-surface-200'
                }`}
              >
                <FileText className="w-5 h-5" />
                <div className="text-left">
                  <div className="text-sm font-medium">PDF</div>
                  <div className="text-xs opacity-60">Document</div>
                </div>
              </button>
            </div>
          </div>

          <div className="bg-surface-800 rounded-xl p-4 border border-surface-700 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm text-gray-300">View / ビュー</span>
                <p className="text-xs text-gray-500 mt-0.5">{viewMode === 'internal' ? 'Internal (all columns)' : 'Client (filtered columns)'}</p>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${
                viewMode === 'internal' ? 'bg-brand-500/10 text-brand-300' : 'bg-amber-500/10 text-amber-300'
              }`}>
                {viewMode === 'internal' ? 'Internal' : 'Client'}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm text-gray-300">Include translations</span>
                <p className="text-xs text-gray-500 mt-0.5">Both EN and JA columns</p>
              </div>
              <button
                onClick={() => setIncludeTranslations(!includeTranslations)}
                className={`w-10 h-6 rounded-full transition-colors relative ${includeTranslations ? 'bg-brand-600' : 'bg-surface-700'}`}
              >
                <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${includeTranslations ? 'left-5' : 'left-1'}`} />
              </button>
            </div>

            <div className="pt-2 border-t border-surface-700">
              <span className="text-xs text-gray-500">{requirements.length} rows will be exported</span>
            </div>
          </div>

          <button
            onClick={handleExport}
            disabled={exporting}
            className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium text-sm transition-all ${
              exported
                ? 'bg-emerald-600 text-white'
                : 'bg-brand-600 hover:bg-brand-500 text-white'
            } disabled:opacity-50`}
          >
            {exported ? (
              <>
                <Check className="w-4 h-4" />
                Exported Successfully!
              </>
            ) : exporting ? (
              'Exporting...'
            ) : (
              <>
                <Download className="w-4 h-4" />
                Export {format.toUpperCase()} / {format.toUpperCase()}をエクスポート
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
