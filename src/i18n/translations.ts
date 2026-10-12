/**
 * Textos da interface em cada idioma.
 *
 * Como funciona: `Translations` é a "forma" que todo idioma precisa ter.
 * `ptBR` e `en` são dois objetos com essa forma. Se você adicionar um texto
 * novo em `Translations`, o TypeScript avisa que falta traduzi-lo nos dois.
 *
 * Textos com valores variáveis (posição, nome, lado...) são funções simples,
 * em vez de um sistema de interpolação — mais fácil de ler e de tipar.
 *
 * Nomes próprios (GWT Argentina, Seed, Le Havre, Rotterdam, Liverpool) e os
 * lados A/B não mudam de idioma e ficam direto nos componentes.
 */

export type Language = "pt-BR" | "en";

/** Idiomas disponíveis no botão de troca, na ordem em que aparecem. */
export const LANGUAGES: { id: Language; short: string; name: string }[] = [
  { id: "pt-BR", short: "PT", name: "Português" },
  { id: "en", short: "EN", name: "English" },
];

export interface Translations {
  language: {
    /** Rótulo de acessibilidade do botão de idioma. */
    label: string;
  };
  home: {
    sharedSetup: string;
    openSetup: string;
    newSetup: string;
    history: string;
  };
  setup: {
    back: string;
    reroll: string;
    newSetup: string;
    sections: {
      neutralBuildings: string;
      stationMasters: string;
      playerBuildings: string;
      cities: string;
    };
  };
  history: {
    title: string;
    back: string;
    empty: string;
    formatDate: (date: Date) => string;
  };
  share: {
    button: string;
    copied: string;
    shareTitle: string;
  };
  copy: {
    button: string;
    copied: string;
    failed: string;
  };
  /** Rótulos de acessibilidade (leitores de tela) dos tiles. */
  tiles: {
    neutralBuilding: (position: number, letter: string) => string;
    playerBuilding: (number: number, side: string) => string;
    city: (name: string, side: string) => string;
    stationMaster: (position: number, name: string) => string;
    stationMasterId: (id: string) => string;
  };
  /** Texto gerado por "Copiar configuração" e "Compartilhar". */
  text: {
    neutralBuildings: string;
    stationMasters: string;
    playerBuildings: string;
    cities: string;
    stationMasterLine: (position: number, name: string, id: string) => string;
  };
  /** Nome curto e texto de pontuação de cada mestre de estação, pelo id. */
  stationMasters: Record<string, { name: string; description: string }>;
}

const ptBR: Translations = {
  language: {
    label: "Idioma",
  },
  home: {
    sharedSetup: "Setup compartilhado",
    openSetup: "Abrir setup",
    newSetup: "🎲 Novo setup",
    history: "Histórico",
  },
  setup: {
    back: "← Início",
    reroll: "Sortear novamente",
    newSetup: "🎲 Novo setup",
    sections: {
      neutralBuildings: "Construções neutras",
      stationMasters: "Mestres das estações",
      playerBuildings: "Construções dos jogadores",
      cities: "Cidades / cais",
    },
  },
  history: {
    title: "Histórico",
    back: "← Início",
    empty: 'Nenhum setup gerado ainda. Toque em "Novo setup" para começar.',
    formatDate: (date) =>
      date.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" }),
  },
  share: {
    button: "🔗 Compartilhar",
    copied: "Setup copiado!",
    shareTitle: "GWT Argentina — Setup",
  },
  copy: {
    button: "📋 Copiar configuração",
    copied: "Configuração copiada!",
    failed: "Não foi possível copiar automaticamente.",
  },
  tiles: {
    neutralBuilding: (position, letter) => `Posição ${position}: construção ${letter}`,
    playerBuilding: (number, side) => `Construção ${number}, lado ${side}`,
    city: (name, side) => `${name}, lado ${side}`,
    stationMaster: (position, name) => `Espaço ${position}: mestre da estação ${name}`,
    stationMasterId: (id) => `(mestre ${id})`,
  },
  text: {
    neutralBuildings: "Construções neutras:",
    stationMasters: "Mestres das estações:",
    playerBuildings: "Construções dos jogadores:",
    cities: "Cidades:",
    stationMasterLine: (position, name, id) => `${position} — ${name} (mestre ${id})`,
  },
  stationMasters: {
    "1": {
      name: "Discos nos navios",
      description:
        "Ganhe 3 pontos de vitória para cada 2 dos seus discos colocados nos 8 navios restantes ao final da partida. (Se você tiver mais que um disco nos navios com valor de carga 0 e 18, cada um desses conta).",
    },
    "2": {
      name: "Cartas de objetivo",
      description:
        "Ganhe 3 pontos de vitória para cada 2 cartas de objetivo em sua área de objetivos (estejam elas cumpridas ou não).",
    },
    "3": {
      name: "Grupos de trabalhadores",
      description:
        "Ganhe 4 pontos de vitória para cada grupo de 1 gaucho, 1 carpintero, 1 maquinista e 1 granjero na sua seção dos trabalhadores (incluindo os impressos no seu tabuleiro de jogador).",
    },
    "4": {
      name: "Gado de valor 3, 4 ou 5",
      description:
        "Ganhe 1 ponto de vitória para cada carta de gado com um valor de criação de 3, 4 ou 5 no seu baralho de rebanho.",
    },
    "5": {
      name: "Estações com discos",
      description:
        "Ganhe 3 pontos de vitória para cada 2 espaços de estação que tenham seus discos neles. (A última estação conta apenas uma vez para isso, mesmo que você tenha vários discos nela).",
    },
    "6": {
      name: "Trabalhadores com força",
      description:
        "Ganhe 3 pontos de vitória para cada 2 fichas de trabalhador na sua seção dos trabalhadores que tenham o ícone de força impresso nelas.",
    },
    "7": {
      name: "Fichas de fazendeiro",
      description:
        "Ganhe 1 ponto de vitória para cada ficha de fazendeiro (amarela, laranja, azul e verde) à sua frente (mas não aquelas no seu tabuleiro de jogador).",
    },
    "8": {
      name: "Construções privadas no tabuleiro",
      description:
        "Ganhe 3 pontos de vitória para cada 2 das suas fichas de construção privada colocadas no tabuleiro de jogo.",
    },
  },
};

