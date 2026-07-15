// Server-only Spotify helpers. Secrets live in env vars, never shipped to the client.

export type NowPlaying = {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  album?: string;
  albumArt?: string;
  url?: string;
};

type SpotifyTrackResponse = {
  is_playing?: boolean;
  currently_playing_type?: string;
  item?: {
    name?: string;
    external_urls?: { spotify?: string };
    album?: { name?: string; images?: { url: string; width: number }[] };
    artists?: { name: string }[];
  } | null;
};

export const NOT_PLAYING: NowPlaying = { isPlaying: false };

/** Map Spotify's currently-playing payload to the shape the card renders. Pure, testable. */
export function mapNowPlaying(data: SpotifyTrackResponse | null): NowPlaying {
  if (!data?.item || !data.is_playing) return NOT_PLAYING;
  if (data.currently_playing_type && data.currently_playing_type !== "track")
    return NOT_PLAYING;
  const images = data.item.album?.images ?? [];
  // smallest image ≥64px keeps the payload light
  const art =
    [...images].sort((a, b) => a.width - b.width).find((i) => i.width >= 64) ??
    images[0];
  return {
    isPlaying: true,
    title: data.item.name,
    artist: (data.item.artists ?? []).map((a) => a.name).join(", "),
    album: data.item.album?.name,
    albumArt: art?.url,
    url: data.item.external_urls?.spotify,
  };
}

export async function fetchNowPlaying(): Promise<NowPlaying> {
  const id = process.env.SPOTIFY_CLIENT_ID;
  const secret = process.env.SPOTIFY_CLIENT_SECRET;
  const refresh = process.env.SPOTIFY_REFRESH_TOKEN;
  if (!id || !secret || !refresh) return NOT_PLAYING;

  try {
    const tokenRes = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`${id}:${secret}`).toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refresh,
      }),
      cache: "no-store",
    });
    if (!tokenRes.ok) return NOT_PLAYING;
    const { access_token } = await tokenRes.json();

    const res = await fetch(
      "https://api.spotify.com/v1/me/player/currently-playing",
      { headers: { Authorization: `Bearer ${access_token}` }, cache: "no-store" },
    );
    if (res.status === 204 || !res.ok) return NOT_PLAYING;
    return mapNowPlaying(await res.json());
  } catch {
    return NOT_PLAYING;
  }
}
