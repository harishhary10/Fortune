# Fortune Ooty Website — Node.js Hosting Setup

This wraps your existing static site (`index.html`, `gallery.html`, `contact.html`, `packages.html`, `accommodation.html`, `style.css`, `script.js`) in a minimal Express server so it can be deployed to any Node.js hosting provider.

## Folder structure required

```
project-root/
├── package.json
├── server.js
├── Procfile              (used by Heroku-style platforms; harmless elsewhere)
├── .gitignore
├── .env.example
└── public/
    ├── index.html
    ├── gallery.html
    ├── contact.html
    ├── packages.html
    ├── accommodation.html
    ├── style.css
    ├── script.js
    └── (any images/assets folders referenced by the HTML/CSS)
```

**Important:** move all five HTML files, `style.css`, `script.js`, and any image/asset folders into a `public/` directory at the project root. `server.js` is already configured to serve everything from `public/`.

## Setup steps

1. Create the folder structure above (rename/move your existing files into `public/`).
2. Rename the two helper files you'll download from this chat:
   - `gitignore.txt` → `.gitignore`
   - `.env.example.txt` → `.env.example`
   - `Procfile.txt` → `Procfile`
   (Some browsers/OSes add a `.txt` suffix to dotfiles/no-extension files on download — strip it after saving.)
3. Install dependencies:
   ```
   npm install
   ```
4. Run locally:
   ```
   npm start
   ```
   Visit `http://localhost:3000`.

## Deploying

- **Render / Railway / Fly.io:** connect your Git repo, set the start command to `node server.js` (or let it auto-detect via `package.json`'s `start` script), and it will use the `PORT` env var automatically.
- **Heroku:** the included `Procfile` (`web: node server.js`) is picked up automatically — just `git push heroku main`.
- **VPS / EC2 / DigitalOcean droplet:** `npm install --production`, then run with a process manager like `pm2 start server.js`.
- **Vercel (Node runtime):** works too, though Vercel is optimized for static/serverless — for a pure static site you could skip Node entirely and deploy `public/` directly as a static site there.

## Notes

- `helmet` and `compression` are included for basic security headers and gzip — safe defaults, not required, remove from `package.json`/`server.js` if you want a bare-bones setup.
- Routes like `/gallery`, `/contact`, `/packages`, `/accommodation` are mapped to their respective `.html` files so links can drop the `.html` extension if you update your `<a href>`s; the raw `.html` URLs still work too since they're served statically.
- If the site is truly static with no server-side logic needed, you don't strictly need Node.js at all — static hosts like Netlify, GitHub Pages, or Cloudflare Pages would be simpler and free. This Node/Express setup is for cases where you specifically need Node.js hosting (e.g., a platform that only supports Node apps, or you plan to add server-side features later).
