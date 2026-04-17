import { useState } from 'react';
import type { Requirement, ViewMode, UserRole, BilingualText, SyncStatus } from '../types';
import {
  X, Languages, Check, Clock, AlertTriangle, Loader,
  Paperclip, MessageSquare, ArrowRightLeft, Sparkles,
} from 'lucide-react';

const enToJa: Record<string, string> = {
  'login screen': 'ログイン画面',
  'dashboard overview': 'ダッシュボード概要',
  'bilingual input system': 'バイリンガル入力システム',
  'dual-book view system': 'デュアルブック表示システム',
  'unique code generator': '一意コード生成機能',
  'user management panel': 'ユーザー管理パネル',
  'pdf/csv export engine': 'PDF/CSVエクスポートエンジン',
  'authentication api': '認証API',
  'client portal landing': 'クライアントポータルランディング',
  'real-time collaboration': 'リアルタイムコラボレーション',
};

function mockTranslate(text: string, from: 'en' | 'ja'): string {
  if (!text.trim()) return '';
  const lower = text.toLowerCase().trim();

  if (from === 'en') {
    if (enToJa[lower]) return enToJa[lower];
    const words: Record<string, string> = {
      'user': 'ユーザー', 'screen': '画面', 'login': 'ログイン', 'system': 'システム',
      'authentication': '認証', 'dashboard': 'ダッシュボード', 'api': 'API',
      'export': 'エクスポート', 'import': 'インポート', 'database': 'データベース',
      'server': 'サーバー', 'client': 'クライアント', 'admin': '管理者',
      'translation': '翻訳', 'feature': '機能', 'requirement': '要件',
      'project': 'プロジェクト', 'management': '管理', 'portal': 'ポータル',
      'security': 'セキュリティ', 'permission': '権限', 'role': 'ロール',
      'session': 'セッション', 'token': 'トークン', 'middleware': 'ミドルウェア',
      'rendering': 'レンダリング', 'websocket': 'WebSocket', 'endpoint': 'エンドポイント',
      'filter': 'フィルター', 'column': 'カラム', 'view': 'ビュー',
      'internal': '内部', 'external': '外部', 'configuration': '設定',
      'validation': 'バリデーション', 'error': 'エラー', 'update': '更新',
      'create': '作成', 'delete': '削除', 'read': '読取', 'write': '書込',
      'use': '使用', 'for': '用', 'with': '付き', 'and': 'と', 'the': '',
      'based': 'ベース', 'level': 'レベル', 'field': 'フィールド',
      'required': '必要', 'routing': 'ルーティング', 'hashing': 'ハッシュ',
      'rate limiting': 'レート制限', 'backup': 'バックアップ',
      'conflict': 'コンフリクト', 'resolution': '解決', 'live': 'ライブ',
      'editing': '編集', 'phase': 'フェーズ', 'basic': '基本',
      'context-aware': 'コンテキスト対応', 'glossary': '用語集',
      'queue': 'キュー', 'async': '非同期', 'processing': '処理',
      'immutable': '不変', 'sequence': 'シーケンス', 'prefix': 'プレフィックス',
      'audit': '監査', 'log': 'ログ', 'guard': 'ガード', 'cache': 'キャッシュ',
      'visualization': '可視化', 'streaming': 'ストリーミング', 'headless': 'ヘッドレス',
      'generation': '生成', 'store': 'ストア', 'pub/sub': 'pub/sub',
      'scaling': 'スケーリング', 'attempts': '試行', 'minute': '分',
      'lockout': 'ロックアウト', 'failures': '失敗', 'only': 'のみ',
      'should': 'べき', 'must': '必須', 'completely': '完全に', 'hide': '非表示',
      'separate': '別の', 'projection': 'プロジェクション', 'consider': '検討',
    };

    let result = text;
    const sortedKeys = Object.keys(words).sort((a, b) => b.length - a.length);
    for (const en of sortedKeys) {
      const regex = new RegExp(`\\b${en}\\b`, 'gi');
      result = result.replace(regex, words[en]);
    }
    if (result === text) return `[翻訳] ${text}`;
    return result;
  }

  const jaToEn = Object.fromEntries(Object.entries(enToJa).map(([k, v]) => [v, k]));
  if (jaToEn[text]) return jaToEn[text].split(' ').map(w => w[0].toUpperCase() + w.slice(1)).join(' ');
  return `[Translated] ${text}`;
}

interface Props {
  requirement: Requirement;
  viewMode: ViewMode;
  role: UserRole;
  onClose: () => void;
  onUpdate: (updates: Partial<Requirement>) => void;
}

