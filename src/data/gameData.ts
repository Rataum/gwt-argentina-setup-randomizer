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
 * NÃO são números impressos nos tiles. Se os tiles físicos tiverem um número
 * ou nome impresso, troque `id` e `name` abaixo para corresponder.
 */
export const STATION_MASTERS: StationMaster[] = [
  {
    id: "1",
    name: "Discos nos navios",
    description:
      "Ganhe 3 pontos de vitória para cada 2 dos seus discos colocados nos 8 navios restantes ao final da partida. (Se você tiver mais que um disco nos navios com valor de carga 0 e 18, cada um desses conta).",
  },
  {
    id: "2",
    name: "Cartas de objetivo",
    description:
      "Ganhe 3 pontos de vitória para cada 2 cartas de objetivo em sua área de objetivos (estejam elas cumpridas ou não).",
  },
  {
    id: "3",
    name: "Grupos de trabalhadores",
    description:
      "Ganhe 4 pontos de vitória para cada grupo de 1 gaucho, 1 carpintero, 1 maquinista e 1 granjero na sua seção dos trabalhadores (incluindo os impressos no seu tabuleiro de jogador).",
  },
  {
    id: "4",
    name: "Gado de valor 3, 4 ou 5",
    description:
      "Ganhe 1 ponto de vitória para cada carta de gado com um valor de criação de 3, 4 ou 5 no seu baralho de rebanho.",
  },
  {
    id: "5",
    name: "Estações com discos",
    description:
      "Ganhe 3 pontos de vitória para cada 2 espaços de estação que tenham seus discos neles. (A última estação conta apenas uma vez para isso, mesmo que você tenha vários discos nela).",
  },
  {
    id: "6",
    name: "Trabalhadores com força",
    description:
      "Ganhe 3 pontos de vitória para cada 2 fichas de trabalhador na sua seção dos trabalhadores que tenham o ícone de força impresso nelas.",
  },
  {
    id: "7",
    name: "Fichas de fazendeiro",
    description:
      "Ganhe 1 ponto de vitória para cada ficha de fazendeiro (amarela, laranja, azul e verde) à sua frente (mas não aquelas no seu tabuleiro de jogador).",
  },
  {
    id: "8",
    name: "Construções privadas no tabuleiro",
    description:
      "Ganhe 3 pontos de vitória para cada 2 das suas fichas de construção privada colocadas no tabuleiro de jogo.",
  },
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
