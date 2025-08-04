/**
 * This function creates a high-energy, electric plasma effect.
 * - It uses multiple sine waves with different frequencies and phases for each color channel.
 * - This results in rapid and chaotic color oscillations, giving the trail a vibrant, energetic look.
 */
export function getPlasmaColor(p, i, totalPoints) {
  let t = p.frameCount * 0.05;
  let x = i * 0.1;
  
  let r = p.map(p.sin(x + t), -1, 1, 100, 255);
  let g = p.map(p.sin(x * 1.3 + t * 1.7), -1, 1, 0, 255);
  let b = p.map(p.sin(x * 0.7 + t * 2.1), -1, 1, 150, 255);
  
  return { r, g, b };
}