import TechTag from "@/components/TechTag";

const STACK = [
  "TypeScript",
  "React",
  "Next.js",
  "Node",
  "Python",
  "PostgreSQL",
  "Supabase",
  "MongoDB",
  "Claude",
  "Codex",
  "Cursor",
  "LLM APIs",
  "RAG",
  "embeddings",
];

export default function StackCard() {
  return (
    <div className="flex h-full flex-col justify-center">
      <p className="font-mono text-xs tracking-widest text-muted uppercase">
        the tools
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {STACK.map((name) => (
          <TechTag key={name} name={name} />
        ))}
      </div>
    </div>
  );
}
