import { getTrailColor } from '../colors/index.js';

/**
 * A minimalist pattern that simply draws each point of the attractor as a small dot.
 * The color and alpha of each point are determined by its position in the trail.
 */
export function drawPoints(p, attractor, globalOpacity = 1) {
  const { points } = attractor.state;
  const { scale, offset } = attractor.parameters;

  p.strokeWeight(4);
  p.beginShape(p.POINTS);
  for (let i = 0; i < points.length; i++) {
    let point = points[i];
    let { r, g, b } = getTrailColor(p, i, points.length);
    let alpha = p.map(i, 0, points.length - 1, 50, 255) * globalOpacity;
    p.stroke(r, g, b, alpha);
    p.vertex(
      (point.x - offset.x) * scale,
      (point.y - offset.y) * scale,
      (point.z - offset.z) * scale
    );
  }
  p.endShape();
}
