// Visitor counter backed by Upstash Redis over its REST API (no client library).
// GET reads the count, POST increments it. VISITOR_BASE carries the real
// pre-Upstash pageview total from Vercel Analytics so the number continues
// from actual traffic rather than restarting at zero.

export const dynamic = "force-dynamic";

const REST_URL = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
const REST_TOKEN =
  process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;

const KEY = "portfolio:visits";
const BASE = Number(process.env.VISITOR_BASE ?? 0);

async function redis(command: "get" | "incr"): Promise<number> {
  if (!REST_URL || !REST_TOKEN) throw new Error("visitor store not configured");

  const res = await fetch(`${REST_URL}/${command}/${KEY}`, {
    headers: { Authorization: `Bearer ${REST_TOKEN}` },
    cache: "no-store",
  });

  // fetch does not throw on 4xx/5xx — check explicitly, or a dead backend
  // silently reads as a count of zero (this is what broke the old counter)
  if (!res.ok) throw new Error(`upstash responded ${res.status}`);

  const data = (await res.json()) as { result?: number | string | null };
  return Number(data.result ?? 0) || 0;
}

async function respond(command: "get" | "incr") {
  try {
    return Response.json({ count: BASE + (await redis(command)) });
  } catch {
    // 503 tells the client to render nothing rather than invent a number
    return new Response(null, { status: 503 });
  }
}

export const GET = () => respond("get");
export const POST = () => respond("incr");
