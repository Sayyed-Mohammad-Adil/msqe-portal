# MSQE Website

`msqe-portal` is the public responsive product website for MSQE. It is separate from `msqe-studio`, which is the admin dashboard.

## Features

- Responsive landing page for desktop, tablet, and mobile.
- Hero section with terminal animation.
- Feature cards for partitions, routing, QoS, consumer groups, DLQ, and failover.
- How-it-works flow section.
- Live demo and code examples.
- Install and deployment tabs.
- Cluster reliability section.
- Messaging-system comparison table.
- Dashboard preview section.
- Open-source CTA.

## Install

```bash
cd msqe-portal
npm install
```

## Run

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## Build

```bash
npm run build
```

Start production mode:

```bash
npm run start
```

## Type Check

```bash
npx tsc --noEmit
```

## Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start website dev server on port 3030 |
| `npm run build` | Build the website |
| `npm run start` | Start built website |
| `npm run lint` | Run ESLint |

## Tech Stack

- Next.js 16.
- React 19.
- Tailwind CSS 4.
- Framer Motion.
- Radix Tabs.
- React Syntax Highlighter.
- Recharts.
- Lucide React.

## Important URLs

| App | URL |
|---|---|
| Msqe Portal | `www.msqe.com` |
| Msqe Studio | `http://localhost:3030` |
| Msqe Engine | `http://localhost:8081` |
| Msqe Broker | `ws://localhost:9091` |

## Notes

- This app is informational and does not need the engine to be running for most sections.
- The dashboard preview is a simulated UI preview, not a live dashboard session.
- If Next.js warns about multiple lockfiles, it is because this repository has both root and app-level lockfiles.
- On Windows, if build cache files are locked, stop any running Next.js process and run the build again.

## License

MIT License.
