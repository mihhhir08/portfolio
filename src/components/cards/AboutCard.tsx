import { ABOUT_TEXT } from "@/lib/content";

export default function AboutCard() {
  return (
    <div>
      <p className="font-mono text-xs tracking-widest text-muted uppercase">
        about
      </p>
      <p className="mt-4 max-w-prose text-sm leading-relaxed">{ABOUT_TEXT}</p>
    </div>
  );
}
