import { track } from "@vercel/analytics";

// Vercel Web Analytics groups by event name, so names stay few and fixed
// and everything that varies rides in a property. Three names cover the
// whole site: what got seen, what got clicked, what got found.

export const sectionView = (section: string) =>
  track("section_view", { section });

export const linkClick = (name: string, detail?: string) =>
  track("link_click", detail ? { name, detail } : { name });

export const easterEgg = (kind: string) => track("easter_egg", { kind });
