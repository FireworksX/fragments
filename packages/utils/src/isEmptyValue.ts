export const isEmptyValue = (value: unknown): value is null | undefined =>
  !value && (value === null || value === undefined)