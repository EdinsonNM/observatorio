var CACHE = 'cache-only';

self.addEventListener('install', function(evt) {
  console.log('The service worker is being installed.');
  evt.waitUntil(precache());
});

 
self.addEventListener('fetch', function(evt) {
  console.log('The service worker is serving the asset.');
  evt.respondWith(fromCache(evt.request));
});


function precache() {
  return caches.open(CACHE).then(function (cache) {
    return cache.addAll([
      'fonts/MaterialIcons-Regular.woff2',
      'fonts/AdventPro-Regular.ttf',
      'fonts/Roboto-Regular.ttf',
      'fonts/Roboto-Thin.ttf',
      'fonts/Baloo-Regular.ttf',
      'css/color.html',
      'css/common.html',
      'css/flex-layout.html',
      'css/layout-style.html',
      'css/shadow.html',
      'css/typography.html',
      'css/app.css',
      'images/logo.svg',
      'images/modules/module_inv.png',
      'images/modules/module_pad.png',
      'images/modules/module_pcr.png',
      'images/modules/module_pda.png',
      'images/modules/module_tar.png',
      'images/modules/module_hid.png',
      'index.html',
      'js/shadycss.min.js',
      'js/shadydom.min.js',
      'js/utilcss.js',
      'bundle.js?20f663c7d974c6bece49',
      'manifest.json'
    ]);
  });
}
 
function fromCache(request) {
  return caches.open(CACHE).then(function (cache) {
    return cache.match(request).then(function (matching) {
      return matching || fetch(request);
    });
  });
}

