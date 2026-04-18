import type { SheetTab, SheetColumn, SheetRow, Project, UserProfile, UserRole } from './types';

function col(key: string, label: string, labelJa: string, width: number, type: SheetColumn['type'] = 'text', editable = true, options?: string[]): SheetColumn {
  return { key, label, labelJa, width, type, editable, options };
}

// ── User Profiles ─────────────────────────────────────────

export const userProfiles: UserProfile[] = [
  { id: 'admin-1', name: 'System Admin', email: 'admin@cyberconnect.io', role: 'administrator' },
  { id: 'pm-masayuki', name: 'Masayuki', email: 'masayuki@cyberconnect.io', role: 'pm' },
  { id: 'dev-andrea', name: 'Andrea', email: 'andrea@cyberconnect.io', role: 'developer' },
  { id: 'dev-angel', name: 'Angel', email: 'angel@cyberconnect.io', role: 'pm' },
  { id: 'dev-aj', name: 'Aj', email: 'aj@cyberconnect.io', role: 'developer' },
  { id: 'dev-tanaka', name: 'Tanaka K.', email: 'tanaka@cyberconnect.io', role: 'developer' },
  { id: 'dev-nakamura', name: 'Nakamura Y.', email: 'nakamura@cyberconnect.io', role: 'developer' },
  { id: 'dev-yamada-t', name: 'Yamada T.', email: 'yamada@cyberconnect.io', role: 'developer' },
  { id: 'dev-suzuki-m', name: 'Suzuki M.', email: 'suzuki@cyberconnect.io', role: 'developer' },
  { id: 'dev-villanueva-r', name: 'Villanueva R.', email: 'villanueva@cyberconnect.io', role: 'developer' },
  { id: 'client-internal', name: 'CyberConnect (Internal)', email: 'team@cyberconnect.io', role: 'client' },
  { id: 'client-tokyo', name: 'Tokyo Retail Corp.', email: 'contact@tokyoretail.co.jp', role: 'client' },
  { id: 'client-medtech', name: 'MedTech Japan', email: 'info@medtechjp.com', role: 'client' },
  { id: 'client-osaka', name: 'Osaka Systems Ltd.', email: 'pm@osakasystems.co.jp', role: 'client' },
];

export const teamMembers = ['Yamada T.', 'Suzuki M.', 'Tanaka K.', 'Nakamura Y.', 'Villanueva R.', 'Andrea', 'Angel', 'Masayuki', 'Aj'];

export const sheetTabs: SheetTab[] = [
  {
    id: 'purpose',
    name: 'Purpose',
    nameJa: '概要',
    icon: 'FileText',
    visibleTo: ['administrator', 'pm', 'client'],
    columns: [],
    guestEditableColumns: [],
    pmCanAddRows: false,
    isSpecialView: true,
  },
  {
    id: 'tech_stack',
    name: 'Technical Stack',
    nameJa: '技術スタック',
    icon: 'Server',
    visibleTo: ['administrator', 'pm', 'developer', 'client'],
    columns: [
      col('majorItem', 'Major Items', '大項目', 160, 'text', true),
      col('mediumItem', 'Medium Item', '中項目', 160, 'text', true),
      col('content', 'Content', '内容', 500, 'longtext', true),
    ],
    guestEditableColumns: [],
    pmCanAddRows: true,
  },
  {
    id: 'non_func',
    name: 'Non-functional Req.',
    nameJa: '非機能要件',
    icon: 'ShieldCheck',
    visibleTo: ['administrator', 'pm', 'client'],
    columns: [
      col('majorItem', 'Major Items', '大項目', 160, 'text', true),
      col('mediumItem', 'Medium Item', '中項目', 180, 'text', true),
      col('content', 'Content', '内容', 500, 'longtext', true),
    ],
    guestEditableColumns: [],
    pmCanAddRows: true,
  },
  {
    id: 'screen_list',
    name: 'Screen List',
    nameJa: '画面一覧',
    icon: 'Monitor',
    visibleTo: ['administrator', 'pm', 'developer', 'client'],
    columns: [
      col('screenCode', 'Screen Code', '画面コード', 110, 'code', false),
      col('userCategory', 'User Category', 'ユーザー区分', 130, 'text', true),
      col('majorItem', 'Major Items', '大項目', 140, 'text', true),
      col('mediumItem', 'Medium Item', '中項目', 140, 'text', true),
      col('screenName', 'Screen Name', '画面名', 200, 'text', true),
      col('path', 'Path', 'パス', 180, 'text', true),
      col('overview', 'Screen Overview', '画面概要', 300, 'longtext', true),
      col('status', 'Status', 'ステータス', 120, 'status', true, ['Not started', 'In progress', 'Completed']),
      col('completionDev', 'Check (Dev)', '確認(開発)', 100, 'status', true, ['', 'Done', 'In progress']),
      col('completionClient', 'Check (Client)', '確認(顧客)', 100, 'status', true, ['', 'Done', 'In progress']),
      col('remarks', 'Remarks', '備考', 200, 'text', true),
    ],
    guestEditableColumns: [],
    pmCanAddRows: true,
  },
  {
    id: 'function_list',
    name: 'Function List',
    nameJa: '機能一覧',
    icon: 'Puzzle',
    visibleTo: ['administrator', 'pm', 'developer', 'client'],
    columns: [
      col('functionCode', 'Function Code', '機能コード', 120, 'code', false),
      col('phase', 'Phase', 'フェーズ', 80, 'select', true, ['MVP', 'v2', 'v3']),
      col('userCategory', 'User Category', 'ユーザー区分', 130, 'text', true),
      col('mainCategory', 'Main Category', 'メインカテゴリ', 160, 'text', true),
      col('subcategory', 'Subcategory', 'サブカテゴリ', 140, 'text', true),
      col('screenCode', 'Screen Code', '画面コード', 110, 'text', true),
      col('screenName', 'Screen Name', '画面名', 170, 'text', true),
      col('functionName', 'Function Name', '機能名', 200, 'text', true),
      col('functionDetails', 'Function Details', '機能詳細', 350, 'longtext', true),
      col('effort', 'Effort', '工数', 70, 'text', true),
      col('status', 'Status', 'ステータス', 140, 'status', true, ['Need to be checked', 'In progress', 'Completed']),
      col('completionDev', 'Check (Dev)', '確認(開発)', 100, 'status', true, ['', 'Done', 'In progress']),
      col('completionClient', 'Check (Client)', '確認(顧客)', 100, 'status', true, ['', 'Done', 'In progress']),
      col('remarks', 'Remarks', '備考', 250, 'longtext', true),
    ],
    guestEditableColumns: ['remarks'],
    pmCanAddRows: true,
  },
  {
    id: 'tasks',
    name: 'Tasks',
    nameJa: 'タスク',
    icon: 'CheckSquare',
    visibleTo: ['administrator', 'pm', 'developer', 'client'],
    columns: [
      col('taskCode', 'Task Code', 'タスクコード', 110, 'code', false),
      col('phase', 'Phase', 'フェーズ', 80, 'select', true, ['MVP', 'v2', 'v3']),
      col('sprint', 'Sprint', 'スプリント', 100, 'text', true),
      col('epic', 'Epic', 'エピック', 160, 'text', true),
      col('screenCode', 'Screen Code', '画面コード', 110, 'text', true),
      col('functionCode', 'Function Code', '機能コード', 120, 'text', true),
      col('task', 'Task', 'タスク', 300, 'text', true),
      col('personDay', 'Person-day', '人日', 80, 'number', true),
      col('assignee', 'Assignee', '担当者', 130, 'assignee', true),
      col('status', 'Status', 'ステータス', 120, 'status', true, ['Not started', 'In progress', 'Done', 'Blocked']),
      col('deadline', 'Deadline', '期限', 110, 'date', true),
      col('completedDate', 'Completed', '完了日', 110, 'date', true),
      col('completionPM', 'Check (PM)', '確認(PM)', 90, 'status', true, ['', 'Done']),
      col('remark', 'Remark', '備考', 280, 'longtext', true),
    ],
    guestEditableColumns: ['remark'],
    pmCanAddRows: true,
  },
  {
    id: 'test_case',
    name: 'Test Case',
    nameJa: 'テストケース',
    icon: 'FlaskConical',
    visibleTo: ['administrator', 'pm', 'client'],
    columns: [
      col('category', 'Scenario Category', 'シナリオ分類', 160, 'text', true),
      col('scenarioName', 'Scenario Name', 'シナリオ名', 150, 'text', true),
      col('testType', 'Test Type', 'テスト種別', 100, 'select', true, ['Normal', 'Abnormal', 'Boundary']),
      col('summary', 'Scenario Summary', 'シナリオ概要', 280, 'longtext', true),
      col('testSteps', 'Test Steps', 'テスト手順', 250, 'longtext', true),
      col('expectedResults', 'Expected Results', '期待結果', 250, 'longtext', true),
      col('status', 'Result', '結果', 100, 'status', true, ['', 'Pass', 'Fail', 'Blocked']),
      col('tester', 'Tester', 'テスター', 120, 'text', true),
      col('remarks', 'Remarks', '備考', 200, 'text', true),
    ],
    guestEditableColumns: [],
    pmCanAddRows: true,
  },
  {
    id: 'api_list',
    name: 'API List',
    nameJa: 'API一覧',
    icon: 'Plug',
    visibleTo: ['administrator', 'pm', 'client'],
    columns: [
      col('category', 'Category', 'カテゴリ', 100, 'text', true),
      col('serviceName', 'Service Name', 'サービス名', 160, 'text', true),
      col('apiName', 'API Name', 'API名', 180, 'text', true),
      col('authMethod', 'Auth Method', '認証方式', 130, 'text', true),
      col('dataHandling', 'Data Handling', 'データ処理', 200, 'text', true),
      col('realtime', 'Real-time', 'リアルタイム', 100, 'select', true, ['Yes', 'No', 'Partial']),
      col('mvpRequired', 'MVP Required', 'MVP対応', 100, 'select', true, ['MVP', 'v2', 'v3']),
      col('status', 'Status', 'ステータス', 120, 'status', true, ['Not started', 'In progress', 'Completed', 'Deprecated']),
      col('remarks', 'Remarks', '備考', 250, 'longtext', true),
    ],
    guestEditableColumns: [],
    pmCanAddRows: true,
  },
  {
    id: 'backlog',
    name: 'Backlog',
    nameJa: 'バックログ',
    icon: 'ListTodo',
    visibleTo: ['administrator', 'pm', 'client'],
    columns: [
      col('epic', 'Epic', 'エピック', 180, 'text', true),
      col('story', 'Story', 'ストーリー', 200, 'text', true),
      col('task', 'Task', 'タスク', 350, 'longtext', true),
      col('owner', 'Owner', '担当', 120, 'assignee', true),
      col('sprint', 'Sprint', 'スプリント', 100, 'select', true, ['S1', 'S2', 'S3', 'S4', 'S5', 'Backlog']),
    ],
    guestEditableColumns: [],
    pmCanAddRows: true,
  },
  {
    id: 'process_chart',
    name: 'Process Chart',
    nameJa: '工程表',
    icon: 'GanttChart',
    visibleTo: ['administrator', 'pm', 'client'],
    columns: [
      col('code', 'Code', 'コード', 110, 'code', false),
      col('category', 'Category', 'カテゴリ', 150, 'text', true),
      col('task', 'Task', 'タスク', 300, 'text', true),
      col('sprint', 'Sprint', 'スプリント', 100, 'text', true),
      col('personDays', 'Person-days', '人日', 100, 'number', true),
      col('status', 'Status', 'ステータス', 120, 'status', true, ['Planned', 'In progress', 'Completed']),
    ],
    guestEditableColumns: [],
    pmCanAddRows: false,
  },
  {
    id: 'master_schedule',
    name: 'Master Schedule',
    nameJa: 'マスタースケジュール',
    icon: 'Calendar',
    visibleTo: ['administrator', 'pm', 'client'],
    columns: [],
    guestEditableColumns: [],
    pmCanAddRows: false,
    isSpecialView: true,
  },
];

