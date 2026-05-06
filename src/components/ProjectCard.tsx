import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';
import type { Project } from '@/data/types';

type ProjectCardProps = {
  project: Project;
  index: number;
};

export function ProjectCard({ project, index }: ProjectCardProps) {
  // The demo icon is a separate button that opens its own URL and stops
  // propagation so the parent card link doesn't also fire. This avoids
  // nesting an <a> inside an <a>, which is invalid HTML.
  const handleDemoClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    if (project.demo) {
      window.open(project.demo, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <motion.a
      href={project.repo}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ y: -2 }}
      className="mac-card group block w-full
                 hover:bg-white/85 dark:hover:bg-zinc-800/70
                 rounded-xl p-4 transition-colors"
    >
      <div className="flex items-start justify-between mb-1.5">
        <h4 className="font-semibold text-[14px] tracking-tight flex items-center gap-1.5">
          {project.title}
          {project.featured && (
            <span
              className="text-[9px] font-medium px-1.5 py-0.5 rounded
                         bg-emerald-100 dark:bg-emerald-900/40
                         text-emerald-700 dark:text-emerald-300 uppercase tracking-wider"
            >
              featured
            </span>
          )}
        </h4>

        <div className="flex items-center gap-1.5 text-zinc-400">
          {/* GitHub icon — the whole card is the link, this is just an indicator */}
          <span
            title="View on GitHub"
            aria-hidden="true"
            className="group-hover:text-zinc-700 dark:group-hover:text-zinc-200 transition-colors"
          >
            <Github size={14} />
          </span>

          {/* Live demo icon — only when project.demo is set */}
          {project.demo && (
            <button
              type="button"
              onClick={handleDemoClick}
              aria-label={`Open ${project.title} live demo`}
              title="Live demo"
              className="text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors
                         rounded focus:outline-none focus:ring-2 focus:ring-blue-500/40"
            >
              <ExternalLink size={14} />
            </button>
          )}
        </div>
      </div>

      <p className="text-[13px] text-zinc-700 dark:text-zinc-400 mb-2.5 leading-relaxed">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-1">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="text-[10px] font-medium px-1.5 py-0.5 rounded
                       bg-black/5 dark:bg-white/5
                       text-zinc-700 dark:text-zinc-300"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.a>
  );
}
