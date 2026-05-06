import { motion } from 'framer-motion';
import { Window } from '@/components/Window';
import { experience, labels } from '@/data';

export function Experience() {
  return (
    <Window id="experience" title="experience.app">
      <h3 className="text-[17px] font-semibold tracking-tight mb-5">
        {capitalize(labels.experienceTitle)}
      </h3>

      <ol className="relative pl-5">
        <span
          className="absolute left-[5px] top-2 bottom-2 w-px bg-black/10 dark:bg-white/15"
          aria-hidden="true"
        />

        {experience.map((item, i) => (
          <motion.li
            key={`${item.company}-${item.period}`}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            className="relative pb-5 last:pb-0"
          >
            <span
              className={`absolute -left-[18px] top-1.5 w-2.5 h-2.5 rounded-full
                          ${
                            item.current
                              ? 'bg-emerald-500 ring-4 ring-emerald-500/20'
                              : 'bg-zinc-400 dark:bg-zinc-600'
                          }`}
              aria-hidden="true"
            />

            <h4 className="text-[14px] font-semibold tracking-tight">
              {item.company}
              <span className="text-zinc-500 dark:text-zinc-400 font-normal"> · {item.role}</span>
            </h4>
            <p className="text-[12px] text-zinc-600 dark:text-zinc-400 mt-0.5 mb-1.5 font-medium">
              {item.period}
            </p>
            <p className="text-[13px] text-zinc-700 dark:text-zinc-300 leading-relaxed">
              {item.description}
            </p>
          </motion.li>
        ))}
      </ol>
    </Window>
  );
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
