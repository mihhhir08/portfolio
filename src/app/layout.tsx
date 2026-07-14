import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

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
    "Software engineer. I ship AI products end to end: rewind, Boostlane, AgentLens, shiplog. Open source, LLM pipelines, TypeScript.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "https://mihirsinhchavda.com/",
    title: "Mihirsinh Chavda · Software Engineer",
    description:
      "I ship AI products end to end. rewind, Boostlane, AgentLens, shiplog.",
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og.png"],
  },
};

const themeInit = `(function(){try{var t=localStorage.getItem("theme");if(t!=="dark"&&t!=="light")t=matchMedia("(prefers-color-scheme: light)").matches?"light":"dark";document.documentElement.dataset.theme=t;}catch(e){document.documentElement.dataset.theme="dark";}})();`;

const personLd = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Mihirsinh Chavda",
  jobTitle: "Software Engineer",
  url: "https://mihirsinhchavda.com",
  sameAs: [
    "https://github.com/mihhhir08",
    "https://x.com/Mihirxbuilding",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: personLd }}
        />
        <link
          rel="preload"
          href="https://api.fontshare.com/v2/css?f[]=clash-display@500,600,700&display=swap"
          as="style"
        />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=clash-display@500,600,700&display=swap"
        />
      </head>
      <body className="min-h-full flex flex-col">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
