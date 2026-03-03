const CACHE_NAME = 'yukdaet-v1';
const ASSETS_TO_CACHE = [
    '/',
    '/index.html',
    '/style.css',
    '/app.js',
    '/icon.png',
    '/manifest.json'
];

// 서비스 워커 설치 및 리소스 캐싱
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Caching shell assets');
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
});

// 새로운 서비스 워커 활성화 시 이전 캐시 삭제
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
            );
        })
    );
});

// 네트워크 요청 시 캐시 우선 전략 (데이터 절약 및 속도 향상)
self.addEventListener('fetch', (event) => {
    // API 요청은 제외 (실시간 데이터가 중요함)
    if (event.request.url.includes('googleapis.com')) {
        return;
    }

    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            return cachedResponse || fetch(event.request);
        })
    );
});
