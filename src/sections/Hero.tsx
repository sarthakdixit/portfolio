import { motion } from 'framer-motion';
import { Window } from '@/components/Window';
import { MLGraphs } from '@/components/MLGraphs';
import { SocialLinks } from '@/components/SocialLinks';
import { profile, labels } from '@/data';

export function Hero() {
  return (
    <Window id="about" title="about.app">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 sm:grid-cols-[1.4fr_1fr] gap-6 items-center mb-6"
      >
        <div>
          {profile.available && (
            <p className="flex items-center gap-1.5 text-[12px] font-medium text-emerald-700 dark:text-emerald-400 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
              {labels.availableBadge.replace(/^\/\/\s*/, '')}
            </p>
          )}

          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight leading-[1.05] mb-2">
            {profile.name}
          </h1>

          <p className="text-base sm:text-lg text-zinc-700 dark:text-zinc-300 mb-3 tracking-tight">
            {profile.tagline}
            <span
              className="inline-block w-[8px] h-[1.05em] bg-zinc-800 dark:bg-zinc-200
                         ml-1 -mb-0.5 animate-caret-blink"
              aria-hidden="true"
            />
          </p>

          <p className="text-[13px] text-zinc-700 dark:text-zinc-300 leading-relaxed mb-3.5">
            {profile.bio}
          </p>

          <div className="flex flex-wrap gap-1.5">
            {profile.skills.map((skill) => (
              <span
                key={skill}
                className="text-[11px] font-medium px-2.5 py-0.5 rounded-full
                           bg-black/5 dark:bg-white/10
                           text-zinc-800 dark:text-zinc-200"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="hidden sm:block">
          <MLGraphs />
        </div>
      </motion.div>

      <SocialLinks links={profile.links} />
    </Window>
  );
}