const en: Translations = {
  language: {
    label: "Language",
  },
  home: {
    sharedSetup: "Shared setup",
    openSetup: "Open setup",
    newSetup: "🎲 New setup",
    history: "History",
  },
  setup: {
    back: "← Home",
    reroll: "Reroll",
    newSetup: "🎲 New setup",
    sections: {
      neutralBuildings: "Neutral buildings",
      stationMasters: "Station masters",
      playerBuildings: "Player buildings",
      cities: "Cities / harbors",
    },
  },
  history: {
    title: "History",
    back: "← Home",
    empty: 'No setups generated yet. Tap "New setup" to get started.',
    formatDate: (date) =>
      date.toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" }),
  },
  share: {
    button: "🔗 Share",
    copied: "Setup copied!",
    shareTitle: "GWT Argentina — Setup",
  },
  copy: {
    button: "📋 Copy setup",
    copied: "Setup copied!",
    failed: "Could not copy automatically.",
  },
  tiles: {
    neutralBuilding: (position, letter) => `Position ${position}: building ${letter}`,
    playerBuilding: (number, side) => `Building ${number}, side ${side}`,
    city: (name, side) => `${name}, side ${side}`,
    stationMaster: (position, name) => `Space ${position}: station master ${name}`,
    stationMasterId: (id) => `(master ${id})`,
  },
  text: {
    neutralBuildings: "Neutral buildings:",
    stationMasters: "Station masters:",
    playerBuildings: "Player buildings:",
    cities: "Cities:",
    stationMasterLine: (position, name, id) => `${position} — ${name} (master ${id})`,
  },
  // Tradução dos textos em português acima — não é a redação oficial do livro
  // de regras em inglês. Se tiver o livro em mãos, ajuste aqui.
  stationMasters: {
    "1": {
      name: "Discs on ships",
      description:
        "Gain 3 victory points for every 2 of your discs placed on the 8 remaining ships at the end of the game. (If you have more than one disc on the ships with cargo value 0 and 18, each of them counts.)",
    },
    "2": {
      name: "Objective cards",
      description:
        "Gain 3 victory points for every 2 objective cards in your objective area (whether fulfilled or not).",
    },
    "3": {
      name: "Worker sets",
      description:
        "Gain 4 victory points for every set of 1 gaucho, 1 carpintero, 1 maquinista and 1 granjero in your workers section (including those printed on your player board).",
    },
    "4": {
      name: "Cattle valued 3, 4 or 5",
      description:
        "Gain 1 victory point for every cattle card with a breeding value of 3, 4 or 5 in your herd deck.",
    },
    "5": {
      name: "Stations with discs",
      description:
        "Gain 3 victory points for every 2 station spaces that have your discs on them. (The last station counts only once for this, even if you have several discs on it.)",
    },
    "6": {
      name: "Workers with strength",
      description:
        "Gain 3 victory points for every 2 worker tiles in your workers section that have the strength icon printed on them.",
    },
    "7": {
      name: "Farmer tiles",
      description:
        "Gain 1 victory point for every farmer tile (yellow, orange, blue and green) in front of you (but not those on your player board).",
    },
    "8": {
      name: "Private buildings on the board",
      description:
        "Gain 3 victory points for every 2 of your private building tiles placed on the game board.",
    },
  },
};

export const translations: Record<Language, Translations> = {
  "pt-BR": ptBR,
  en,
};
