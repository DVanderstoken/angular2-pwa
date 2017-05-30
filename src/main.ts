import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { enableProdMode } from '@angular/core';

if (environment.production) {
  enableProdMode();

  if (navigator['serviceWorker']) {

    navigator['serviceWorker'].register('service-worker.js')
      .then((reg) => {
        console.log('Service Worker registered', reg);

        if (!navigator['serviceWorker'].controller) {
          console.log('Service Worker is the latest version');
          return;
        }

        reg.addEventListener('updatefound', () => {
          console.log('updatefound!');
          window['updatefound'] = true;
        });

      }).catch((err) => {
        console.log('Service Worker registration failed: ', err);
      });

  } else {

    const appCache = window['applicationCache'];
    appCache.addEventListener('error', (e: any) => alert('Error: Cache failed to update!' + e.message), false);

    window.addEventListener('load', function (_) {
      appCache.addEventListener('updateready', function (e) {
        if (appCache.status === appCache.UPDATEREADY) {
          // Browser downloaded a new app cache.
          if (confirm(`Une nouvelle version de l'application est disponible.`)) {
            window.location.reload();
          } else {
            window.location.reload();
          }
        } else {
          // Manifest didn't changed. Nothing new to server.
        }
      }, false);

    }, false);
  }

}


platformBrowserDynamic().bootstrapModule(AppModule);
