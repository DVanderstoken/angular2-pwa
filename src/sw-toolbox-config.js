toolbox.precache(['/assets/images/Ap_icon.png']);
toolbox.router.get(/^http:\/\/swapi.co\/api\/people/, toolbox.cacheFirst, {});
