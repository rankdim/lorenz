import { getTrailColor } from '../colors/index.js';

let particleSystem = [];

/**
 * Renders the attractor as a system of dynamic particles.
 * - Each point is a particle with properties like age, size, and twinkle.
 * - Particles "age" and reset, creating a sense of movement.
 * - A sine wave is used to make the particles sparkle and vary in brightness.
 */
export function drawParticles(p, attractor, globalOpacity = 1) {
  const { points } = attractor.state;
  const { scale, offset } = attractor.parameters;
  
  // Update particle system
  while (particleSystem.length < points.length) {
    particleSystem.push({
      age: 0,
      maxAge: p.random(150, 300),
      size: p.random(2, 8),
      twinkle: p.random(0, p.TWO_PI)
    });
  }
  
  // Trim excess particles if points array shrunk
  if (particleSystem.length > points.length) {
    particleSystem = particleSystem.slice(0, points.length);
  }
  
  p.noStroke();
  for (let i = 0; i < points.length; i++) {
    let point = points[i];
    let particle = particleSystem[i];
    
    if (particle) {
      particle.age++;
      
      // Reset particle when it gets too old
      if (particle.age > particle.maxAge) {
        particle.age = 0;
        particle.maxAge = p.random(150, 300);
        particle.size = p.random(2, 8);
        particle.twinkle = p.random(0, p.TWO_PI);
      }
      
      // Use trail position for alpha instead of age for consistent visibility
      let alpha = p.map(i, 0, points.length - 1, 50, 255) * globalOpacity;
      let sparkle = p.sin(p.frameCount * 0.1 + particle.twinkle) * 0.5 + 0.5;
      let size = particle.size * sparkle;
      
      let { r, g, b } = getTrailColor(p, i, points.length);
      p.fill(r, g, b, alpha * sparkle);
      
      p.push();
      p.translate(
        (point.x - offset.x) * scale,
        (point.y - offset.y) * scale,
        (point.z - offset.z) * scale
      );
      p.sphere(size);
      p.pop();
    }
  }
}

export function clearParticles() {
    particleSystem = [];
}
