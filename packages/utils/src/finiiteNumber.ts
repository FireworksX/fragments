export function isFiniteNumber(value: unknown): value is number {
  return typeof value === "number" && isFinite(value);
}
export function finiteNumber(value: unknown) {
  return isFiniteNumber(value) ? value : void 0;
}