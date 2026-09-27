import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// O nome do repositório no GitHub, usado para montar a URL do GitHub Pages:
// https://SEU_USUARIO.github.io/NOME_DO_REPOSITORIO/
//
// Se você renomear o repositório, atualize a constante abaixo.
// Em desenvolvimento local (`npm run dev`) o base é sempre "/".
//
// Observação: `npm run preview` serve os arquivos já buildados em `dist/`
// (que foram gerados com o base do GitHub Pages), então ele também precisa
// usar esse base — por isso checamos `isPreview` além de `command`.
const REPOSITORY_NAME = "gwt-argentina-setup-randomizer";

export default defineConfig(({ command, isPreview }) => ({
  base: command === "build" || isPreview ? `/${REPOSITORY_NAME}/` : "/",
  plugins: [react()],
  build: {
    outDir: "dist",
  },
  test: {
    environment: "node",
    globals: true,
  },
}));