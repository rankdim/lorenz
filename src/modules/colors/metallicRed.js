/**
 * This function creates a pulsing, metallic red color.
 * - It's similar to the golden color but uses a different color palette to achieve a red metallic look.
 * - The `intensity` of the color is modulated by a sine wave to create the pulsing highlight effect.
 */
export function getMetallicRedColor(p, i, totalPoints) {
  let progress = i / totalPoints;
  let metallic = p.sin(p.frameCount * 0.03 + i * 0.08) * 0.4 + 0.6;
  let intensity = p.map(progress, 0, 1, 0.3, 1.0) * metallic;
  
  return {
    r: p.map(intensity, 0, 1, 80, 255),
    g: p.map(intensity, 0, 1, 10, 100),
    b: p.map(intensity, 0, 1, 10, 80)
  };
}