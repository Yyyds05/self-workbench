/* 小羊考研工作台 Service Worker — 网络优先，缓存兜底 */
var CACHE='wb-v9';
var PRECACHE=['./index.html','./icon-192.png','./icon-512.png','./apple-touch-icon.png','./manifest.webmanifest'];
self.addEventListener('install',function(e){e.waitUntil(caches.open(CACHE).then(function(c){return c.addAll(PRECACHE)}))});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(ks){return Promise.all(ks.filter(function(k){return k!==CACHE}).map(function(k){return caches.delete(k)}))}))});
self.addEventListener('fetch',function(e){
  var u=e.request.url;
  if(u.indexOf('.json')!==-1||u.indexOf('api.')!==-1||u.indexOf('allorigins')!==-1)return; // skip sync/API
  e.respondWith(fetch(e.request).catch(function(){return caches.match(e.request).then(function(r){return r})}));
});
