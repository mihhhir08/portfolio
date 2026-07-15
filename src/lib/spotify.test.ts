import { describe, it, expect } from "vitest";
import { mapNowPlaying, NOT_PLAYING } from "./spotify";

const track = {
  is_playing: true,
  currently_playing_type: "track",
  item: {
    name: "Midnight City",
    external_urls: { spotify: "https://open.spotify.com/track/abc" },
    album: {
      name: "Hurry Up, We're Dreaming",
      images: [
        { url: "large.jpg", width: 640 },
        { url: "small.jpg", width: 64 },
        { url: "tiny.jpg", width: 32 },
      ],
    },
    artists: [{ name: "M83" }, { name: "Anthony Gonzalez" }],
  },
};

describe("mapNowPlaying", () => {
  it("maps a playing track with joined artists and smallest usable art", () => {
    const r = mapNowPlaying(track);
    expect(r.isPlaying).toBe(true);
    expect(r.title).toBe("Midnight City");
    expect(r.artist).toBe("M83, Anthony Gonzalez");
    expect(r.albumArt).toBe("small.jpg"); // smallest ≥64px, not the 32px one
    expect(r.url).toContain("open.spotify.com");
  });

  it("returns not-playing when paused", () => {
    expect(mapNowPlaying({ ...track, is_playing: false })).toEqual(NOT_PLAYING);
  });

  it("returns not-playing for null/empty payloads", () => {
    expect(mapNowPlaying(null)).toEqual(NOT_PLAYING);
    expect(mapNowPlaying({})).toEqual(NOT_PLAYING);
  });

  it("ignores non-track playback (podcasts/ads)", () => {
    expect(
      mapNowPlaying({ ...track, currently_playing_type: "episode" }),
    ).toEqual(NOT_PLAYING);
  });
});
