/**
 * Geração de seeds.
 *
 * - `createRandomSeed()` gera uma seed nova e imprevisível (usada quando o
 *   usuário pede um "Novo Setup" ou sorteia uma seção novamente). Ela usa
 *   `crypto.getRandomValues` quando disponível, com `Math.random()` como
 *   fallback — mas note que essa aleatoriedade só é usada para ESCOLHER a
 *   seed, nunca para gerar o conteúdo do setup em si (isso é sempre feito
 *   pelo PRNG determinístico em `utils/random.ts`).
 *
 * - `deriveSectionSeed(masterSeed, salt)` deriva, de forma determinística, uma
 *   seed "filha" a partir da seed principal e de um identificador de seção
 *   ("neutral" | "player" | "city"). A mesma seed principal sempre deriva as
 *   mesmas três seeds de seção, o que é o que garante que uma `masterSeed`
 *   reproduz o setup completo.
 */

const MIN_SEED = 100_000;
const MAX_SEED = 999_999;

export function createRandomSeed(): number {
  if (typeof crypto !== "undefined" && "getRandomValues" in crypto) {
    const buffer = new Uint32Array(1);
    crypto.getRandomValues(buffer);
    const range = MAX_SEED - MIN_SEED + 1;
    return MIN_SEED + (buffer[0] % range);
  }

  // Fallback (ex.: ambiente de testes sem `crypto`).
  return MIN_SEED + Math.floor(Math.random() * (MAX_SEED - MIN_SEED + 1));
}

/** Hash simples de string (djb2), usado apenas para misturar o "salt" da seção. */
function hashString(value: string): number {
  let hash = 5381;
  for (let i = 0; i < value.length; i++) {
    hash = (hash * 33) ^ value.charCodeAt(i);
  }
  return hash >>> 0;
}

export type SectionSalt = "neutral" | "player" | "city";

export function deriveSectionSeed(masterSeed: number, salt: SectionSalt): number {
  const saltHash = hashString(salt);
  // Combinação simples e determinística dos dois valores em um inteiro de 32 bits.
  return ((masterSeed >>> 0) ^ (saltHash + 0x9e3779b9 + ((masterSeed << 6) >>> 0) + (masterSeed >>> 2))) >>> 0;
}
