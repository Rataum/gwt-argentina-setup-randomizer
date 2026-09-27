import { useCallback, useMemo, useState } from "react";
import type { SetupState } from "../models/game";
import { createRandomSeed } from "../services/seedGenerator";
import { buildSetupResult, deriveSectionSeedsFromMaster } from "../services/setupGenerator";

function createFreshState(): SetupState {
  const masterSeed = createRandomSeed();
  return { masterSeed, ...deriveSectionSeedsFromMaster(masterSeed) };
}

export interface UseSetupApi {
  state: SetupState;
  result: ReturnType<typeof buildSetupResult>;
  /** Gera um setup inteiramente novo (nova seed principal). */
  newSetup: () => SetupState;
  /** Sorteia novamente apenas a ordem das construções neutras. */
  rerollNeutral: () => void;
  /** Sorteia novamente apenas os lados das construções de jogador. */
  rerollPlayers: () => void;
  /** Sorteia novamente apenas os lados das cidades/portos. */
  rerollCities: () => void;
  /** Substitui o estado inteiro (usado ao abrir uma seed vinda da URL/histórico). */
  loadState: (state: SetupState) => void;
}

/**
 * Hook que centraliza o estado de seeds do setup atual e as ações que o
 * modificam. O componente que usa este hook é responsável por persistir o
 * estado (histórico) e sincronizar a URL quando fizer sentido.
 */
export function useSetup(initialState?: SetupState): UseSetupApi {
  const [state, setState] = useState<SetupState>(initialState ?? createFreshState);

  const result = useMemo(() => buildSetupResult(state), [state]);

  const newSetup = useCallback(() => {
    const fresh = createFreshState();
    setState(fresh);
    return fresh;
  }, []);

  const rerollNeutral = useCallback(() => {
    setState((prev) => ({ ...prev, neutralSeed: createRandomSeed() }));
  }, []);

  const rerollPlayers = useCallback(() => {
    setState((prev) => ({ ...prev, playerSeed: createRandomSeed() }));
  }, []);

  const rerollCities = useCallback(() => {
    setState((prev) => ({ ...prev, citySeed: createRandomSeed() }));
  }, []);

  const loadState = useCallback((next: SetupState) => {
    setState(next);
  }, []);

  return { state, result, newSetup, rerollNeutral, rerollPlayers, rerollCities, loadState };
}
