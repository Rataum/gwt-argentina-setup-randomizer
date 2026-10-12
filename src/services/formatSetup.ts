import type { Translations } from "../i18n/translations";
import type { SetupResult } from "../models/game";

/**
 * Texto do setup para copiar/compartilhar, no idioma de `t`. Quando `url` é
 * informada, ela é adicionada ao final (usado pelo botão Compartilhar).
 */
export function formatSetupAsText(result: SetupResult, t: Translations, url?: string): string {
  const neutralLine = result.neutralBuildings.map((building) => building.letter).join(" ");
  const stationMastersLines = result.stationMasters
    .map((master, index) => {
      const name = t.stationMasters[master.id]?.name ?? master.id;
      return t.text.stationMasterLine(index + 1, name, master.id);
    })
    .join("\n");
  const playersLine = result.privateBuildings.map((b) => `${b.number}${b.side}`).join(" ");
  const citiesLines = result.cities.map((city) => `${city.name} ${city.side}`).join("\n");

  const lines = [
    "GWT Argentina",
    "",
    `Seed: ${result.masterSeed}`,
    "",
    t.text.neutralBuildings,
    neutralLine,
    "",
    t.text.stationMasters,
    stationMastersLines,
    "",
    t.text.playerBuildings,
    playersLine,
    "",
    t.text.cities,
    citiesLines,
  ];

  if (url) {
    lines.push("", url);
  }

  return lines.join("\n");
}
