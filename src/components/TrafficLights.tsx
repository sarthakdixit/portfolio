/**
 * The classic macOS traffic-light buttons. Decorative — they don't actually
 * close, minimize, or zoom anything. Render symbols on hover of the group like
 * real macOS does (×, −, +).
 */
export function TrafficLights() {
  return (
    <div className="flex gap-[7px] items-center group" aria-hidden="true">
      <Light color="red" symbol="×" />
      <Light color="yellow" symbol="−" />
      <Light color="green" symbol="+" />
    </div>
  );
}

type LightProps = {
  color: 'red' | 'yellow' | 'green';
  symbol: string;
};

function Light({ color, symbol }: LightProps) {
  const colors: Record<LightProps['color'], string> = {
    red: 'bg-[#ff5f57] border-[#e0443e]',
    yellow: 'bg-[#febc2e] border-[#dea123]',
    green: 'bg-[#28c840] border-[#1aab29]',
  };

  return (
    <span
      className={`w-3 h-3 rounded-full border-[0.5px] flex items-center justify-center
                  text-[8px] font-bold text-black/0 group-hover:text-black/70
                  transition-colors leading-none
                  ${colors[color]}`}
    >
      {symbol}
    </span>
  );
}
