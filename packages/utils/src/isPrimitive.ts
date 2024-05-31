export const isPrimitive = (value: unknown): boolean =>
  (typeof value !== 'object' && typeof value !== 'function') || value === null