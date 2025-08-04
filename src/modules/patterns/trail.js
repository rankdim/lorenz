import { getTrailColor } from '../colors/index.js';

/**
 * Draws a classic smooth line trail connecting all points of the attractor in sequence.
 * The color and transparency of the line change along its length, creating a smooth gradient.
 */
export function drawTrail(p, attractor, globalOpacity = 1) {
  const { points, showTrail } = attractor.state;
  const { scale, offset } = attractor.parameters;

  if (showTrail && points.length > 1) {
    p.beginShape();
    for (let i = 0; i < points.length; i++) {
      let point = points[i];
      let alpha = p.map(i, 0, points.length - 1, 0, 255) * globalOpacity;
      let { r, g, b } = getTrailColor(p, i, points.length);
      p.stroke(r, g, b, alpha);
      p.vertex(
        (point.x - offset.x) * scale,
        (point.y - offset.y) * scale,
        (point.z - offset.z) * scale,
      );
    }
    p.endShape();
  }
}
