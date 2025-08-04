import { setRotationPaused, setAngles } from './rotation';

let zoomLevel = 1.7;
let targetZoom = 1.7;
let zoomChangeCallback = null;

const CAMERA_PRESETS = {
  FREE: 'free',
  XY: 'xy',
  XZ: 'xz', 
  YZ: 'yz',
  ISO: 'iso',
  PERSPECTIVE: 'perspective'
};

export function setZoom(zoom) {
  const newZoom = Math.max(0.5, Math.min(10, zoom));
  if (newZoom !== targetZoom) {
    targetZoom = newZoom;
    if (zoomChangeCallback) {
      zoomChangeCallback(targetZoom);
    }
  }
}

export function adjustZoom(delta) {
  const newZoom = Math.max(0.5, Math.min(10, targetZoom + delta));
  if (newZoom !== targetZoom) {
    targetZoom = newZoom;
    if (zoomChangeCallback) {
      zoomChangeCallback(targetZoom);
    }
  }
}

export function setCameraPreset(preset) {
  
  switch (preset) {
    case CAMERA_PRESETS.XY:
      setAngles(0, 0, 0, 0, 0);
      setRotationPaused(true);
      break;
      
    case CAMERA_PRESETS.XZ:
      setAngles(Math.PI / 2, 0, Math.PI / 2, 0, 0);
      setRotationPaused(true);
      break;
      
    case CAMERA_PRESETS.YZ:
      setAngles(0, Math.PI / 2, 0, Math.PI / 2, 0);
      setRotationPaused(true);
      break;
      
    case CAMERA_PRESETS.ISO:
      setAngles(-Math.PI / 6, Math.PI / 4, -Math.PI / 6, Math.PI / 4, 0);
      setRotationPaused(true);
      break;
      
    case CAMERA_PRESETS.PERSPECTIVE:
      setAngles(-0.3, 0.5, -0.3, 0.5, 0);
      setRotationPaused(true);
      break;
      
    case CAMERA_PRESETS.FREE:
    default:
      setRotationPaused(false);
      break;
  }
}

export function updateZoom(p) {
  zoomLevel = p.lerp(zoomLevel, targetZoom, 0.1);
  p.scale(zoomLevel);
}

export function getZoomLevel() {
  return zoomLevel;
}

export function getTargetZoom() {
  return targetZoom;
}

export function onZoomChange(callback) {
  zoomChangeCallback = callback;
}

export { CAMERA_PRESETS };