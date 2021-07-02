if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        navigator.serviceWorker.register('./sw.js')
            .then(function (registration) {
                console.log('Registro exitoso');
            }).catch(function (error) {
                console.log('Registro fallido');
            });

    if(window.Notification && Notification.permission !== 'denied'){ 
        setTimeout('Notification.requestPermission()', 8000);
        var noti = new Notification("Watchfy", {
            body: "Descargá la app",
            icon: "./img/icon-192x192.png",
        })
        }

    (function () {
        var online =document.querySelector(".online");
        function estado(e) {
            console.log(e.type)
            if (navigator.onLine) {
                online.classList.remove("offline")
                alert("Se ha recuperado la conexión a internet");
            } else {
                online.classList.add("offline")
                alert("No hay conexión a internet");
            }
        }
        if (!navigator.onLine) {
            estado(this)
        }
        window.addEventListener("online", estado);
        window.addEventListener("offline", estado);
    })();

    (function (){
        document.querySelector('.share').addEventListener('click', function() {
           if(navigator.share) {
                navigator.share({
                  title: 'Watchfy',
                  text: 'Descargá la app ',
                  url: 'https://www.google.com/?hl=es',
                }) 
                .catch(function(error){
                  console.log(error)
                })
          }
        });
      })();

    });
      
}