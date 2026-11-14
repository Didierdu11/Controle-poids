// Changer APP_V à chaque nouvelle version : les postes proposent alors la mise à jour
const APP_V='2.0.0',CACHE='releves-'+APP_V;
const LOCAL=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png'];
const LIB='https://cdnjs.cloudflare.com/ajax/libs/exceljs/4.4.0/exceljs.min.js';
self.addEventListener('install',e=>e.waitUntil((async()=>{const c=await caches.open(CACHE);await c.addAll(LOCAL);
 try{await c.put(LIB,await fetch(new Request(LIB,{mode:'no-cors'})))}catch(_){}})()));
self.addEventListener('activate',e=>e.waitUntil((async()=>{for(const k of await caches.keys())if(k!==CACHE)await caches.delete(k);await self.clients.claim()})()));
self.addEventListener('message',e=>{if(e.data==='skip')self.skipWaiting()});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(r=>r||fetch(e.request).then(n=>{if(n.ok||n.type==='opaque'){const k=n.clone();caches.open(CACHE).then(c=>c.put(e.request,k))}return n}).catch(()=>caches.match('index.html'))))});
