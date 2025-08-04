import { drawPattern } from '../patterns';
import { updateRotation, setupMouseEvents, getAngles } from './rotation';
import { updateZoom, adjustZoom, getZoomLevel } from './camera';

let showAxes = false;

function updateInfoDisplay(attractor) {
  const infoDiv = document.getElementById('info-display');
  if (!infoDiv) return;
  
  const pointsCount = attractor.state.points.length;
  const { angleX, angleY, angleZ } = getAngles();
  const angleXDeg = (angleX * 180 / Math.PI).toFixed(1);
  const angleYDeg = (angleY * 180 / Math.PI).toFixed(1);
  const angleZDeg = (angleZ * 180 / Math.PI).toFixed(1);
  
  infoDiv.innerHTML = `
    <div><span class="info-label">Camera:</span></div>
    <div><span class="info-label">X:</span> <span class="info-value">${angleXDeg}°</span></div>
    <div><span class="info-label">Y:</span> <span class="info-value">${angleYDeg}°</span></div>
    <div><span class="info-label">Z:</span> <span class="info-value">${angleZDeg}°</span></div>
    <div><span class="info-label">Points:</span> <span class="info-value">${pointsCount}</span></div>
    <div><span class="info-label">Zoom:</span> <span class="info-value">${getZoomLevel().toFixed(1)}x</span></div>
  `;
}

function drawCurrentPoint(p, attractor) {
  const { currentPosition } = attractor.state;
  const { scale, offset } = attractor.parameters;

  p.push();
  p.translate(
    (currentPosition.x - offset.x) * scale,
    (currentPosition.y - offset.y) * scale,
    (currentPosition.z - offset.z) * scale,
  );
  p.fill(0, 0, 0);
  p.noStroke();
  p.sphere(3);
  p.pop();
}

function drawAxes(p) {
  if (!showAxes) return;
  
  const axisLength = 120;
  const tickSize = 5;
  const tickSpacing = 20;
  
  p.strokeWeight(2);
  
  p.stroke(255, 100, 100, 180);
  p.line(-axisLength, 0, 0, axisLength, 0, 0);
  
  p.stroke(255, 150, 150, 120);
  p.strokeWeight(1);
  for (let i = -axisLength; i <= axisLength; i += tickSpacing) {
    if (i !== 0) {
      p.line(i, -tickSize, 0, i, tickSize, 0);
      p.line(i, 0, -tickSize, i, 0, tickSize);
    }
  }
  
  p.push();
  p.translate(axisLength + 15, 0, 0);
  p.fill(255, 100, 100, 200);
  p.noStroke();
  p.textAlign(p.CENTER, p.CENTER);
  p.textSize(12);
  p.text('X', 0, 0);
  p.pop();
  
  p.strokeWeight(2);
  p.stroke(100, 255, 100, 180);
  p.line(0, -axisLength, 0, 0, axisLength, 0);
  
  p.stroke(150, 255, 150, 120);
  p.strokeWeight(1);
  for (let i = -axisLength; i <= axisLength; i += tickSpacing) {
    if (i !== 0) {
      p.line(-tickSize, i, 0, tickSize, i, 0);
      p.line(0, i, -tickSize, 0, i, tickSize);
    }
  }
  
  p.push();
  p.translate(0, axisLength + 15, 0);
  p.fill(100, 255, 100, 200);
  p.noStroke();
  p.textAlign(p.CENTER, p.CENTER);
  p.textSize(12);
  p.text('Y', 0, 0);
  p.pop();
  
  p.strokeWeight(2);
  p.stroke(100, 100, 255, 180);
  p.line(0, 0, -axisLength, 0, 0, axisLength);
  
  p.stroke(150, 150, 255, 120);
  p.strokeWeight(1);
  for (let i = -axisLength; i <= axisLength; i += tickSpacing) {
    if (i !== 0) {
      p.line(-tickSize, 0, i, tickSize, 0, i);
      p.line(0, -tickSize, i, 0, tickSize, i);
    }
  }
  
  p.push();
  p.translate(0, 0, axisLength + 15);
  p.fill(100, 100, 255, 200);
  p.noStroke();
  p.textAlign(p.CENTER, p.CENTER);
  p.textSize(12);
  p.text('Z', 0, 0);
  p.pop();
  
  p.push();
  p.fill(255, 255, 255, 150);
  p.noStroke();
  p.sphere(3);
  p.pop();
}

export function toggleAxes() {
  showAxes = !showAxes;
}

export function sketch(p, attractor, stats) {
  p.setup = () => {
    const canvas = p.createCanvas(window.innerWidth, window.innerHeight, p.WEBGL);
    canvas.parent('lorenz-container');
    
    canvas.canvas.addEventListener('wheel', (event) => {
      event.preventDefault();
      const zoomDelta = event.deltaY > 0 ? -0.2 : 0.2;
      adjustZoom(zoomDelta);
    }, { passive: false });
    
    setupMouseEvents(canvas);
  };

  p.windowResized = () => {
    p.resizeCanvas(window.innerWidth, window.innerHeight);
  };

  p.draw = () => {
    if (stats) stats.begin();
    p.background(8, 10, 15);

    updateZoom(p);
    updateRotation(p);
    attractor.step();

    drawAxes(p);

    p.stroke(255);
    p.strokeWeight(1);
    p.noFill();

    drawPattern(p, attractor);
    drawCurrentPoint(p, attractor);
    
    updateInfoDisplay(attractor);
    
    if (stats) stats.end();
  };
}