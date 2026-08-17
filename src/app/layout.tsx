import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/react";
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
  metadataBase: new URL("https://mihirsinhchavda.com"),
  title: "Mihirsinh Chavda · Software Engineer",
  description:
    "Software engineer. I ship AI products end to end: Continuity, rewind, Boostlane, Earnings Delta. Open source, LLM pipelines, TypeScript.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "https://mihirsinhchavda.com/",
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

const personLd = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Mihirsinh Chavda",
  jobTitle: "Software Engineer",
  url: "https://mihirsinhchavda.com",
  sameAs: [
    "https://github.com/mihhhir08",
    "https://x.com/mihirrr_08",
    "https://www.linkedin.com/in/mihirsinh-chavda-7115b922b/",
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
          dangerouslySetInnerHTML={{ __html: personLd }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
