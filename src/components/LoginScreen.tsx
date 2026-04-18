import { useState, useMemo, useLayoutEffect } from 'react';
import type { UserRole, UserProfile } from '../types';
import { Shield, Briefcase, Code, Users, ArrowLeft, Loader, LogOut } from 'lucide-react';
import {
  getProfilesByRole,
  getProjectCountForUser,
  projects,
  resolveDemoGmailUser,
  getEligibleRolesFromProjects,
  isDemoAdminGateEmail,
  normalizeDemoGateEmail,
} from '../data';
import { peekResumeRoleSnapshot, consumeResumeRoleFlag, saveDemoGateEmail, clearLoginSessionStorage } from '../loginSession';
import { registerPersonalAccount, verifyPersonalLogin } from '../personalWorkspace';

interface Props {
  onLogin: (user: UserProfile) => void;
}

const roleCards: { role: UserRole; label: string; labelJa: string; desc: string; icon: typeof Shield; color: string }[] = [
  { role: 'administrator', label: 'Administrator', labelJa: '管理者', desc: 'Monitor all projects across every PM. Global dashboard and full access.', icon: Shield, color: 'from-red-600 to-red-800' },
  { role: 'pm', label: 'Project Manager', labelJa: 'プロジェクトマネージャー', desc: 'Manage your own projects, create tasks, assign developers to work.', icon: Briefcase, color: 'from-brand-600 to-brand-800' },
  { role: 'developer', label: 'Developer', labelJa: '開発者', desc: 'Access tech stack, screen list, function list, and assigned tasks.', icon: Code, color: 'from-emerald-600 to-emerald-800' },
  { role: 'client', label: 'Client / Guest', labelJa: 'クライアント / ゲスト', desc: 'View all sheets, comment on task remarks only.', icon: Users, color: 'from-amber-600 to-amber-800' },
];

const adminProfile: UserProfile = { id: 'admin-1', name: 'System Admin', email: 'admin@cyberconnect.io', role: 'administrator', accountKind: 'team' };

type Flow = 'signin' | 'signup' | 'team_role' | 'team_profile';

const TEAM_GMAIL_EXAMPLES =
  'yamada.t@gmail.com, suzuki.m@gmail.com, tanaka.k@gmail.com, nakamura.y@gmail.com, villanueva.r@gmail.com, andrea@gmail.com, angel@gmail.com, masayuki@gmail.com, aj@gmail.com';

function initialFlow(): Flow {
  const snap = peekResumeRoleSnapshot();
  return snap.goRole && snap.email ? 'team_role' : 'signin';
}

