# Rose Calvelo · Luxury Home Builders

The Rose Calvelo Team website, built with [Astro](https://astro.build). One page, with
hand-written scroll animation (the `scrollcraft` engine) and no other runtime dependencies.

## Run it

Requires Node.js 22.12 or newer.

```bash
npm install
npm run dev       # http://localhost:4321, reloads as you edit
npm run build     # production site in dist/
npm run preview   # serve dist/ locally to check the build
```

## Change content

Most edits are in `src/data/`, not in the page code:

| To change | Edit |
|---|---|
| Phone, email, office address, social links, menu items | `src/data/site.js` |
| The homes in the Listings carousel | `src/data/listings.js` (add the photos to `src/assets/listings/`) |
| Team members | `src/data/team.js` (add headshots to `src/assets/team/`) |

Section copy (headlines, paragraphs) lives in the matching component in `src/components/`.
Images in `src/assets/` are resized and converted to WebP automatically at build time.

## Layout

```
src/
  pages/index.astro      the page: sections in order
  layouts/Base.astro     <head>, fonts, global styles, script entry
  components/            one file per section (Nav, Hero, Listings, Vision, ...)
  styles/                one stylesheet per section, plus scrollcraft.css (engine)
  scripts/               main.js starts the engine, then each section's behaviour
  data/                  site facts, listings, team
  assets/                source images
public/                  files served as-is (favicon)
```

`src/scripts/scrollcraft.js` and `src/styles/scrollcraft.css` are the scroll engine.
Section behaviour goes in the section's own script, not in the engine.

## Deploy

It builds to a static site, so any static host works. On Vercel or Netlify, import the
repo: build command `npm run build`, output directory `dist`.

## Photo credits

Stock photos are from Unsplash under the Unsplash License (free for commercial use):
hero by Bailey Alexander, vision by Pedro Miranda, finished home by Michael Brown.
Listing photos come from the MLS listings shown; team headshots from rosecalveloteam.com.

`rose-calvelo.html` and `Assets/` are the original single-file version, kept as a backup.
They are not used by the build.
