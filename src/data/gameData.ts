import type { City, NeutralBuilding, PrivateBuilding } from "../models/game";

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
