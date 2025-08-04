import { getTrailColor } from '../colors';

/**
 * A 3D spheres pattern that draws each point of the attractor as a small 3D sphere.
 * The color and alpha of each sphere are determined by its position in the trail.
 */
export function drawSpheres(p, attractor, globalOpacity = 1) {
  const { points } = attractor.state;
  const { scale, offset } = attractor.parameters;

  p.noStroke();
  
  for (let i = 0; i < points.length; i++) {
    let point = points[i];
    let { r, g, b } = getTrailColor(p, i, points.length);
    let alpha = p.map(i, 0, points.length - 1, 100, 255) * globalOpacity;
    
    p.fill(r, g, b, alpha);
    p.push();
    p.translate(
      (point.x - offset.x) * scale,
      (point.y - offset.y) * scale,
      (point.z - offset.z) * scale
    );
    p.sphere(1.5);
    p.pop();
  }
}