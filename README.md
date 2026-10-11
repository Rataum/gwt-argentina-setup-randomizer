# GWT Argentina Setup Randomizer

Aplicativo web (PWA) para gerar configurações aleatórias e reprodutíveis
para partidas de **Great Western Trail: Argentina**.

Sorteia:

- a ordem das 8 construções neutras (A–H) no tabuleiro;
- os 5 mestres das estações, escolhidos entre os 8 da caixa e distribuídos
  nos 5 espaços de mestre de estação (os outros 3 voltam para a caixa);
- o lado (A/B) de cada uma das 10 construções dos jogadores (única para a
  partida, compartilhada por todos os jogadores);
- o lado (A/B) de cada um dos 3 tiles de cidade/porto (Le Havre, Rotterdam,
  Liverpool).

Cada setup tem uma **seed numérica**. A mesma seed sempre gera exatamente o
mesmo setup, e a seed pode ser colocada na URL (`?seed=482913`) para
compartilhar uma partida com outras pessoas por link.

## Tecnologias

React + TypeScript + Vite, CSS Modules, Vitest. Sem backend, sem banco de
dados remoto, sem autenticação — o app roda inteiramente no navegador e
funciona offline depois de instalado como PWA.

## Instalação

```bash
npm install
```

## Desenvolvimento

```bash
npm run dev
```

Abre em `http://localhost:5173`.

## Testes

```bash
npm run test
```

Roda os testes unitários (Vitest) da lógica de sorteio, do PRNG e da
codificação da seed na URL.

## Build de produção

```bash
npm run build
```

Gera os arquivos estáticos em `dist/`.

## Preview do build

```bash
npm run preview
```

## Publicação no GitHub Pages

O repositório já vem com um workflow em
`.github/workflows/deploy.yml` que, a cada push na branch `main`:

1. instala as dependências;
2. roda os testes;
3. builda o projeto;
4. publica o conteúdo de `dist/` no GitHub Pages.

Para ativar:

1. Crie um repositório no GitHub e suba este projeto para a branch `main`.
2. No repositório, vá em **Settings → Pages** e, em **Build and
   deployment → Source**, selecione **GitHub Actions**.
3. Faça um push — o site ficará disponível em:

   ```text
   https://SEU_USUARIO.github.io/gwt-argentina-setup-randomizer/
   ```

Se você renomear o repositório, atualize a constante `REPOSITORY_NAME` em
`vite.config.ts` para que o `base` do Vite continue correto (o GitHub Pages
de projeto não fica na raiz `/`, e sim em `/nome-do-repositorio/`).

## Instalar como PWA

- **Android (Chrome)**: abra o site, toque no menu (⋮) → "Adicionar à tela
  inicial" / "Instalar app".
- **iPhone (Safari)**: abra o site, toque no ícone de compartilhar →
  "Adicionar à Tela de Início".
- **Desktop (Chrome/Edge)**: um ícone de instalação aparece na barra de
  endereço; ou menu → "Instalar GWT Argentina...".

Depois de instalado e aberto pelo menos uma vez com internet, o app
continua funcionando offline (o service worker guarda em cache os arquivos
já acessados).

## Arquitetura

```text
src/
├── components/     Peças de UI reutilizáveis (tiles, seções, botões)
├── data/           Dados estáticos do jogo (letras, números, cidades)
├── models/         Tipos TypeScript do domínio
├── services/       Lógica pura, sem dependência de React
│   ├── setupGenerator.ts   sorteio de cada seção a partir de uma seed
│   ├── seedGenerator.ts    criação de seeds novas e derivação de sub-seeds
│   ├── storage.ts          histórico local (localStorage)
│   └── urlState.ts         leitura/escrita da seed na URL
├── hooks/
│   └── useSetup.ts         estado React do setup atual + ações
├── pages/          HomePage, SetupPage, HistoryPage
├── App.tsx         roteamento simples por estado (sem React Router)
└── main.tsx        entrada da aplicação + registro do service worker
```

A lógica de sorteio (`services/`) é isolada da interface de propósito: dá
para testá-la (veja `services/__tests__` e `utils/__tests__`) sem precisar
renderizar nada.

