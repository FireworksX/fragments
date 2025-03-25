export const toPx = (val?: string | number) => (typeof val === 'string' || typeof val === 'number' ? `${val}px` : '0px')
