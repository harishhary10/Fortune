// server.js
// Minimal Express server to host the static Fortune Ooty site on any Node.js host
// (Render, Railway, Heroku, Vercel/Node runtime, AWS Elastic Beanstalk, etc.)

const express = require('express');
const path = require('path');
const compression = require('compression');
const helmet = require('helmet');

const app = express();

// Most hosts inject PORT via env var; fall back to 3000 for local dev
const PORT = process.env.PORT || 3000;

app.use(compression());
app.use(
  helmet({
    contentSecurityPolicy: false, // disable if you add inline scripts/styles; tighten later if needed
  })
);

// Serve all static assets (html, css, js, images) from the "public" folder
const PUBLIC_DIR = path.join(__dirname, 'public');
app.use(express.static(PUBLIC_DIR));

// Explicit routes for clean URLs (optional but nice for SEO / no .html in address bar)
const pages = ['index', 'gallery', 'contact', 'packages', 'accommodation'];
pages.forEach((page) => {
  const route = page === 'index' ? '/' : `/${page}`;
  app.get(route, (req, res) => {
    res.sendFile(path.join(PUBLIC_DIR, `${page}.html`));
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).sendFile(path.join(PUBLIC_DIR, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