const syncConfig: Record<SyncStatus, { icon: typeof Check; color: string; bg: string; label: string; labelJa: string }> = {
  synced: { icon: Check, color: 'text-emerald-400', bg: 'bg-emerald-500/10', label: 'Synced', labelJa: '同期済み' },
  pending: { icon: Clock, color: 'text-amber-400', bg: 'bg-amber-500/10', label: 'Pending Translation', labelJa: '翻訳待ち' },
  translating: { icon: Loader, color: 'text-brand-400', bg: 'bg-brand-500/10', label: 'Translating...', labelJa: '翻訳中...' },
  conflict: { icon: AlertTriangle, color: 'text-red-400', bg: 'bg-red-500/10', label: 'Conflict Detected', labelJa: 'コンフリクト検出' },
};

const statusOptions = ['draft', 'review', 'approved', 'in_progress', 'completed'] as const;
const priorityOptions = ['low', 'medium', 'high', 'critical'] as const;

function BilingualEditor({ label, value, onUpdate, canEdit, onTranslate }: {
  label: string;
  value: BilingualText;
  onUpdate: (val: BilingualText) => void;
  canEdit: boolean;
  onTranslate: (value: BilingualText, from: 'en' | 'ja') => void;
}) {
  const sync = syncConfig[value.syncStatus];
  const SyncIcon = sync.icon;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-300">{label}</h3>
        <div className={`flex items-center gap-1.5 px-2 py-1 rounded-full text-xs ${sync.bg} ${sync.color}`}>
          <SyncIcon className="w-3 h-3" />
          <span>{sync.label}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs text-gray-500 flex items-center gap-1">
              <span className="font-mono bg-surface-800 px-1.5 py-0.5 rounded text-brand-300 border border-surface-700">EN</span>
              English
            </label>
            {canEdit && value.en.trim() && (
              <button
                onClick={() => onTranslate(value, 'en')}
                className="text-xs text-brand-400 hover:text-brand-300 flex items-center gap-1 transition-colors"
                title="Translate EN → JA"
              >
                <Sparkles className="w-3 h-3" />
                EN → JA
              </button>
            )}
          </div>
          {canEdit ? (
            <textarea
              value={value.en}
              onChange={(e) => onUpdate({ ...value, en: e.target.value, syncStatus: 'pending', lastEditedLang: 'en' })}
              className="w-full bg-surface-800 border border-surface-700 rounded-lg px-3 py-2 text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-500/40 transition resize-none"
              rows={3}
            />
          ) : (
            <p className="text-sm text-gray-300 bg-surface-800 rounded-lg px-3 py-2 border border-surface-700">{value.en || <span className="text-gray-600 italic">No content</span>}</p>
          )}
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs text-gray-500 flex items-center gap-1">
              <span className="font-mono bg-surface-800 px-1.5 py-0.5 rounded text-amber-300 border border-surface-700">JA</span>
              日本語
            </label>
            {canEdit && value.ja.trim() && (
              <button
                onClick={() => onTranslate(value, 'ja')}
                className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 transition-colors"
                title="Translate JA → EN"
              >
                <Sparkles className="w-3 h-3" />
                JA → EN
              </button>
            )}
          </div>
          {canEdit ? (
            <textarea
              value={value.ja}
              onChange={(e) => onUpdate({ ...value, ja: e.target.value, syncStatus: 'pending', lastEditedLang: 'ja' })}
              className="w-full bg-surface-800 border border-surface-700 rounded-lg px-3 py-2 text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-500/40 transition resize-none"
              rows={3}
            />
          ) : (
            <p className="text-sm text-gray-300 bg-surface-800 rounded-lg px-3 py-2 border border-surface-700">{value.ja || <span className="text-gray-600 italic">No content</span>}</p>
          )}
        </div>
      </div>

      {canEdit && (value.en.trim() || value.ja.trim()) && (
        <div className="flex items-center justify-center">
          <button
            onClick={() => {
              const from = value.lastEditedLang;
              onTranslate(value, from);
            }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium bg-surface-800 border border-surface-700 text-gray-400 hover:text-brand-300 hover:border-brand-500/30 transition-all"
          >
            <ArrowRightLeft className="w-3.5 h-3.5" />
            Sync Both Directions / 両方向を同期
          </button>
        </div>
      )}
    </div>
  );
}

