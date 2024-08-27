export const nextTick = (callback: (...args: unknown[]) => unknown) => setTimeout(callback, 0)
