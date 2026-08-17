import ProjectCard from "@/components/ProjectCard";
import { PROJECTS } from "@/lib/content";

// The lead project runs full-width; the rest fill a 2-column grid.
// Keep PROJECTS an ODD length so the grid below never leaves a gap.
export default function WorkSection() {
  const [lead, ...rest] = PROJECTS;

  return (
    <div>
      <p className="font-mono text-xs tracking-widest text-muted uppercase">
        the work
      </p>
      <div className="mt-6">
        <ProjectCard project={lead} featured />
      </div>
      <div className="mt-10 grid grid-cols-1 gap-8 border-t border-hairline pt-10 md:grid-cols-2 md:gap-6">
        {rest.map((p) => (
          <ProjectCard key={p.name} project={p} />
        ))}
      </div>
    </div>
  );
}