// ── Projects ──────────────────────────────────────────────

export const projects: Project[] = [
  {
    id: 'proj-1',
    name: 'CyberConnect Platform',
    nameJa: 'CyberConnectプラットフォーム',
    client: 'Internal',
    pmId: 'dev-angel',
    assignedDevIds: ['dev-andrea', 'dev-angel', 'dev-aj'],
    clientId: 'client-internal',
    description: 'Bilingual requirements & task management platform',
    descriptionJa: 'バイリンガル要件・タスク管理プラットフォーム',
    color: 'from-brand-500 to-brand-700',
    status: 'active',
    createdAt: '2026-03-15',
    background: 'Internal tool to manage bilingual software projects. Currently using spreadsheets that cause data integrity issues.',
    purpose: '(1) Automate bilingual content management\n(2) Role-based access for clients and internal teams\n(3) Unique code generation to prevent human error',
    devPeriod: 'MVP: 2026.04 – 2026.07',
  },
  {
    id: 'proj-2',
    name: 'EC-One Marketplace',
    nameJa: 'EC-Oneマーケットプレイス',
    client: 'Tokyo Retail Corp.',
    pmId: 'dev-angel',
    assignedDevIds: ['dev-andrea', 'dev-angel', 'dev-tanaka', 'dev-aj'],
    clientId: 'client-tokyo',
    description: 'Multi-channel EC business unification SaaS',
    descriptionJa: 'マルチチャネルEC事業統合SaaS',
    color: 'from-emerald-500 to-emerald-700',
    status: 'active',
    createdAt: '2026-02-10',
    background: 'Mid- to large-scale e-commerce businesses operate multiple malls such as Amazon, Rakuten, Shopify, Yahoo! and more, resulting in issues such as "duplicate inventory management", "distributed orders and returns", "burdensome advertising and P&L calculations", "personalization", and "delayed reporting". On-site operations rely on spreadsheets and manual operations, resulting in a lack of visualization and automation.',
    purpose: '(1) Automate daily operations by integrating multi-channel orders, inventory, customers, advertising, and revenue/expenses into a single platform\n(2) Accelerate decision making with dashboards and automated reports\n(3) Maximize gross profit with AI, including demand forecasting, anomaly detection, and inventory optimization\n(4) Minimize implementation and expansion costs with standard API integration',
    devPeriod: 'MVP: 2025.12\nFinal version: 2026.3',
  },
  {
    id: 'proj-3',
    name: 'HealthTrack Mobile',
    nameJa: 'ヘルストラックモバイル',
    client: 'MedTech Japan',
    pmId: 'pm-masayuki',
    assignedDevIds: ['dev-tanaka', 'dev-nakamura'],
    clientId: 'client-medtech',
    description: 'Health monitoring and wellness tracking mobile app',
    descriptionJa: '健康モニタリング・ウェルネス追跡モバイルアプリ',
    color: 'from-rose-500 to-rose-700',
    status: 'active',
    createdAt: '2026-04-01',
    background: 'Mobile health tracking app for preventive healthcare with wearable device integration.',
    purpose: '(1) Personal health dashboard with daily/weekly/monthly trends\n(2) Step counting and activity goal tracking\n(3) Medication reminders with adherence tracking\n(4) Wearable device data sync (Fitbit, Apple Watch, Garmin)',
    devPeriod: 'MVP: 2026.06',
  },
  {
    id: 'proj-4',
    name: 'SmartOffice IoT',
    nameJa: 'スマートオフィスIoT',
    client: 'Osaka Systems Ltd.',
    pmId: 'pm-masayuki',
    assignedDevIds: ['dev-nakamura'],
    clientId: 'client-osaka',
    description: 'IoT-based office automation and monitoring dashboard',
    descriptionJa: 'IoTベースのオフィス自動化・モニタリングダッシュボード',
    color: 'from-amber-500 to-amber-700',
    status: 'on_hold',
    createdAt: '2026-01-20',
    background: 'IoT solution for smart office environment monitoring and energy optimization.',
    purpose: '(1) Real-time IoT device dashboard\n(2) Energy usage analytics with AI\n(3) Room booking integration with occupancy sensors',
    devPeriod: 'MVP: 2026.08 (on hold)',
  },
];

// ── Demo Gmail sign-in (LoginScreen) ──────────────────────
/** Gmail local part (lowercase) → userProfiles id. Matches teamMembers display names. */
const DEMO_GMAIL_LOCAL_TO_USER_ID: Record<string, string> = {
  'yamada.t': 'dev-yamada-t',
  'suzuki.m': 'dev-suzuki-m',
  'tanaka.k': 'dev-tanaka',
  'nakamura.y': 'dev-nakamura',
  'villanueva.r': 'dev-villanueva-r',
  andrea: 'dev-andrea',
  angel: 'dev-angel',
  masayuki: 'pm-masayuki',
  aj: 'dev-aj',
};

export function normalizeDemoGateEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function isDemoAdminGateEmail(email: string): boolean {
  return normalizeDemoGateEmail(email) === 'admin@gmail.com';
}

export function resolveDemoGmailUser(email: string): UserProfile | null {
  const norm = normalizeDemoGateEmail(email);
  const m = norm.match(/^(.+)@gmail\.com$/);
  if (!m) return null;
  const local = m[1];
  const userId = DEMO_GMAIL_LOCAL_TO_USER_ID[local];
  if (!userId) return null;
  return userProfiles.find(u => u.id === userId) ?? null;
}

export function isRecognizedDemoGateEmail(email: string): boolean {
  const n = normalizeDemoGateEmail(email);
  return isDemoAdminGateEmail(n) || resolveDemoGmailUser(n) !== null;
}

/** Roles this person may use in the demo, derived from project assignments (plus client profile). */
export function getEligibleRolesFromProjects(user: UserProfile, projectList: Project[]): UserRole[] {
  const set = new Set<UserRole>();
  for (const p of projectList) {
    if (p.pmId === user.id) set.add('pm');
    if (p.assignedDevIds.includes(user.id)) set.add('developer');
  }
  if (user.role === 'client') set.add('client');
  const order: UserRole[] = ['pm', 'developer', 'client'];
  return order.filter(r => set.has(r));
}

export function getDemoGateEmailForUserId(userId: string): string | null {
  const entry = Object.entries(DEMO_GMAIL_LOCAL_TO_USER_ID).find(([, id]) => id === userId);
  return entry ? `${entry[0]}@gmail.com` : null;
}

// ── Counter for new codes ─────────────────────────────────

const counters: Record<string, number> = {};

export function generateCode(prefix: string, projectId: string): string {
  const key = `${projectId}-${prefix}`;
  counters[key] = (counters[key] || 0) + 1;
  return `${prefix}-${String(counters[key]).padStart(3, '0')}`;
}

// ── Project Sheet Data ────────────────────────────────────

