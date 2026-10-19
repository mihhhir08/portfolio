import type { PipelineStep } from "@/lib/case-studies";

// Stages run left to right on desktop and top to bottom on mobile, so the
// connector has to rotate with them: one chevron, turned by 90deg under md.
export default function Pipeline({ steps }: { steps: PipelineStep[] }) {
  return (
    <ol className="flex flex-col items-stretch gap-2 md:flex-row md:items-center">
      {steps.map((s, i) => (
        <li
          key={s.label}
          className="flex flex-col items-stretch gap-2 md:flex-1 md:flex-row md:items-center"
        >
          <div className="flex-1 rounded-lg border border-hairline px-4 py-3">
            <span className="block text-sm font-medium text-fg">
              {s.label}
            </span>
            <span className="mt-1 block text-xs leading-snug text-muted">
              {s.sub}
            </span>
          </div>
          {i < steps.length - 1 && (
            <span
              aria-hidden="true"
              className="mx-auto rotate-90 text-sm text-muted md:mx-1 md:rotate-0"
            >
              &rsaquo;
            </span>
          )}
        </li>
      ))}
    </ol>
  );
}
