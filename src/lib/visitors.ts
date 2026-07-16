// Visitor counter, ported from v1 main.js. counterapi.dev backend with a
// deterministic date-based fallback. Seed 312 = count at 2026-07-05 launch.

const SEED = 312;
const LAUNCH = Date.UTC(2026, 6, 5);
const API = "https://api.counterapi.dev/v1/mihirsinhchavda/portfolio";

export function fallbackCount(now: number, launch = LAUNCH): number {
  const days = Math.max(0, Math.floor((now - launch) / 864e5));
  return SEED + days * 7 + (days % 4) * 2 + 1;
}

export async function getVisitorCount(
  alreadyVisited: boolean,
  now: () => number = Date.now
): Promise<number> {
  try {
    // trailing slash on the plain read avoids a 301 that a bare-path GET
    // otherwise incurs (the API redirects "/portfolio" -> "/portfolio/")
    const res = await fetch(alreadyVisited ? `${API}/` : `${API}/up`);
    const data = (await res.json()) as { count?: number };
    return SEED + (data.count || 0);
  } catch {
    return fallbackCount(now());
  }
}
