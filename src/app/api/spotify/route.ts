import { NextResponse } from "next/server";
import { fetchNowPlaying } from "@/lib/spotify";

export const dynamic = "force-dynamic";

export async function GET() {
  const now = await fetchNowPlaying();
  return NextResponse.json(now, {
    headers: {
      // let Vercel's edge absorb the 30s polling across all visitors
      "Cache-Control": "public, s-maxage=30, stale-while-revalidate=15",
    },
  });
}
