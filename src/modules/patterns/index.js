import { drawTrail } from './trail';
import { drawParticles, clearParticles } from './particles';
import { drawPoints } from './points';
import { drawSurface } from './surface';
import { drawSpheres } from './spheres';

export const PATTERNS = {
  RAINBOW_TRAIL: 'rainbow_trail',
  PARTICLES: 'particles',
  POINTS: 'points',
  SURFACE: 'surface',
  SPHERES: 'spheres'
};

let currentPattern = PATTERNS.RAINBOW_TRAIL;
let globalOpacity = 0.8;

const patternFunctions = {
    [PATTERNS.RAINBOW_TRAIL]: drawTrail,
    [PATTERNS.PARTICLES]: drawParticles,
    [PATTERNS.POINTS]: drawPoints,
    [PATTERNS.SURFACE]: drawSurface,
    [PATTERNS.SPHERES]: drawSpheres
};

export function drawPattern(p, attractor) {
  const { showTrail } = attractor.state;
  
  if (!showTrail) return;

  // Store original alpha and apply global opacity
  p.push();
  
  const patternFunction = patternFunctions[currentPattern] || patternFunctions[PATTERNS.RAINBOW_TRAIL];
  patternFunction(p, attractor, globalOpacity);
  
  p.pop();
}

export function setRenderPattern(pattern) {
  if (Object.values(PATTERNS).includes(pattern)) {
    currentPattern = pattern;
    if (pattern !== PATTERNS.PARTICLES) {
        clearParticles();
    }
  }
}

export function getCurrentPattern() {
  return currentPattern;
}

export function setOpacity(opacity) {
  globalOpacity = Math.max(0.1, Math.min(1, opacity));
}
