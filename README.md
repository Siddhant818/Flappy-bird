# Flappy Neon Kaboom

This is a small Flappy Bird style game built with [Kaboom.js](https://kaboomjs.com). The game is split into scene modules so the gameplay and game-over screens stay easy to change.

Live demo: https://flappy-bird-one-phi.vercel.app/

## What Runs

- `index.html` loads Kaboom from the CDN and starts `main.js`
- `main.js` initializes Kaboom, registers the scenes, and starts the game
- `scenes/game.js` contains the actual gameplay loop
- `scenes/gameover.js` renders the retry screen
- `game.js` at the project root is legacy and not used by the current build

## Controls

- Press `Space` or click/tap to start and jump
- Avoid the pipes and stay on screen
- Press `Space` or click/tap again after game over to retry

## Visual Style (Updated)

- Animated dusk sky with twinkling stars and sun glow
- Neon orb player with pulse and trail particles on jump
- Restyled pipes, HUD score card, and cinematic game-over card
- Subtle motion feedback (shake on collision and scoring)

## Running Locally

Kaboom should be served over HTTP, not opened directly from `file://`.

Example:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

## Deploying To Vercel

Yes, you can deploy this to Vercel as a static site. The current live build is here: https://flappy-bird-one-phi.vercel.app/

### Option 1: Vercel Dashboard

1. Push this folder to a GitHub repository.
2. In Vercel, click **Add New Project** and import that repository.
3. Keep defaults:
	- Framework Preset: `Other`
	- Build Command: *(leave empty)*
	- Output Directory: *(leave empty)*
4. Click **Deploy**.

### Option 2: Vercel CLI

```bash
npm i -g vercel
vercel
```

When prompted:

- Set up and deploy: `Y`
- Which scope: your account/team
- Link to existing project: `N` (first deploy)
- Project name: anything you want
- Directory: `.`
- Override settings: `N`

After that, use:

```bash
vercel --prod
```

## Notes

- The startup crash caused by calling unsupported `layers(...)` in `main.js` has been removed
- The `assets/` folder is currently empty and ready for sprites, sounds, or backgrounds
- If you want a more polished version later, the next step is to replace the vector shapes with custom art and audio