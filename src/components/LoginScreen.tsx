import type { UserRole } from '../types';
import { Shield, Code, Users } from 'lucide-react';

interface Props {
  onLogin: (role: UserRole) => void;
}

const roles: { role: UserRole; label: string; labelJa: string; desc: string; icon: typeof Shield; color: string }[] = [
  { role: 'admin', label: 'Administrator', labelJa: '管理者', desc: 'Full system access, manage permissions & settings', icon: Shield, color: 'from-brand-600 to-brand-800' },
  { role: 'developer', label: 'Internal Developer', labelJa: '内部開発者', desc: 'Access internal view, edit requirements & specs', icon: Code, color: 'from-emerald-600 to-emerald-800' },
  { role: 'client', label: 'Client / Guest', labelJa: 'クライアント / ゲスト', desc: 'Restricted client view with filtered visibility', icon: Users, color: 'from-amber-600 to-amber-800' },
];

export function LoginScreen({ onLogin }: Props) {
  return (
    <div className="min-h-screen bg-surface-950 flex items-center justify-center p-4">
      <div className="max-w-3xl w-full animate-fade-in">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center">
              <span className="text-white font-bold text-lg">C</span>
            </div>
            <h1 className="text-3xl font-bold text-white tracking-tight">CyberConnect Platform</h1>
          </div>
          <p className="text-gray-400 text-lg">Bilingual Requirements & Task Management</p>
          <p className="text-gray-500 mt-1">バイリンガル要件・タスク管理プラットフォーム</p>
          <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20">
            <span className="w-2 h-2 rounded-full bg-brand-400 animate-pulse-dot"></span>
            <span className="text-brand-300 text-sm font-medium">Demo Mode</span>
          </div>
        </div>

        <p className="text-center text-gray-400 mb-6">Select a role to explore the platform</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {roles.map(({ role, label, labelJa, desc, icon: Icon, color }) => (
            <button
              key={role}
              onClick={() => onLogin(role)}
              className="group relative bg-surface-900 border border-surface-700 rounded-2xl p-6 text-left hover:border-brand-500/50 hover:bg-surface-850 transition-all duration-200 cursor-pointer"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-white font-semibold text-lg">{label}</h3>
              <p className="text-gray-500 text-sm mb-2">{labelJa}</p>
              <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
              <div className="absolute inset-0 rounded-2xl ring-2 ring-brand-500 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </button>
          ))}
        </div>

        <p className="text-center text-gray-600 text-xs mt-8">
          CyberConnect &copy; 2026 &mdash; All data shown is for demonstration purposes
        </p>
      </div>
    </div>
  );
}
