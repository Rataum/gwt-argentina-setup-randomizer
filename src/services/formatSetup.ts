import type { SetupResult } from "../models/game";

/**
 * Texto do setup para copiar/compartilhar. Quando `url` é informada, ela é
 * adicionada ao final (usado pelo botão Compartilhar).
 */
export function formatSetupAsText(result: SetupResult, url?: string): string {
  const neutralLine = result.neutralBuildings.map((building) => building.letter).join(" ");
  const stationMastersLines = result.stationMasters
    .map((master, index) => `${index + 1} — ${master.name} (mestre ${master.id})`)
    .join("\n");
  const playersLine = result.privateBuildings.map((b) => `${b.number}${b.side}`).join(" ");
  const citiesLines = result.cities.map((city) => `${city.name} ${city.side}`).join("\n");

  const lines = [
    "GWT Argentina",
    "",
    `Seed: ${result.masterSeed}`,
    "",
    "Construções neutras:",
    neutralLine,
    "",
    "Mestres das estações:",
    stationMastersLines,
    "",
    "Construções dos jogadores:",
    playersLine,
    "",
    "Cidades:",
    citiesLines,
  ];

  if (url) {
    lines.push("", url);
  }

  return lines.join("\n");
}
