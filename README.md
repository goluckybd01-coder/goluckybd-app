# GoLuckyBD — Premium Bangladeshi Gaming Platform

Monorepo for GoLuckyBD mobile app (React Native / Expo) and web app (Next.js).

## Architecture

```
goluckybd-app/
├── packages/
│   └── design-tokens/     # Figma-extracted colors, typography, spacing
├── apps/
│   ├── mobile/            # React Native (Expo) — iOS & Android
│   └── web/               # Next.js 15 — Desktop web app
└── package.json           # Yarn workspaces root
```

## Design System

- **71 color variables** — Primitives, Semantic (Light/Dark), Game palette
- **14 text styles** — Inter font + Bangla fallback
- **140+ screen routes** across 9 sections

## Quick Start

```bash
yarn install
yarn dev:web       # Next.js web app
yarn dev:mobile    # Expo mobile app
```

## Tech Stack

- **Mobile**: React Native 0.76 + Expo 52 + React Navigation 7
- **Web**: Next.js 15 + Tailwind CSS 4 + Framer Motion
- **State**: Zustand + TanStack Query
- **Language**: TypeScript 5.4