export function RowDetail({ requirement: req, viewMode, role, onClose, onUpdate }: Props) {
  const [activeTab, setActiveTab] = useState<'details' | 'translation' | 'technical'>('details');
  const canEdit = role !== 'client';
  const [translating, setTranslating] = useState<string | null>(null);

  const handleTranslate = (bilingualValue: BilingualText, from: 'en' | 'ja', fieldKey: 'title' | 'description' | 'internalNotes' | 'techSpec') => {
    const sourceText = from === 'en' ? bilingualValue.en : bilingualValue.ja;
    if (!sourceText.trim()) return;

    setTranslating(fieldKey);
    setTimeout(() => {
      const translated = mockTranslate(sourceText, from);
      const targetLang = from === 'en' ? 'ja' : 'en';
      onUpdate({
        [fieldKey]: {
          ...bilingualValue,
          [targetLang]: translated,
          syncStatus: 'synced' as const,
          lastEditedLang: from,
        },
      });
      setTranslating(null);
    }, 1200);
  };

  return (
    <div className="w-[480px] bg-surface-900 border-l border-surface-700 flex flex-col animate-slide-in shrink-0 h-full overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-surface-700">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs bg-surface-800 px-2.5 py-1 rounded text-brand-300 border border-surface-700">
            {req.code}
          </span>
          <div className="flex items-center gap-2 text-gray-500 text-xs">
            <Paperclip className="w-3 h-3" />
            <span>{req.attachments}</span>
            <MessageSquare className="w-3 h-3 ml-1" />
            <span>{req.comments}</span>
          </div>
        </div>
        <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors p-1 rounded-lg hover:bg-surface-800">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex border-b border-surface-700">
        {(['details', 'translation', ...(viewMode === 'internal' ? ['technical'] : [])] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as typeof activeTab)}
            className={`flex-1 px-4 py-2.5 text-xs font-medium transition-all border-b-2 ${
              activeTab === tab
                ? 'text-brand-300 border-brand-500 bg-brand-500/5'
                : 'text-gray-500 border-transparent hover:text-gray-300'
            }`}
          >
            {tab === 'details' && 'Details / 詳細'}
            {tab === 'translation' && (
              <span className="flex items-center justify-center gap-1">
                <Languages className="w-3.5 h-3.5" />
                Translation / 翻訳
              </span>
            )}
            {tab === 'technical' && 'Technical / 技術'}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-6">
        {translating && (
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-brand-500/10 border border-brand-500/20 text-brand-300 text-xs animate-fade-in">
            <Loader className="w-3.5 h-3.5 animate-spin" />
            AI Translation in progress... / AI翻訳処理中...
          </div>
        )}

        {activeTab === 'details' && (
          <>
            <BilingualEditor
              label="Title / タイトル"
              value={req.title}
              onUpdate={(val) => onUpdate({ title: val })}
              canEdit={canEdit || (role === 'client' && true)}
              onTranslate={(val, from) => handleTranslate(val, from, 'title')}
            />

            <BilingualEditor
              label="Description / 説明"
              value={req.description}
              onUpdate={(val) => onUpdate({ description: val })}
              canEdit={canEdit || (role === 'client' && true)}
              onTranslate={(val, from) => handleTranslate(val, from, 'description')}
            />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-gray-500 mb-1.5 block">Status / ステータス</label>
                {canEdit ? (
                  <select
                    value={req.status}
                    onChange={(e) => onUpdate({ status: e.target.value as Requirement['status'] })}
                    className="w-full bg-surface-800 border border-surface-700 rounded-lg px-3 py-2 text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-500/40"
                  >
                    {statusOptions.map(s => (
                      <option key={s} value={s}>{s.replace('_', ' ')}</option>
                    ))}
                  </select>
                ) : (
                  <p className="text-sm text-gray-300 bg-surface-800 rounded-lg px-3 py-2 border border-surface-700 capitalize">{req.status.replace('_', ' ')}</p>
                )}
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1.5 block">Priority / 優先度</label>
                {canEdit ? (
                  <select
                    value={req.priority}
                    onChange={(e) => onUpdate({ priority: e.target.value as Requirement['priority'] })}
                    className="w-full bg-surface-800 border border-surface-700 rounded-lg px-3 py-2 text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-500/40"
                  >
                    {priorityOptions.map(p => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                ) : (
                  <p className="text-sm text-gray-300 bg-surface-800 rounded-lg px-3 py-2 border border-surface-700 capitalize">{req.priority}</p>
                )}
              </div>
            </div>

            <div>
              <label className="text-xs text-gray-500 mb-1.5 block">Category / カテゴリ</label>
              <p className="text-sm text-gray-300 bg-surface-800 rounded-lg px-3 py-2 border border-surface-700">{req.category}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs text-gray-500">
              <div>
                <span className="block mb-1">Created / 作成日</span>
                <span className="text-gray-400">{req.createdAt}</span>
              </div>
              <div>
                <span className="block mb-1">Updated / 更新日</span>
                <span className="text-gray-400">{req.updatedAt}</span>
              </div>
            </div>
          </>
        )}

        {activeTab === 'translation' && (
          <>
            <div className="bg-surface-800 rounded-xl p-4 border border-surface-700">
              <h3 className="text-sm font-medium text-white mb-3 flex items-center gap-2">
                <Languages className="w-4 h-4 text-brand-400" />
                Translation Status / 翻訳ステータス
              </h3>

              <div className="space-y-3">
                {[
                  { label: 'Title', value: req.title },
                  { label: 'Description', value: req.description },
                  ...(viewMode === 'internal' ? [
                    { label: 'Internal Notes', value: req.internalNotes },
                    { label: 'Tech Spec', value: req.techSpec },
                  ] : []),
                ].map(({ label, value }) => {
                  const sync = syncConfig[value.syncStatus];
                  const SyncIcon = sync.icon;
                  return (
                    <div key={label} className="flex items-center justify-between py-2 border-b border-surface-700 last:border-0">
                      <span className="text-sm text-gray-400">{label}</span>
                      <div className={`flex items-center gap-1.5 text-xs ${sync.color}`}>
                        <SyncIcon className="w-3 h-3" />
                        <span>{sync.label}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <BilingualEditor
              label="Title / タイトル"
              value={req.title}
              onUpdate={(val) => onUpdate({ title: val })}
              canEdit={canEdit}
              onTranslate={(val, from) => handleTranslate(val, from, 'title')}
            />

            <BilingualEditor
              label="Description / 説明"
              value={req.description}
              onUpdate={(val) => onUpdate({ description: val })}
              canEdit={canEdit}
              onTranslate={(val, from) => handleTranslate(val, from, 'description')}
            />

            <div className="bg-surface-800/50 rounded-xl p-4 border border-dashed border-surface-700">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-brand-400" />
                <h4 className="text-sm font-medium text-gray-300">AI Context Translation</h4>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">
                Phase 2 feature: Context-aware AI translation that understands the full project glossary and technical terms,
                rather than translating sentence by sentence.
              </p>
              <p className="text-xs text-gray-600 mt-1">
                フェーズ2機能：文ごとの翻訳ではなく、プロジェクト全体の用語集と技術用語を理解するコンテキスト対応AI翻訳。
              </p>
              <div className="mt-3 inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-300 text-xs">
                <Clock className="w-3 h-3" />
                Coming in Phase 2
              </div>
            </div>
          </>
        )}

        {activeTab === 'technical' && viewMode === 'internal' && (
          <>
            <div>
              <label className="text-xs text-gray-500 mb-1.5 block">Assignee / 担当者</label>
              {canEdit ? (
                <input
                  value={req.assignee}
                  onChange={(e) => onUpdate({ assignee: e.target.value })}
                  className="w-full bg-surface-800 border border-surface-700 rounded-lg px-3 py-2 text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-500/40 transition"
                />
              ) : (
                <p className="text-sm text-gray-300 bg-surface-800 rounded-lg px-3 py-2 border border-surface-700">{req.assignee || '-'}</p>
              )}
            </div>

            <BilingualEditor
              label="Internal Notes / 内部メモ"
              value={req.internalNotes}
              onUpdate={(val) => onUpdate({ internalNotes: val })}
              canEdit={canEdit}
              onTranslate={(val, from) => handleTranslate(val, from, 'internalNotes')}
            />

            <BilingualEditor
              label="Tech Spec / 技術仕様"
              value={req.techSpec}
              onUpdate={(val) => onUpdate({ techSpec: val })}
              canEdit={canEdit}
              onTranslate={(val, from) => handleTranslate(val, from, 'techSpec')}
            />

            <div>
              <label className="text-xs text-gray-500 mb-1.5 block">API Endpoint / APIエンドポイント</label>
              {canEdit ? (
                <input
                  value={req.apiEndpoint}
                  onChange={(e) => onUpdate({ apiEndpoint: e.target.value })}
                  className="w-full bg-surface-800 border border-surface-700 rounded-lg px-3 py-2 text-sm text-gray-200 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-brand-500/40 transition"
                />
              ) : (
                <p className="text-sm text-gray-300 bg-surface-800 rounded-lg px-3 py-2 border border-surface-700">{req.apiEndpoint || '-'}</p>
              )}
            </div>

            {canEdit && (
              <div className="flex items-center justify-between bg-surface-800 rounded-lg px-4 py-3 border border-surface-700">
                <div>
                  <span className="text-sm text-gray-300">Client Visible / クライアント表示</span>
                  <p className="text-xs text-gray-500 mt-0.5">Show this item in the client portal view</p>
                </div>
                <button
                  onClick={() => onUpdate({ clientVisible: !req.clientVisible })}
                  className={`w-10 h-6 rounded-full transition-colors relative ${req.clientVisible ? 'bg-brand-600' : 'bg-surface-700'}`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${req.clientVisible ? 'left-5' : 'left-1'}`} />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
