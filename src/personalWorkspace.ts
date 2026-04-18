import type { Project, SheetRow } from './types';
import { isRecognizedDemoGateEmail, normalizeDemoGateEmail } from './data';

const ACCOUNTS_KEY = 'cyberconnect_personal_accounts_v1';

export interface PersonalAccountRecord {
  id: string;
  email: string;
  password: string;
  displayName: string;
  createdAt: string;
}

function workspaceKey(userId: string): string {
  return `cyberconnect_personal_ws_v1_${userId}`;
}

function readAccounts(): PersonalAccountRecord[] {
  try {
    const raw = localStorage.getItem(ACCOUNTS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as PersonalAccountRecord[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeAccounts(accounts: PersonalAccountRecord[]): void {
  try {
    localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
  } catch {
    /* ignore */
  }
}

export function findPersonalAccountByEmail(email: string): PersonalAccountRecord | null {
  const norm = normalizeDemoGateEmail(email);
  return readAccounts().find(a => a.email === norm) ?? null;
}

export function verifyPersonalLogin(email: string, password: string): PersonalAccountRecord | null {
  const a = findPersonalAccountByEmail(email);
  if (!a || a.password !== password) return null;
  return a;
}

export function registerPersonalAccount(
  displayName: string,
  email: string,
  password: string
): { ok: true; record: PersonalAccountRecord } | { ok: false; error: string } {
  const name = displayName.trim();
  const norm = normalizeDemoGateEmail(email);
  if (!name) return { ok: false, error: 'Please enter your name.' };
  if (!norm.includes('@')) return { ok: false, error: 'Enter a valid email address.' };
  if (password.length < 4) return { ok: false, error: 'Password must be at least 4 characters.' };
  if (isRecognizedDemoGateEmail(norm)) {
    return { ok: false, error: 'This email is reserved for the team workspace. Use a different address for a personal account.' };
  }
  if (findPersonalAccountByEmail(norm)) return { ok: false, error: 'An account with this email already exists. Sign in instead.' };

  const record: PersonalAccountRecord = {
    id: `personal-${crypto.randomUUID()}`,
    email: norm,
    password,
    displayName: name,
    createdAt: new Date().toISOString(),
  };
  writeAccounts([...readAccounts(), record]);
  return { ok: true, record };
}

export function loadPersonalWorkspace(userId: string): {
  projects: Project[];
  sheetData: Record<string, Record<string, SheetRow[]>>;
} {
  try {
    const raw = localStorage.getItem(workspaceKey(userId));
    if (!raw) return { projects: [], sheetData: {} };
    const parsed = JSON.parse(raw) as { projects?: Project[]; sheetData?: Record<string, Record<string, SheetRow[]>> };
    return {
      projects: Array.isArray(parsed.projects) ? parsed.projects : [],
      sheetData: parsed.sheetData && typeof parsed.sheetData === 'object' ? parsed.sheetData : {},
    };
  } catch {
    return { projects: [], sheetData: {} };
  }
}

export function savePersonalWorkspace(
  userId: string,
  projects: Project[],
  sheetData: Record<string, Record<string, SheetRow[]>>
): void {
  try {
    localStorage.setItem(workspaceKey(userId), JSON.stringify({ projects, sheetData }));
  } catch {
    /* ignore */
  }
}

export function trimSheetDataToProjects(
  sheetData: Record<string, Record<string, SheetRow[]>>,
  projects: Project[]
): Record<string, Record<string, SheetRow[]>> {
  const out: Record<string, Record<string, SheetRow[]>> = {};
  for (const p of projects) {
    out[p.id] = sheetData[p.id] ?? {};
  }
  return out;
}
