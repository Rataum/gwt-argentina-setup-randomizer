import type { SetupState } from "../models/game";
import { deriveSectionSeedsFromMaster } from "./setupGenerator";

/**
 * Codificação da seed na URL.
 *
 * Formato padrão (setup gerado do zero, nenhuma seção sorteada à parte):
 *   ?seed=482913
 *
 * Quando uma ou mais seções foram sorteadas de forma independente (veja
 * `useSetup.ts`), a URL também carrega a seed daquela seção específica, para
 * que o link continue reproduzindo exatamente o que está na tela:
 *   ?seed=482913&ns=77281            (construções neutras sorteadas à parte)
 *   ?seed=482913&ps=12345&cs=98765   (jogadores e cidades sorteados à parte)
 *
 * Parâmetros: seed = masterSeed, ns = neutralSeed, ps = playerSeed,
 * cs = citySeed.
 */

const PARAM_MASTER = "seed";
const PARAM_NEUTRAL = "ns";
const PARAM_PLAYER = "ps";
const PARAM_CITY = "cs";

function parseSeedParam(value: string | null): number | null {
  if (!value) return null;
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || !Number.isInteger(parsed)) return null;
  return parsed;
}

/**
 * Lê o estado do setup a partir de uma query string (ex.:
 * `window.location.search`). Devolve `null` se não houver seed válida.
 */
export function readStateFromSearch(search: string): SetupState | null {
  const params = new URLSearchParams(search);
  const masterSeed = parseSeedParam(params.get(PARAM_MASTER));
  if (masterSeed === null) return null;

  const derived = deriveSectionSeedsFromMaster(masterSeed);

  const neutralSeed = parseSeedParam(params.get(PARAM_NEUTRAL)) ?? derived.neutralSeed;
  const playerSeed = parseSeedParam(params.get(PARAM_PLAYER)) ?? derived.playerSeed;
  const citySeed = parseSeedParam(params.get(PARAM_CITY)) ?? derived.citySeed;

  return { masterSeed, neutralSeed, playerSeed, citySeed };
}

/**
 * Constrói a query string correspondente a um estado de setup, incluindo
 * apenas os parâmetros de seção que divergem do que seria derivado da
 * `masterSeed` (mantendo a URL padrão limpa: só `?seed=...`).
 */
export function buildSearchFromState(state: SetupState): string {
  const derived = deriveSectionSeedsFromMaster(state.masterSeed);
  const params = new URLSearchParams();

  params.set(PARAM_MASTER, String(state.masterSeed));

  if (state.neutralSeed !== derived.neutralSeed) {
    params.set(PARAM_NEUTRAL, String(state.neutralSeed));
  }
  if (state.playerSeed !== derived.playerSeed) {
    params.set(PARAM_PLAYER, String(state.playerSeed));
  }
  if (state.citySeed !== derived.citySeed) {
    params.set(PARAM_CITY, String(state.citySeed));
  }

  return `?${params.toString()}`;
}

/**
 * Monta a URL completa e compartilhável para um estado de setup, a partir
 * da URL base atual da página (sem query nem hash).
 */
export function buildShareUrl(state: SetupState): string {
  const base = `${window.location.origin}${window.location.pathname}`;
  return `${base}${buildSearchFromState(state)}`;
}