export const projectSheetData: Record<string, Record<string, SheetRow[]>> = {
  'proj-2': {
    tech_stack: [
      { id: 'ts-1', majorItem: 'Architecture', mediumItem: 'Multitenant', content: 'Tenant = Corporate account; logical separation and data mixing prohibited / tenant_id required for all tables in RLS', majorItemJa: 'アーキテクチャ', mediumItemJa: 'マルチテナント', contentJa: 'テナント＝法人アカウント。論理分離しデータ混在禁止／全テーブルに tenant_id と RLS' },
      { id: 'ts-2', majorItem: 'Architecture', mediumItem: 'Scalability', content: 'Module division (orders, inventory, advertising, P&L, reports, integration) / Phased release using function flags', majorItemJa: 'アーキテクチャ', mediumItemJa: 'スケーラビリティ', contentJa: 'モジュール分割（受注・在庫・広告・損益・レポート・連携）／機能フラグで段階リリース' },
      { id: 'ts-3', majorItem: 'Performance/SLO', mediumItem: 'Availability', content: 'Monthly occupancy rate ≥ 99.5% (MVP) → 99.9% in the future / Planned shutdowns will be implemented at night', majorItemJa: 'パフォーマンス／SLO', mediumItemJa: '可用性', contentJa: '月間稼働率 99.5% 以上（MVP）→将来 99.9%／計画停止は夜間に実施' },
      { id: 'ts-4', majorItem: 'Performance/SLO', mediumItem: 'Response time', content: 'Dashboard initial load p95 < 2.0s / Major API p95 < 500ms (assuming caching)', majorItemJa: 'パフォーマンス／SLO', mediumItemJa: '応答時間', contentJa: 'ダッシュボード初回 p95 2.0 秒未満／主要 API p95 500ms 未満（キャッシュ前提）' },
      { id: 'ts-5', majorItem: 'Performance/SLO', mediumItem: 'Throughput', content: '100 concurrent users (MVP) → Scale out to +10x', majorItemJa: 'パフォーマンス／SLO', mediumItemJa: 'スループット', contentJa: '同時 100 ユーザー（MVP）→10 倍までスケールアウト' },
      { id: 'ts-6', majorItem: 'Security', mediumItem: 'Authentication/Authorization', content: 'Supabase Auth (Email/Password, Magic Link, OAuth setup) / App RBAC (admin/manager/operator/analyst); managed via user_metadata', majorItemJa: 'セキュリティ', mediumItemJa: '認証・認可', contentJa: 'Supabase Auth とアプリ RBAC（管理者／マネージャー等）、user_metadata で管理' },
      { id: 'ts-7', majorItem: 'Security', mediumItem: 'Data Protection', content: 'TLS required / Quiet data is cloud encrypted / Audit logs (who/when/what) / Passwords are delegated to Auth', majorItemJa: 'セキュリティ', mediumItemJa: 'データ保護', contentJa: 'TLS 必須／クラウド暗号化／監査ログ／パスワードは Auth に委譲' },
      { id: 'ts-8', majorItem: 'Security', mediumItem: 'Laws and regulations', content: 'Compliance with the Personal Information Protection Act / Terms of Use / Privacy Policy / Cookie Consent (to be implemented in the future)', majorItemJa: 'セキュリティ', mediumItemJa: '法令', contentJa: '個人情報保護法／利用規約／プライバシーポリシー／Cookie（将来対応）' },
      { id: 'ts-9', majorItem: 'Data', mediumItem: 'Model/Design', content: 'PostgreSQL (Supabase) / tenant_id, created_at, updated_at and soft_delete flags on all tables / Strict adherence to RLS policy', majorItemJa: 'データ', mediumItemJa: 'モデル／設計', contentJa: 'PostgreSQL（Supabase）／全テーブルに tenant_id・時刻・ソフト削除／RLS 厳守' },
      { id: 'ts-10', majorItem: 'Data', mediumItem: 'Keep/Delete', content: 'Logs = 180 days. Business data = Generally unlimited (can be exported and deleted upon withdrawal) / Deletion is irreversible', majorItemJa: 'データ', mediumItemJa: '保持／削除', contentJa: 'ログ 180 日。業務データは原則無期限（退会時にエクスポート・削除可）／削除は不可逆' },
      { id: 'ts-11', majorItem: 'Data', mediumItem: 'Backup/DR', content: 'Point in Time Recovery (PITR) enabled / RPO < 24h, RTO < 4h target / Recovery Runbook', majorItemJa: 'データ', mediumItemJa: 'バックアップ／DR', contentJa: 'PITR 有効／RPO 24h 未満、RTO 4h 目標／復旧手順書' },
      { id: 'ts-12', majorItem: 'Integration/API', mediumItem: 'Target malls', content: 'Amazon SP-API, Rakuten RMS, Yahoo! Shopping, Shopify Admin, TikTok Shop (phased implementation)', majorItemJa: '連携／API', mediumItemJa: '対象モール', contentJa: 'Amazon SP-API、楽天 RMS、Yahoo!ショッピング、Shopify、TikTok Shop（段階実装）' },
      { id: 'ts-13', majorItem: 'Integration/API', mediumItem: 'Method/Restrictions', content: 'Edge Functions for OAuth/secure token storage (Functions Secrets) / rate limiting (exponential backoff, idempotent key, re-execution)', majorItemJa: '連携／API', mediumItemJa: '方式／制約', contentJa: 'OAuth とトークン保管は Edge Functions／レート制限・冪等キー・再実行' },
      { id: 'ts-14', majorItem: 'Integration/API', mediumItem: 'Webhooks/Polling', content: 'Webhooks take priority (order/inventory changes) / For unsupported destinations, differential polling is used (safe interval set)', majorItemJa: '連携／API', mediumItemJa: 'Webhook／ポーリング', contentJa: 'Webhook 優先（受注・在庫）／未対応は差分ポーリング（安全な間隔）' },
      { id: 'ts-15', majorItem: 'Job', mediumItem: 'Async processing', content: 'Import, inventory synchronization, and report generation are queue-driven (jobs table + state transitions, up to 3 retries, backoff)', majorItemJa: 'ジョブ', mediumItemJa: '非同期処理', contentJa: '取込・在庫同期・レポートはキュー駆動（最大 3 回リトライ、バックオフ）' },
      { id: 'ts-16', majorItem: 'Job', mediumItem: 'Scheduler', content: 'Supabase Scheduled Jobs (cron): enables nightly batch processing, manual retry UI, and visualization of progress and failure status', majorItemJa: 'ジョブ', mediumItemJa: 'スケジューラ', contentJa: 'Supabase cron で夜間バッチ、手動リトライ UI、進捗と失敗の可視化' },
      { id: 'ts-17', majorItem: 'Monitoring/Operation', mediumItem: 'Logs/Metrics', content: 'Supabase Logs/Insights + Edge Functions Logs / External Sentry Integration (FE/BE) / Dashboarding of Key KPIs', majorItemJa: '監視／運用', mediumItemJa: 'ログ／指標', contentJa: 'Supabase／Edge ログ＋ Sentry／主要指標のダッシュボード' },
      { id: 'ts-18', majorItem: 'Monitoring/Operation', mediumItem: 'Alert', content: 'Three severity levels / Slack notifications / Monitor SLO violations, error rates, job backlogs, and external API failure rates', majorItemJa: '監視／運用', mediumItemJa: 'アラート', contentJa: '重大度 3 段階／Slack 通知／SLO 逸脱・エラー率・ジョブ滞留・外部 API 失敗を監視' },
    ],
    non_func: [
      { id: 'nf-1', majorItem: 'API Integration', mediumItem: 'Shopify Authentication', content: 'Implementing the Shopify OAuth authentication flow and managing access tokens', majorItemJa: 'API 連携', mediumItemJa: 'Shopify 認証', contentJa: 'Shopify OAuth とアクセストークン管理を実装' },
      { id: 'nf-2', majorItem: 'API Integration', mediumItem: 'Customer data integration', content: 'Implementing the process of retrieving and syncing customer data from Shopify', majorItemJa: 'API 連携', mediumItemJa: '顧客データ連携', contentJa: 'Shopify から顧客データを取得・同期する処理を実装' },
      { id: 'nf-3', majorItem: 'API Integration', mediumItem: 'Order data integration', content: 'Implementing Shopify order data retrieval, synchronization, and webhook processing', majorItemJa: 'API 連携', mediumItemJa: '注文データ連携', contentJa: '注文の取得・同期と Webhook 処理を実装' },
      { id: 'nf-4', majorItem: 'API Integration', mediumItem: 'Product data integration', content: 'Shopify product data retrieval, synchronization, and deletion support via Webhooks', majorItemJa: 'API 連携', mediumItemJa: '商品データ連携', contentJa: '商品の取得・同期と Webhook による削除対応' },
      { id: 'nf-5', majorItem: 'API Integration', mediumItem: 'Customer Webhook', content: 'Implementing a dedicated handler for customer creation and update webhooks', majorItemJa: 'API 連携', mediumItemJa: '顧客 Webhook', contentJa: '顧客作成・更新 Webhook 用ハンドラを実装' },
      { id: 'nf-6', majorItem: 'API Integration', mediumItem: 'LINE integration', content: 'Implementation of LINE channel authentication, message sending, and webhook receiving functions', majorItemJa: 'API 連携', mediumItemJa: 'LINE 連携', contentJa: 'LINE チャネル認証・送信・Webhook 受信を実装' },
      { id: 'nf-7', majorItem: 'API Integration', mediumItem: 'Send email', content: 'Implementation of an email sending API using SendGrid integration', majorItemJa: 'API 連携', mediumItemJa: 'メール送信', contentJa: 'SendGrid 連携のメール送信 API を実装' },
      { id: 'nf-8', majorItem: 'API Integration', mediumItem: 'DNS Authentication', content: 'Implementation of SPF, DKIM, and DMARC verification processes', majorItemJa: 'API 連携', mediumItemJa: 'DNS 認証', contentJa: 'SPF／DKIM／DMARC の検証プロセスを実装' },
      { id: 'nf-9', majorItem: 'API Integration', mediumItem: 'Delivery status', content: 'Webhook processing and log management of email delivery results', majorItemJa: 'API 連携', mediumItemJa: '配信状況', contentJa: '配信結果の Webhook 処理とログ管理' },
      { id: 'nf-10', majorItem: 'Management screen', mediumItem: 'Home', content: 'Administrator dashboard (to check overall status)', majorItemJa: '管理画面', mediumItemJa: 'ホーム', contentJa: '全体状況を確認する管理者ダッシュボード' },
      { id: 'nf-11', majorItem: 'Management screen', mediumItem: 'Corporate Collaboration', content: 'A function to manage the approval and rejection of API integration requests from companies', majorItemJa: '管理画面', mediumItemJa: '企業連携', contentJa: '企業からの API 連携申請の承認・却下を管理' },
      { id: 'nf-12', majorItem: 'Management screen', mediumItem: 'SoGrid settings', content: 'SendGrid API Key, Sending Domain, and Email Settings Management', majorItemJa: '管理画面', mediumItemJa: 'SendGrid 設定', contentJa: 'API キー・送信ドメイン・メール設定の管理' },
      { id: 'nf-13', majorItem: 'Management screen', mediumItem: 'Plan Management', content: 'Setting usage plans and restrictions for each company', majorItemJa: '管理画面', mediumItemJa: 'プラン管理', contentJa: '企業ごとの利用プランと制限を設定' },
      { id: 'nf-14', majorItem: 'Management screen', mediumItem: 'Billing management', content: 'Managing billing information and payment status', majorItemJa: '管理画面', mediumItemJa: '請求管理', contentJa: '請求情報と支払い状況の管理' },
      { id: 'nf-15', majorItem: 'Management screen', mediumItem: 'Setting', content: 'System wide configuration management (general settings, permissions, etc.)', majorItemJa: '管理画面', mediumItemJa: '設定', contentJa: 'システム全体の設定（一般・権限など）' },
      { id: 'nf-16', majorItem: 'Management screen', mediumItem: 'Log management', content: 'System log and operation history confirmation function', majorItemJa: '管理画面', mediumItemJa: 'ログ管理', contentJa: 'システムログと操作履歴の確認' },
      { id: 'nf-17', majorItem: 'Management screen', mediumItem: 'Support', content: 'Support response and inquiry management function', majorItemJa: '管理画面', mediumItemJa: 'サポート', contentJa: 'サポート対応と問い合わせ管理' },
    ],
    screen_list: [
      { id: 'sl-1', screenCode: 'SCR-001', userCategory: 'General users', majorItem: 'Certification', mediumItem: 'Log In', screenName: 'Log In', path: '/login', overview: '', status: 'Not started', completionDev: '', completionClient: '', remarks: '', userCategoryJa: '一般ユーザー', majorItemJa: '認証', mediumItemJa: 'ログイン', screenNameJa: 'ログイン', pathJa: '/login' },
      { id: 'sl-2', screenCode: 'SCR-002', userCategory: 'General users', majorItem: 'Certification', mediumItem: 'Log In', screenName: 'Password Reset', path: '/forgot-password', overview: '', status: 'Not started', completionDev: '', completionClient: '', remarks: '', userCategoryJa: '一般ユーザー', majorItemJa: '認証', mediumItemJa: 'ログイン', screenNameJa: 'パスワード再設定', pathJa: '/forgot-password' },
      { id: 'sl-3', screenCode: 'SCR-003', userCategory: 'General users', majorItem: 'Dashboard', mediumItem: 'My Dashboard', screenName: 'My Dashboard', path: '/dashboard', overview: '', status: 'Not started', completionDev: '', completionClient: '', remarks: '', userCategoryJa: '一般ユーザー', majorItemJa: 'ダッシュボード', mediumItemJa: 'マイダッシュボード', screenNameJa: 'マイダッシュボード', pathJa: '/dashboard' },
      { id: 'sl-4', screenCode: 'SCR-004', userCategory: 'General users', majorItem: 'Dashboard', mediumItem: 'Management Dashboard', screenName: 'Management Dashboard', path: '/dashboard/management', overview: '', status: 'Not started', completionDev: '', completionClient: '', remarks: '', userCategoryJa: '一般ユーザー', majorItemJa: 'ダッシュボード', mediumItemJa: '管理ダッシュボード', screenNameJa: '管理ダッシュボード', pathJa: '/dashboard/management' },
      { id: 'sl-5', screenCode: 'SCR-005', userCategory: 'General users', majorItem: 'Dashboard', mediumItem: 'Ad Dashboard', screenName: 'Ad Dashboard', path: '/dashboard/ads', overview: '', status: 'Not started', completionDev: '', completionClient: '', remarks: '', userCategoryJa: '一般ユーザー', majorItemJa: 'ダッシュボード', mediumItemJa: '広告ダッシュボード', screenNameJa: '広告ダッシュボード', pathJa: '/dashboard/ads' },
      { id: 'sl-6', screenCode: 'SCR-006', userCategory: 'General users', majorItem: 'Dashboard', mediumItem: 'CRM Dashboard', screenName: 'CRM Dashboard', path: '/dashboard/crm', overview: '', status: 'Not started', completionDev: '', completionClient: '', remarks: '', userCategoryJa: '一般ユーザー', majorItemJa: 'ダッシュボード', mediumItemJa: 'CRM ダッシュボード', screenNameJa: 'CRM ダッシュボード', pathJa: '/dashboard/crm' },
      { id: 'sl-7', screenCode: 'SCR-007', userCategory: 'General users', majorItem: 'CRM', mediumItem: 'Analysis', screenName: 'Analysis', path: '/crm/analysis', overview: '', status: 'Not started', completionDev: '', completionClient: '', remarks: '', userCategoryJa: '一般ユーザー', majorItemJa: 'CRM', mediumItemJa: '分析', screenNameJa: '分析', pathJa: '/crm/analysis' },
      { id: 'sl-8', screenCode: 'SCR-008', userCategory: 'General users', majorItem: 'CRM', mediumItem: 'Behavior analysis', screenName: 'Behavior Analysis', path: '/crm/behavior', overview: '', status: 'Not started', completionDev: '', completionClient: '', remarks: '', userCategoryJa: '一般ユーザー', majorItemJa: 'CRM', mediumItemJa: '行動分析', screenNameJa: '行動分析', pathJa: '/crm/behavior' },
      { id: 'sl-9', screenCode: 'SCR-009', userCategory: 'General users', majorItem: 'CRM', mediumItem: 'Customer', screenName: 'Customer', path: '/crm/customers', overview: '', status: 'Not started', completionDev: '', completionClient: '', remarks: '', userCategoryJa: '一般ユーザー', majorItemJa: 'CRM', mediumItemJa: '顧客', screenNameJa: '顧客', pathJa: '/crm/customers' },
      { id: 'sl-10', screenCode: 'SCR-010', userCategory: 'General users', majorItem: 'CRM', mediumItem: 'Email', screenName: 'Segment Management', path: '/crm/email/segment', overview: '', status: 'Not started', completionDev: '', completionClient: '', remarks: '', userCategoryJa: '一般ユーザー', majorItemJa: 'CRM', mediumItemJa: 'メール', screenNameJa: 'セグメント管理', pathJa: '/crm/email/segment' },
      { id: 'sl-11', screenCode: 'SCR-011', userCategory: 'General users', majorItem: 'CRM', mediumItem: 'Email', screenName: 'Distribution Management', path: '/crm/deliveries', overview: '', status: 'Not started', completionDev: '', completionClient: '', remarks: '', userCategoryJa: '一般ユーザー', majorItemJa: 'CRM', mediumItemJa: 'メール', screenNameJa: '配信管理', pathJa: '/crm/deliveries' },
      { id: 'sl-12', screenCode: 'SCR-012', userCategory: 'General users', majorItem: 'CRM', mediumItem: 'Email', screenName: 'Template Management', path: '/crm/email/templates', overview: '', status: 'Not started', completionDev: '', completionClient: '', remarks: '', userCategoryJa: '一般ユーザー', majorItemJa: 'CRM', mediumItemJa: 'メール', screenNameJa: 'テンプレート管理', pathJa: '/crm/email/templates' },
    ],
    function_list: [
      { id: 'fl-1', functionCode: 'FNC-001', phase: 'MVP', userCategory: 'General users', mainCategory: 'Authentication/User', subcategory: 'Certification', screenCode: 'SCR-001', screenName: 'Log In', functionName: 'Log In', functionDetails: 'Users can log in using their email address and password.', effort: '', status: 'Need to be checked', completionDev: '', completionClient: '', remarks: '', userCategoryJa: '一般ユーザー', mainCategoryJa: '認証／ユーザー', subcategoryJa: '認証', screenNameJa: 'ログイン', functionNameJa: 'ログイン', functionDetailsJa: 'メールアドレスとパスワードでログインできる' },
      { id: 'fl-2', functionCode: 'FNC-002', phase: 'MVP', userCategory: 'General users', mainCategory: 'Authentication/User', subcategory: 'Certification', screenCode: 'SCR-002', screenName: 'Password Reset', functionName: 'Password Reset', functionDetails: 'A user who forgot their password sends a password reset email.', effort: '', status: 'Need to be checked', completionDev: '', completionClient: '', remarks: 'Is the email regarding the reset in Japanese?', userCategoryJa: '一般ユーザー', mainCategoryJa: '認証／ユーザー', subcategoryJa: '認証', screenNameJa: 'パスワード再設定', functionNameJa: 'パスワード再設定', functionDetailsJa: 'パスワード忘れのユーザーが再設定メールを送信', remarksJa: '再設定メールは日本語か？' },
      { id: 'fl-3', functionCode: 'FNC-004', phase: 'MVP', userCategory: 'General users', mainCategory: 'Dashboard', subcategory: 'My Dashboard', screenCode: 'SCR-003', screenName: 'My Dashboard', functionName: 'Setting', functionDetails: 'There are three tabs: Data, Graphs, and Design, which can be switched between.', effort: '', status: 'Need to be checked', completionDev: '', completionClient: '', remarks: 'The error does not occur even if the time period is set from the future to the past', userCategoryJa: '一般ユーザー', mainCategoryJa: 'ダッシュボード', subcategoryJa: 'マイダッシュボード', screenNameJa: 'マイダッシュボード', functionNameJa: '設定', functionDetailsJa: 'データ・グラフ・デザインの 3 タブを切り替え可能', remarksJa: '期間を未来から過去にしてもエラーにならない' },
      { id: 'fl-4', functionCode: 'FNC-005', phase: 'MVP', userCategory: 'General users', mainCategory: 'Dashboard', subcategory: 'My Dashboard', screenCode: 'SCR-003', screenName: 'My Dashboard', functionName: 'Setting', functionDetails: 'You can create dashboards for each user. Data and graphs can be moved in the workspace by dragging and dropping, and their placement can be changed.', effort: '', status: 'Need to be checked', completionDev: '', completionClient: '', remarks: 'It can only be placed vertically; it cannot be moved horizontally.', userCategoryJa: '一般ユーザー', mainCategoryJa: 'ダッシュボード', subcategoryJa: 'マイダッシュボード', screenNameJa: 'マイダッシュボード', functionNameJa: '設定', functionDetailsJa: 'ユーザーごとにダッシュボードを作成。D&D で配置変更', remarksJa: '縦方向のみ。横移動は不可' },
      { id: 'fl-5', functionCode: 'FNC-006', phase: 'MVP', userCategory: 'General users', mainCategory: 'Dashboard', subcategory: 'My Dashboard', screenCode: 'SCR-003', screenName: 'My Dashboard', functionName: 'Setting', functionDetails: 'Multiple dashboard patterns can be created, and the one designated as the home dashboard will be displayed in the view.', effort: '', status: 'Need to be checked', completionDev: '', completionClient: '', remarks: 'Does the display change significantly for each linked channel?', userCategoryJa: '一般ユーザー', mainCategoryJa: 'ダッシュボード', subcategoryJa: 'マイダッシュボード', screenNameJa: 'マイダッシュボード', functionNameJa: '設定', functionDetailsJa: '複数パターンを作成し、ホームに指定したものを表示', remarksJa: '連携チャネルごとに表示は大きく変わるか？' },
      { id: 'fl-6', functionCode: 'FNC-007', phase: 'MVP', userCategory: 'General users', mainCategory: 'Dashboard', subcategory: 'My Dashboard', screenCode: 'SCR-003', screenName: 'My Dashboard', functionName: 'View', functionDetails: 'The dashboard configured in the settings will be displayed. The displayed content will vary for each user.', effort: '', status: 'Need to be checked', completionDev: '', completionClient: '', remarks: "I don't need the sharing function.", userCategoryJa: '一般ユーザー', mainCategoryJa: 'ダッシュボード', subcategoryJa: 'マイダッシュボード', screenNameJa: 'マイダッシュボード', functionNameJa: '表示', functionDetailsJa: '設定したダッシュボードを表示。ユーザーごとに内容が異なる', remarksJa: '共有機能は不要' },
      { id: 'fl-7', functionCode: 'FNC-008', phase: 'MVP', userCategory: 'General users', mainCategory: 'Dashboard', subcategory: 'Management Dashboard', screenCode: 'SCR-004', screenName: 'Management Dashboard', functionName: 'Dashboard display', functionDetails: 'Receives metrics linked via APIs from each channel. It also performs calculations in the background and displays the results.', effort: '', status: 'Need to be checked', completionDev: '', completionClient: '', remarks: "I'll do the copying in the settings.", userCategoryJa: '一般ユーザー', mainCategoryJa: 'ダッシュボード', subcategoryJa: '管理ダッシュボード', screenNameJa: '管理ダッシュボード', functionNameJa: 'ダッシュボード表示', functionDetailsJa: '各チャネル API の指標を取得しバックグラウンド計算して表示', remarksJa: 'コピーは設定側で行う' },
      { id: 'fl-8', functionCode: 'FNC-009', phase: 'MVP', userCategory: 'General users', mainCategory: 'Dashboard', subcategory: 'Management Dashboard', screenCode: 'SCR-004', screenName: 'Management Dashboard', functionName: 'Alert', functionDetails: 'The alert function in the upper right corner allows you to turn alerts ON/OFF. If there are abnormal values, the item will turn red. You can check ad performance for each linked channel.', effort: '', status: 'Need to be checked', completionDev: '', completionClient: '', remarks: '', userCategoryJa: '一般ユーザー', mainCategoryJa: 'ダッシュボード', subcategoryJa: '管理ダッシュボード', screenNameJa: '管理ダッシュボード', functionNameJa: 'アラート', functionDetailsJa: '右上で ON/OFF。異常値で赤表示。チャネル別広告成果を確認' },
      { id: 'fl-9', functionCode: 'FNC-011', phase: 'MVP', userCategory: 'General users', mainCategory: 'Dashboard', subcategory: 'CRM Dashboard', screenCode: 'SCR-006', screenName: 'CRM Dashboard', functionName: 'Dashboard display', functionDetails: 'This displays the dashboard created under CRM > Analytics. Only administrators can edit the home dashboard.', effort: '', status: 'Need to be checked', completionDev: '', completionClient: '', remarks: '', userCategoryJa: '一般ユーザー', mainCategoryJa: 'ダッシュボード', subcategoryJa: 'CRM ダッシュボード', screenNameJa: 'CRM ダッシュボード', functionNameJa: 'ダッシュボード表示', functionDetailsJa: 'CRM＞分析で作ったダッシュボードを表示。ホーム編集は管理者のみ' },
      { id: 'fl-10', functionCode: 'FNC-012', phase: 'MVP', userCategory: 'General users', mainCategory: 'CRM', subcategory: 'Analysis', screenCode: 'SCR-007', screenName: 'Analysis', functionName: 'Graph List', functionDetails: 'You can view a list of created graphs. A text list is displayed on the left, and a preview of the selected graph is displayed on the right.', effort: '', status: 'Need to be checked', completionDev: '', completionClient: '', remarks: 'Currently, deletion is not possible.', userCategoryJa: '一般ユーザー', mainCategoryJa: 'CRM', subcategoryJa: '分析', screenNameJa: '分析', functionNameJa: 'グラフ一覧', functionDetailsJa: '左に一覧、右に選択グラフのプレビュー', remarksJa: '現状削除不可' },
    ],
    tasks: [
      { id: 'tk-1', taskCode: 'TSK-032', phase: 'MVP', sprint: 'Sprint 15', epic: 'UI / UX Improvement', screenCode: 'SCR-037', functionCode: '', task: 'Update permissions to disable access to removed Operations pages', personDay: '', assignee: 'Andrea', status: 'Done', deadline: 'March 31, 2026', completedDate: 'April 7, 2025', completionPM: 'Done', remark: '', sprintJa: 'スプリント15', epicJa: 'UI／UX 改善', taskJa: '削除済みオペレーション画面へのアクセスを権限で無効化', deadlineJa: '2026年3月31日', completedDateJa: '2025年4月7日' },
      { id: 'tk-2', taskCode: 'TSK-100', phase: 'MVP', sprint: 'Sprint 15', epic: 'CRM Analytics', screenCode: 'SCR-007', functionCode: '', task: 'Support multi-source data (ads, API integrations)', personDay: '', assignee: 'Andrea', status: 'Done', deadline: 'April 10, 2026', completedDate: 'April 10, 2026', completionPM: 'Done', remark: '', sprintJa: 'スプリント15', epicJa: 'CRM 分析', taskJa: '広告・API 連携など複数ソースのデータに対応', deadlineJa: '2026年4月10日', completedDateJa: '2026年4月10日' },
      { id: 'tk-3', taskCode: 'TSK-101', phase: 'MVP', sprint: 'Sprint 15', epic: 'CRM Analytics', screenCode: 'SCR-007', functionCode: '', task: 'Simplify graph creation process', personDay: '', assignee: 'Andrea', status: 'Done', deadline: 'April 10, 2026', completedDate: 'April 10, 2026', completionPM: 'Done', remark: '', sprintJa: 'スプリント15', epicJa: 'CRM 分析', taskJa: 'グラフ作成フローを簡素化', deadlineJa: '2026年4月10日', completedDateJa: '2026年4月10日' },
      { id: 'tk-4', taskCode: 'TSK-102', phase: 'MVP', sprint: 'Sprint 15', epic: 'UI / UX Improvement', screenCode: 'SCR-007', functionCode: '', task: 'Enable elements movement (drag & drop support)', personDay: '', assignee: 'Andrea', status: 'Done', deadline: 'April 10, 2026', completedDate: 'April 10, 2026', completionPM: 'Done', remark: '', sprintJa: 'スプリント15', epicJa: 'UI／UX 改善', taskJa: '要素の移動（ドラッグ＆ドロップ）を有効化', deadlineJa: '2026年4月10日', completedDateJa: '2026年4月10日' },
      { id: 'tk-5', taskCode: 'TSK-103', phase: 'MVP', sprint: 'Sprint 15', epic: 'UI / UX Improvement', screenCode: 'SCR-007', functionCode: '', task: 'Move dataset panel to left side', personDay: '', assignee: 'Andrea', status: 'Done', deadline: 'April 10, 2026', completedDate: 'April 10, 2026', completionPM: 'Done', remark: '', sprintJa: 'スプリント15', epicJa: 'UI／UX 改善', taskJa: 'データセットパネルを左側へ移動', deadlineJa: '2026年4月10日', completedDateJa: '2026年4月10日' },
      { id: 'tk-6', taskCode: 'TSK-104', phase: 'MVP', sprint: 'Sprint 15', epic: 'UI / UX Improvement', screenCode: '', functionCode: '', task: 'Replace unclear terms with user-friendly labels', personDay: '', assignee: 'Andrea', status: 'Done', deadline: 'April 10, 2026', completedDate: 'April 10, 2026', completionPM: 'Done', remark: '', sprintJa: 'スプリント15', epicJa: 'UI／UX 改善', taskJa: '分かりにくい用語をユーザー向けラベルに置換', deadlineJa: '2026年4月10日', completedDateJa: '2026年4月10日' },
      { id: 'tk-7', taskCode: 'TSK-105', phase: 'MVP', sprint: 'Sprint 15', epic: 'CRM Email Template', screenCode: 'SCR-012', functionCode: 'FNC-032', task: 'Enable draft saving', personDay: '', assignee: 'Aj', status: 'Done', deadline: 'April 10, 2026', completedDate: '', completionPM: '', remark: '', sprintJa: 'スプリント15', epicJa: 'CRM メールテンプレート', taskJa: '下書き保存を有効化', deadlineJa: '2026年4月10日' },
      { id: 'tk-8', taskCode: 'TSK-106', phase: 'MVP', sprint: 'Sprint 15', epic: 'CRM Email Template', screenCode: 'SCR-012', functionCode: '', task: 'Enable variable usage (e.g. {{last_name}})', personDay: '', assignee: 'Aj', status: 'Done', deadline: 'April 10, 2026', completedDate: '', completionPM: '', remark: '', sprintJa: 'スプリント15', epicJa: 'CRM メールテンプレート', taskJa: '変数（例: {{last_name}}）の利用を有効化', deadlineJa: '2026年4月10日' },
      { id: 'tk-9', taskCode: 'TSK-107', phase: 'MVP', sprint: 'Sprint 15', epic: 'CRM Email Delivery', screenCode: 'SCR-011', functionCode: '', task: 'Fix redirect issue when selecting template', personDay: '', assignee: 'Aj', status: 'In progress', deadline: '', completedDate: '', completionPM: '', remark: '', sprintJa: 'スプリント15', epicJa: 'CRM メール配信', taskJa: 'テンプレート選択時のリダイレクト不具合を修正' },
      { id: 'tk-10', taskCode: 'TSK-108', phase: 'MVP', sprint: 'Sprint 16', epic: 'Payment Integration', screenCode: '', functionCode: '', task: 'Implement Stripe checkout flow for subscription plans', personDay: '3', assignee: '', status: 'Not started', deadline: 'April 24, 2026', completedDate: '', completionPM: '', remark: '', sprintJa: 'スプリント16', epicJa: '決済連携', taskJa: 'サブスクリプション向け Stripe チェックアウトを実装', deadlineJa: '2026年4月24日' },
    ],
    test_case: [
      { id: 'tc-1', category: 'User authentication', scenarioName: 'Log in', testType: 'Normal', summary: 'Log in with an email address that is already registered', testSteps: '1. Access the login screen\n2. Enter credentials', expectedResults: 'Once you have successfully logged in, you will be redirected to the home page.', status: 'Pass', tester: 'Masayuki Kimura', remarks: '', categoryJa: 'ユーザー認証', scenarioNameJa: 'ログイン', summaryJa: '登録済みメールでログイン', testStepsJa: '1. ログイン画面へ\n2. 認証情報を入力', expectedResultsJa: 'ログイン成功後、ホームへ遷移する' },
      { id: 'tc-2', category: 'User authentication', scenarioName: 'Log in', testType: 'Abnormal', summary: 'Log in with an unregistered email address', testSteps: '1. Access the login screen\n2. Enter invalid credentials', expectedResults: 'Login fails and an alert appears', status: '', tester: '', remarks: '', categoryJa: 'ユーザー認証', scenarioNameJa: 'ログイン', summaryJa: '未登録メールでログイン', testStepsJa: '1. ログイン画面へ\n2. 不正な認証情報を入力', expectedResultsJa: 'ログイン失敗しアラートが表示される' },
    ],
    api_list: [
      { id: 'api-1', category: 'Advertising', serviceName: 'Google Ads', apiName: 'Google Ads API', authMethod: 'OAuth2', dataHandling: 'Ad performance/budget/campaigns/auto ON/OFF', realtime: 'No', mvpRequired: 'MVP', status: 'Completed', remarks: '', categoryJa: '広告', serviceNameJa: 'Google 広告', apiNameJa: 'Google Ads API', authMethodJa: 'OAuth2', dataHandlingJa: '広告成果／予算／キャンペーン／自動 ON/OFF' },
      { id: 'api-2', category: 'Advertising', serviceName: 'Meta Ads (Facebook)', apiName: 'Marketing API', authMethod: 'OAuth2', dataHandling: 'Ad performance/targeting data', realtime: 'No', mvpRequired: 'MVP', status: 'Completed', remarks: '', categoryJa: '広告', serviceNameJa: 'Meta 広告', apiNameJa: 'Marketing API', authMethodJa: 'OAuth2', dataHandlingJa: '広告成果／ターゲティングデータ' },
      { id: 'api-3', category: 'Advertising', serviceName: 'Yahoo! Ads', apiName: 'Yahoo Ads API', authMethod: 'OAuth2', dataHandling: 'Ad performance/budget management', realtime: 'No', mvpRequired: 'MVP', status: 'In progress', remarks: '', categoryJa: '広告', serviceNameJa: 'Yahoo! 広告', apiNameJa: 'Yahoo Ads API', authMethodJa: 'OAuth2', dataHandlingJa: '広告成果／予算管理' },
      { id: 'api-4', category: 'Advertising', serviceName: 'LINE Ads', apiName: 'LINE Ads API', authMethod: 'OAuth2', dataHandling: 'Ad performance/segment delivery', realtime: 'Yes', mvpRequired: 'MVP', status: 'In progress', remarks: 'LINE Business account required', categoryJa: '広告', serviceNameJa: 'LINE 広告', apiNameJa: 'LINE Ads API', authMethodJa: 'OAuth2', dataHandlingJa: '広告成果／セグメント配信', remarksJa: 'LINE ビジネスアカウント必須' },
      { id: 'api-5', category: 'EC', serviceName: 'Shopify', apiName: 'Shopify Admin API', authMethod: 'OAuth2', dataHandling: 'Product/Order/Inventory/Customer management', realtime: 'Yes', mvpRequired: 'MVP', status: 'Completed', remarks: 'Webhook integration complete', categoryJa: 'EC', serviceNameJa: 'Shopify', apiNameJa: 'Shopify Admin API', authMethodJa: 'OAuth2', dataHandlingJa: '商品／注文／在庫／顧客管理', remarksJa: 'Webhook 連携済み' },
      { id: 'api-6', category: 'EC', serviceName: 'Amazon', apiName: 'Amazon SP-API', authMethod: 'OAuth2 + AWS IAM', dataHandling: 'Product listing/order fulfillment', realtime: 'Partial', mvpRequired: 'MVP', status: 'In progress', remarks: '', categoryJa: 'EC', serviceNameJa: 'Amazon', apiNameJa: 'Amazon SP-API', authMethodJa: 'OAuth2 + AWS IAM', dataHandlingJa: '出品／注文フルフィル' },
      { id: 'api-7', category: 'CRM', serviceName: 'Chatwork', apiName: 'Chatwork API', authMethod: 'API Key', dataHandling: 'Message notification', realtime: 'Yes', mvpRequired: 'v2', status: 'Not started', remarks: '', categoryJa: 'CRM', serviceNameJa: 'Chatwork', apiNameJa: 'Chatwork API', authMethodJa: 'API キー', dataHandlingJa: 'メッセージ通知' },
      { id: 'api-8', category: 'CRM', serviceName: 'Slack', apiName: 'Slack API', authMethod: 'OAuth2/Webhook', dataHandling: 'Message notification/Webhook management', realtime: 'Yes', mvpRequired: 'v2', status: 'Not started', remarks: '', categoryJa: 'CRM', serviceNameJa: 'Slack', apiNameJa: 'Slack API', authMethodJa: 'OAuth2／Webhook', dataHandlingJa: 'メッセージ通知／Webhook 管理' },
      { id: 'api-9', category: 'CRM', serviceName: 'LINE', apiName: 'LINE Messaging API', authMethod: 'Channel access token', dataHandling: 'Message sending/receiving', realtime: 'Yes', mvpRequired: 'MVP', status: 'In progress', remarks: '', categoryJa: 'CRM', serviceNameJa: 'LINE', apiNameJa: 'LINE Messaging API', authMethodJa: 'チャネルアクセストークン', dataHandlingJa: 'メッセージ送受信' },
    ],
    backlog: [
      { id: 'bl-1', epic: 'Project Setup', story: 'Repository/Branch', task: 'Org/Repo/branch, main/dev/staging rule setting', owner: 'Masayuki', sprint: 'S1', epicJa: 'プロジェクトセットアップ', storyJa: 'リポジトリ／ブランチ', taskJa: '組織・リポジトリ・ブランチ規則（main/dev/staging）' },
      { id: 'bl-2', epic: 'Project Setup', story: 'Repository/Branch', task: 'Branch protection + CODEOWNERS', owner: 'Angel', sprint: 'S1', epicJa: 'プロジェクトセットアップ', storyJa: 'リポジトリ／ブランチ', taskJa: 'ブランチ保護と CODEOWNERS' },
      { id: 'bl-3', epic: 'Project Setup', story: 'CI/CD', task: 'Vercel integration (dev/staging/prod) + env.example setup', owner: 'Masayuki', sprint: 'S1', epicJa: 'プロジェクトセットアップ', storyJa: 'CI/CD', taskJa: 'Vercel 連携（dev/staging/prod）と env.example' },
      { id: 'bl-4', epic: 'Project Setup', story: 'CI/CD', task: 'Husky + lint-staged / ESLint/Prettier install', owner: 'Angel', sprint: 'S1', epicJa: 'プロジェクトセットアップ', storyJa: 'CI/CD', taskJa: 'Husky・lint-staged・ESLint／Prettier' },
      { id: 'bl-5', epic: 'Project Setup', story: 'CI/CD', task: 'PR check (lint/build) + Required checks setup', owner: 'Angel', sprint: 'S1', epicJa: 'プロジェクトセットアップ', storyJa: 'CI/CD', taskJa: 'PR で lint／ビルド＋必須チェック' },
      { id: 'bl-6', epic: 'Project Setup', story: 'Setup', task: 'Sentry setup (FE/Functions) + Slack integration', owner: 'Angel', sprint: 'S1', epicJa: 'プロジェクトセットアップ', storyJa: 'セットアップ', taskJa: 'Sentry（FE／Functions）と Slack 連携' },
      { id: 'bl-7', epic: 'Data Model', story: 'Model design', task: 'Products/Orders/Integrations/Settings ER + migration', owner: 'Angel', sprint: 'S1', epicJa: 'データモデル', storyJa: 'モデル設計', taskJa: '商品／注文／連携／設定の ER とマイグレーション' },
      { id: 'bl-8', epic: 'Data Model', story: 'Security', task: 'Tenant isolation RLS + test data seeding', owner: 'Angel', sprint: 'S1', epicJa: 'データモデル', storyJa: 'セキュリティ', taskJa: 'テナント分離 RLS とテストデータ投入' },
      { id: 'bl-9', epic: 'Data Model', story: 'Security', task: 'Role/permission structure implementation (admin/manager/operator)', owner: 'Angel', sprint: 'S1', epicJa: 'データモデル', storyJa: 'セキュリティ', taskJa: 'ロール／権限（管理者／マネージャー／オペレーター）' },
      { id: 'bl-10', epic: 'Data Model', story: 'Functions', task: 'Functions infrastructure + logging/error/rate limiting', owner: 'Angel', sprint: 'S1', epicJa: 'データモデル', storyJa: 'Functions', taskJa: 'Functions 基盤とログ／エラー／レート制限' },
      { id: 'bl-11', epic: 'UI Framework', story: 'Layout/Theme', task: 'AppShell header/sidebar/navigation/spacing', owner: 'Angel', sprint: 'S1', epicJa: 'UI フレームワーク', storyJa: 'レイアウト／テーマ', taskJa: 'AppShell のヘッダー・サイドバー・ナビ・余白' },
      { id: 'bl-12', epic: 'Auth', story: 'Auth flow', task: 'Inline API validation + auth check', owner: 'Angel', sprint: 'S1', epicJa: '認証', storyJa: '認証フロー', taskJa: 'インライン API 検証と認可チェック' },
      { id: 'bl-13', epic: 'Auth', story: 'Auth flow', task: 'Guard routing with middleware implementation', owner: 'Angel', sprint: 'S1', epicJa: '認証', storyJa: '認証フロー', taskJa: 'ミドルウェアによるガードルーティング' },
      { id: 'bl-14', epic: 'Dashboard', story: 'Dashboard FYI', task: 'KPI display + configuration management (demo/RPC call)', owner: 'Angel', sprint: 'S2', epicJa: 'ダッシュボード', storyJa: 'ダッシュボード FYI', taskJa: 'KPI 表示と設定管理（デモ／RPC）' },
      { id: 'bl-15', epic: 'Dashboard', story: 'Dashboard FYI', task: 'Widget component + chart integration', owner: 'Masayuki', sprint: 'S2', epicJa: 'ダッシュボード', storyJa: 'ダッシュボード FYI', taskJa: 'ウィジェットとチャート連携' },
    ],
    process_chart: [
      { id: 'pc-1', code: 'BIZ-001', category: 'Business', task: 'Requirements definition - Kick-off / MVP + Post-Scope Agreement', sprint: 'Sprint 1', personDays: '', status: 'Completed', categoryJa: 'ビジネス', taskJa: '要件定義キックオフ／MVP とスコープ後合意', sprintJa: 'スプリント1' },
      { id: 'pc-2', code: 'BIZ-002', category: 'Business', task: 'Final confirmation of client requirements', sprint: 'Sprint 2', personDays: '', status: 'Completed', categoryJa: 'ビジネス', taskJa: '顧客要件の最終確認', sprintJa: 'スプリント2' },
      { id: 'pc-3', code: 'BIZ-003', category: 'Business', task: 'Design mockup sharing and approval workflow', sprint: 'Sprint 2-3', personDays: '', status: 'In progress', categoryJa: 'ビジネス', taskJa: 'デザインモックの共有と承認フロー', sprintJa: 'スプリント2-3' },
      { id: 'pc-4', code: 'BIZ-004', category: 'Business', task: 'Terms of service creation', sprint: 'Sprint 3-4', personDays: '', status: 'Planned', categoryJa: 'ビジネス', taskJa: '利用規約の作成', sprintJa: 'スプリント3-4' },
      { id: 'pc-5', code: 'BIZ-005', category: 'Business', task: 'Adjusting data integration requirements (advertising and CRM APIs)', sprint: 'Sprint 3-4', personDays: '', status: 'Planned', categoryJa: 'ビジネス', taskJa: 'データ連携要件の調整（広告・CRM API）', sprintJa: 'スプリント3-4' },
      { id: 'pc-6', code: 'DEV-001', category: 'Development', task: 'Environment construction', sprint: 'Sprint 1', personDays: '2', status: 'Completed', categoryJa: '開発', taskJa: '環境構築', sprintJa: 'スプリント1' },
      { id: 'pc-7', code: 'DEV-002', category: 'Development', task: 'Basic design + coding', sprint: 'Sprint 2-6', personDays: '15', status: 'In progress', categoryJa: '開発', taskJa: '基本設計と実装', sprintJa: 'スプリント2-6' },
      { id: 'pc-8', code: 'TST-001', category: 'Test', task: 'MVP version acceptance testing', sprint: 'Sprint 7-8', personDays: '5', status: 'Planned', categoryJa: 'テスト', taskJa: 'MVP 版受入テスト', sprintJa: 'スプリント7-8' },
      { id: 'pc-9', code: 'TST-002', category: 'Test', task: 'Extended version acceptance testing', sprint: 'Sprint 9', personDays: '3', status: 'Planned', categoryJa: 'テスト', taskJa: '拡張版受入テスト', sprintJa: 'スプリント9' },
    ],
  },

  'proj-1': {
    tech_stack: [
      { id: 'p1-ts-1', majorItem: 'Architecture', mediumItem: 'Frontend', content: 'React + TypeScript + Vite, Tailwind CSS, Zustand for state management', majorItemJa: 'アーキテクチャ', mediumItemJa: 'フロントエンド', contentJa: 'React + TypeScript + Vite、Tailwind CSS、状態管理に Zustand' },
      { id: 'p1-ts-2', majorItem: 'Architecture', mediumItem: 'Backend', content: 'Supabase (PostgreSQL, Auth, Edge Functions, Realtime), RLS for multi-tenant isolation', majorItemJa: 'アーキテクチャ', mediumItemJa: 'バックエンド', contentJa: 'Supabase（PostgreSQL、Auth、Edge Functions、Realtime）、マルチテナント分離の RLS' },
      { id: 'p1-ts-3', majorItem: 'Performance', mediumItem: 'Targets', content: 'Initial load < 2s, API response p95 < 300ms, support 50 concurrent users at MVP', majorItemJa: 'パフォーマンス', mediumItemJa: '目標', contentJa: '初回読み込み 2 秒未満、API p95 300ms 未満、MVP で同時 50 ユーザー' },
      { id: 'p1-ts-4', majorItem: 'Security', mediumItem: 'Auth', content: 'Supabase Auth (email/password, magic link), RBAC (admin/developer/guest), tenant_id isolation', majorItemJa: 'セキュリティ', mediumItemJa: '認証', contentJa: 'Supabase Auth（メール／パスワード、マジックリンク）、RBAC（管理者／開発／ゲスト）、tenant_id 分離' },
      { id: 'p1-ts-5', majorItem: 'Integration', mediumItem: 'Translation', content: 'DeepL API for phase 1, custom LLM integration for context-aware translation in phase 2', majorItemJa: '連携', mediumItemJa: '翻訳', contentJa: 'フェーズ1は DeepL API、フェーズ2 は文脈対応のカスタム LLM 連携' },
    ],
    screen_list: [
      { id: 'p1-sl-1', screenCode: 'SCR-001', userCategory: 'All', majorItem: 'Auth', mediumItem: 'Login', screenName: 'Login / Role Selection', path: '/login', overview: 'Role selection screen for demo, full auth in production', status: 'Completed', completionDev: 'Done', completionClient: '', remarks: '', userCategoryJa: '全員', majorItemJa: '認証', mediumItemJa: 'ログイン', screenNameJa: 'ログイン／ロール選択', pathJa: '/login', overviewJa: 'デモ用のロール選択画面（本番はフル認証）' },
      { id: 'p1-sl-2', screenCode: 'SCR-002', userCategory: 'All', majorItem: 'Projects', mediumItem: 'Dashboard', screenName: 'Project Dashboard', path: '/projects', overview: 'Grid view of all projects with status indicators', status: 'Completed', completionDev: 'Done', completionClient: '', remarks: '', userCategoryJa: '全員', majorItemJa: 'プロジェクト', mediumItemJa: 'ダッシュボード', screenNameJa: 'プロジェクトダッシュボード', pathJa: '/projects', overviewJa: 'ステータス表示付きのプロジェクト一覧グリッド' },
      { id: 'p1-sl-3', screenCode: 'SCR-003', userCategory: 'All', majorItem: 'Sheets', mediumItem: 'Spreadsheet', screenName: 'Sheet View', path: '/project/:id/:sheet', overview: 'Generic spreadsheet view for any sheet tab', status: 'In progress', completionDev: '', completionClient: '', remarks: '', userCategoryJa: '全員', majorItemJa: 'シート', mediumItemJa: 'スプレッドシート', screenNameJa: 'シートビュー', pathJa: '/project/:id/:sheet', overviewJa: '任意のシートタブ向け汎用スプレッドシート表示' },
      { id: 'p1-sl-4', screenCode: 'SCR-004', userCategory: 'Admin', majorItem: 'Admin', mediumItem: 'Settings', screenName: 'Project Settings', path: '/project/:id/settings', overview: 'Project-level settings: team, permissions, integrations', status: 'Not started', completionDev: '', completionClient: '', remarks: '', userCategoryJa: '管理者', majorItemJa: '管理', mediumItemJa: '設定', screenNameJa: 'プロジェクト設定', pathJa: '/project/:id/settings', overviewJa: 'チーム・権限・連携などプロジェクト単位の設定' },
    ],
    function_list: [
      { id: 'p1-fl-1', functionCode: 'FNC-001', phase: 'MVP', userCategory: 'All', mainCategory: 'Auth', subcategory: 'Login', screenCode: 'SCR-001', screenName: 'Login', functionName: 'Role-based Login', functionDetails: 'Users select a role (admin/developer/guest) to enter the platform. Production will use email/password auth.', effort: '2d', status: 'Completed', completionDev: 'Done', completionClient: '', remarks: '', userCategoryJa: '全員', mainCategoryJa: '認証', subcategoryJa: 'ログイン', screenNameJa: 'ログイン', functionNameJa: 'ロールベースログイン', functionDetailsJa: '管理者／開発／ゲストのロールを選んで入室（本番はメール／パスワード認証）' },
      { id: 'p1-fl-2', functionCode: 'FNC-002', phase: 'MVP', userCategory: 'All', mainCategory: 'Project', subcategory: 'Multi-project', screenCode: 'SCR-002', screenName: 'Project Dashboard', functionName: 'Project Selection', functionDetails: 'Users can view and select from a grid of projects. Each project has its own sheet tabs.', effort: '3d', status: 'Completed', completionDev: 'Done', completionClient: '', remarks: '', userCategoryJa: '全員', mainCategoryJa: 'プロジェクト', subcategoryJa: 'マルチプロジェクト', screenNameJa: 'プロジェクトダッシュボード', functionNameJa: 'プロジェクト選択', functionDetailsJa: 'グリッドからプロジェクトを選択。各プロジェクトにシートタブがある' },
      { id: 'p1-fl-3', functionCode: 'FNC-003', phase: 'MVP', userCategory: 'Admin', mainCategory: 'Tasks', subcategory: 'Assignment', screenCode: 'SCR-003', screenName: 'Tasks Sheet', functionName: 'Task Assignment', functionDetails: 'Admin can add new tasks and assign them to developers via a dropdown.', effort: '2d', status: 'In progress', completionDev: '', completionClient: '', remarks: '', userCategoryJa: '管理者', mainCategoryJa: 'タスク', subcategoryJa: 'アサイン', screenNameJa: 'タスクシート', functionNameJa: 'タスク割当', functionDetailsJa: '管理者がタスクを追加し、ドロップダウンで開発者に割り当て可能' },
      { id: 'p1-fl-4', functionCode: 'FNC-004', phase: 'MVP', userCategory: 'Client', mainCategory: 'Tasks', subcategory: 'Remark', screenCode: 'SCR-003', screenName: 'Tasks Sheet', functionName: 'Guest Remark', functionDetails: 'Guests can only edit the Remark column in the Tasks sheet. All other fields are read-only for guests.', effort: '1d', status: 'In progress', completionDev: '', completionClient: '', remarks: '', userCategoryJa: 'クライアント', mainCategoryJa: 'タスク', subcategoryJa: '備考', screenNameJa: 'タスクシート', functionNameJa: 'ゲスト備考', functionDetailsJa: 'ゲストはタスクシートの備考列のみ編集可。その他は閲覧のみ' },
    ],
    tasks: [
      { id: 'p1-tk-1', taskCode: 'TSK-001', phase: 'MVP', sprint: 'Sprint 1', epic: 'Platform Core', screenCode: '', functionCode: 'FNC-001', task: 'Implement role-based login screen', personDay: '2', assignee: 'Aj', status: 'Done', deadline: 'April 1, 2026', completedDate: 'March 30, 2026', completionPM: 'Done', remark: '', sprintJa: 'スプリント1', epicJa: 'プラットフォームコア', taskJa: 'ロールベースのログイン画面を実装', deadlineJa: '2026年4月1日', completedDateJa: '2026年3月30日' },
      { id: 'p1-tk-2', taskCode: 'TSK-002', phase: 'MVP', sprint: 'Sprint 1', epic: 'Platform Core', screenCode: 'SCR-002', functionCode: 'FNC-002', task: 'Build multi-project dashboard', personDay: '3', assignee: 'Aj', status: 'Done', deadline: 'April 5, 2026', completedDate: 'April 4, 2026', completionPM: 'Done', remark: '', sprintJa: 'スプリント1', epicJa: 'プラットフォームコア', taskJa: 'マルチプロジェクトダッシュボードを構築', deadlineJa: '2026年4月5日', completedDateJa: '2026年4月4日' },
      { id: 'p1-tk-3', taskCode: 'TSK-003', phase: 'MVP', sprint: 'Sprint 2', epic: 'Sheet System', screenCode: 'SCR-003', functionCode: '', task: 'Build generic spreadsheet component with inline editing', personDay: '5', assignee: 'Aj', status: 'In progress', deadline: 'April 15, 2026', completedDate: '', completionPM: '', remark: '', sprintJa: 'スプリント2', epicJa: 'シートシステム', taskJa: 'インライン編集付き汎用スプレッドシートコンポーネントを構築', deadlineJa: '2026年4月15日' },
      { id: 'p1-tk-4', taskCode: 'TSK-004', phase: 'MVP', sprint: 'Sprint 2', epic: 'Permissions', screenCode: '', functionCode: 'FNC-003', task: 'Implement admin task assignment with developer dropdown', personDay: '2', assignee: 'Aj', status: 'In progress', deadline: 'April 17, 2026', completedDate: '', completionPM: '', remark: '', sprintJa: 'スプリント2', epicJa: '権限', taskJa: '管理者によるタスク割当（開発者ドロップダウン）を実装', deadlineJa: '2026年4月17日' },
      { id: 'p1-tk-5', taskCode: 'TSK-005', phase: 'MVP', sprint: 'Sprint 2', epic: 'Permissions', screenCode: '', functionCode: 'FNC-004', task: 'Implement guest remark-only editing in Tasks tab', personDay: '1', assignee: 'Aj', status: 'In progress', deadline: 'April 17, 2026', completedDate: '', completionPM: '', remark: '', sprintJa: 'スプリント2', epicJa: '権限', taskJa: 'タブ内でゲストは備考のみ編集可能にする', deadlineJa: '2026年4月17日' },
      { id: 'p1-tk-6', taskCode: 'TSK-006', phase: 'MVP', sprint: 'Sprint 3', epic: 'Export', screenCode: '', functionCode: '', task: 'CSV/PDF export for any sheet tab', personDay: '2', assignee: '', status: 'Not started', deadline: 'April 24, 2026', completedDate: '', completionPM: '', remark: '', sprintJa: 'スプリント3', epicJa: 'エクスポート', taskJa: '任意のシートタブの CSV／PDF エクスポート', deadlineJa: '2026年4月24日' },
    ],
    backlog: [
      { id: 'p1-bl-1', epic: 'Translation', story: 'DeepL Integration', task: 'Integrate DeepL API for bilingual field translation', owner: 'Aj', sprint: 'S3', epicJa: '翻訳', storyJa: 'DeepL 連携', taskJa: 'バイリンガル列向けに DeepL API を連携' },
      { id: 'p1-bl-2', epic: 'Translation', story: 'Context-aware AI', task: 'Train custom glossary for project-specific terms', owner: '', sprint: 'Backlog', epicJa: '翻訳', storyJa: '文脈対応 AI', taskJa: 'プロジェクト用語のカスタム用語集を整備' },
      { id: 'p1-bl-3', epic: 'Collaboration', story: 'Real-time editing', task: 'Implement Supabase Realtime for concurrent cell editing', owner: '', sprint: 'Backlog', epicJa: 'コラボレーション', storyJa: 'リアルタイム編集', taskJa: '同時セル編集に Supabase Realtime を実装' },
      { id: 'p1-bl-4', epic: 'Deployment', story: 'Vercel', task: 'Deploy frontend to Vercel with CI/CD pipeline', owner: 'Aj', sprint: 'S2', epicJa: 'デプロイ', storyJa: 'Vercel', taskJa: 'フロントを Vercel に CI／CD でデプロイ' },
    ],
  },

  'proj-3': {
    screen_list: [
      { id: 'p3-sl-1', screenCode: 'SCR-001', userCategory: 'All', majorItem: 'Health', mediumItem: 'Dashboard', screenName: 'Health Dashboard', path: '/dashboard', overview: 'Personal health metrics overview', status: 'In progress', completionDev: '', completionClient: '', remarks: '', userCategoryJa: '全員', majorItemJa: 'ヘルス', mediumItemJa: 'ダッシュボード', screenNameJa: 'ヘルスダッシュボード', pathJa: '/dashboard', overviewJa: '個人の健康指標の概要' },
      { id: 'p3-sl-2', screenCode: 'SCR-002', userCategory: 'All', majorItem: 'Activity', mediumItem: 'Steps', screenName: 'Activity Tracker', path: '/activity', overview: 'Step counting and activity goals', status: 'Not started', completionDev: '', completionClient: '', remarks: '', userCategoryJa: '全員', majorItemJa: 'アクティビティ', mediumItemJa: '歩数', screenNameJa: 'アクティビティトラッカー', pathJa: '/activity', overviewJa: '歩数計測と目標設定' },
      { id: 'p3-sl-3', screenCode: 'SCR-003', userCategory: 'All', majorItem: 'Medication', mediumItem: 'Reminder', screenName: 'Medication Reminder', path: '/medications', overview: 'Medication schedule and push notifications', status: 'Not started', completionDev: '', completionClient: '', remarks: '', userCategoryJa: '全員', majorItemJa: '服薬', mediumItemJa: 'リマインダー', screenNameJa: '服薬リマインダー', pathJa: '/medications', overviewJa: '服薬スケジュールとプッシュ通知' },
    ],
    function_list: [
      { id: 'p3-fl-1', functionCode: 'FNC-001', phase: 'MVP', userCategory: 'All', mainCategory: 'Health', subcategory: 'Dashboard', screenCode: 'SCR-001', screenName: 'Health Dashboard', functionName: 'Health Metrics Display', functionDetails: 'Display daily/weekly/monthly health trends with D3.js charts', effort: '5d', status: 'In progress', completionDev: '', completionClient: '', remarks: '', userCategoryJa: '全員', mainCategoryJa: 'ヘルス', subcategoryJa: 'ダッシュボード', screenNameJa: 'ヘルスダッシュボード', functionNameJa: '健康指標の表示', functionDetailsJa: 'D3.js チャートで日／週／月の健康トレンドを表示' },
      { id: 'p3-fl-2', functionCode: 'FNC-002', phase: 'MVP', userCategory: 'All', mainCategory: 'Activity', subcategory: 'Steps', screenCode: 'SCR-002', screenName: 'Activity Tracker', functionName: 'Step Counter', functionDetails: 'Real-time step counting via native pedometer APIs with goal setting', effort: '3d', status: 'Need to be checked', completionDev: '', completionClient: '', remarks: '', userCategoryJa: '全員', mainCategoryJa: 'アクティビティ', subcategoryJa: '歩数', screenNameJa: 'アクティビティトラッカー', functionNameJa: '歩数計', functionDetailsJa: 'ネイティブ歩数計 API でリアルタイム計測と目標設定' },
    ],
    tasks: [
      { id: 'p3-tk-1', taskCode: 'TSK-001', phase: 'MVP', sprint: 'Sprint 1', epic: 'Core', screenCode: 'SCR-001', functionCode: 'FNC-001', task: 'Set up React Native project with health API bridges', personDay: '3', assignee: 'Nakamura Y.', status: 'In progress', deadline: 'April 20, 2026', completedDate: '', completionPM: '', remark: '', sprintJa: 'スプリント1', epicJa: 'コア', taskJa: 'ヘルス API ブリッジ付き React Native プロジェクトをセットアップ', deadlineJa: '2026年4月20日' },
      { id: 'p3-tk-2', taskCode: 'TSK-002', phase: 'MVP', sprint: 'Sprint 1', epic: 'Core', screenCode: 'SCR-001', functionCode: 'FNC-001', task: 'Build D3.js health chart components', personDay: '4', assignee: 'Tanaka K.', status: 'Not started', deadline: 'April 25, 2026', completedDate: '', completionPM: '', remark: '', sprintJa: 'スプリント1', epicJa: 'コア', taskJa: 'D3.js のヘルスチャートコンポーネントを構築', deadlineJa: '2026年4月25日' },
      { id: 'p3-tk-3', taskCode: 'TSK-003', phase: 'MVP', sprint: 'Sprint 2', epic: 'Activity', screenCode: 'SCR-002', functionCode: 'FNC-002', task: 'Implement background pedometer service', personDay: '3', assignee: '', status: 'Not started', deadline: 'May 5, 2026', completedDate: '', completionPM: '', remark: '', sprintJa: 'スプリント2', epicJa: 'アクティビティ', taskJa: 'バックグラウンド歩数計サービスを実装', deadlineJa: '2026年5月5日' },
    ],
  },

  'proj-4': {
    screen_list: [
      { id: 'p4-sl-1', screenCode: 'SCR-001', userCategory: 'Admin', majorItem: 'IoT', mediumItem: 'Dashboard', screenName: 'IoT Device Dashboard', path: '/dashboard', overview: 'Real-time monitoring of all connected IoT devices', status: 'Not started', completionDev: '', completionClient: '', remarks: '', userCategoryJa: '管理者', majorItemJa: 'IoT', mediumItemJa: 'ダッシュボード', screenNameJa: 'IoT デバイスダッシュボード', pathJa: '/dashboard', overviewJa: '接続された全 IoT デバイスのリアルタイム監視' },
      { id: 'p4-sl-2', screenCode: 'SCR-002', userCategory: 'Admin', majorItem: 'Energy', mediumItem: 'Analytics', screenName: 'Energy Analytics', path: '/energy', overview: 'AI-powered energy consumption analysis', status: 'Not started', completionDev: '', completionClient: '', remarks: '', userCategoryJa: '管理者', majorItemJa: 'エネルギー', mediumItemJa: '分析', screenNameJa: 'エネルギー分析', pathJa: '/energy', overviewJa: 'AI による消費電力分析' },
    ],
    tasks: [
      { id: 'p4-tk-1', taskCode: 'TSK-001', phase: 'MVP', sprint: 'Sprint 1', epic: 'IoT Core', screenCode: 'SCR-001', functionCode: '', task: 'Set up MQTT broker and device registration', personDay: '5', assignee: 'Tanaka K.', status: 'Not started', deadline: '', completedDate: '', completionPM: '', remark: 'Project on hold - awaiting hardware procurement', sprintJa: 'スプリント1', epicJa: 'IoT コア', taskJa: 'MQTT ブローカーとデバイス登録をセットアップ', remarkJa: '調達待ちのため保留' },
      { id: 'p4-tk-2', taskCode: 'TSK-002', phase: 'MVP', sprint: 'Sprint 1', epic: 'IoT Core', screenCode: 'SCR-001', functionCode: '', task: 'Build Canvas-based floor plan component', personDay: '4', assignee: '', status: 'Not started', deadline: '', completedDate: '', completionPM: '', remark: '', sprintJa: 'スプリント1', epicJa: 'IoT コア', taskJa: 'Canvas ベースのフロアプランコンポーネントを構築' },
    ],
  },
};

