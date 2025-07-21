const { injectManifest } = require('workbox-build');

injectManifest({
  swSrc: 'sw.js',
  swDest: 'dist/sw.js',
  globDirectory: 'dist',
  globPatterns: ['**/*.{js,css,html,ico,png,svg,json}'],
}).then(() => console.log('Service worker generated.'));
