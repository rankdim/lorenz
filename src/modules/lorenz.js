import { rk4 } from './ode';

const DEFAULT_PARAMETERS = {
  sigma: 10,
  rho: 28,
  beta: 8 / 3,
  dt: 0.01,
  iterationsPerStep: 10,
  maxPoints: 3000,
  scale: 6,
  offset: { x: 0, y: 0, z: 27 }
};

const DEFAULT_INITIAL_POSITION = { x: 1, y: 1, z: 1 };
const POSITION_NOISE_RANGE = 0.2;

export class LorenzAttractor {
  constructor(params = {}) {
    this.params = { ...DEFAULT_PARAMETERS, ...params };
    this.points = [];
    this.showTrail = true;
    this.currentPosition = this._generateRandomPosition();
  }

  get state() {
    return {
      points: this.points,
      showTrail: this.showTrail,
      currentPosition: this.currentPosition
    };
  }

  get parameters() {
    return { ...this.params };
  }

  step() {
    const { sigma, rho, beta, dt, iterationsPerStep, maxPoints } = this.params;
    
    for (let i = 0; i < iterationsPerStep; i++) {
      this.currentPosition = rk4(
        (pos) => this._lorenzDerivative(pos, sigma, rho, beta),
        this.currentPosition,
        dt
      );
      
      this.points.push({ ...this.currentPosition });
      
      if (this.points.length > maxPoints) {
        this.points.shift();
      }
    }
  }

  reset() {
    this.currentPosition = this._generateRandomPosition();
    this.points = [];
  }

  toggleTrail() {
    this.showTrail = !this.showTrail;
    if (!this.showTrail) {
      this.points = [];
    }
  }

  setParameters(sigma, rho, beta) {
    if (sigma !== null && sigma !== undefined) this.params.sigma = sigma;
    if (rho !== null && rho !== undefined) this.params.rho = rho;
    if (beta !== null && beta !== undefined) this.params.beta = beta;
  }

  setSpeed(speed) {
    this.params.iterationsPerStep = Math.max(1, Math.round(speed * 5));
  }

  setMaxPoints(maxPoints) {
    this.params.maxPoints = maxPoints;
    if (this.points.length > maxPoints) {
      this.points = this.points.slice(-maxPoints);
    }
  }

  _lorenzDerivative(pos, sigma, rho, beta) {
    const { x, y, z } = pos;
    return {
      x: sigma * (y - x),
      y: x * (rho - z) - y,
      z: x * y - beta * z
    };
  }

  _generateRandomPosition(base = DEFAULT_INITIAL_POSITION, noiseRange = POSITION_NOISE_RANGE) {
    const noise = () => (Math.random() - 0.5) * noiseRange;
    return {
      x: base.x + noise(),
      y: base.y + noise(),
      z: base.z + noise()
    };
  }
}

