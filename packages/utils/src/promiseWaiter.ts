export const promiseWaiter = <T = unknown>(duration = 300, payload?: T) =>
  new Promise(resolve => setTimeout(() => resolve(payload), duration))