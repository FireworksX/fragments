import { generateId } from '@fragments/utils'

export const getEmptyFragment = (fragmentId: string) => {
  const layerId = generateId()
  const nId = generateId()

  return {
    [`Fragment:${fragmentId}`]: {
      _type: 'Fragment',
      _id: fragmentId,
      children: [`Frame:${layerId}`],
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
    },
    [`Instance:123`]: {
      _type: 'Instance',
      _id: '123',
      fragment: 'button',
      widthType: 'Hug',
      height: 50
    },
    [`Frame:${layerId}`]: {
      _type: 'Frame',
      _id: layerId,
      opacity: 1,
      visible: true,
      overflow: 'visible',
      children: [`Frame:${nId}`, 'Instance:123'],
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
    },
    [`Frame:${nId}`]: {
      _type: 'Frame',
      _id: nId,
      opacity: 1,
      visible: true,
      overflow: 'visible',
      children: [],
      width: 100,
      height: 100,
      layoutSizingHorizontal: 'Fixed',
      layoutSizingVertical: 'Fixed',
      fillType: 'Solid',
      positionType: 'absolute',
      solidFill: 'rgba(32, 44, 255, 1)',
      name: 'Frame'
    }
  }
}
