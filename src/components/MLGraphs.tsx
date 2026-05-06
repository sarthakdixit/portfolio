import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

type GraphKind = 'loss-curve' | 'neural-net' | 'decision-boundary';

const GRAPH_ORDER: readonly GraphKind[] = ['loss-curve', 'neural-net', 'decision-boundary'];
const CYCLE_INTERVAL_MS = 5000;

export function MLGraphs() {
  const [graph, setGraph] = useState<GraphKind>('loss-curve');
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;
    const id = window.setInterval(() => {
      setGraph((current) => {
        const i = GRAPH_ORDER.indexOf(current);
        return GRAPH_ORDER[(i + 1) % GRAPH_ORDER.length] ?? 'loss-curve';
      });
    }, CYCLE_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [prefersReducedMotion]);

  return (
    <div
      className="relative aspect-square w-full max-w-xs mx-auto rounded-xl
                 mac-card
                 flex items-center justify-center overflow-hidden"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={graph}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0 p-6"
        >
          {graph === 'loss-curve' && <LossCurve />}
          {graph === 'neural-net' && <NeuralNet />}
          {graph === 'decision-boundary' && <DecisionBoundary />}
        </motion.div>
      </AnimatePresence>

      <span
        className="absolute bottom-3 left-3 z-10 font-mono text-[10px] uppercase tracking-wider
                   text-zinc-500 dark:text-zinc-400"
      >
        ./{graph}
      </span>
    </div>
  );
}

/* ---------- graphs ---------- */

const AXIS_CLASS = 'stroke-zinc-400 dark:stroke-zinc-600';
const GRID_CLASS = 'stroke-zinc-300 dark:stroke-zinc-700';
const TEXT_CLASS = 'fill-zinc-500 dark:fill-zinc-400 font-mono';

function LossCurve() {
  return (
    <svg
      viewBox="0 0 200 200"
      className="w-full h-full"
      role="img"
      aria-label="Training and validation loss curves over epochs."
    >
      {/* axes */}
      <line x1="20" y1="170" x2="180" y2="170" className={AXIS_CLASS} strokeWidth="0.5" />
      <line x1="20" y1="20" x2="20" y2="170" className={AXIS_CLASS} strokeWidth="0.5" />
      {/* gridlines */}
      <line x1="20" y1="60" x2="180" y2="60" className={GRID_CLASS} strokeWidth="0.5" strokeDasharray="2 2" />
      <line x1="20" y1="100" x2="180" y2="100" className={GRID_CLASS} strokeWidth="0.5" strokeDasharray="2 2" />
      <line x1="20" y1="140" x2="180" y2="140" className={GRID_CLASS} strokeWidth="0.5" strokeDasharray="2 2" />

      {/* training loss (animated draw) */}
      <motion.path
        d="M 25 35 Q 45 50 65 75 T 105 115 Q 130 138 155 152 L 175 158"
        fill="none"
        className="stroke-emerald-500"
        strokeWidth="1.8"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, ease: 'easeOut' }}
      />
      {/* validation loss */}
      <motion.path
        d="M 25 38 Q 45 55 65 80 T 105 122 Q 130 142 155 148 L 175 145"
        fill="none"
        className="stroke-orange-500"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeDasharray="3 2"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2.3, ease: 'easeOut' }}
      />

      {/* axis labels */}
      <text x="100" y="14" textAnchor="middle" fontSize="9" className={TEXT_CLASS}>
        loss
      </text>
      <text x="100" y="190" textAnchor="middle" fontSize="9" className={TEXT_CLASS}>
        epoch
      </text>

      {/* legend */}
      <g transform="translate(110, 28)">
        <line x1="0" y1="0" x2="10" y2="0" className="stroke-emerald-500" strokeWidth="1.8" />
        <text x="14" y="3" fontSize="8" className={TEXT_CLASS}>
          train
        </text>
        <line
          x1="40"
          y1="0"
          x2="50"
          y2="0"
          className="stroke-orange-500"
          strokeWidth="1.8"
          strokeDasharray="3 2"
        />
        <text x="54" y="3" fontSize="8" className={TEXT_CLASS}>
          val
        </text>
      </g>
    </svg>
  );
}

