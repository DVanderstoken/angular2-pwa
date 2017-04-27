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
        },
        {
            urlPattern: /.*localhost.*/,
            handler: "cacheFirst"
        },
        {
            urlPattern: /.*10.10.106.32.*/,
            handler: "cacheFirst"
        },
        {
            urlPattern: /.*swapi.*/,
            handler: "cacheFirst"
        }
    ]
};
