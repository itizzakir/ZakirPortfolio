# Md Zakir Hussain | Futuristic Developer Portfolio

A cinematic, premium full-stack developer portfolio for **Md Zakir Hussain**, built with React, Vite, Tailwind CSS, Framer Motion, GSAP, React Three Fiber, tsParticles, Swiper, React Tilt, Shadcn-style UI primitives, Lenis smooth scrolling, and EmailJS.

## Overview

This portfolio presents Md Zakir Hussain as a **Full Stack Java Developer** from Hyderabad, Telangana, India. It includes a fullscreen 3D hero, animated profile treatment, particle systems, cinematic transitions, glowing timelines, interactive project cards, tech stack marquee, EmailJS contact form, command palette, custom cursor, scroll progress, theme switcher, ambient audio toggle, SEO metadata, and deployment-ready configuration.

## Tech Stack

- React.js + Vite
- Tailwind CSS
- Framer Motion
- GSAP + ScrollTrigger
- React Three Fiber / Three.js / Drei
- Shadcn-style reusable UI primitives
- Lucide React
- Lenis smooth scrolling
- Swiper.js
- React Parallax Tilt
- EmailJS
- tsParticles / react-tsparticles
- React Router DOM

## Folder Structure

```text
src/
  animations/
  assets/
  components/
    effects/
    layout/
    sections/
    seo/
    shared/
    three/
    ui/
  constants/
  hooks/
  pages/
  services/
  utils/
```

## Getting Started

```bash
npm install
npm run dev
```

Open the local URL printed by Vite, usually:

```bash
http://localhost:5173
```

## Commands

```bash
npm run dev       # Start local development server
npm run build     # Create production build in dist/
npm run preview   # Preview the production build locally
npm run lint      # Run ESLint
```

## Environment Variables

Create a `.env` file from `.env.example`:

```bash
VITE_EMAILJS_SERVICE_ID=
VITE_EMAILJS_TEMPLATE_ID=
VITE_EMAILJS_PUBLIC_KEY=
```

If EmailJS variables are not configured, the contact form gracefully falls back to opening the visitor's email client with a prefilled message.

## Deployment on Vercel

1. Push the project to GitHub.
2. Import the repository into Vercel.
3. Use these settings:
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Add the EmailJS environment variables if contact form delivery is required.
5. Deploy.

`vercel.json` is included with SPA rewrites and long-lived asset caching.

## Deployment on Render

This repository includes `render.yaml` for a static site deployment.

Manual Render settings:

- Service Type: `Static Site`
- Build Command: `npm install && npm run build`
- Publish Directory: `dist`
- Rewrite Rule: `/*` to `/index.html`

Add the EmailJS environment variables in Render's environment settings if needed.

## Screenshots

Add screenshots after deployment:

```text
public/screenshots/hero.png
public/screenshots/projects.png
public/screenshots/contact.png
```

## Personal Links

- Portfolio: https://zakir-s-portfolio.vercel.app/
- GitHub: https://github.com/itizzakir
- LinkedIn: https://linkedin.com/in/itizzakir
- Email: itizzakir@gmail.com

## Notes

- The hero profile uses the public GitHub avatar URL for Md Zakir Hussain.
- Resume download currently points to `public/resume-md-zakir-hussain.html`, which can be replaced with a PDF at any time.
- The portfolio is configured as a single-page app with React Router DOM and deployment rewrites.
