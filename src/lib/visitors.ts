// Visitor counter client. Talks to /api/visitors, which owns the Redis store.
// Returns null when the count is unavailable — the footer then renders nothing
// rather than showing a number that isn't a real count.

export async function getVisitorCount(
  alreadyVisited: boolean
): Promise<number | null> {
  try {
    const res = await fetch("/api/visitors", {
      method: alreadyVisited ? "GET" : "POST",
      cache: "no-store",
    });

    // fetch only rejects on network failure, never on 4xx/5xx
    if (!res.ok) return null;

    const data = (await res.json()) as { count?: unknown };
    return typeof data.count === "number" ? data.count : null;
  } catch {
    return null;
  }
}
