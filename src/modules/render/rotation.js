let angleX = 0;
let angleY = 0;
let angleZ = 0;
let isRotationPaused = false;

let isDragging = false;
let lastMouseX = 0;
let lastMouseY = 0;
let dragAngleX = 0;
let dragAngleY = 0;

// Autorotation speeds for each axis
let autoRotationSpeedX = 0.003;
let autoRotationSpeedY = 0.005;
let autoRotationSpeedZ = 0.002;

function updateRotation(p) {
  if (!isRotationPaused && !isDragging) {
    angleX += autoRotationSpeedX;
    angleY += autoRotationSpeedY;
    angleZ += autoRotationSpeedZ;
  }
  
  if (isDragging) {
    angleX = dragAngleX;  
    angleY = dragAngleY;
  }
  
  p.rotateX(angleX);
  p.rotateY(angleY);
  p.rotateZ(angleZ);
}

export function toggleRotationPause() {
  isRotationPaused = !isRotationPaused;
}

export function setRotationPaused(paused) {
  isRotationPaused = paused;
}


export function setAngles(newAngleX, newAngleY, newDragAngleX, newDragAngleY, newAngleZ) {
  angleX = newAngleX;
  angleY = newAngleY;
  dragAngleX = newDragAngleX;
  dragAngleY = newDragAngleY;
  angleZ = newAngleZ;
}

export function getAngles() {
  return { angleX, angleY, angleZ };
}

export function setAutoRotationSpeed(speedX, speedY, speedZ) {
  if (speedX !== null) autoRotationSpeedX = speedX;
  if (speedY !== null) autoRotationSpeedY = speedY;
  if (speedZ !== null) autoRotationSpeedZ = speedZ;
}

export function getAutoRotationSpeed() {
  return { speedX: autoRotationSpeedX, speedY: autoRotationSpeedY, speedZ: autoRotationSpeedZ };
}

export function setupMouseEvents(canvas) {
  canvas.canvas.addEventListener('mousedown', (event) => {
    isDragging = true;
    lastMouseX = event.clientX;
    lastMouseY = event.clientY;
    canvas.canvas.style.cursor = 'grabbing';
  });
  
  canvas.canvas.addEventListener('mousemove', (event) => {
    if (isDragging) {
      const deltaX = event.clientX - lastMouseX;
      const deltaY = event.clientY - lastMouseY;
      dragAngleY += deltaX * 0.01;
      dragAngleX += deltaY * 0.01;
      dragAngleX = canvas.constrain(dragAngleX, -Math.PI / 2, Math.PI / 2);
      lastMouseX = event.clientX;
      lastMouseY = event.clientY;
    }
  });
  
  canvas.canvas.addEventListener('mouseup', () => {
    isDragging = false;
    canvas.canvas.style.cursor = 'grab';
  });
  
  canvas.canvas.addEventListener('mouseleave', () => {
    isDragging = false;
    canvas.canvas.style.cursor = 'grab';
  });
  
  canvas.canvas.addEventListener('click', () => {
    toggleRotationPause();
  });
  
  canvas.canvas.style.cursor = 'grab';
}

export { updateRotation };