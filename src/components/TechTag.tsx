import { TECH_ICONS } from "@/lib/tech-icons";

// Near-black brand marks (Next.js, SQLite…) vanish on the dark theme —
// those fall back to currentColor, which flips with the theme.
function isDark(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  const r = (n >> 16) & 255,
    g = (n >> 8) & 255,
    b = n & 255;
  return 0.2126 * r + 0.7152 * g + 0.0722 * b < 60;
}

export default function TechTag({ name }: { name: string }) {
  const icon = TECH_ICONS[name];
  return (
    <span className="inline-flex items-center gap-2 rounded-xl border border-hairline bg-bg/40 px-4 py-2 font-mono text-[13px] text-muted transition-all duration-200 hover:-translate-y-0.5 hover:border-hairline-bright hover:text-fg">
      {icon && (
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          aria-hidden="true"
          className={isDark(icon.hex) ? "fill-fg" : undefined}
          style={isDark(icon.hex) ? undefined : { fill: icon.hex }}
        >
          <path d={icon.path} />
        </svg>
      )}
      {name}
    </span>
  );
}
