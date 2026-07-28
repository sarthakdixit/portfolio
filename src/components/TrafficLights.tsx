/**
 * The classic macOS traffic-light buttons. Decorative — they don't actually
 * close, minimize, or zoom anything.
 */
export function TrafficLights() {
  return (
    <div className="flex gap-[7px] items-center" aria-hidden="true">
      <Light color="red" />
      <Light color="yellow" />
      <Light color="green" />
    </div>
  );
}

type LightProps = {
  color: 'red' | 'yellow' | 'green';
};

function Light({ color }: LightProps) {
  const colors: Record<LightProps['color'], string> = {
    red: 'bg-[#ff5f57] border-[#e0443e]',
    yellow: 'bg-[#febc2e] border-[#dea123]',
    green: 'bg-[#28c840] border-[#1aab29]',
  };

  return <span className={`w-3 h-3 rounded-full border-[0.5px] ${colors[color]}`} />;
}
