# Paras Verma — Portfolio

Personal portfolio of Paras Verma, a freelance React and full-stack web developer based in Gurgaon, India.

Built with React, TypeScript, Vite, Tailwind CSS and Motion.

## Getting started

Requires Node.js 20 or newer.

```bash
npm install
npm run dev      # start the dev server
npm run build    # production build to dist/
npm run preview  # serve the production build locally
npm run lint     # type-check
npm test         # run unit tests
```

## Project structure

```
public/images/        Project screenshots
src/components/       Layout, section and UI components
src/data/             Portfolio content (projects, experience, skills)
src/lib/              Helpers and their tests
src/styles/           Global styles and design tokens
```

Content lives in `src/data/`. To link a project's public repository, set its `sourceUrl` in `src/data/projects.ts`.
