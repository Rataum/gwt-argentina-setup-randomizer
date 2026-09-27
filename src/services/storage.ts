import type { HistoryEntry, SetupState } from "../models/game";

const STORAGE_KEY = "gwt-argentina:history";
const MAX_HISTORY_ENTRIES = 50;

function isStorageAvailable(): boolean {
  try {
    return typeof window !== "undefined" && !!window.localStorage;
  } catch {
    return false;
  }
}

export function getHistory(): HistoryEntry[] {
  if (!isStorageAvailable()) return [];

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as HistoryEntry[];
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    // Dados corrompidos ou inacessíveis: trata como histórico vazio em vez
    // de quebrar o aplicativo.
    return [];
  }
}

/**
 * Salva um novo setup completo no início do histórico. Se um setup com a
 * mesma `masterSeed` já existir, ele é movido para o topo em vez de
 * duplicado.
 */
export function addHistoryEntry(state: SetupState): HistoryEntry[] {
  if (!isStorageAvailable()) return [];

  const existing = getHistory().filter((entry) => entry.masterSeed !== state.masterSeed);

  const entry: HistoryEntry = {
    ...state,
    createdAt: new Date().toISOString(),
  };

  const updated = [entry, ...existing].slice(0, MAX_HISTORY_ENTRIES);

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

  return updated;
}

export function clearHistory(): void {
  if (!isStorageAvailable()) return;
  window.localStorage.removeItem(STORAGE_KEY);
}
