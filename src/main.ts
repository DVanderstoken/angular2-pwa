import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

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

  }

platformBrowserDynamic().bootstrapModule(AppModule);
