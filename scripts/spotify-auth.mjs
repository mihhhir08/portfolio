// One-shot helper: prints your Spotify refresh token.
//
// Mode A (loopback server, default):
//   Redirect URI in Spotify app settings: http://127.0.0.1:8877/callback
//   Run: SPOTIFY_CLIENT_ID=xxx SPOTIFY_CLIENT_SECRET=yyy node scripts/spotify-auth.mjs
//
// Mode B (paste mode — use when the dashboard rejects the loopback URI):
//   Redirect URI in Spotify app settings: https://mihirsinhchavda.com/spotify-callback
//   Run: SPOTIFY_CLIENT_ID=xxx SPOTIFY_CLIENT_SECRET=yyy \
//        REDIRECT_URI=https://mihirsinhchavda.com/spotify-callback node scripts/spotify-auth.mjs
//   Approve in the browser, land on a 404 page (that's fine), copy the FULL URL
//   from the address bar, paste it into the terminal.
import http from "node:http";
import readline from "node:readline";

const id = process.env.SPOTIFY_CLIENT_ID;
const secret = process.env.SPOTIFY_CLIENT_SECRET;
if (!id || !secret) {
  console.error("Set SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET env vars first.");
  process.exit(1);
}

const REDIRECT = process.env.REDIRECT_URI || "http://127.0.0.1:8877/callback";

async function exchange(code) {
  const tokenRes = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${id}:${secret}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: REDIRECT,
    }),
  });
  const data = await tokenRes.json();
  if (!data.refresh_token) {
    console.error("Exchange failed:", JSON.stringify(data));
    process.exit(1);
  }
  console.log("\nSPOTIFY_REFRESH_TOKEN=" + data.refresh_token + "\n");
  process.exit(0);
}
const authUrl =
  "https://accounts.spotify.com/authorize?" +
  new URLSearchParams({
    client_id: id,
    response_type: "code",
    redirect_uri: REDIRECT,
    scope: "user-read-currently-playing",
  });

if (REDIRECT.startsWith("http://127.0.0.1")) {
  // Mode A: catch the redirect on a local loopback server
  http
    .createServer(async (req, res) => {
      const url = new URL(req.url, REDIRECT);
      if (url.pathname !== "/callback") return res.end();
      res.end("Done — check your terminal. You can close this tab.");
      await exchange(url.searchParams.get("code"));
    })
    .listen(8877, () => {
      console.log("\nOpen this URL in your browser and approve access:\n\n" + authUrl + "\n");
    });
} else {
  // Mode B: user pastes the URL they landed on after approving
  console.log("\n1. Open this URL in your browser and approve access:\n\n" + authUrl);
  console.log("\n2. You'll land on a 404 page — that's expected.");
  console.log("3. Copy the FULL URL from the address bar and paste it here.\n");
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  rl.question("Paste redirected URL: ", async (answer) => {
    rl.close();
    const code = new URL(answer.trim()).searchParams.get("code");
    if (!code) {
      console.error("No ?code= found in that URL — paste the entire address bar contents.");
      process.exit(1);
    }
    await exchange(code);
  });
}