function NeuralNet() {
  // 3 → 4 → 2 fully connected
  const layer1 = [
    { x: 50, y: 60 },
    { x: 50, y: 100 },
    { x: 50, y: 140 },
  ];
  const layer2 = [
    { x: 100, y: 50 },
    { x: 100, y: 85 },
    { x: 100, y: 120 },
    { x: 100, y: 155 },
  ];
  const layer3 = [
    { x: 150, y: 80 },
    { x: 150, y: 125 },
  ];

  const edges12 = layer1.flatMap((a) => layer2.map((b) => ({ a, b })));
  const edges23 = layer2.flatMap((a) => layer3.map((b) => ({ a, b })));

  return (
    <svg
      viewBox="0 0 200 200"
      className="w-full h-full"
      role="img"
      aria-label="A small neural network with three layers and pulsing connections."
    >
      {/* edges layer 1 -> 2 */}
      {edges12.map((e, i) => (
        <motion.line
          key={`e12-${i}`}
          x1={e.a.x}
          y1={e.a.y}
          x2={e.b.x}
          y2={e.b.y}
          className="stroke-emerald-500"
          strokeWidth="0.6"
          initial={{ opacity: 0.2 }}
          animate={{ opacity: [0.2, 0.85, 0.2] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: (i % 4) * 0.1,
            ease: 'easeInOut',
          }}
        />
      ))}
      {/* edges layer 2 -> 3 */}
      {edges23.map((e, i) => (
        <motion.line
          key={`e23-${i}`}
          x1={e.a.x}
          y1={e.a.y}
          x2={e.b.x}
          y2={e.b.y}
          className="stroke-violet-500"
          strokeWidth="0.6"
          initial={{ opacity: 0.2 }}
          animate={{ opacity: [0.2, 0.9, 0.2] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: 0.6 + (i % 4) * 0.1,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* nodes */}
      {[...layer1, ...layer2, ...layer3].map((n, i) => (
        <motion.circle
          key={i}
          cx={n.x}
          cy={n.y}
          r="6"
          className="fill-emerald-500/20 stroke-emerald-500"
          strokeWidth="1"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3, delay: i * 0.04 }}
          style={{ transformOrigin: `${n.x}px ${n.y}px` }}
        />
      ))}

      <text x="100" y="14" textAnchor="middle" fontSize="9" className={TEXT_CLASS}>
        forward pass
      </text>
    </svg>
  );
}

function DecisionBoundary() {
  // Two clusters
  const classA = [
    { x: 45, y: 55 },
    { x: 60, y: 40 },
    { x: 38, y: 80 },
    { x: 70, y: 60 },
    { x: 55, y: 90 },
    { x: 80, y: 45 },
    { x: 42, y: 105 },
    { x: 75, y: 78 },
    { x: 95, y: 55 },
  ];
  const classB = [
    { x: 135, y: 120 },
    { x: 150, y: 140 },
    { x: 125, y: 155 },
    { x: 160, y: 125 },
    { x: 145, y: 160 },
    { x: 115, y: 135 },
    { x: 170, y: 155 },
    { x: 130, y: 170 },
    { x: 155, y: 105 },
  ];

  return (
    <svg
      viewBox="0 0 200 200"
      className="w-full h-full"
      role="img"
      aria-label="Scatter plot of two classes with a curved decision boundary."
    >
      <line x1="20" y1="180" x2="180" y2="180" className={AXIS_CLASS} strokeWidth="0.5" />
      <line x1="20" y1="20" x2="20" y2="180" className={AXIS_CLASS} strokeWidth="0.5" />

      {/* decision boundary */}
      <motion.path
        d="M 30 40 Q 80 90 100 110 T 175 175"
        fill="none"
        className="stroke-violet-500"
        strokeWidth="1.5"
        strokeDasharray="4 2"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      />

      {/* class A points */}
      {classA.map((p, i) => (
        <motion.circle
          key={`a-${i}`}
          cx={p.x}
          cy={p.y}
          r="3"
          className="fill-emerald-500"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3, delay: i * 0.04 }}
          style={{ transformOrigin: `${p.x}px ${p.y}px` }}
        />
      ))}
      {/* class B points */}
      {classB.map((p, i) => (
        <motion.circle
          key={`b-${i}`}
          cx={p.x}
          cy={p.y}
          r="3"
          className="fill-orange-500"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.4 + i * 0.04 }}
          style={{ transformOrigin: `${p.x}px ${p.y}px` }}
        />
      ))}

      <text x="100" y="14" textAnchor="middle" fontSize="9" className={TEXT_CLASS}>
        classifier
      </text>
    </svg>
  );
}
