import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/react";
import { SITE, SOCIALS, HERO_STACK, PROJECTS } from "@/lib/content";
import "./globals.css";

const clashDisplay = localFont({
  src: [
    { path: "../fonts/clash-500.woff2", weight: "500" },
    { path: "../fonts/clash-600.woff2", weight: "600" },
    { path: "../fonts/clash-700.woff2", weight: "700" },
  ],
  variable: "--font-clash",
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  // template puts the name on every sub-page title, so case studies read
  // "Continuity · case study · Mihirsinh Chavda" in results
  title: {
    default: "Mihirsinh Chavda · Software Engineer",
    template: "%s · Mihirsinh Chavda",
  },
  description:
    "Software engineer. I ship AI products end to end: Continuity, rewind, Boostlane, Earnings Delta. Open source, LLM pipelines, TypeScript.",
  applicationName: "Mihirsinh Chavda",
  authors: [{ name: "Mihirsinh Chavda", url: SITE }],
  creator: "Mihirsinh Chavda",
  publisher: "Mihirsinh Chavda",
  alternates: { canonical: "/" },
  // without max-image-preview:large Google defaults to "standard" and shows a
  // thumbnail instead of the full preview image
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    url: `${SITE}/`,
    title: "Mihirsinh Chavda · Software Engineer",
    description:
      "I ship AI products end to end. Continuity, rewind, Boostlane, Earnings Delta.",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 675,
        type: "image/jpeg",
        alt: "Mihirsinh Chavda — Software Engineer building AI products",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@mihirrr_08",
    creator: "@mihirrr_08",
    title: "Mihirsinh Chavda · Software Engineer",
    description:
      "I ship AI products end to end. Continuity, rewind, Boostlane, Earnings Delta.",
    images: ["/og.jpg"],
  },
};

const themeInit = `(function(){try{var t=localStorage.getItem("theme");if(t!=="dark"&&t!=="light")t=matchMedia("(prefers-color-scheme: light)").matches?"light":"dark";document.documentElement.dataset.theme=t;}catch(e){document.documentElement.dataset.theme="dark";}})();`;

// Runs before hydration so skip-visitors (seen it this session, reduced
// motion) never get a flash of the overlay — the server can't know
// sessionStorage/matchMedia, so it always renders the overlay markup;
// this hides it via CSS before the browser's first paint.
const preloaderInit = `(function(){try{var s=sessionStorage.getItem("seen")==="1";if(!s&&matchMedia("(prefers-reduced-motion: reduce)").matches)s=true;if(s)document.documentElement.dataset.skipPreloader="1";}catch(e){}})();`;

// One @graph with stable @ids instead of three loose blobs, so crawlers and
// answer engines resolve Person / WebSite / ProfilePage as one linked entity
// rather than three unrelated ones. knowsAbout is built from the real stack
// and project tags — no invented credentials.
const knowsAbout = [
  ...new Set([...HERO_STACK, ...PROJECTS.flatMap((p) => p.tags)]),
].sort();

const siteLd = JSON.stringify({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE}/#person`,
      name: "Mihirsinh Chavda",
      alternateName: "Mihir",
      jobTitle: "Software Engineer",
      description:
        "Software engineer who ships AI products end to end — LLM pipelines, developer tooling, and open-source systems in TypeScript.",
      url: SITE,
      image: `${SITE}/photo.jpg`,
      knowsAbout,
      sameAs: [SOCIALS.github, SOCIALS.x, SOCIALS.linkedin],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE}/#website`,
      url: SITE,
      name: "Mihirsinh Chavda",
      description:
        "Portfolio of Mihirsinh Chavda — selected AI systems, data products, and full-stack work.",
      inLanguage: "en",
      publisher: { "@id": `${SITE}/#person` },
    },
    {
      "@type": "ProfilePage",
      "@id": `${SITE}/#profilepage`,
      url: SITE,
      name: "Mihirsinh Chavda · Software Engineer",
      isPartOf: { "@id": `${SITE}/#website` },
      about: { "@id": `${SITE}/#person` },
      primaryImageOfPage: `${SITE}/photo.jpg`,
    },
  ],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${clashDisplay.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        <script dangerouslySetInnerHTML={{ __html: preloaderInit }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: siteLd }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
