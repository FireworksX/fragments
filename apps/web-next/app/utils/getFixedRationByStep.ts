export const getFixedRationByStep = (step: number) =>
  step >= 1 ? 0 : step.toString().includes('.') ? step?.toString()?.split('.')?.pop()?.length ?? 0 : 0
