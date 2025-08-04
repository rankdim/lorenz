import p5 from 'p5';
import Stats from 'stats.js';
import { createControls } from './modules/controls';
import { LorenzAttractor } from './modules/lorenz';
import { sketch } from './modules/render';
import './style.css';

import { PATTERNS, setRenderPattern } from './modules/render';

let containerId = 'lorenz-container';

const stats = new Stats();
stats.showPanel(0);
document.getElementById('stats-container').appendChild(stats.dom);

const lorenz = new LorenzAttractor();
createControls(containerId, lorenz);

setRenderPattern(PATTERNS.PARTICLES);

new p5((p) => sketch(p, lorenz, stats));
