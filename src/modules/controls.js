import {
  setRenderPattern,
  PATTERNS,
  setColorScheme,
  COLOR_SCHEMES,
  setZoom,
  toggleAxes,
  setOpacity,
  getTargetZoom,
  onZoomChange,
} from './render';

const CONTROL_CONFIGS = {
  sigma: { min: 1, max: 20, value: 10, step: 0.1, label: 'σ' },
  rho: { min: 10, max: 50, value: 28, step: 0.1, label: 'ρ' },
  beta: { min: 1, max: 5, value: 2.67, step: 0.01, label: 'β' },
  speed: { min: 0.1, max: 3, value: 1, step: 0.1, label: 'Speed' },
  opacity: { min: 0.1, max: 1, value: 0.8, step: 0.05, label: 'Opacity' },
  zoom: { min: 0.5, max: 10, value: 3, step: 0.1, label: 'Zoom' }
};

const SELECT_OPTIONS = {
  patterns: [
    { value: PATTERNS.RAINBOW_TRAIL, label: 'Trail' },
    { value: PATTERNS.PARTICLES, label: 'Particles' },
    { value: PATTERNS.POINTS, label: 'Points' },
    { value: PATTERNS.SURFACE, label: 'Surface' },
    { value: PATTERNS.SPHERES, label: 'Spheres' }
  ],
  colors: [
    { value: COLOR_SCHEMES.RAINBOW, label: 'Rainbow' },
    { value: COLOR_SCHEMES.GOLDEN, label: 'Golden' },
    { value: COLOR_SCHEMES.METALLIC_RED, label: 'Red' },
    { value: COLOR_SCHEMES.COSMIC, label: 'Cosmic' },
    { value: COLOR_SCHEMES.PLASMA, label: 'Plasma' },
    { value: COLOR_SCHEMES.FIRE, label: 'Fire' }
  ]
};

function getRandomItem(obj) {
  const values = Object.values(obj);
  return values[Math.floor(Math.random() * values.length)];
}

function createSliderControl(id, config) {
  return `
    <div class="control-row">
      <span>${config.label}</span>
      <input type="range" id="${id}" min="${config.min}" max="${config.max}" 
             value="${config.value}" step="${config.step}">
      <span id="${id}Val">${config.value}</span>
    </div>
  `;
}

function createSelectControl(id, options) {
  const optionsHtml = options.map(opt => 
    `<option value="${opt.value}">${opt.label}</option>`
  ).join('');
  return `<select id="${id}">${optionsHtml}</select>`;
}

function createControlsHTML() {
  const sliders = Object.entries(CONTROL_CONFIGS)
    .map(([id, config]) => createSliderControl(id, config))
    .join('');

  return `
    ${sliders}
    <div class="control-row">
      ${createSelectControl('patternSelect', SELECT_OPTIONS.patterns)}
      ${createSelectControl('colorSelect', SELECT_OPTIONS.colors)}
    </div>
    <div class="control-row">
      <button id="resetBtn">Reset</button>
      <button id="trailBtn">Trail</button>
      <button id="axesBtn">Axes</button>
    </div>
  `;
}

function setupSliderListeners(lorenz) {
  const sliderHandlers = {
    sigma: (value) => lorenz.setParameters(value, null, null),
    rho: (value) => lorenz.setParameters(null, value, null),
    beta: (value) => lorenz.setParameters(null, null, value),
    speed: (value) => lorenz.setSpeed(value),
    opacity: (value) => setOpacity(value),
    zoom: (value) => setZoom(value)
  };

  Object.entries(sliderHandlers).forEach(([id, handler]) => {
    const slider = document.getElementById(id);
    const valueDisplay = document.getElementById(`${id}Val`);
    
    slider.addEventListener('input', (e) => {
      const value = parseFloat(e.target.value);
      const displayValue = id === 'zoom' ? value.toFixed(1) : value;
      valueDisplay.textContent = displayValue;
      handler(value);
    });
  });
}

function setupButtonListeners(lorenz) {
  document.getElementById('resetBtn').addEventListener('click', () => lorenz.reset());
  document.getElementById('trailBtn').addEventListener('click', () => lorenz.toggleTrail());
  document.getElementById('axesBtn').addEventListener('click', () => toggleAxes());
}

function setupSelectListeners() {
  document.getElementById('patternSelect').addEventListener('change', (e) => {
    setRenderPattern(e.target.value);
  });
  
  document.getElementById('colorSelect').addEventListener('change', (e) => {
    setColorScheme(e.target.value);
  });
}

function initializeRandomSettings() {
  const randomPattern = getRandomItem(PATTERNS);
  const randomColorScheme = getRandomItem(COLOR_SCHEMES);

  setRenderPattern(randomPattern);
  setColorScheme(randomColorScheme);

  document.getElementById('patternSelect').value = randomPattern;
  document.getElementById('colorSelect').value = randomColorScheme;
}

function syncZoomControls() {
  const initialZoom = getTargetZoom();
  const zoomSlider = document.getElementById('zoom');
  const zoomValue = document.getElementById('zoomVal');
  
  zoomSlider.value = initialZoom;
  zoomValue.textContent = initialZoom.toFixed(1);
  
  onZoomChange((newZoom) => {
    zoomSlider.value = newZoom;
    zoomValue.textContent = newZoom.toFixed(1);
  });
}

export function createControls(containerId, lorenz) {
  const controlsDiv = document.createElement('div');
  controlsDiv.className = 'minimal-controls';
  controlsDiv.innerHTML = createControlsHTML();
  
  document.body.appendChild(controlsDiv);
  
  setupSliderListeners(lorenz);
  setupButtonListeners(lorenz);
  setupSelectListeners();
  initializeRandomSettings();
  syncZoomControls();
}
