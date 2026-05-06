import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { Window } from '@/components/Window';
import { ProjectCard } from '@/components/ProjectCard';
import { useProjectSearch } from '@/hooks/useProjectSearch';
import { projects, labels } from '@/data';

export function Projects() {
  const [query, setQuery] = useState('');
  const filteredProjects = useProjectSearch(projects, query);

  return (
    <Window id="projects" title="projects.app">
      <div className="flex items-center justify-between mb-5 gap-3">
        <h3 className="text-[17px] font-semibold tracking-tight">
          {capitalize(labels.projectsTitle)}
        </h3>
        <SearchInput
          value={query}
          onChange={setQuery}
          placeholder={labels.projectsSearchPlaceholder}
        />
      </div>

      {filteredProjects.length === 0 ? (
        <div
          className="text-center py-10 text-sm text-zinc-600 dark:text-zinc-400
                     bg-black/5 dark:bg-white/5 rounded-xl"
        >
          {labels.projectsEmptyState}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {filteredProjects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      )}
    </Window>
  );
}

/* ---------- subcomponents ---------- */

type SearchInputProps = {
  value: string;
  onChange: (next: string) => void;
  placeholder: string;
};

function SearchInput({ value, onChange, placeholder }: SearchInputProps) {
  return (
    <div className="relative w-40 sm:w-64">
      <Search
        size={13}
        className="absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none"
        aria-hidden="true"
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Search projects by tech"
        className="w-full h-7 pl-7 pr-7 rounded-md text-[13px]
                   bg-black/5 dark:bg-white/10
                   border-0
                   focus:outline-none focus:ring-2 focus:ring-blue-500/50
                   placeholder:text-zinc-500 dark:placeholder:text-zinc-400
                   transition-colors"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          aria-label="Clear search"
          className="absolute right-1.5 top-1/2 -translate-y-1/2
                     w-4 h-4 rounded-full bg-zinc-400/60 hover:bg-zinc-500/80
                     flex items-center justify-center text-white transition-colors"
        >
          <X size={10} strokeWidth={3} />
        </button>
      )}
    </div>
  );
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
