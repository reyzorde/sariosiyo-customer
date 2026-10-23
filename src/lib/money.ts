/** All money in integer tiyin (1 so'm = 100 tiyin). */

export function formatSom(tiyin: number): string {
  const som = Math.round(tiyin / 100);
  return `${som.toLocaleString("uz-UZ")} so'm`;
}

export function somToTiyin(som: number): number {
  return Math.round(som * 100);
}
