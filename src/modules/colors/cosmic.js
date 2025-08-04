/**
 * This function generates colors reminiscent of a deep space nebula.
 * - It uses a `nebula` effect, which is a sine wave, to create a smooth, flowing transition between dark and light areas.
 * - The red, green, and blue channels are calculated using different combinations of the point's `progress` and the `nebula` effect to create a complex, multi-hued appearance.
 */
export function getCosmicColor(p, i, totalPoints) {
  let progress = i / totalPoints;
  let time = p.frameCount * 0.02;
  let phase = i * 0.05;
  
  // Multi-layered cosmic effect
  let nebula1 = p.sin(time + phase) * 0.5 + 0.5;
  let nebula2 = p.sin(time * 0.7 + phase * 1.3) * 0.5 + 0.5;
  let starField = p.sin(time * 0.3 + phase * 2.1) * 0.5 + 0.5;
  
  // Enhanced cosmic palette
  let r, g, b;
  
  if (progress < 0.3) {
    // Deep space: dark purples and magentas
    r = p.map(nebula1, 0, 1, 60, 140) * progress;
    g = p.map(nebula2, 0, 1, 20, 80) * progress;
    b = p.map(progress, 0, 1, 120, 200) * nebula1;
  } else if (progress < 0.7) {
    // Nebula region: blues and cyans
    r = p.map(starField, 0, 1, 40, 120) * progress;
    g = p.map(nebula1, 0, 1, 80, 160) * progress;
    b = p.map(progress, 0, 1, 150, 255) * nebula2;
  } else {
    // Stellar regions: bright blues to white-blue
    r = p.map(progress, 0.7, 1, 120, 220) * nebula1;
    g = p.map(progress, 0.7, 1, 140, 230) * nebula2;
    b = p.map(progress, 0.7, 1, 200, 255) * starField;
  }
  
  return { r, g, b };
}