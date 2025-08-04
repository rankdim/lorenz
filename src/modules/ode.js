export function rk4(derivativeFn, y0, dt, ...args) {
  const k1 = derivativeFn(y0, ...args);

  const y1 = {
    x: y0.x + (k1.x * dt) / 2,
    y: y0.y + (k1.y * dt) / 2,
    z: y0.z + (k1.z * dt) / 2,
  };
  const k2 = derivativeFn(y1, ...args);

  const y2 = {
    x: y0.x + (k2.x * dt) / 2,
    y: y0.y + (k2.y * dt) / 2,
    z: y0.z + (k2.z * dt) / 2,
  };
  const k3 = derivativeFn(y2, ...args);

  const y3 = {
    x: y0.x + k3.x * dt,
    y: y0.y + k3.y * dt,
    z: y0.z + k3.z * dt,
  };
  const k4 = derivativeFn(y3, ...args);

  const dt_6 = dt / 6;
  return {
    x: y0.x + dt_6 * (k1.x + 2 * k2.x + 2 * k3.x + k4.x),
    y: y0.y + dt_6 * (k1.y + 2 * k2.y + 2 * k3.y + k4.y),
    z: y0.z + dt_6 * (k1.z + 2 * k2.z + 2 * k3.z + k4.z),
  };
}
