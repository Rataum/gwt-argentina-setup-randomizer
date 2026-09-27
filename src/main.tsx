import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import "./styles/global.css";

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Elemento #root não encontrado em index.html");
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);

// Registro do service worker para funcionamento offline (PWA).
// `import.meta.env.BASE_URL` garante que o caminho funcione tanto em
// desenvolvimento (base "/") quanto em produção no GitHub Pages
// (base "/gwt-argentina-setup-randomizer/").
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register(`${import.meta.env.BASE_URL}service-worker.js`)
      .catch((error) => {
        console.error("Falha ao registrar o service worker:", error);
      });
  });
}
