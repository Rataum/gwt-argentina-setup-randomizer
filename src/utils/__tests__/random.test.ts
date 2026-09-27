import { describe, expect, it } from "vitest";
import { createRng, shuffle } from "../random";

describe("createRng", () => {
  it("produz sempre a mesma sequência para a mesma seed", () => {
    const rngA = createRng(482913);
    const rngB = createRng(482913);

    const sequenceA = [rngA(), rngA(), rngA()];
    const sequenceB = [rngB(), rngB(), rngB()];

    expect(sequenceA).toEqual(sequenceB);
  });

  it("produz sequências diferentes para seeds diferentes", () => {
    const rngA = createRng(1);
    const rngB = createRng(2);

    expect(rngA()).not.toEqual(rngB());
  });

  it("sempre gera números em [0, 1)", () => {
    const rng = createRng(12345);
    for (let i = 0; i < 100; i++) {
      const value = rng();
      expect(value).toBeGreaterThanOrEqual(0);
      expect(value).toBeLessThan(1);
    }
  });
});

describe("shuffle", () => {
  it("produz uma permutação válida (mesmos elementos, possivelmente reordenados)", () => {
    const original = ["A", "B", "C", "D", "E", "F", "G", "H"];
    const rng = createRng(42);
    const result = shuffle(original, rng);

    expect(result).toHaveLength(original.length);
    expect([...result].sort()).toEqual([...original].sort());
  });

  it("não modifica o array original", () => {
    const original = ["A", "B", "C"];
    const rng = createRng(1);
    shuffle(original, rng);

    expect(original).toEqual(["A", "B", "C"]);
  });

  it("é determinístico para a mesma seed", () => {
    const original = ["A", "B", "C", "D", "E", "F", "G", "H"];
    const resultA = shuffle(original, createRng(999));
    const resultB = shuffle(original, createRng(999));

    expect(resultA).toEqual(resultB);
  });
});
