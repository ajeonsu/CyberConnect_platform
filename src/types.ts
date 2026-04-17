export type UserRole = 'admin' | 'developer' | 'client';

export type ViewMode = 'internal' | 'client';

export type SyncStatus = 'synced' | 'pending' | 'translating' | 'conflict';

export interface BilingualText {
  en: string;
  ja: string;
  syncStatus: SyncStatus;
  lastEditedLang: 'en' | 'ja';
}

export interface Requirement {
  id: string;
  code: string;
  category: string;
  title: BilingualText;
  description: BilingualText;
  status: 'draft' | 'review' | 'approved' | 'in_progress' | 'completed';
  priority: 'low' | 'medium' | 'high' | 'critical';
  assignee: string;
  internalNotes: BilingualText;
  techSpec: BilingualText;
  apiEndpoint: string;
  clientVisible: boolean;
  clientEditable: boolean;
  createdAt: string;
  updatedAt: string;
  attachments: number;
  comments: number;
}

export interface Column {
  key: keyof Requirement | 'title_en' | 'title_ja' | 'description_en' | 'description_ja' | 'internalNotes_en' | 'internalNotes_ja' | 'techSpec_en' | 'techSpec_ja';
  label: string;
  labelJa: string;
  width: number;
  internalOnly: boolean;
  editable: boolean;
  clientEditable: boolean;
  type: 'text' | 'status' | 'priority' | 'code' | 'bilingual' | 'boolean' | 'date' | 'number';
}

export interface ExportOptions {
  format: 'pdf' | 'csv';
  view: ViewMode;
  includeTranslations: boolean;
  columns: string[];
}
