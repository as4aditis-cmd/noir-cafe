import { type ClassValue, clsx } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/** Clamp a value between min and max */
export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

/** Map a value from one range to another */
export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
) {
  return ((value - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin;
}

/** Lerp between two numbers */
export function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}
