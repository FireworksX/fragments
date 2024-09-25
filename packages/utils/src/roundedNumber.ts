export function roundedNumber(value: number, decimals = 0) {
  const d = Math.round(Math.abs(decimals));
  const multiplier = 10 ** d;
  return Math.round(value * multiplier) / multiplier;
}

export function roundedNumberString(value: number, decimals = 0) {
  const result = value.toFixed(decimals);
  return decimals === 0 ? result : `${+result}`;
}

export function roundWithOffset(value: number, offset: number) {
  if (offset === 0) {
    return Math.round(value);
  }
  offset -= offset | 0;
  if (offset < 0) {
    offset = 1 - offset;
  }
  return Math.round(value - offset) + offset;
}