export function getSheetData(projectId: string, sheetId: string): SheetRow[] {
  return projectSheetData[projectId]?.[sheetId] ?? [];
}

export function getSheetRowCount(projectId: string): Record<string, number> {
  const data = projectSheetData[projectId] ?? {};
  const counts: Record<string, number> = {};
  for (const tab of sheetTabs) {
    counts[tab.id] = (data[tab.id] ?? []).length;
  }
  return counts;
}

let personalNameResolver: ((userId: string) => string | null) | null = null;

/** Lets PM names resolve for personal-workspace user ids (not in userProfiles). */
export function setPersonalNameResolver(resolver: ((userId: string) => string | null) | null): void {
  personalNameResolver = resolver;
}

export function getUserName(userId: string): string {
  const fromProfiles = userProfiles.find(u => u.id === userId)?.name;
  if (fromProfiles) return fromProfiles;
  if (personalNameResolver) {
    const n = personalNameResolver(userId);
    if (n) return n;
  }
  return userId;
}

export function getProfilesByRole(role: UserProfile['role']): UserProfile[] {
  return userProfiles.filter(u => u.role === role);
}

/** All PM + developer accounts (unique). Any of these can be assigned as project PM or as a developer, including both on the same project. */
export function getAssignableTeamProfiles(): UserProfile[] {
  const seen = new Set<string>();
  const out: UserProfile[] = [];
  for (const role of ['pm', 'developer'] as const) {
    for (const u of getProfilesByRole(role)) {
      if (!seen.has(u.id)) {
        seen.add(u.id);
        out.push(u);
      }
    }
  }
  out.sort((a, b) => a.name.localeCompare(b.name));
  return out;
}

