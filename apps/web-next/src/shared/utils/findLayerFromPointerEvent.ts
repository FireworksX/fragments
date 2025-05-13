export const findLayerFromPointerEvent = (event: MouseEvent) => {
  if (!event || !isFinite(event.clientX) || !isFinite(event.clientY)) return null

  const elementFromPoint = document.elementFromPoint?.(event.clientX, event.clientY)
  const parentFragment = elementFromPoint?.closest(`[data-key^="Instance"]`)
  const closestLayer = elementFromPoint?.closest('[data-key]')
  return (parentFragment ?? closestLayer)?.getAttribute('data-key')
}
