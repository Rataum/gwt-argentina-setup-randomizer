import type { City, NeutralBuilding, PrivateBuilding, StationMaster } from "../models/game";

/**
 * As 8 construções neutras de Great Western Trail: Argentina,
 * identificadas pelas letras A a H.
 */
export const NEUTRAL_BUILDINGS: NeutralBuilding[] = [
  { id: "A", letter: "A" },
  { id: "B", letter: "B" },
  { id: "C", letter: "C" },
  { id: "D", letter: "D" },
  { id: "E", letter: "E" },
  { id: "F", letter: "F" },
  { id: "G", letter: "G" },
  { id: "H", letter: "H" },
];

/**
 * Número de espaços de mestre de estação no tabuleiro. Dos 8 mestres da
 * caixa, 5 são sorteados (um por espaço) e os outros 3 voltam à caixa.
 */
export const STATION_MASTER_SPACES = 5;

/**
 * Os 8 mestres das estações.
 *
 * Os ids (1 a 8) seguem a ordem em que os mestres foram cadastrados aqui e
 * NÃO são números impressos nos tiles. O nome e o texto de pontuação de cada
 * um, em cada idioma, ficam em `i18n/translations.ts` (chave `stationMasters`,
 * indexada por este id).
 */
export const STATION_MASTERS: StationMaster[] = [
  { id: "1" },
  { id: "2" },
  { id: "3" },
  { id: "4" },
  { id: "5" },
  { id: "6" },
  { id: "7" },
  { id: "8" },
];

/**
 * As 10 construções privadas, numeradas de 1 a 10.
 * Cada uma possui dois lados possíveis: A ou B.
 */
export const PRIVATE_BUILDINGS: PrivateBuilding[] = Array.from(
  { length: 10 },
  (_, index) => ({ id: String(index + 1), number: index + 1 })
);

/**
 * Os 3 tiles de cidade/porto europeu usados no setup para 2-3 jogadores.
 */
export const CITIES: City[] = [
  { id: "le-havre", name: "Le Havre" },
  { id: "rotterdam", name: "Rotterdam" },
  { id: "liverpool", name: "Liverpool" },
];
