import { useState } from 'react';
import type { UserRole, UserProfile } from '../types';
import { Shield, Briefcase, Code, Users, ArrowLeft, Lock, Loader } from 'lucide-react';
import { getProfilesByRole, getProjectCountForUser, projects } from '../data';

interface Props {
  onLogin: (user: UserProfile) => void;
}

const roleCards: { role: UserRole; label: string; labelJa: string; desc: string; icon: typeof Shield; color: string }[] = [
  { role: 'administrator', label: 'Administrator', labelJa: '管理者', desc: 'Monitor all projects across every PM. Global dashboard and full access.', icon: Shield, color: 'from-red-600 to-red-800' },
  { role: 'pm', label: 'Project Manager', labelJa: 'プロジェクトマネージャー', desc: 'Manage your own projects, create tasks, assign developers to work.', icon: Briefcase, color: 'from-brand-600 to-brand-800' },
  { role: 'developer', label: 'Developer', labelJa: '開発者', desc: 'Access tech stack, screen list, function list, and assigned tasks.', icon: Code, color: 'from-emerald-600 to-emerald-800' },
  { role: 'client', label: 'Client / Guest', labelJa: 'クライアント / ゲスト', desc: 'View all sheets, comment on task remarks only.', icon: Users, color: 'from-amber-600 to-amber-800' },
];

const adminProfile: UserProfile = { id: 'admin-1', name: 'System Admin', email: 'admin@cyberconnect.io', role: 'administrator' };

type Step = 'role' | 'profile' | 'password';

export function LoginScreen({ onLogin }: Props) {
  const [step, setStep] = useState<Step>('role');
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
  const [password, setPassword] = useState('');
  const [authenticating, setAuthenticating] = useState(false);

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    if (role === 'administrator') {
      setSelectedUser(adminProfile);
      setStep('password');
    } else {
      setStep('profile');
    }
  };

  const handleProfileSelect = (user: UserProfile) => {
    setSelectedUser(user);
    setStep('password');
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser) return;
    setAuthenticating(true);
    setTimeout(() => {
      onLogin(selectedUser);
    }, 800);
  };

  const handleBack = () => {
    if (step === 'password' && selectedRole !== 'administrator') {
      setStep('profile');
      setSelectedUser(null);
      setPassword('');
    } else {
      setStep('role');
      setSelectedRole(null);
      setSelectedUser(null);
      setPassword('');
    }
    setAuthenticating(false);
  };

  const profileList = selectedRole ? getProfilesByRole(selectedRole) : [];
  const roleInfo = roleCards.find(r => r.role === selectedRole);

  return (
    <div className="min-h-screen bg-surface-950 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full animate-fade-in">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center">
              <span className="text-white font-bold text-lg">C</span>
            </div>
            <h1 className="text-3xl font-bold text-white tracking-tight">CyberConnect Platform</h1>
          </div>
          <p className="text-gray-400 text-lg">Bilingual Requirements & Task Management</p>
          <p className="text-gray-500 mt-1">バイリンガル要件・タスク管理プラットフォーム</p>
          <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20">
            <span className="w-2 h-2 rounded-full bg-brand-400 animate-pulse-dot" />
            <span className="text-brand-300 text-sm font-medium">Demo Mode</span>
          </div>
        </div>

        {step === 'role' && (
          <div className="animate-fade-in">
            <p className="text-center text-gray-400 mb-6">Select a role to explore the platform</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {roleCards.map(({ role, label, labelJa, desc, icon: Icon, color }) => (
                <button
                  key={role}
                  onClick={() => handleRoleSelect(role)}
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
          </div>
        )}

        {step === 'profile' && selectedRole && (
          <div className="animate-fade-in">
            <div className="flex items-center gap-3 mb-6">
              <button onClick={handleBack} className="text-gray-500 hover:text-white transition-colors p-2 rounded-lg hover:bg-surface-800">
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h2 className="text-xl font-semibold text-white">
                  Select {roleInfo?.label} Profile
                </h2>
                <p className="text-gray-500 text-sm">Choose your account to continue</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-3xl mx-auto">
              {profileList.map(user => {
                const projCount = getProjectCountForUser(user.id, user.role, projects);
                const initials = user.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
                const color = roleInfo?.color ?? 'from-gray-600 to-gray-800';

                return (
                  <button
                    key={user.id}
                    onClick={() => handleProfileSelect(user)}
                    className="group relative bg-surface-900 border border-surface-700 rounded-2xl p-5 text-left hover:border-brand-500/50 hover:bg-surface-850 transition-all duration-200"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${color} flex items-center justify-center shrink-0`}>
                        <span className="text-white font-bold text-sm">{initials}</span>
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-white font-semibold truncate">{user.name}</h3>
                        <p className="text-gray-500 text-xs truncate">{user.email}</p>
                        <p className="text-gray-400 text-xs mt-1">
                          {projCount} project{projCount !== 1 ? 's' : ''}
                        </p>
                      </div>
                    </div>
                    <div className="absolute inset-0 rounded-2xl ring-2 ring-brand-500 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {step === 'password' && selectedUser && (
          <div className="animate-fade-in max-w-sm mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <button onClick={handleBack} className="text-gray-500 hover:text-white transition-colors p-2 rounded-lg hover:bg-surface-800">
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h2 className="text-xl font-semibold text-white">Sign In</h2>
                <p className="text-gray-500 text-sm">Enter password to continue</p>
              </div>
            </div>

            <div className="bg-surface-900 border border-surface-700 rounded-2xl p-6">
              <div className="flex items-center gap-4 mb-6 pb-4 border-b border-surface-700">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${roleInfo?.color ?? 'from-gray-600 to-gray-800'} flex items-center justify-center shrink-0`}>
                  <span className="text-white font-bold text-sm">
                    {selectedUser.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()}
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="text-white font-semibold truncate">{selectedUser.name}</p>
                  <p className="text-gray-500 text-xs truncate">{selectedUser.email}</p>
                  <p className="text-gray-600 text-[10px] mt-0.5">{roleInfo?.label}</p>
                </div>
              </div>

              <form onSubmit={handlePasswordSubmit}>
                <label className="text-xs text-gray-500 mb-2 block">Password / パスワード</label>
                <div className="relative mb-4">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Enter any password (demo)"
                    autoFocus
                    className="w-full bg-surface-800 border border-surface-700 rounded-lg pl-10 pr-4 py-3 text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-500/40 transition"
                  />
                </div>

                <button
                  type="submit"
                  disabled={authenticating || !password.trim()}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-brand-600 hover:bg-brand-500 disabled:opacity-50 disabled:hover:bg-brand-600 text-white rounded-xl font-medium text-sm transition-all"
                >
                  {authenticating ? (
                    <>
                      <Loader className="w-4 h-4 animate-spin" />
                      Authenticating...
                    </>
                  ) : (
                    'Sign In'
                  )}
                </button>

                <p className="text-center text-gray-600 text-[10px] mt-3">
                  Demo mode: any password is accepted
                </p>
              </form>
            </div>
          </div>
        )}

        <p className="text-center text-gray-600 text-xs mt-8">
          CyberConnect &copy; 2026 &mdash; All data shown is for demonstration purposes
        </p>
      </div>
    </div>
  );
}
