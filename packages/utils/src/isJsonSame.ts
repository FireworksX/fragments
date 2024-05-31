export const isJsonSame = (...values: unknown[]) => {
  return values.map(value => JSON.stringify(value)).every((val, _, arr) => val === arr[0])
}