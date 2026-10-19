import TechTag from "@/components/TechTag";

const STACK = [
  "TypeScript",
  "JavaScript",
  "HTML",
  "CSS",
  "React",
  "Next.js",
  "Node",
  "Python",
  "PostgreSQL",
  "Supabase",
  "MongoDB",
  "Claude",
  "ChatGPT Codex",
  "Cursor",
  "VS Code",
  "GitHub",
  "LLM APIs",
  "RAG",
  "embeddings",
];

export default function StackCard() {
  return (
    <div className="flex h-full flex-col">
      <h2 className="card-title">Tools I use</h2>
      <div className="mt-4 flex flex-wrap gap-2">
        {STACK.map((name) => (
          <TechTag key={name} name={name} />
        ))}
      </div>
    </div>
  );
}
