const OFFLINE_CACHE_PREFIX = 'offline_page_';
const CACHE_VERSION = 'v1.0';
const OFFLINE_CACHE_NAME = OFFLINE_CACHE_PREFIX + CACHE_VERSION;

// Service worker 安装事件，其中可以预缓存资源
this.addEventListener('install', function(event) {
    // 需要缓存的重要的优先级最高的资源
    var vipUrlsToPrefetch = [
        './index.html',
    ];
    // 需要缓存的页面资源
    var urlsToPrefetch = [
        './index.html',
        './css/style.css',
        './css/update.css',
        './css/bootstrap.min.css',
        './css/swiper.css',
        './css/photoGallery.css',
        './css/swiper-4.3.3.min.css',
        './css/swiper.css',
        './images/app1/01.jpg',
        './images/app1/02.jpg',
        './images/app1/03.jpg',
        './images/app1/08.jpg',
        './images/app1/09.jpg',
        './images/app1/10.jpg',
        './images/app1/11.jpg',
        './images/app2/01.jpg',
        './images/app2/02.jpg',
        './images/app2/03.jpg',
        './images/app2/04.jpg',
        './images/app2/05.jpg',
        './images/app3/01.jpg',
        './images/app3/02.jpg',
        './images/app3/03.jpg',
        './images/app3/04.png',
        './images/app3/05.jpg',
        './images/weixin1/01.jpg',
        './images/weixin1/02.jpg',
        './images/weixin1/03.jpg',
        './images/weixin1/04.jpg',
        './images/weixin1/05.jpg',
        './images/weixin2/01.jpg',
        './images/weixin2/02.jpg',
        './images/weixin2/03.jpg',
        './images/weixin2/04.jpg',
        './images/weixin2/05.jpg',
        './images/weixin3/01.jpg',
        './images/weixin3/02.jpg',
        './images/weixin3/03.jpg',
        './images/weixin3/04.jpg',
        './images/weixin3/05.jpg',
        './images/pc1/01.jpg',
        './images/pc1/02.jpg',
        './images/pc1/03.jpg',
        './images/pc2/01.jpg',
        './images/pc3/01.jpg',
        './images/pc3/02.jpg',
        './images/pc4/01.jpg',
        './images/pc4/02.jpg',
        './images/pc4/03.jpg',
        './images/pc4/04.jpg',
        './images/pc4/05.jpg',
        './images/pc5/01.jpg',
        './images/pc5/02.jpg',
        './images/pc5/03.jpg',
        './images/pc6/01.png',
        './images/pc6/02.png',
        './images/pc6/03.png',
        './images/pc6/04.png',
        './images/pc6/05.png',
        './images/pc7/01.jpg',
        './images/pc7/02.jpg',
        './images/pc7/03.jpg',
        './images/pc7/04.jpg',
        './images/pc7/05.jpg',
        './images/pc8/01.jpg',
        './images/pc8/02.jpg',
        './images/pc8/03.jpg',
        './images/pc8/04.jpg',
        './images/pc8/05.jpg',
        './images/chahua/01.jpg',
        './images/chahua/02.jpg',
        './images/chahua/03.jpg',
        './images/chahua/04.jpg',
        './images/shuhui/05.jpg',
        './images/shuhui/06.jpg',
        './images/shuhui/07.jpg',
        './images/shuhui/08.jpg',
        './images/huace/03.jpg',
        './images/huace/04.jpg',
        './images/huace/05.jpg',
        './images/huace/06.jpg',
        './images/huace/07.jpg',
        './images/huace/08.jpg',
        './images/huace/09.jpg',
        './images/huace/10.jpg',
        './images/huace/11.jpg',
        './images/huace/12.jpg',
        './images/vi/01.jpg',
        './images/vi/02.jpg',
        './images/vi/03.jpg',
        './images/vi/04.jpg',
        './images/vi/05.jpg',
        './images/vi/06.jpg',
        './images/vi/07.jpg',
        './images/vi/08.jpg',
        './images/banner/01.png',
        './images/banner/02.png',
        './images/banner/03.jpg',
        './images/banner/04.jpg',
        './images/banner/05.jpg',
        './images/banner/06.jpg',
        './images/banner/07.jpg',
        './images/banner/08.jpg',
        './images/banner/09.jpg',
        './images/banner/10.jpg',
        './images/banner/11.jpg',
        './images/banner/12.jpg',
        './images/close.png',
        './images/contact.jpg',
        './images/gallery.jpg',
        './images/loading.gif',
        './images/next.png',
        './images/prev.png',
        './images/service.jpg',
        './images/transparent.png',
    ];
    event.waitUntil(
        caches.open(OFFLINE_CACHE_NAME).then(function(cache) {
            // 非重要资源，即使失败也不影响SW安装
            cache.addAll(urlsToPrefetch);
            // vipUrls中重要资源全部请求成功后，SW才顺利完成，可进入激活事件
            return cache.addAll(vipUrlsToPrefetch);
        })
    );
});

// Service worker 激活事件。其中可清除历史缓存
// 注意：同域下包含所有cache，可能会误删其他path下的资源
this.addEventListener('activate', function(event) {
    // 在激活事件中清楚非当前版本的缓存避免用户存储空间急剧膨胀
    event.waitUntil(caches.keys().then(function(cacheNames) {
        return Promise.all(cacheNames.map(function(cacheName) {
            if (cacheName !== OFFLINE_CACHE_NAME) {
                if(cacheName.indexOf(OFFLINE_CACHE_PREFIX) !==1) {
                    return caches.delete(cacheName);
                }
            }
        }));
    }));
});

// 渐进式缓存 将fetch请求回来的 不常变化的资源缓存
var addToCache = function(req) {
    return fetch(req.clone()).then(function(resp) {
        var cacheResp = resp.clone();
        if(!resp.ok) {
            return resp;
        }
        caches.open(OFFLINE_CACHE_NAME).then(function(cache) {
            cache.put(req.clone(), cacheResp);
        });
        return resp;
    });
};
// Service worker 请求拦截事件
this.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.open(OFFLINE_CACHE_NAME).then(function(cache){
            return cache.match(event.request.url);
        }).then(function(response) {
            // response为空表明未匹配成功，交由fetch方法去网络拉去
            if(response) {
                return response;
            } else {
                return addToCache(event.request);
            }
        })
    );
});