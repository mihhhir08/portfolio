# Mihirsinh Chavda — Portfolio

The source for [mihirsinhchavda.com](https://mihirsinhchavda.com), a responsive portfolio presenting selected software, AI infrastructure, and product work.

![Portfolio preview](public/og.jpg)

## Highlights

- Responsive bento-style interface with light and dark themes
- Project data, social links, and availability managed from one content module
- Keyboard command palette and terminal easter egg
- Live GitHub star counts and optional Spotify status
- Accessible motion preferences, metadata, sitemap, and structured data
- Unit coverage for content, theme, visitor, Spotify, and project-star behavior

## Stack

Next.js 16 · React 19 · TypeScript · Tailwind CSS 4 · Motion · Vitest · Vercel Analytics

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Spotify activity is optional. The rest of the site runs without external credentials.

## Verify

```bash
npm test
npm run lint
npm run build
```

## Content

Edit [`src/lib/content.ts`](src/lib/content.ts) to update project cards, roles, availability, contact details, and social links.
