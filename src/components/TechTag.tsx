import { TECH_ICONS } from "@/lib/tech-icons";

export default function TechTag({ name }: { name: string }) {
  const path = TECH_ICONS[name];
  return (
    <span className="group/tag inline-flex items-center gap-1.5 rounded-full border border-hairline px-3 py-1 font-mono text-xs text-muted transition-colors duration-200 hover:border-accent hover:text-fg">
      {path && (
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
          className="transition-colors duration-200 group-hover/tag:fill-accent"
        >
          <path d={path} />
        </svg>
      )}
      {name}
    </span>
  );
}
