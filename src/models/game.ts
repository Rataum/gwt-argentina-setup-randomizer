/**
 * Modelos de dados do domínio "setup de partida".
 *
 * Estes tipos descrevem apenas os componentes de
 * Great Western Trail: Argentina usados pelo randomizer:
 * - 8 construções neutras (tiles marcados com as letras A a H);
 * - 10 construções privadas (tiles numerados de 1 a 10, cada um com
 *   um lado "a" ou "b" impresso);
 * - 3 tiles de cidade/porto europeu, usados na variante para 2-3
 *   jogadores (Le Havre, Rotterdam, Liverpool), cada um com lado A ou B.
 */

export type Side = "A" | "B";

export interface NeutralBuilding {
  id: string;
  letter: string;
}

export interface PrivateBuilding {
  id: string;
  number: number;
}

export interface City {
  id: string;
  name: string;
}

export interface PrivateBuildingResult {
  number: number;
  side: Side;
}

export interface CityResult {
  name: string;
  side: Side;
}

/**
 * As três sementes que determinam, de forma independente, cada seção do
 * setup. Duas partidas com os mesmos três valores produzem exatamente o
 * mesmo resultado nas três seções.
 */
export interface SectionSeeds {
  neutralSeed: number;
  playerSeed: number;
  citySeed: number;
}

/**
 * Estado completo necessário para reproduzir (e compartilhar) um setup.
 *
 * `masterSeed` é a semente "principal", mostrada ao usuário e usada em
 * `?seed=...`. Quando um setup é criado do zero, as três sementes de seção
 * são derivadas dela. Quando uma seção é sorteada novamente de forma
 * independente, apenas a semente daquela seção muda — o `masterSeed`
 * continua sendo exibido como referência histórica, mas deixa de, sozinho,
 * reproduzir o estado atual (por isso a URL de compartilhamento também leva
 * as sementes de seção que tiverem sido sorteadas à parte).
 */
export interface SetupState extends SectionSeeds {
  masterSeed: number;
}

export interface SetupResult extends SetupState {
  neutralBuildings: NeutralBuilding[];
  privateBuildings: PrivateBuildingResult[];
  cities: CityResult[];
  createdAt: string;
}

/**
 * Uma entrada salva no histórico local (localStorage).
 */
export interface HistoryEntry extends SetupState {
  createdAt: string;
}
