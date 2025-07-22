import { generateId, setKey } from '@fragmentsx/utils'

export const getEmptyFragment = (fragmentId: string) => {
  const layerId = generateId()

  return {
    _type: 'Fragment',
    _id: fragmentId,
    children: [
      {
        _type: 'Frame',
        _id: layerId,
        opacity: 1,
        parent: setKey(`Fragment:${fragmentId}`),
        visible: true,
        overflow: 'visible',
        children: [],
        width: 320,
        height: 200,
        layoutSizingHorizontal: 'Fixed',
        layoutSizingVertical: 'Fixed',
        fillType: 'Solid',
        positionType: 'absolute',
        solidFill: 'rgba(255, 255, 255, 1)',
        name: 'Frame',
        isPrimary: true,
        threshold: 320
      }
    ],
    layoutSizingHorizontal: 'Fixed',
    layoutSizingVertical: 'Fixed',
    horizontalGrow: 'auto',
    verticalGrow: 'auto',
    renderMode: 'parent',
    opacity: 1,
    visible: true,
    overflow: 'hidden',
    overrides: [],
    properties: []
  }
}