export function LoginScreen({ onLogin }: Props) {
  const [flow, setFlow] = useState<Flow>(initialFlow);
  const [gateUser, setGateUser] = useState<UserProfile | null>(null);
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [loginEmail, setLoginEmail] = useState(() => {
    const snap = peekResumeRoleSnapshot();
    return snap.goRole && snap.email ? snap.email : '';
  });
  const [loginPassword, setLoginPassword] = useState('');
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirm, setSignupConfirm] = useState('');
  const [authenticating, setAuthenticating] = useState(false);
  const [authError, setAuthError] = useState('');

  useLayoutEffect(() => {
    const snap = peekResumeRoleSnapshot();
    if (snap.goRole && snap.email) {
      /* Do not consume resume flag here: Strict Mode remounts LoginScreen; consuming in this
       * effect would clear sessionStorage before the second mount and drop the user on Sign in. */
      setLoginEmail(snap.email);
      const user = resolveDemoGmailUser(snap.email);
      if (user && !isDemoAdminGateEmail(snap.email)) setGateUser(user);
      else setGateUser(null);
    } else {
      consumeResumeRoleFlag();
    }
  }, []);

  const resetToSignin = () => {
    consumeResumeRoleFlag();
    clearLoginSessionStorage();
    setFlow('signin');
    setGateUser(null);
    setSelectedRole(null);
    setLoginEmail('');
    setLoginPassword('');
    setSignupName('');
    setSignupEmail('');
    setSignupPassword('');
    setSignupConfirm('');
    setAuthError('');
    setAuthenticating(false);
  };

  const handleRoleSelect = (role: UserRole) => {
    consumeResumeRoleFlag();
    setSelectedRole(role);
    if (gateUser) {
      onLogin({ ...gateUser, role, accountKind: 'team' });
      return;
    }
    if (role === 'administrator') {
      onLogin(adminProfile);
      return;
    }
    setFlow('team_profile');
  };

  const handleProfileSelect = (user: UserProfile) => {
    consumeResumeRoleFlag();
    onLogin({ ...user, accountKind: 'team' });
  };

  /** One form: personal account first, else company team demo. */
  const handleSignInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail.trim() || !loginPassword.trim()) return;
    setAuthenticating(true);
    setAuthError('');
    setTimeout(() => {
      setAuthenticating(false);
      const personal = verifyPersonalLogin(loginEmail, loginPassword);
      if (personal) {
        onLogin({
          id: personal.id,
          name: personal.displayName,
          email: personal.email,
          role: 'pm',
          accountKind: 'personal',
        });
        return;
      }

      const norm = normalizeDemoGateEmail(loginEmail);
      const admin = isDemoAdminGateEmail(norm);
      const user = resolveDemoGmailUser(norm);
      if (!admin && !user) {
        setAuthError(
          `No account found for this email and password. Use a registered personal account, or sign in with admin / team demo Gmail (${TEAM_GMAIL_EXAMPLES}).`
        );
        return;
      }
      saveDemoGateEmail(loginEmail);
      if (admin) {
        setGateUser(null);
        setFlow('team_role');
        return;
      }
      if (!user) return;
      const eligible = getEligibleRolesFromProjects(user, projects);
      if (eligible.length === 0) {
        setAuthError('No roles are assigned to this team account in the demo projects yet.');
        return;
      }
      if (eligible.length === 1) {
        onLogin({ ...user, role: eligible[0]!, accountKind: 'team' });
        return;
      }
      setGateUser(user);
      setFlow('team_role');
    }, 450);
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    if (signupPassword !== signupConfirm) {
      setAuthError('Passwords do not match.');
      return;
    }
    setAuthenticating(true);
    setTimeout(() => {
      setAuthenticating(false);
      const res = registerPersonalAccount(signupName, signupEmail, signupPassword);
      if (!res.ok) {
        setAuthError(res.error);
        return;
      }
      onLogin({
        id: res.record.id,
        name: res.record.displayName,
        email: res.record.email,
        role: 'pm',
        accountKind: 'personal',
      });
    }, 400);
  };

  const handleBackTeam = () => {
    if (flow === 'team_profile') {
      setFlow('team_role');
      setSelectedRole(null);
    } else if (flow === 'team_role') {
      consumeResumeRoleFlag();
      setFlow('signin');
      setGateUser(null);
      setSelectedRole(null);
      setLoginPassword('');
    }
    setAuthenticating(false);
  };

  const profileList = selectedRole ? getProfilesByRole(selectedRole) : [];
  const roleInfo = roleCards.find(r => r.role === selectedRole);
  const availableRoles = useMemo(() => {
    if (flow !== 'team_role') return [];
    if (gateUser) {
      const eligible = getEligibleRolesFromProjects(gateUser, projects);
      return roleCards.filter(r => eligible.includes(r.role));
    }
    return roleCards;
  }, [flow, gateUser]);

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

        {flow === 'signin' && (
          <div className="animate-fade-in max-w-md mx-auto">
            <div className="bg-surface-900 border border-surface-700 rounded-3xl p-8 shadow-xl shadow-black/10">
              <div className="mb-8 text-center">
                <h2 className="text-2xl font-semibold text-white">Sign in</h2>
                <p className="text-gray-400 mt-2 text-sm">Personal account or company team demo (same screen)</p>
              </div>
              <form onSubmit={handleSignInSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    value={loginEmail}
                    onChange={e => setLoginEmail(e.target.value)}
                    placeholder="you@gmail.com"
                    className="w-full bg-surface-800 border border-surface-700 rounded-2xl px-4 py-3 text-gray-100 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-500/40 transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                  <input
                    type="password"
                    value={loginPassword}
                    onChange={e => setLoginPassword(e.target.value)}
                    placeholder="Your password"
                    className="w-full bg-surface-800 border border-surface-700 rounded-2xl px-4 py-3 text-gray-100 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-500/40 transition"
                  />
                </div>
                <button
                  type="submit"
                  disabled={authenticating || !loginEmail.trim() || !loginPassword.trim()}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-brand-600 px-4 py-3 text-white font-medium transition hover:bg-brand-500 disabled:opacity-50"
                >
                  {authenticating ? (
                    <>
                      <Loader className="w-4 h-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    'Sign in'
                  )}
                </button>
              </form>
              {authError ? (
                <p className="text-center text-rose-400 text-sm mt-4">{authError}</p>
              ) : (
                <p className="text-center text-gray-600 text-xs mt-6 leading-relaxed">
                  <span className="text-white">Personal</span>: password you chose at sign-up.{' '}
                  <span className="text-white">Team demo</span>: <span className="text-gray-400 break-all">{TEAM_GMAIL_EXAMPLES}</span> or admin@gmail.com — any password for demo.
                </p>
              )}
              <p className="text-center text-sm text-gray-500 mt-6">
                New user?{' '}
                <button type="button" className="text-brand-400 hover:text-brand-300 font-medium" onClick={() => { setAuthError(''); setFlow('signup'); }}>
                  Create personal account
                </button>
                <span className="text-gray-600"> — starts in your own space only. Team invites will come later.</span>
              </p>
            </div>
          </div>
        )}

        {flow === 'signup' && (
          <div className="animate-fade-in max-w-md mx-auto">
            <div className="bg-surface-900 border border-surface-700 rounded-3xl p-8 shadow-xl shadow-black/10">
              <button type="button" onClick={() => { setAuthError(''); setFlow('signin'); }} className="text-gray-500 hover:text-white text-sm mb-6 flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to sign in
              </button>
              <div className="mb-8 text-center">
                <h2 className="text-2xl font-semibold text-white">Create personal account</h2>
                <p className="text-gray-400 mt-2 text-sm">You get a personal workspace only, stored in this browser (demo).</p>
              </div>
              <form onSubmit={handleSignupSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Display name</label>
                  <input
                    value={signupName}
                    onChange={e => setSignupName(e.target.value)}
                    placeholder="Your name"
                    className="w-full bg-surface-800 border border-surface-700 rounded-xl px-4 py-3 text-gray-100 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    value={signupEmail}
                    onChange={e => setSignupEmail(e.target.value)}
                    placeholder="you@gmail.com"
                    className="w-full bg-surface-800 border border-surface-700 rounded-xl px-4 py-3 text-gray-100 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                  <input
                    type="password"
                    value={signupPassword}
                    onChange={e => setSignupPassword(e.target.value)}
                    placeholder="At least 4 characters"
                    className="w-full bg-surface-800 border border-surface-700 rounded-xl px-4 py-3 text-gray-100 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Confirm password</label>
                  <input
                    type="password"
                    value={signupConfirm}
                    onChange={e => setSignupConfirm(e.target.value)}
                    className="w-full bg-surface-800 border border-surface-700 rounded-xl px-4 py-3 text-gray-100 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 transition"
                  />
                </div>
                <button
                  type="submit"
                  disabled={authenticating || !signupName.trim() || !signupEmail.trim() || !signupPassword}
                  className="w-full mt-2 inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-4 py-3 text-white font-medium transition hover:bg-emerald-500 disabled:opacity-50"
                >
                  {authenticating ? <Loader className="w-4 h-4 animate-spin" /> : 'Create account'}
                </button>
              </form>
              {authError && <p className="text-center text-rose-400 text-sm mt-4">{authError}</p>}
            </div>
          </div>
        )}

        {flow === 'team_role' && (
          <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-400">
                {gateUser ? `Signed in as ${gateUser.name}. Choose a role for this session.` : 'Select a role to explore the platform'}
              </p>
              <button type="button" onClick={resetToSignin} className="flex items-center gap-2 px-3 py-2 bg-surface-800 border border-surface-700 rounded-lg text-gray-300 hover:text-white hover:border-surface-200 text-sm font-medium transition-all">
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {availableRoles.map(({ role, label, labelJa, desc, icon: Icon, color }) => (
                <button
                  key={role}
                  type="button"
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

        {flow === 'team_profile' && selectedRole && (
          <div className="animate-fade-in">
            <div className="flex items-center gap-3 mb-6">
              <button type="button" onClick={handleBackTeam} className="text-gray-500 hover:text-white transition-colors p-2 rounded-lg hover:bg-surface-800">
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h2 className="text-xl font-semibold text-white">Select {roleInfo?.label} profile</h2>
                <p className="text-gray-500 text-sm">Administrator demo: choose who to impersonate</p>
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
                    type="button"
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

        <p className="text-center text-gray-600 text-xs mt-8">
          CyberConnect &copy; 2026 &mdash; All data shown is for demonstration purposes
        </p>
      </div>
    </div>
  );
}
