const express = require('express');
const path = require('path');
const compression = require('compression');
const helmet = require('helmet');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(compression());
app.use(helmet({ contentSecurityPolicy: false }));

const ROOT_DIR = __dirname;

app.use('/css', express.static(path.join(ROOT_DIR, 'css')));
app.use('/js', express.static(path.join(ROOT_DIR, 'js')));
app.use(express.static(ROOT_DIR, { extensions: ['html'] }));

const pages = ['index', 'gallery', 'contact', 'packages', 'accommodation'];
pages.forEach((page) => {
  const route = page === 'index' ? '/' : `/${page}`;
  app.get(route, (req, res) => {
    res.sendFile(path.join(ROOT_DIR, `${page}.html`));
  });
});

app.use((req, res) => {
  res.status(404).sendFile(path.join(ROOT_DIR, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
