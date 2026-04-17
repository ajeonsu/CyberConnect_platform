import type { SheetTab, SheetColumn, SheetRow, Project, UserProfile } from './types';

function col(key: string, label: string, labelJa: string, width: number, type: SheetColumn['type'] = 'text', editable = true, options?: string[]): SheetColumn {
  return { key, label, labelJa, width, type, editable, options };
}

// ── User Profiles ─────────────────────────────────────────

export const userProfiles: UserProfile[] = [
  { id: 'admin-1', name: 'System Admin', email: 'admin@cyberconnect.io', role: 'administrator' },
  { id: 'pm-aj', name: 'Aj', email: 'aj@cyberconnect.io', role: 'pm' },
  { id: 'pm-masayuki', name: 'Masayuki', email: 'masayuki@cyberconnect.io', role: 'pm' },
  { id: 'dev-andrea', name: 'Andrea', email: 'andrea@cyberconnect.io', role: 'developer' },
  { id: 'dev-angel', name: 'Angel', email: 'angel@cyberconnect.io', role: 'developer' },
  { id: 'dev-tanaka', name: 'Tanaka K.', email: 'tanaka@cyberconnect.io', role: 'developer' },
  { id: 'dev-nakamura', name: 'Nakamura Y.', email: 'nakamura@cyberconnect.io', role: 'developer' },
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
    pmId: 'pm-aj',
    assignedDevIds: ['dev-andrea', 'dev-angel'],
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
    pmId: 'pm-aj',
    assignedDevIds: ['dev-andrea', 'dev-angel', 'dev-tanaka'],
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
      { id: 'ts-1', majorItem: 'Architecture', mediumItem: 'Multitenant', content: 'Tenant = Corporate account; logical separation and data mixing prohibited / tenant_id required for all tables in RLS' },
      { id: 'ts-2', majorItem: 'Architecture', mediumItem: 'Scalability', content: 'Module division (orders, inventory, advertising, P&L, reports, integration) / Phased release using function flags' },
      { id: 'ts-3', majorItem: 'Performance/SLO', mediumItem: 'Availability', content: 'Monthly occupancy rate ≥ 99.5% (MVP) → 99.9% in the future / Planned shutdowns will be implemented at night' },
      { id: 'ts-4', majorItem: 'Performance/SLO', mediumItem: 'Response time', content: 'Dashboard initial load p95 < 2.0s / Major API p95 < 500ms (assuming caching)' },
      { id: 'ts-5', majorItem: 'Performance/SLO', mediumItem: 'Throughput', content: '100 concurrent users (MVP) → Scale out to +10x' },
      { id: 'ts-6', majorItem: 'Security', mediumItem: 'Authentication/Authorization', content: 'Supabase Auth (Email/Password, Magic Link, OAuth setup) / App RBAC (admin/manager/operator/analyst); managed via user_metadata' },
      { id: 'ts-7', majorItem: 'Security', mediumItem: 'Data Protection', content: 'TLS required / Quiet data is cloud encrypted / Audit logs (who/when/what) / Passwords are delegated to Auth' },
      { id: 'ts-8', majorItem: 'Security', mediumItem: 'Laws and regulations', content: 'Compliance with the Personal Information Protection Act / Terms of Use / Privacy Policy / Cookie Consent (to be implemented in the future)' },
      { id: 'ts-9', majorItem: 'Data', mediumItem: 'Model/Design', content: 'PostgreSQL (Supabase) / tenant_id, created_at, updated_at and soft_delete flags on all tables / Strict adherence to RLS policy' },
      { id: 'ts-10', majorItem: 'Data', mediumItem: 'Keep/Delete', content: 'Logs = 180 days. Business data = Generally unlimited (can be exported and deleted upon withdrawal) / Deletion is irreversible' },
      { id: 'ts-11', majorItem: 'Data', mediumItem: 'Backup/DR', content: 'Point in Time Recovery (PITR) enabled / RPO < 24h, RTO < 4h target / Recovery Runbook' },
      { id: 'ts-12', majorItem: 'Integration/API', mediumItem: 'Target malls', content: 'Amazon SP-API, Rakuten RMS, Yahoo! Shopping, Shopify Admin, TikTok Shop (phased implementation)' },
      { id: 'ts-13', majorItem: 'Integration/API', mediumItem: 'Method/Restrictions', content: 'Edge Functions for OAuth/secure token storage (Functions Secrets) / rate limiting (exponential backoff, idempotent key, re-execution)' },
      { id: 'ts-14', majorItem: 'Integration/API', mediumItem: 'Webhooks/Polling', content: 'Webhooks take priority (order/inventory changes) / For unsupported destinations, differential polling is used (safe interval set)' },
      { id: 'ts-15', majorItem: 'Job', mediumItem: 'Async processing', content: 'Import, inventory synchronization, and report generation are queue-driven (jobs table + state transitions, up to 3 retries, backoff)' },
      { id: 'ts-16', majorItem: 'Job', mediumItem: 'Scheduler', content: 'Supabase Scheduled Jobs (cron): enables nightly batch processing, manual retry UI, and visualization of progress and failure status' },
      { id: 'ts-17', majorItem: 'Monitoring/Operation', mediumItem: 'Logs/Metrics', content: 'Supabase Logs/Insights + Edge Functions Logs / External Sentry Integration (FE/BE) / Dashboarding of Key KPIs' },
      { id: 'ts-18', majorItem: 'Monitoring/Operation', mediumItem: 'Alert', content: 'Three severity levels / Slack notifications / Monitor SLO violations, error rates, job backlogs, and external API failure rates' },
    ],
    non_func: [
      { id: 'nf-1', majorItem: 'API Integration', mediumItem: 'Shopify Authentication', content: 'Implementing the Shopify OAuth authentication flow and managing access tokens' },
      { id: 'nf-2', majorItem: 'API Integration', mediumItem: 'Customer data integration', content: 'Implementing the process of retrieving and syncing customer data from Shopify' },
      { id: 'nf-3', majorItem: 'API Integration', mediumItem: 'Order data integration', content: 'Implementing Shopify order data retrieval, synchronization, and webhook processing' },
      { id: 'nf-4', majorItem: 'API Integration', mediumItem: 'Product data integration', content: 'Shopify product data retrieval, synchronization, and deletion support via Webhooks' },
      { id: 'nf-5', majorItem: 'API Integration', mediumItem: 'Customer Webhook', content: 'Implementing a dedicated handler for customer creation and update webhooks' },
      { id: 'nf-6', majorItem: 'API Integration', mediumItem: 'LINE integration', content: 'Implementation of LINE channel authentication, message sending, and webhook receiving functions' },
      { id: 'nf-7', majorItem: 'API Integration', mediumItem: 'Send email', content: 'Implementation of an email sending API using SendGrid integration' },
      { id: 'nf-8', majorItem: 'API Integration', mediumItem: 'DNS Authentication', content: 'Implementation of SPF, DKIM, and DMARC verification processes' },
      { id: 'nf-9', majorItem: 'API Integration', mediumItem: 'Delivery status', content: 'Webhook processing and log management of email delivery results' },
      { id: 'nf-10', majorItem: 'Management screen', mediumItem: 'Home', content: 'Administrator dashboard (to check overall status)' },
      { id: 'nf-11', majorItem: 'Management screen', mediumItem: 'Corporate Collaboration', content: 'A function to manage the approval and rejection of API integration requests from companies' },
      { id: 'nf-12', majorItem: 'Management screen', mediumItem: 'SoGrid settings', content: 'SendGrid API Key, Sending Domain, and Email Settings Management' },
      { id: 'nf-13', majorItem: 'Management screen', mediumItem: 'Plan Management', content: 'Setting usage plans and restrictions for each company' },
      { id: 'nf-14', majorItem: 'Management screen', mediumItem: 'Billing management', content: 'Managing billing information and payment status' },
      { id: 'nf-15', majorItem: 'Management screen', mediumItem: 'Setting', content: 'System wide configuration management (general settings, permissions, etc.)' },
      { id: 'nf-16', majorItem: 'Management screen', mediumItem: 'Log management', content: 'System log and operation history confirmation function' },
      { id: 'nf-17', majorItem: 'Management screen', mediumItem: 'Support', content: 'Support response and inquiry management function' },
    ],
    screen_list: [
      { id: 'sl-1', screenCode: 'SCR-001', userCategory: 'General users', majorItem: 'Certification', mediumItem: 'Log In', screenName: 'Log In', path: '/login', overview: '', status: 'Not started', completionDev: '', completionClient: '', remarks: '' },
      { id: 'sl-2', screenCode: 'SCR-002', userCategory: 'General users', majorItem: 'Certification', mediumItem: 'Log In', screenName: 'Password Reset', path: '/forgot-password', overview: '', status: 'Not started', completionDev: '', completionClient: '', remarks: '' },
      { id: 'sl-3', screenCode: 'SCR-003', userCategory: 'General users', majorItem: 'Dashboard', mediumItem: 'My Dashboard', screenName: 'My Dashboard', path: '/dashboard', overview: '', status: 'Not started', completionDev: '', completionClient: '', remarks: '' },
      { id: 'sl-4', screenCode: 'SCR-004', userCategory: 'General users', majorItem: 'Dashboard', mediumItem: 'Management Dashboard', screenName: 'Management Dashboard', path: '/dashboard/management', overview: '', status: 'Not started', completionDev: '', completionClient: '', remarks: '' },
      { id: 'sl-5', screenCode: 'SCR-005', userCategory: 'General users', majorItem: 'Dashboard', mediumItem: 'Ad Dashboard', screenName: 'Ad Dashboard', path: '/dashboard/ads', overview: '', status: 'Not started', completionDev: '', completionClient: '', remarks: '' },
      { id: 'sl-6', screenCode: 'SCR-006', userCategory: 'General users', majorItem: 'Dashboard', mediumItem: 'CRM Dashboard', screenName: 'CRM Dashboard', path: '/dashboard/crm', overview: '', status: 'Not started', completionDev: '', completionClient: '', remarks: '' },
      { id: 'sl-7', screenCode: 'SCR-007', userCategory: 'General users', majorItem: 'CRM', mediumItem: 'Analysis', screenName: 'Analysis', path: '/crm/analysis', overview: '', status: 'Not started', completionDev: '', completionClient: '', remarks: '' },
      { id: 'sl-8', screenCode: 'SCR-008', userCategory: 'General users', majorItem: 'CRM', mediumItem: 'Behavior analysis', screenName: 'Behavior Analysis', path: '/crm/behavior', overview: '', status: 'Not started', completionDev: '', completionClient: '', remarks: '' },
      { id: 'sl-9', screenCode: 'SCR-009', userCategory: 'General users', majorItem: 'CRM', mediumItem: 'Customer', screenName: 'Customer', path: '/crm/customers', overview: '', status: 'Not started', completionDev: '', completionClient: '', remarks: '' },
      { id: 'sl-10', screenCode: 'SCR-010', userCategory: 'General users', majorItem: 'CRM', mediumItem: 'Email', screenName: 'Segment Management', path: '/crm/email/segment', overview: '', status: 'Not started', completionDev: '', completionClient: '', remarks: '' },
      { id: 'sl-11', screenCode: 'SCR-011', userCategory: 'General users', majorItem: 'CRM', mediumItem: 'Email', screenName: 'Distribution Management', path: '/crm/deliveries', overview: '', status: 'Not started', completionDev: '', completionClient: '', remarks: '' },
      { id: 'sl-12', screenCode: 'SCR-012', userCategory: 'General users', majorItem: 'CRM', mediumItem: 'Email', screenName: 'Template Management', path: '/crm/email/templates', overview: '', status: 'Not started', completionDev: '', completionClient: '', remarks: '' },
    ],
    function_list: [
      { id: 'fl-1', functionCode: 'FNC-001', phase: 'MVP', userCategory: 'General users', mainCategory: 'Authentication/User', subcategory: 'Certification', screenCode: 'SCR-001', screenName: 'Log In', functionName: 'Log In', functionDetails: 'Users can log in using their email address and password.', effort: '', status: 'Need to be checked', completionDev: '', completionClient: '', remarks: '' },
      { id: 'fl-2', functionCode: 'FNC-002', phase: 'MVP', userCategory: 'General users', mainCategory: 'Authentication/User', subcategory: 'Certification', screenCode: 'SCR-002', screenName: 'Password Reset', functionName: 'Password Reset', functionDetails: 'A user who forgot their password sends a password reset email.', effort: '', status: 'Need to be checked', completionDev: '', completionClient: '', remarks: 'Is the email regarding the reset in Japanese?' },
      { id: 'fl-3', functionCode: 'FNC-004', phase: 'MVP', userCategory: 'General users', mainCategory: 'Dashboard', subcategory: 'My Dashboard', screenCode: 'SCR-003', screenName: 'My Dashboard', functionName: 'Setting', functionDetails: 'There are three tabs: Data, Graphs, and Design, which can be switched between.', effort: '', status: 'Need to be checked', completionDev: '', completionClient: '', remarks: 'The error does not occur even if the time period is set from the future to the past' },
      { id: 'fl-4', functionCode: 'FNC-005', phase: 'MVP', userCategory: 'General users', mainCategory: 'Dashboard', subcategory: 'My Dashboard', screenCode: 'SCR-003', screenName: 'My Dashboard', functionName: 'Setting', functionDetails: 'You can create dashboards for each user. Data and graphs can be moved in the workspace by dragging and dropping, and their placement can be changed.', effort: '', status: 'Need to be checked', completionDev: '', completionClient: '', remarks: 'It can only be placed vertically; it cannot be moved horizontally.' },
      { id: 'fl-5', functionCode: 'FNC-006', phase: 'MVP', userCategory: 'General users', mainCategory: 'Dashboard', subcategory: 'My Dashboard', screenCode: 'SCR-003', screenName: 'My Dashboard', functionName: 'Setting', functionDetails: 'Multiple dashboard patterns can be created, and the one designated as the home dashboard will be displayed in the view.', effort: '', status: 'Need to be checked', completionDev: '', completionClient: '', remarks: 'Does the display change significantly for each linked channel?' },
      { id: 'fl-6', functionCode: 'FNC-007', phase: 'MVP', userCategory: 'General users', mainCategory: 'Dashboard', subcategory: 'My Dashboard', screenCode: 'SCR-003', screenName: 'My Dashboard', functionName: 'View', functionDetails: 'The dashboard configured in the settings will be displayed. The displayed content will vary for each user.', effort: '', status: 'Need to be checked', completionDev: '', completionClient: '', remarks: "I don't need the sharing function." },
      { id: 'fl-7', functionCode: 'FNC-008', phase: 'MVP', userCategory: 'General users', mainCategory: 'Dashboard', subcategory: 'Management Dashboard', screenCode: 'SCR-004', screenName: 'Management Dashboard', functionName: 'Dashboard display', functionDetails: 'Receives metrics linked via APIs from each channel. It also performs calculations in the background and displays the results.', effort: '', status: 'Need to be checked', completionDev: '', completionClient: '', remarks: "I'll do the copying in the settings." },
      { id: 'fl-8', functionCode: 'FNC-009', phase: 'MVP', userCategory: 'General users', mainCategory: 'Dashboard', subcategory: 'Management Dashboard', screenCode: 'SCR-004', screenName: 'Management Dashboard', functionName: 'Alert', functionDetails: 'The alert function in the upper right corner allows you to turn alerts ON/OFF. If there are abnormal values, the item will turn red. You can check ad performance for each linked channel.', effort: '', status: 'Need to be checked', completionDev: '', completionClient: '', remarks: '' },
      { id: 'fl-9', functionCode: 'FNC-011', phase: 'MVP', userCategory: 'General users', mainCategory: 'Dashboard', subcategory: 'CRM Dashboard', screenCode: 'SCR-006', screenName: 'CRM Dashboard', functionName: 'Dashboard display', functionDetails: 'This displays the dashboard created under CRM > Analytics. Only administrators can edit the home dashboard.', effort: '', status: 'Need to be checked', completionDev: '', completionClient: '', remarks: '' },
      { id: 'fl-10', functionCode: 'FNC-012', phase: 'MVP', userCategory: 'General users', mainCategory: 'CRM', subcategory: 'Analysis', screenCode: 'SCR-007', screenName: 'Analysis', functionName: 'Graph List', functionDetails: 'You can view a list of created graphs. A text list is displayed on the left, and a preview of the selected graph is displayed on the right.', effort: '', status: 'Need to be checked', completionDev: '', completionClient: '', remarks: 'Currently, deletion is not possible.' },
    ],
    tasks: [
      { id: 'tk-1', taskCode: 'TSK-032', phase: 'MVP', sprint: 'Sprint 15', epic: 'UI / UX Improvement', screenCode: 'SCR-037', functionCode: '', task: 'Update permissions to disable access to removed Operations pages', personDay: '', assignee: 'Andrea', status: 'Done', deadline: 'March 31, 2026', completedDate: 'April 7, 2025', completionPM: 'Done', remark: '' },
      { id: 'tk-2', taskCode: 'TSK-100', phase: 'MVP', sprint: 'Sprint 15', epic: 'CRM Analytics', screenCode: 'SCR-007', functionCode: '', task: 'Support multi-source data (ads, API integrations)', personDay: '', assignee: 'Andrea', status: 'Done', deadline: 'April 10, 2026', completedDate: 'April 10, 2026', completionPM: 'Done', remark: '' },
      { id: 'tk-3', taskCode: 'TSK-101', phase: 'MVP', sprint: 'Sprint 15', epic: 'CRM Analytics', screenCode: 'SCR-007', functionCode: '', task: 'Simplify graph creation process', personDay: '', assignee: 'Andrea', status: 'Done', deadline: 'April 10, 2026', completedDate: 'April 10, 2026', completionPM: 'Done', remark: '' },
      { id: 'tk-4', taskCode: 'TSK-102', phase: 'MVP', sprint: 'Sprint 15', epic: 'UI / UX Improvement', screenCode: 'SCR-007', functionCode: '', task: 'Enable elements movement (drag & drop support)', personDay: '', assignee: 'Andrea', status: 'Done', deadline: 'April 10, 2026', completedDate: 'April 10, 2026', completionPM: 'Done', remark: '' },
      { id: 'tk-5', taskCode: 'TSK-103', phase: 'MVP', sprint: 'Sprint 15', epic: 'UI / UX Improvement', screenCode: 'SCR-007', functionCode: '', task: 'Move dataset panel to left side', personDay: '', assignee: 'Andrea', status: 'Done', deadline: 'April 10, 2026', completedDate: 'April 10, 2026', completionPM: 'Done', remark: '' },
      { id: 'tk-6', taskCode: 'TSK-104', phase: 'MVP', sprint: 'Sprint 15', epic: 'UI / UX Improvement', screenCode: '', functionCode: '', task: 'Replace unclear terms with user-friendly labels', personDay: '', assignee: 'Andrea', status: 'Done', deadline: 'April 10, 2026', completedDate: 'April 10, 2026', completionPM: 'Done', remark: '' },
      { id: 'tk-7', taskCode: 'TSK-105', phase: 'MVP', sprint: 'Sprint 15', epic: 'CRM Email Template', screenCode: 'SCR-012', functionCode: 'FNC-032', task: 'Enable draft saving', personDay: '', assignee: 'Aj', status: 'Done', deadline: 'April 10, 2026', completedDate: '', completionPM: '', remark: '' },
      { id: 'tk-8', taskCode: 'TSK-106', phase: 'MVP', sprint: 'Sprint 15', epic: 'CRM Email Template', screenCode: 'SCR-012', functionCode: '', task: 'Enable variable usage (e.g. {{last_name}})', personDay: '', assignee: 'Aj', status: 'Done', deadline: 'April 10, 2026', completedDate: '', completionPM: '', remark: '' },
      { id: 'tk-9', taskCode: 'TSK-107', phase: 'MVP', sprint: 'Sprint 15', epic: 'CRM Email Delivery', screenCode: 'SCR-011', functionCode: '', task: 'Fix redirect issue when selecting template', personDay: '', assignee: 'Aj', status: 'In progress', deadline: '', completedDate: '', completionPM: '', remark: '' },
      { id: 'tk-10', taskCode: 'TSK-108', phase: 'MVP', sprint: 'Sprint 16', epic: 'Payment Integration', screenCode: '', functionCode: '', task: 'Implement Stripe checkout flow for subscription plans', personDay: '3', assignee: '', status: 'Not started', deadline: 'April 24, 2026', completedDate: '', completionPM: '', remark: '' },
    ],
    test_case: [
      { id: 'tc-1', category: 'User authentication', scenarioName: 'Log in', testType: 'Normal', summary: 'Log in with an email address that is already registered', testSteps: '1. Access the login screen\n2. Enter credentials', expectedResults: 'Once you have successfully logged in, you will be redirected to the home page.', status: 'Pass', tester: 'Masayuki Kimura', remarks: '' },
      { id: 'tc-2', category: 'User authentication', scenarioName: 'Log in', testType: 'Abnormal', summary: 'Log in with an unregistered email address', testSteps: '1. Access the login screen\n2. Enter invalid credentials', expectedResults: 'Login fails and an alert appears', status: '', tester: '', remarks: '' },
    ],
    api_list: [
      { id: 'api-1', category: 'Advertising', serviceName: 'Google Ads', apiName: 'Google Ads API', authMethod: 'OAuth2', dataHandling: 'Ad performance/budget/campaigns/auto ON/OFF', realtime: 'No', mvpRequired: 'MVP', status: 'Completed', remarks: '' },
      { id: 'api-2', category: 'Advertising', serviceName: 'Meta Ads (Facebook)', apiName: 'Marketing API', authMethod: 'OAuth2', dataHandling: 'Ad performance/targeting data', realtime: 'No', mvpRequired: 'MVP', status: 'Completed', remarks: '' },
      { id: 'api-3', category: 'Advertising', serviceName: 'Yahoo! Ads', apiName: 'Yahoo Ads API', authMethod: 'OAuth2', dataHandling: 'Ad performance/budget management', realtime: 'No', mvpRequired: 'MVP', status: 'In progress', remarks: '' },
      { id: 'api-4', category: 'Advertising', serviceName: 'LINE Ads', apiName: 'LINE Ads API', authMethod: 'OAuth2', dataHandling: 'Ad performance/segment delivery', realtime: 'Yes', mvpRequired: 'MVP', status: 'In progress', remarks: 'LINE Business account required' },
      { id: 'api-5', category: 'EC', serviceName: 'Shopify', apiName: 'Shopify Admin API', authMethod: 'OAuth2', dataHandling: 'Product/Order/Inventory/Customer management', realtime: 'Yes', mvpRequired: 'MVP', status: 'Completed', remarks: 'Webhook integration complete' },
      { id: 'api-6', category: 'EC', serviceName: 'Amazon', apiName: 'Amazon SP-API', authMethod: 'OAuth2 + AWS IAM', dataHandling: 'Product listing/order fulfillment', realtime: 'Partial', mvpRequired: 'MVP', status: 'In progress', remarks: '' },
      { id: 'api-7', category: 'CRM', serviceName: 'Chatwork', apiName: 'Chatwork API', authMethod: 'API Key', dataHandling: 'Message notification', realtime: 'Yes', mvpRequired: 'v2', status: 'Not started', remarks: '' },
      { id: 'api-8', category: 'CRM', serviceName: 'Slack', apiName: 'Slack API', authMethod: 'OAuth2/Webhook', dataHandling: 'Message notification/Webhook management', realtime: 'Yes', mvpRequired: 'v2', status: 'Not started', remarks: '' },
      { id: 'api-9', category: 'CRM', serviceName: 'LINE', apiName: 'LINE Messaging API', authMethod: 'Channel access token', dataHandling: 'Message sending/receiving', realtime: 'Yes', mvpRequired: 'MVP', status: 'In progress', remarks: '' },
    ],
    backlog: [
      { id: 'bl-1', epic: 'Project Setup', story: 'Repository/Branch', task: 'Org/Repo/branch, main/dev/staging rule setting', owner: 'Masayuki', sprint: 'S1' },
      { id: 'bl-2', epic: 'Project Setup', story: 'Repository/Branch', task: 'Branch protection + CODEOWNERS', owner: 'Angel', sprint: 'S1' },
      { id: 'bl-3', epic: 'Project Setup', story: 'CI/CD', task: 'Vercel integration (dev/staging/prod) + env.example setup', owner: 'Masayuki', sprint: 'S1' },
      { id: 'bl-4', epic: 'Project Setup', story: 'CI/CD', task: 'Husky + lint-staged / ESLint/Prettier install', owner: 'Angel', sprint: 'S1' },
      { id: 'bl-5', epic: 'Project Setup', story: 'CI/CD', task: 'PR check (lint/build) + Required checks setup', owner: 'Angel', sprint: 'S1' },
      { id: 'bl-6', epic: 'Project Setup', story: 'Setup', task: 'Sentry setup (FE/Functions) + Slack integration', owner: 'Angel', sprint: 'S1' },
      { id: 'bl-7', epic: 'Data Model', story: 'Model design', task: 'Products/Orders/Integrations/Settings ER + migration', owner: 'Angel', sprint: 'S1' },
      { id: 'bl-8', epic: 'Data Model', story: 'Security', task: 'Tenant isolation RLS + test data seeding', owner: 'Angel', sprint: 'S1' },
      { id: 'bl-9', epic: 'Data Model', story: 'Security', task: 'Role/permission structure implementation (admin/manager/operator)', owner: 'Angel', sprint: 'S1' },
      { id: 'bl-10', epic: 'Data Model', story: 'Functions', task: 'Functions infrastructure + logging/error/rate limiting', owner: 'Angel', sprint: 'S1' },
      { id: 'bl-11', epic: 'UI Framework', story: 'Layout/Theme', task: 'AppShell header/sidebar/navigation/spacing', owner: 'Angel', sprint: 'S1' },
      { id: 'bl-12', epic: 'Auth', story: 'Auth flow', task: 'Inline API validation + auth check', owner: 'Angel', sprint: 'S1' },
      { id: 'bl-13', epic: 'Auth', story: 'Auth flow', task: 'Guard routing with middleware implementation', owner: 'Angel', sprint: 'S1' },
      { id: 'bl-14', epic: 'Dashboard', story: 'Dashboard FYI', task: 'KPI display + configuration management (demo/RPC call)', owner: 'Angel', sprint: 'S2' },
      { id: 'bl-15', epic: 'Dashboard', story: 'Dashboard FYI', task: 'Widget component + chart integration', owner: 'Masayuki', sprint: 'S2' },
    ],
    process_chart: [
      { id: 'pc-1', code: 'BIZ-001', category: 'Business', task: 'Requirements definition - Kick-off / MVP + Post-Scope Agreement', sprint: 'Sprint 1', personDays: '', status: 'Completed' },
      { id: 'pc-2', code: 'BIZ-002', category: 'Business', task: 'Final confirmation of client requirements', sprint: 'Sprint 2', personDays: '', status: 'Completed' },
      { id: 'pc-3', code: 'BIZ-003', category: 'Business', task: 'Design mockup sharing and approval workflow', sprint: 'Sprint 2-3', personDays: '', status: 'In progress' },
      { id: 'pc-4', code: 'BIZ-004', category: 'Business', task: 'Terms of service creation', sprint: 'Sprint 3-4', personDays: '', status: 'Planned' },
      { id: 'pc-5', code: 'BIZ-005', category: 'Business', task: 'Adjusting data integration requirements (advertising and CRM APIs)', sprint: 'Sprint 3-4', personDays: '', status: 'Planned' },
      { id: 'pc-6', code: 'DEV-001', category: 'Development', task: 'Environment construction', sprint: 'Sprint 1', personDays: '2', status: 'Completed' },
      { id: 'pc-7', code: 'DEV-002', category: 'Development', task: 'Basic design + coding', sprint: 'Sprint 2-6', personDays: '15', status: 'In progress' },
      { id: 'pc-8', code: 'TST-001', category: 'Test', task: 'MVP version acceptance testing', sprint: 'Sprint 7-8', personDays: '5', status: 'Planned' },
      { id: 'pc-9', code: 'TST-002', category: 'Test', task: 'Extended version acceptance testing', sprint: 'Sprint 9', personDays: '3', status: 'Planned' },
    ],
  },

  'proj-1': {
    tech_stack: [
      { id: 'p1-ts-1', majorItem: 'Architecture', mediumItem: 'Frontend', content: 'React + TypeScript + Vite, Tailwind CSS, Zustand for state management' },
      { id: 'p1-ts-2', majorItem: 'Architecture', mediumItem: 'Backend', content: 'Supabase (PostgreSQL, Auth, Edge Functions, Realtime), RLS for multi-tenant isolation' },
      { id: 'p1-ts-3', majorItem: 'Performance', mediumItem: 'Targets', content: 'Initial load < 2s, API response p95 < 300ms, support 50 concurrent users at MVP' },
      { id: 'p1-ts-4', majorItem: 'Security', mediumItem: 'Auth', content: 'Supabase Auth (email/password, magic link), RBAC (admin/developer/guest), tenant_id isolation' },
      { id: 'p1-ts-5', majorItem: 'Integration', mediumItem: 'Translation', content: 'DeepL API for phase 1, custom LLM integration for context-aware translation in phase 2' },
    ],
    screen_list: [
      { id: 'p1-sl-1', screenCode: 'SCR-001', userCategory: 'All', majorItem: 'Auth', mediumItem: 'Login', screenName: 'Login / Role Selection', path: '/login', overview: 'Role selection screen for demo, full auth in production', status: 'Completed', completionDev: 'Done', completionClient: '', remarks: '' },
      { id: 'p1-sl-2', screenCode: 'SCR-002', userCategory: 'All', majorItem: 'Projects', mediumItem: 'Dashboard', screenName: 'Project Dashboard', path: '/projects', overview: 'Grid view of all projects with status indicators', status: 'Completed', completionDev: 'Done', completionClient: '', remarks: '' },
      { id: 'p1-sl-3', screenCode: 'SCR-003', userCategory: 'All', majorItem: 'Sheets', mediumItem: 'Spreadsheet', screenName: 'Sheet View', path: '/project/:id/:sheet', overview: 'Generic spreadsheet view for any sheet tab', status: 'In progress', completionDev: '', completionClient: '', remarks: '' },
      { id: 'p1-sl-4', screenCode: 'SCR-004', userCategory: 'Admin', majorItem: 'Admin', mediumItem: 'Settings', screenName: 'Project Settings', path: '/project/:id/settings', overview: 'Project-level settings: team, permissions, integrations', status: 'Not started', completionDev: '', completionClient: '', remarks: '' },
    ],
    function_list: [
      { id: 'p1-fl-1', functionCode: 'FNC-001', phase: 'MVP', userCategory: 'All', mainCategory: 'Auth', subcategory: 'Login', screenCode: 'SCR-001', screenName: 'Login', functionName: 'Role-based Login', functionDetails: 'Users select a role (admin/developer/guest) to enter the platform. Production will use email/password auth.', effort: '2d', status: 'Completed', completionDev: 'Done', completionClient: '', remarks: '' },
      { id: 'p1-fl-2', functionCode: 'FNC-002', phase: 'MVP', userCategory: 'All', mainCategory: 'Project', subcategory: 'Multi-project', screenCode: 'SCR-002', screenName: 'Project Dashboard', functionName: 'Project Selection', functionDetails: 'Users can view and select from a grid of projects. Each project has its own sheet tabs.', effort: '3d', status: 'Completed', completionDev: 'Done', completionClient: '', remarks: '' },
      { id: 'p1-fl-3', functionCode: 'FNC-003', phase: 'MVP', userCategory: 'Admin', mainCategory: 'Tasks', subcategory: 'Assignment', screenCode: 'SCR-003', screenName: 'Tasks Sheet', functionName: 'Task Assignment', functionDetails: 'Admin can add new tasks and assign them to developers via a dropdown.', effort: '2d', status: 'In progress', completionDev: '', completionClient: '', remarks: '' },
      { id: 'p1-fl-4', functionCode: 'FNC-004', phase: 'MVP', userCategory: 'Client', mainCategory: 'Tasks', subcategory: 'Remark', screenCode: 'SCR-003', screenName: 'Tasks Sheet', functionName: 'Guest Remark', functionDetails: 'Guests can only edit the Remark column in the Tasks sheet. All other fields are read-only for guests.', effort: '1d', status: 'In progress', completionDev: '', completionClient: '', remarks: '' },
    ],
    tasks: [
      { id: 'p1-tk-1', taskCode: 'TSK-001', phase: 'MVP', sprint: 'Sprint 1', epic: 'Platform Core', screenCode: '', functionCode: 'FNC-001', task: 'Implement role-based login screen', personDay: '2', assignee: 'Aj', status: 'Done', deadline: 'April 1, 2026', completedDate: 'March 30, 2026', completionPM: 'Done', remark: '' },
      { id: 'p1-tk-2', taskCode: 'TSK-002', phase: 'MVP', sprint: 'Sprint 1', epic: 'Platform Core', screenCode: 'SCR-002', functionCode: 'FNC-002', task: 'Build multi-project dashboard', personDay: '3', assignee: 'Aj', status: 'Done', deadline: 'April 5, 2026', completedDate: 'April 4, 2026', completionPM: 'Done', remark: '' },
      { id: 'p1-tk-3', taskCode: 'TSK-003', phase: 'MVP', sprint: 'Sprint 2', epic: 'Sheet System', screenCode: 'SCR-003', functionCode: '', task: 'Build generic spreadsheet component with inline editing', personDay: '5', assignee: 'Aj', status: 'In progress', deadline: 'April 15, 2026', completedDate: '', completionPM: '', remark: '' },
      { id: 'p1-tk-4', taskCode: 'TSK-004', phase: 'MVP', sprint: 'Sprint 2', epic: 'Permissions', screenCode: '', functionCode: 'FNC-003', task: 'Implement admin task assignment with developer dropdown', personDay: '2', assignee: 'Aj', status: 'In progress', deadline: 'April 17, 2026', completedDate: '', completionPM: '', remark: '' },
      { id: 'p1-tk-5', taskCode: 'TSK-005', phase: 'MVP', sprint: 'Sprint 2', epic: 'Permissions', screenCode: '', functionCode: 'FNC-004', task: 'Implement guest remark-only editing in Tasks tab', personDay: '1', assignee: 'Aj', status: 'In progress', deadline: 'April 17, 2026', completedDate: '', completionPM: '', remark: '' },
      { id: 'p1-tk-6', taskCode: 'TSK-006', phase: 'MVP', sprint: 'Sprint 3', epic: 'Export', screenCode: '', functionCode: '', task: 'CSV/PDF export for any sheet tab', personDay: '2', assignee: '', status: 'Not started', deadline: 'April 24, 2026', completedDate: '', completionPM: '', remark: '' },
    ],
    backlog: [
      { id: 'p1-bl-1', epic: 'Translation', story: 'DeepL Integration', task: 'Integrate DeepL API for bilingual field translation', owner: 'Aj', sprint: 'S3' },
      { id: 'p1-bl-2', epic: 'Translation', story: 'Context-aware AI', task: 'Train custom glossary for project-specific terms', owner: '', sprint: 'Backlog' },
      { id: 'p1-bl-3', epic: 'Collaboration', story: 'Real-time editing', task: 'Implement Supabase Realtime for concurrent cell editing', owner: '', sprint: 'Backlog' },
      { id: 'p1-bl-4', epic: 'Deployment', story: 'Vercel', task: 'Deploy frontend to Vercel with CI/CD pipeline', owner: 'Aj', sprint: 'S2' },
    ],
  },

  'proj-3': {
    screen_list: [
      { id: 'p3-sl-1', screenCode: 'SCR-001', userCategory: 'All', majorItem: 'Health', mediumItem: 'Dashboard', screenName: 'Health Dashboard', path: '/dashboard', overview: 'Personal health metrics overview', status: 'In progress', completionDev: '', completionClient: '', remarks: '' },
      { id: 'p3-sl-2', screenCode: 'SCR-002', userCategory: 'All', majorItem: 'Activity', mediumItem: 'Steps', screenName: 'Activity Tracker', path: '/activity', overview: 'Step counting and activity goals', status: 'Not started', completionDev: '', completionClient: '', remarks: '' },
      { id: 'p3-sl-3', screenCode: 'SCR-003', userCategory: 'All', majorItem: 'Medication', mediumItem: 'Reminder', screenName: 'Medication Reminder', path: '/medications', overview: 'Medication schedule and push notifications', status: 'Not started', completionDev: '', completionClient: '', remarks: '' },
    ],
    function_list: [
      { id: 'p3-fl-1', functionCode: 'FNC-001', phase: 'MVP', userCategory: 'All', mainCategory: 'Health', subcategory: 'Dashboard', screenCode: 'SCR-001', screenName: 'Health Dashboard', functionName: 'Health Metrics Display', functionDetails: 'Display daily/weekly/monthly health trends with D3.js charts', effort: '5d', status: 'In progress', completionDev: '', completionClient: '', remarks: '' },
      { id: 'p3-fl-2', functionCode: 'FNC-002', phase: 'MVP', userCategory: 'All', mainCategory: 'Activity', subcategory: 'Steps', screenCode: 'SCR-002', screenName: 'Activity Tracker', functionName: 'Step Counter', functionDetails: 'Real-time step counting via native pedometer APIs with goal setting', effort: '3d', status: 'Need to be checked', completionDev: '', completionClient: '', remarks: '' },
    ],
    tasks: [
      { id: 'p3-tk-1', taskCode: 'TSK-001', phase: 'MVP', sprint: 'Sprint 1', epic: 'Core', screenCode: 'SCR-001', functionCode: 'FNC-001', task: 'Set up React Native project with health API bridges', personDay: '3', assignee: 'Nakamura Y.', status: 'In progress', deadline: 'April 20, 2026', completedDate: '', completionPM: '', remark: '' },
      { id: 'p3-tk-2', taskCode: 'TSK-002', phase: 'MVP', sprint: 'Sprint 1', epic: 'Core', screenCode: 'SCR-001', functionCode: 'FNC-001', task: 'Build D3.js health chart components', personDay: '4', assignee: 'Tanaka K.', status: 'Not started', deadline: 'April 25, 2026', completedDate: '', completionPM: '', remark: '' },
      { id: 'p3-tk-3', taskCode: 'TSK-003', phase: 'MVP', sprint: 'Sprint 2', epic: 'Activity', screenCode: 'SCR-002', functionCode: 'FNC-002', task: 'Implement background pedometer service', personDay: '3', assignee: '', status: 'Not started', deadline: 'May 5, 2026', completedDate: '', completionPM: '', remark: '' },
    ],
  },

  'proj-4': {
    screen_list: [
      { id: 'p4-sl-1', screenCode: 'SCR-001', userCategory: 'Admin', majorItem: 'IoT', mediumItem: 'Dashboard', screenName: 'IoT Device Dashboard', path: '/dashboard', overview: 'Real-time monitoring of all connected IoT devices', status: 'Not started', completionDev: '', completionClient: '', remarks: '' },
      { id: 'p4-sl-2', screenCode: 'SCR-002', userCategory: 'Admin', majorItem: 'Energy', mediumItem: 'Analytics', screenName: 'Energy Analytics', path: '/energy', overview: 'AI-powered energy consumption analysis', status: 'Not started', completionDev: '', completionClient: '', remarks: '' },
    ],
    tasks: [
      { id: 'p4-tk-1', taskCode: 'TSK-001', phase: 'MVP', sprint: 'Sprint 1', epic: 'IoT Core', screenCode: 'SCR-001', functionCode: '', task: 'Set up MQTT broker and device registration', personDay: '5', assignee: 'Tanaka K.', status: 'Not started', deadline: '', completedDate: '', completionPM: '', remark: 'Project on hold - awaiting hardware procurement' },
      { id: 'p4-tk-2', taskCode: 'TSK-002', phase: 'MVP', sprint: 'Sprint 1', epic: 'IoT Core', screenCode: 'SCR-001', functionCode: '', task: 'Build Canvas-based floor plan component', personDay: '4', assignee: '', status: 'Not started', deadline: '', completedDate: '', completionPM: '', remark: '' },
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

export function getUserName(userId: string): string {
  return userProfiles.find(u => u.id === userId)?.name ?? userId;
}

export function getProfilesByRole(role: UserProfile['role']): UserProfile[] {
  return userProfiles.filter(u => u.role === role);
}

export function getProjectCountForUser(userId: string, role: UserProfile['role'], projectList: Project[]): number {
  if (role === 'pm') return projectList.filter(p => p.pmId === userId).length;
  if (role === 'developer') return projectList.filter(p => p.assignedDevIds.includes(userId)).length;
  if (role === 'client') return projectList.filter(p => p.clientId === userId).length;
  return projectList.length;
}
