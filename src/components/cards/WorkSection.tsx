import ProjectCard from "@/components/ProjectCard";
import { PROJECTS } from "@/lib/content";

export default function WorkSection() {
  return (
    <div>
      <p className="font-mono text-xs tracking-widest text-muted uppercase">
        work
      </p>
      <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-6">
        {PROJECTS.map((p) => (
          <ProjectCard key={p.name} project={p} />
        ))}
      </div>
    </div>
  );
}
