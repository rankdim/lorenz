import { getTrailColor } from '../colors/index.js';

/**
 * Renders the attractor as a continuous, flowing surface. It uses p5.js's
 * `TRIANGLE_STRIP` shape mode to connect the points, creating a solid,
 * ribbon-like form that twists and turns in 3D space.
 */
export function drawSurface(p, attractor, globalOpacity = 1) {
  const { points } = attractor.state;
  const { scale, offset } = attractor.parameters;

  if (points.length < 2) return;

  p.noStroke();
  p.beginShape(p.TRIANGLE_STRIP);

  for (let i = 0; i < points.length; i++) {
    let point = points[i];
    let { r, g, b } = getTrailColor(p, i, points.length);
    let alpha = p.map(i, 0, points.length - 1, 100, 255) * globalOpacity;
    p.fill(r, g, b, alpha);

    p.vertex(
      (point.x - offset.x) * scale,
      (point.y - offset.y) * scale,
      (point.z - offset.z) * scale
    );

    // Create a second vertex to form a strip
    if (i < points.length - 1) {
      let nextPoint = points[i+1];
       p.vertex(
        (nextPoint.x - offset.x) * scale,
        (nextPoint.y - offset.y) * scale - 5, // small offset to create thickness
        (nextPoint.z - offset.z) * scale
      );
    }
  }

  p.endShape();
}
