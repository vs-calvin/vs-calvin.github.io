'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "992251a9dd17498a1597847f26e2cf80",
"assets/assets/images/atla.jpg": "5b65b1115886e026df8745ce0fa17a2b",
"assets/assets/images/atla_title.png": "6155f51047594677982d4b6aa0c614d2",
"assets/assets/images/black_mirror.jpg": "bbf94b8f7e8cbdbf2c4e9a5b92ea0790",
"assets/assets/images/black_mirror_title.png": "f6ec0b792069f472d2e36634e35baa69",
"assets/assets/images/bownmaster_ad.png": "aedb0dafc2302a9505f7aff365f54dc3",
"assets/assets/images/breaking_bad.jpeg": "7821e297df27197cdda67e13e82188b8",
"assets/assets/images/carole_and_tuesday.jpg": "e787073ccc9428249afe92313d00c6bc",
"assets/assets/images/carole_and_tuesday_title.png": "1f8f81cf47fccb05606f3df26b7695eb",
"assets/assets/images/com.habby.archero.png": "e02f9f1fc1170928cf2674ee724aa76d",
"assets/assets/images/crown.jpg": "47eaa139afb5abaf6dca5407f64080f7",
"assets/assets/images/crown_title.png": "02fa5258c38d51bbf902520255352dc2",
"assets/assets/images/Dead%2520cell.png": "8cb46a42849976ae51e5e5ea617428dc",
"assets/assets/images/dogs.jpg": "2b8484bf41be42ce95d42c193cec6a8a",
"assets/assets/images/dunk%2520shot_play.png": "4d3385f221162f7670d21320f8189ef4",
"assets/assets/images/explained.jpg": "431292d11962afefbfe2991fd3d01a67",
"assets/assets/images/Group%2520682.png": "3990a76bb5b29f2c5dced262f1537d03",
"assets/assets/images/htsdof.jpg": "c0f043e4ae001920e0f1bd10042d8549",
"assets/assets/images/IMG_401476E9B249-1.png": "5aa51766ea79bc047ae8d08d85e8e07d",
"assets/assets/images/kakegurui.jpg": "e53e90e841c33926c45deb4dae78442d",
"assets/assets/images/Mask%2520Group%25207.png": "c38a011ab384c8223dbee423ddbc8d4f",
"assets/assets/images/netflix_logo0.png": "90753a23d851213f214e1faccc4947cb",
"assets/assets/images/netflix_logo1.png": "451f1d563a05a249b69772cfbcc456e7",
"assets/assets/images/roblox.png": "c9596cb824ce07bc48d00c3e5cb7901a",
"assets/assets/images/sintel.jpg": "5b4a20ec9a07e03add61dbfff0def608",
"assets/assets/images/sintel_title.png": "213547e6e216ec48180c091ff8c8f13d",
"assets/assets/images/stranger_things.jpg": "45da3c11ae3d50a599d5a91663664d82",
"assets/assets/images/teotfw.jpg": "b1ad8119028caab99a82ae253eb2a8e5",
"assets/assets/images/thirteen_reasons_why.jpg": "f3c6ba25dc548121333e15a5401b5bd2",
"assets/assets/images/tiger_king.jpg": "09f31639810f01424f9e13d47cfd7075",
"assets/assets/images/umbrella_academy.jpg": "694538108dad1b7bbf145065d438f0d3",
"assets/assets/images/umbrella_academy_title.png": "0fc8a66b919dbffb8cb464dc30939b22",
"assets/assets/images/violet_evergarden.jpg": "2d3095573a37672e6155447e371d6ea6",
"assets/assets/images/VsLogo.png": "ed8d0487a05e8ddddd06a0db0e771c6a",
"assets/assets/images/witcher.jpg": "36d8eee67f80feedbf05534e642247ae",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/fonts/MaterialIcons-Regular.otf": "4e6447691c9509f7acdbf8a931a85ca1",
"assets/NOTICES": "08f361b9347ca79512cc3813b10f4a30",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "115e937bb829a890521f72d2e664b632",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "9d1ce7eb1ff13dd8e8f0d3ae8a268f3e",
"/": "9d1ce7eb1ff13dd8e8f0d3ae8a268f3e",
"main.dart.js": "89539d10d535ab2824206b1684a809f7",
"manifest.json": "b54b3e088a5e4e7d9e1ebb52125e6edd",
"version.json": "e796d1f936ed651202ec7ba2d05218dc"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "/",
"main.dart.js",
"index.html",
"assets/NOTICES",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache.
        return response || fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
