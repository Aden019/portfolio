# Portfolio

A simple, professional portfolio with no framework and no build step. All content lives in one file, `js/data.js`. The page reads it and renders everything else.

## Run it

Open `index.html` directly, or serve the folder:

```bash
python3 -m http.server 4173
```

Then visit http://localhost:4173.

## Edit content

Everything is in [`js/data.js`](js/data.js):

| Field | What it controls |
|---|---|
| `name`, `role`, `location`, `email` | Header, hero, contact |
| `headline`, `intro` | The main heading and text at the top. Wrap words in `*stars*` to give them the green gradient |
| `services` | The three "What I build" cards (icons: `card`, `pulse`, `shield`) |
| `stack` | The scrolling technology strip under the hero |
| `available` | The "Available for new projects" badge (set `false` to show "Currently unavailable") |
| `about`, `skills` | The About section |
| `links` | GitHub / LinkedIn in the contact section (**add your real profile URLs**) |
| `projects` | The project cards and their detail pop-ups. Add `url` to a project to show a "Visit live site" button |

### Add a project

1. Put a screenshot in `assets/shots/` (around 1440×900 works best).
2. Copy a project object in `projects`, give it a unique `id`, and fill it in.

## Features

- Scroll-reveal animations, hover spotlights and a scrolling tech strip
- Project cards with screenshots; clicking one opens a detail pop-up with shareable links (e.g. `#work/aden19`)
- Light and dark mode (follows the system, remembers your choice)
- Works on phones, tablets and desktops; keyboard accessible

## Files

```
index.html        page structure
css/style.css     design tokens, layout, themes
js/data.js        all content
js/app.js         rendering and interactions
assets/shots/     project screenshots
```
