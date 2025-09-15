export const capitalize = (string?: string) =>
  typeof string === 'string' ? string?.charAt?.(0)?.toUpperCase() + string?.slice?.(1) : string
