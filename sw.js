var cacheName = 'cache';

self.addEventListener('active', function(event) {
    self.skipWaiting();
    console.log('Service Worker activado');
});
self.addEventListener('install', function(event) {
    self.skipWaiting();
    console.log('Service Worker instalado');
	event.waitUntil(	

		caches.open(cacheName).then(function (pwaFilesObjeto)
			{
			 pwaFilesObjeto.addAll(
                ['./index.html',
                './css/bootstrap.css',
                './css/estilos.css',
                 './img/caracteristicas-img.png',
                 './img/favicon.ico',
                 './img/descarga-icono.svg',
                 './img/faceook-icono.svg',
                 './img/home-img.png',
                 './img/icono-app-store.svg',
                 './img/icono-google-play.svg',
                  './img/icon-192x192.png',
                 './img/instagram-icono.svg',
                 './img/interfaz-img.png',
                 './img/interfaz-img-pc.png',
                 './img/interfaz-img-tablet.png',
                 './img/like-icono.svg',
                 './img/logo.svg',
                 './img/twitter-icono.svg',
                 './img/ventas-icono.svg',		 		
                 './js/script.js',		 		
            ]
			 		)
			})
	);
});

self.addEventListener('fetch', function(event) {
	event.respondWith(
		caches.match(event.request).then(function(response) {
			if (response) 
			{
				return response;
			}
			var requestToCache = event.request.clone(); 
			return fetch(requestToCache).then( function(response) {
					if(!response || response.status !== 200) { 
						return response;
					}
					var responseToCache = response.clone(); 
					caches.open(cacheName).then(function(cache) { 
						cache.put(requestToCache, responseToCache); 
						});
					return response;
			});
		})
	);
});


  
  self.addEventListener("push", function(e){
      var  title = "Watchfy";
      options={
          body:"Que esperás para descargar la app",
          vibrate: [100, 50, 100],
          data: { id: 1},
          icon: "./img/icon-192x192.png",
          actions: [
        {'action': 'si', 'title': 'Descargar la app',},
        {'action': 'no', 'title': 'Más Tarde',}
        ]       
        }
    e.waitUntil(self.registration.showNotification(title,options))
  })
  
  self.addEventListener("notificationclick", function(event){
      console.log(event);
      if(event.action === "si"){

        clients.openWindow('https://google.com')
      }
      else if(event.action === "no"){

      }
      event.notification.close();
  })