### Por que não há React Router

O GitHub Pages não tem fallback automático para rotas como `/history`. Em
vez de rotas de URL, o app usa um estado de "view" simples dentro de
`App.tsx` (`"home" | "setup" | "history"`) e usa **query params**
(`?seed=...`) só para a seed compartilhável — o que funciona perfeitamente
no GitHub Pages sem nenhuma configuração extra.

## Como funciona a seed determinística

O sorteio nunca usa `Math.random()` diretamente — ele usa um PRNG
determinístico (`utils/random.ts`, algoritmo mulberry32): dado o mesmo
número inicial (seed), ele sempre produz exatamente a mesma sequência de
números, e por isso o mesmo setup.

Existem, na verdade, **cinco seeds** por trás de cada tela de resultado:

- `masterSeed` — a seed principal, mostrada ao usuário (`Seed: 482913`) e
  usada em `?seed=482913`;
- `neutralSeed`, `stationMasterSeed`, `playerSeed`, `citySeed` — uma seed
  para cada seção.

Quando você clica em **"Novo setup"**, uma `masterSeed` nova e aleatória é
sorteada (usando `crypto.getRandomValues`, não o PRNG determinístico — essa
é a única parte não determinística do processo), e as quatro seeds de seção
são **derivadas** dela de forma determinística
(`deriveSectionSeedsFromMaster`). Ou seja: a mesma `masterSeed` sempre
deriva as mesmas quatro seeds de seção, que por sua vez sempre geram o mesmo
resultado.

Quando você clica em **"Sortear novamente"** em uma seção específica, só a
seed daquela seção é substituída por uma seed nova e aleatória — as outras
duas seções (e suas seeds) não são tocadas. A `masterSeed` continua sendo
exibida como referência, mas nesse momento ela sozinha não reproduz mais o
que está na tela (porque uma das seções foi sorteada "à parte").

Por isso, a URL de compartilhamento carrega, além de `seed=`, um parâmetro
extra só para a seção que tiver sido sorteada individualmente:

```text
?seed=482913                       → setup "completo", nenhuma seção alterada à parte
?seed=482913&ns=77281              → construções neutras sorteadas de novo à parte
?seed=482913&ps=12345&cs=98765     → jogadores e cidades sorteados de novo à parte
```

(`ns` = neutralSeed, `ms` = stationMasterSeed, `ps` = playerSeed,
`cs` = citySeed). Isso mantém a URL
padrão limpa (`?seed=482913`) na maioria dos casos, e ainda garante que
qualquer estado exato na tela possa ser reproduzido por um link.

## Testes implementados

Em `src/services/__tests__/setupGenerator.test.ts`:

- existem exatamente 8 construções neutras, todas diferentes, formando uma
  permutação válida;
- existem exatamente 10 construções de jogador, cada uma com lado A ou B;
- existem exatamente 3 cidades, cada uma com lado A ou B;
- a mesma seed produz exatamente o mesmo resultado;
- uma seed diferente pode produzir um resultado diferente;
- regenerar uma seção não modifica as outras.

Em `src/services/__tests__/urlState.test.ts`:

- uma seed presente na URL é corretamente interpretada;
- uma URL com seed válida abre a configuração correspondente (round-trip);
- overrides de seção (`ns`/`ps`/`cs`) na URL são respeitados.

Em `src/utils/__tests__/random.test.ts`:

- o PRNG é determinístico e sempre gera números em `[0, 1)`;
- o `shuffle` produz permutações válidas e não modifica o array original.

## Histórico local

O histórico (`localStorage`, chave `gwt-argentina:history`) guarda um novo
registro sempre que um **setup completo** é criado (via "Novo setup" ou ao
abrir um link compartilhado) — limitado às 50 entradas mais recentes. Um
"Sortear novamente" isolado em uma seção não gera uma nova entrada de
histórico por si só (para não poluir a lista); se quiser guardar esse
estado específico, use o botão **Compartilhar**, que sempre gera um link
fiel ao que está na tela naquele momento.

Para acessar, utilize o link https://rataum.github.io/gwt-argentina-setup-randomizer/
