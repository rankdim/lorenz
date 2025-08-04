import { getRainbowColor } from './rainbow';
import { getGoldenColor } from './golden';
import { getMetallicRedColor } from './metallicRed';
import { getCosmicColor } from './cosmic';
import { getPlasmaColor } from './plasma';
import { getFireColor } from './fire';

export const COLOR_SCHEMES = {
  RAINBOW: 'rainbow',
  GOLDEN: 'golden',
  METALLIC_RED: 'metallic_red',
  COSMIC: 'cosmic',
  PLASMA: 'plasma',
  FIRE: 'fire'
};

let currentColorScheme = COLOR_SCHEMES.RAINBOW;

const colorFunctions = {
  [COLOR_SCHEMES.RAINBOW]: getRainbowColor,
  [COLOR_SCHEMES.GOLDEN]: getGoldenColor,
  [COLOR_SCHEMES.METALLIC_RED]: getMetallicRedColor,
  [COLOR_SCHEMES.COSMIC]: getCosmicColor,
  [COLOR_SCHEMES.PLASMA]: getPlasmaColor,
  [COLOR_SCHEMES.FIRE]: getFireColor
};

export function getTrailColor(p, i, totalPoints) {
  const colorFunction = colorFunctions[currentColorScheme] || colorFunctions[COLOR_SCHEMES.RAINBOW];
  return colorFunction(p, i, totalPoints);
}

export function setColorScheme(scheme) {
  if (Object.values(COLOR_SCHEMES).includes(scheme)) {
    currentColorScheme = scheme;
  }
}

export function getCurrentColorScheme() {
  return currentColorScheme;
}
