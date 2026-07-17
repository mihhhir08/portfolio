import type { NextConfig } from "next";

// Content-Security-Policy, assembled per-directive for readability.
// Scope notes:
//  - script/style 'unsafe-inline': Next's hydration bootstrap + our inline
//    theme-init script + Tailwind/inline styles need it. There is no XSS sink
//    on this site (no user input is rendered as markup), so this is a
//    defensible tradeoff vs. nonce middleware, which would force dynamic
//    rendering and drop static caching. Revisit if a form/CMS is ever added.
//  - connect-src: client-side fetches go to GitHub (stars) and counterapi
//    (visitors); Vercel Analytics + the Spotify proxy are same-origin ('self').
//    Spotify's own API is only ever called server-side, so it is absent here.
//  - img-src data:/blob: covers next/image and canvas-derived pixels.
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "connect-src 'self' https://api.github.com https://api.counterapi.dev",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  { key: "X-DNS-Prefetch-Control", value: "on" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false, // drop the "X-Powered-By: Next.js" fingerprint
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
