/**
 * This function simulates a realistic fire gradient.
 * - It uses a `flicker` effect (a sine wave) to modulate the `heat` of the fire, creating a flickering animation.
 * - The red, green, and blue channels are mapped to the `heat` value to create a gradient from hot yellow/white to cooler red/orange.
 * - The blue channel is only introduced at the "hottest" part of the trail to simulate the blue part of a flame.
 */
export function getFireColor(p, i, totalPoints) {
  let progress = i / totalPoints;
  let flicker = p.sin(p.frameCount * 0.1 + i * 0.2) * 0.3 + 0.7;
  
  let heat = progress * flicker;
  let r = p.map(heat, 0, 1, 100, 255);
  let g = p.map(heat, 0, 1, 0, 200) * p.map(progress, 0, 1, 0.2, 1);
  let b = p.map(heat, 0, 1, 0, 50) * p.map(progress, 0.7, 1, 0, 1);
  
  return { r, g, b };
}