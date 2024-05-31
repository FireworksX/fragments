export const isAbsoluteUrl = (input: any) => {
  return typeof input === 'string' && !!input.includes && input.includes('://')
}