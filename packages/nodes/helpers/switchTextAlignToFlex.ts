export const switchTextAlignToFlex = (textAlign?: string) =>
  textAlign ? { left: 'flex-start', center: 'center', right: 'flex-end' }[textAlign] : textAlign
