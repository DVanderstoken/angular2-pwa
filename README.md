# OfflinePOC

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.0.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Use yarn as default NPM packages manager

```
ng set --global packageManager=yarn
```

## Make it a progressive web app (PWA)

See full documentation @ `https://gitlab.ref.gnc/brett.coffin/mobile-scaffold`

1/ add this script to your `main.ts` file :
```
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
```

2/ Install Service Worker Precache module : 
```
npm install --save-dev sw-precache
```

3/ Install sw-toolbox module : 
```
npm install --save-dev sw-toolbox
```

4/ Add an empty ̀`service-worker.js` file @ project's root level

5/ Add a `sw-precache-config.js` file @ project's root level :
```
module.exports = {
    navigateFallback: '/index.html',
    stripPrefix: 'dist',
    root: 'dist/',
    staticFileGlobs: ['dist/**/*.{js,html,css,png,jpg,gif,json,svg,ttf,woff,woff2}'],
    importScripts: ['sw-toolbox-config.js'],
    runtimeCaching: [
        {
            urlPattern: /^((https?|ftp):)?\/\/.*(jpeg|jpg|png|gif|bmp)$/,
            handler: function (request, values, options) {
                return toolbox.cacheFirst(request).catch(function () {
                    return toolbox.cacheOnly(new Request('/assets/images/Ap_icon.png'))
                })
            },
            options: {
                cache: {
                    name: 'image-cache',
                    maxEntries: 50
                }
            }
        }
    ]
};
```

6/ Add the `sw-toolbox-config.js` file in the `src`folder :
```
toolbox.precache(['/assets/images/Ap_icon.png']);
```

7/ Add the `manifest.json` file in `src` folder : 
```
{
  "name": "Offline POC",
  "short_name": "Offline POC",
  "icons": [
    {
            "src": "/assets/images/Ap_icon.png",
            "sizes": "200x200",
            "type": "image/png",
            "density": 0.75
        }
  ],
  "theme_color": "#000000",
  "background_color": "#e0e0e0",
  "start_url": "/index.html",
  "display": "standalone",
  "orientation": "portrait",
  "permissions": [
    "unlimitedStorage"
  ]
}
```

8/ Update your `index.html` file (inside `<head />` tag) :
```
  <link rel="manifest" href="/manifest.json">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name='mobile-web-app-capable' content='yes'>
```

9/ Update `assets` in your `.angular-cli.json` file : 
```
        "manifest.json",
        "sw-toolbox-config.ts",
        "service-worker.js"
```

10/ Run the application :
```
ng build --prod
npm run precache
cd dist && live-server --port=4200 --host=0.0.0.0 --entry-file=/index.html
```

11/  check the result in the developer console :
App manifest
![manifest](./documentation/images/manifest.png)

service-worker
![service-worker](./documentation/images/service-worker.png)

sw-precache
![sw-precache](./documentation/images/sw-precache.png)

sw-toolbox
![sw-toolbox](./documentation/images/sw-toolbox.png)

