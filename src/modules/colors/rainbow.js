/**
 * This function creates a classic rainbow effect.
 * - It maps the point's index (`i`) to a hue value, creating a gradient along the trail.
 * - It uses sine waves with offsets for the red, green, and blue channels to create smooth, wave-like transitions between colors.
 * - The `p.frameCount` variable is used to animate the colors over time, making the rainbow appear to shift.
 */
export function getRainbowColor(p, i, totalPoints) {
  let hue = p.map(i, 0, totalPoints - 1, 180, 360);
  let r = p.map(p.sin(hue * 0.01 + p.frameCount * 0.02), -1, 1, 100, 255);
  let g = p.map(p.sin(hue * 0.01 + p.frameCount * 0.02 + p.PI / 3), -1, 1, 100, 255);
  let b = p.map(p.sin(hue * 0.01 + p.frameCount * 0.02 + (2 * p.PI) / 3), -1, 1, 150, 255);
  return { r, g, b };
}