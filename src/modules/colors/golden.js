/**
 * This function produces a shimmering gold effect.
 * - It calculates the `progress` of the point along the trail (from 0 to 1).
 * - A `shimmer` effect is created using a sine wave that varies with both time (`p.frameCount`) and the point's index (`i`).
 * - The `brightness` is calculated by combining the progress and shimmer, making the trail brighter towards the end and giving it a pulsating glow.
 */
export function getGoldenColor(p, i, totalPoints) {
  let progress = i / totalPoints;
  let shimmer = p.sin(p.frameCount * 0.05 + i * 0.1) * 0.3 + 0.7;
  let brightness = p.map(progress, 0, 1, 0.4, 1.0) * shimmer;
  
  return {
    r: 255 * brightness,
    g: p.map(brightness, 0, 1, 140, 200),
    b: p.map(brightness, 0, 1, 0, 30)
  };
}