/**
 * Gerador de números pseudoaleatórios determinístico (mulberry32).
 *
 * Dado o mesmo `seed`, `createRng` sempre devolve uma função geradora que
 * produz exatamente a mesma sequência de números em [0, 1). É isso que nos
 * permite reproduzir um setup inteiro a partir de um único número (a seed).
 *
 * Não usamos `Math.random()` para gerar o conteúdo do setup, pois ele não é
 * reproduzível. `Math.random()` só é usado (em `seedGenerator.ts`) para
 * sortear uma NOVA seed quando o usuário pede um setup novo.
 */
export type Rng = () => number;

export function createRng(seed: number): Rng {
  // Garante um inteiro de 32 bits sem sinal como estado inicial.
  let state = seed >>> 0;

  return function rng(): number {
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Sorteia um inteiro em [min, max] (inclusive nos dois extremos) usando o
 * gerador fornecido.
 */
export function randomInt(rng: Rng, min: number, max: number): number {
  return Math.floor(rng() * (max - min + 1)) + min;
}

/**
 * Sorteia um dos dois lados possíveis ("A" ou "B") usando o gerador
 * fornecido.
 */
export function randomSide(rng: Rng): "A" | "B" {
  return rng() < 0.5 ? "A" : "B";
}

/**
 * Embaralha uma cópia do array recebido usando o algoritmo de Fisher-Yates,
 * que produz uma distribuição uniforme entre todas as permutações possíveis.
 * O array original não é modificado.
 */
export function shuffle<T>(items: readonly T[], rng: Rng): T[] {
  const result = [...items];

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}