/** True if the user is the project PM or listed as a developer (supports PM+dev on the same project). */
export function userSeesProjectAsTeamMember(userId: string, project: Project): boolean {
  return project.pmId === userId || project.assignedDevIds.includes(userId);
}

export function getProjectCountForUser(userId: string, role: UserProfile['role'], projectList: Project[]): number {
  if (role === 'pm') return projectList.filter(p => userSeesProjectAsTeamMember(userId, p)).length;
  if (role === 'developer') return projectList.filter(p => userSeesProjectAsTeamMember(userId, p)).length;
  if (role === 'client') return projectList.filter(p => p.clientId === userId).length;
  return projectList.length;
}

export type Language = 'en' | 'ja';

export const translations: Record<string, string> = {
  'Not started': '未着手',
  'In progress': '進行中',
  'Completed': '完了',
  'Done': '完了',
  'Blocked': 'ブロック',
  'Need to be checked': '要確認',
  'Pass': '合格',
  'Fail': '不合格',
  'Planned': '計画',
  'Deprecated': '廃止',
  'MVP': 'MVP（最小版）',
  'v2': 'v2',
  'v3': 'v3',
  'S1': 'S1',
  'S2': 'S2',
  'S3': 'S3',
  'S4': 'S4',
  'S5': 'S5',
  'Backlog': 'バックログ',
  'Normal': '正常',
  'Abnormal': '異常',
  'Boundary': '境界値',
  'Yes': 'はい',
  'No': 'いいえ',
  'Partial': '一部',
  'Unassigned': '未割り当て',
};

export function translate(value: string, lang: Language): string {
  if (lang === 'en') return value;
  return translations[value] ?? value;
}

/** Row cell text for JP: `${key}Ja` on the row, else the same key from seed data (if ids match), else base field. */
export function getLocalizedCell(
  row: SheetRow,
  key: string,
  language: Language,
  seed?: { projectId: string; tabId: string }
): string {
  if (language !== 'ja') {
    return row[key] ?? '';
  }
  const jaKey = `${key}Ja`;
  const fromRow = row[jaKey];
  if (typeof fromRow === 'string' && fromRow.trim() !== '') return fromRow;
  if (seed) {
    const baseline = projectSheetData[seed.projectId]?.[seed.tabId]?.find(r => r.id === row.id);
    const fromSeed = baseline?.[jaKey];
    if (typeof fromSeed === 'string' && fromSeed.trim() !== '') return fromSeed;
  }
  return row[key] ?? '';
}
