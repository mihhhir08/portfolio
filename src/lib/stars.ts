// Client-side GitHub star counts, cached in localStorage for 1h so the
// unauthenticated API rate limit (60 req/h/IP) is never a problem.

const TTL = 3600_000;

export async function fetchStars(
  repo: string,
  now: () => number = Date.now,
  storage: Storage | undefined = typeof localStorage === "undefined"
    ? undefined
    : localStorage
): Promise<number | null> {
  const key = `stars:${repo}`;
  try {
    const cached = storage?.getItem(key);
    if (cached) {
      const { v, t } = JSON.parse(cached) as { v: number; t: number };
      if (now() - t <= TTL) return v;
    }
  } catch {
    /* corrupt cache — fall through to fetch */
  }
  try {
    const res = await fetch(`https://api.github.com/repos/${repo}`);
    if (!res.ok) return null;
    const data = (await res.json()) as { stargazers_count?: number };
    const v = data.stargazers_count;
    if (typeof v !== "number") return null;
    try {
      storage?.setItem(key, JSON.stringify({ v, t: now() }));
    } catch {
      /* storage full/private — fine, just uncached */
    }
    return v;
  } catch {
    return null;
  }
}
