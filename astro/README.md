# rakaiseto.com

Personal portfolio and blog built with React + Vite.

## Tech Stack

- React 19
- React Router 7
- TypeScript
- Tailwind CSS
- Vite

## Development

Install dependencies:

```bash
npm install
```

Run local dev server:

```bash
npm run dev
```

Build production assets:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

## Content

- Blog markdown files: `src/content/blog`
- Project markdown files: `src/content/projects`
- About timeline data: `src/collections/*.json`

## Deployment

Static build output is generated in `dist/` and served by Nginx via `Dockerfile`.
