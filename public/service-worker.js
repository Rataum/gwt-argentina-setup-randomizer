// Service worker simples e didático.
//
// Estratégia: "cache-first com atualização em segundo plano" para tudo que é
// servido dentro do escopo do app (HTML, JS, CSS, manifest, ícones).
//
// Não usamos uma lista fixa de arquivos para pré-cache porque o Vite gera
// nomes de arquivo com hash (ex.: index-a1b2c3.js) que mudam a cada build.
// Em vez disso, cada arquivo é adicionado ao cache na primeira vez que é
// buscado ("runtime caching"). Isso significa que, na primeira visita
// online, o app inteiro fica disponível para uso offline a partir da
// segunda visita.

const CACHE_NAME = "gwt-argentina-cache-v1";

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;

  // Só lidamos com GET; outros métodos passam direto para a rede.
  if (request.method !== "GET") {
    return;
  }

  // Só lidamos com requisições dentro da mesma origem (evita cachear
  // recursos de terceiros de forma inesperada).
  if (new URL(request.url).origin !== self.location.origin) {
    return;
  }

  event.respondWith(
    caches.open(CACHE_NAME).then(async (cache) => {
      const cached = await cache.match(request);

      const networkFetch = fetch(request)
        .then((response) => {
          if (response && response.ok) {
            cache.put(request, response.clone());
          }
          return response;
        })
        .catch(() => undefined);

      // Responde com o cache imediatamente se existir (rápido e funciona
      // offline); atualiza o cache em segundo plano quando há rede.
      if (cached) {
        event.waitUntil(networkFetch);
        return cached;
      }

      // Sem cache ainda: espera a rede. Se falhar (offline na 1ª visita),
      // não há nada que possamos fazer para essa URL específica.
      const networkResponse = await networkFetch;
      return networkResponse ?? Response.error();
    })
  );
});
