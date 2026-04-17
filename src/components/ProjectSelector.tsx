import type { Project } from '../types';
import { FolderOpen, Plus, Circle, Pause, CheckCircle } from 'lucide-react';
import { getUserName } from '../data';

const statusIcon: Record<Project['status'], { icon: typeof Circle; color: string; label: string }> = {
  active: { icon: Circle, color: 'text-emerald-400', label: 'Active' },
  completed: { icon: CheckCircle, color: 'text-brand-400', label: 'Completed' },
  on_hold: { icon: Pause, color: 'text-amber-400', label: 'On Hold' },
};

export function ProjectDashboard({ projects, onSelectProject }: {
  projects: Project[];
  onSelectProject: (id: string) => void;
}) {
  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="max-w-4xl w-full animate-fade-in">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">Projects / プロジェクト</h1>
          <p className="text-gray-500 mt-1">Select a project to manage requirements</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map(project => {
            const st = statusIcon[project.status];
            const StIcon = st.icon;
            return (
              <button
                key={project.id}
                onClick={() => onSelectProject(project.id)}
                className="group relative bg-surface-900 border border-surface-700 rounded-2xl p-5 text-left hover:border-brand-500/50 hover:bg-surface-850 transition-all duration-200"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${project.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <FolderOpen className="w-5 h-5 text-white" />
                  </div>
                  <div className={`flex items-center gap-1.5 text-xs ${st.color}`}>
                    <StIcon className="w-3 h-3" />
                    <span>{st.label}</span>
                  </div>
                </div>
                <h3 className="text-white font-semibold">{project.name}</h3>
                <p className="text-gray-500 text-xs mt-0.5">{project.nameJa}</p>
                <p className="text-gray-400 text-sm mt-2 leading-relaxed">{project.description}</p>
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-surface-700">
                  <span className="text-xs text-gray-500">Client: <span className="text-gray-400">{project.client}</span></span>
                  <span className="text-xs text-gray-500">PM: <span className="text-gray-400">{getUserName(project.pmId)}</span></span>
                </div>
                <div className="absolute inset-0 rounded-2xl ring-2 ring-brand-500 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </button>
            );
          })}

          <button className="group bg-surface-900/50 border-2 border-dashed border-surface-700 rounded-2xl p-5 text-left hover:border-brand-500/30 hover:bg-surface-850/50 transition-all duration-200 flex flex-col items-center justify-center min-h-[180px]">
            <div className="w-10 h-10 rounded-xl bg-surface-800 border border-surface-700 flex items-center justify-center mb-3 group-hover:border-brand-500/30 transition-colors">
              <Plus className="w-5 h-5 text-gray-500 group-hover:text-brand-400" />
            </div>
            <span className="text-gray-500 text-sm font-medium group-hover:text-gray-300">New Project</span>
            <span className="text-gray-600 text-xs mt-0.5">新規プロジェクト</span>
          </button>
        </div>
      </div>
    </div>
  );
}
