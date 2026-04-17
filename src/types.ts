export type UserRole = 'administrator' | 'pm' | 'developer' | 'client';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface SheetTab {
  id: string;
  name: string;
  nameJa: string;
  icon: string;
  visibleTo: UserRole[];
  columns: SheetColumn[];
  guestEditableColumns: string[];
  pmCanAddRows: boolean;
  isSpecialView?: boolean;
}

export interface SheetColumn {
  key: string;
  label: string;
  labelJa: string;
  width: number;
  type: 'text' | 'status' | 'select' | 'date' | 'number' | 'code' | 'assignee' | 'longtext';
  editable: boolean;
  options?: string[];
}

export interface SheetRow {
  id: string;
  [key: string]: string;
}

export interface Project {
  id: string;
  name: string;
  nameJa: string;
  client: string;
  pmId: string;
  assignedDevIds: string[];
  clientId: string;
  description: string;
  descriptionJa: string;
  color: string;
  status: 'active' | 'completed' | 'on_hold';
  createdAt: string;
  background?: string;
  purpose?: string;
  devPeriod?: string;
}

export interface ExportOptions {
  format: 'pdf' | 'csv';
  columns: string[];
}
