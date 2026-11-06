# FreshBite

A responsive fast food landing page built with React and Vite. FreshBite showcases a rotating menu of five favorites with animated product transitions, a full-screen hero, and a warm, colorful visual style.

## Features

- Animated hero and loading screen
- Five featured menu items with next, previous, and dot navigation
- Smooth transitions powered by GSAP
- Smooth scrolling powered by Lenis
- Responsive layout for desktop and mobile
- Local food imagery included in `public/`

## Tech stack

- React 19
- Vite 7
- GSAP
- Framer Motion
- Lenis

## Getting started

### Requirements

- Node.js 20.19+ or 22.12+
- npm

### Install and run

```bash
git clone https://github.com/sunnydh836/freshbite.git
cd freshbite
npm install
npm run dev
```

Vite prints the local development URL in the terminal (usually [http://localhost:5173](http://localhost:5173)).

## Available commands

| Command | Description |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npm run build` | Build the production site in `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Check the code with ESLint |

## Project structure

```text
public/
  img/                 # Food background images
  transparent-img/     # Product images
src/
  components/          # Hero, preloader, and social icons
  data/                # Menu item content
  lib/                 # Lenis smooth-scroll hook
  App.jsx
  App.css
  index.css
```
#live link:https://freshbite-taupe.vercel.app/
## Customizing the menu

Menu names, descriptions, colors, and image paths are defined in `src/data/menuItems.js`. Update those entries to change the items shown in the hero carousel.

## License

No license has been specified for this project. Contact the repository owner before reusing its code or assets.
