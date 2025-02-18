import { generateId } from '@fragments/utils'

export const getEmptyFragment = (fragmentId: string) => {
  const layerId = generateId()
  const nId = generateId()
  const breakId = generateId()
  const breakFId = generateId()

  return {
    [`Fragment:${fragmentId}`]: {
      _type: 'Fragment',
      _id: fragmentId,
      children: [`Frame:${layerId}`, `Frame:${breakId}`],
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
    [`Frame:${layerId}`]: {
      _type: 'Frame',
      _id: layerId,
      opacity: 1,
      visible: true,
      overflow: 'visible',
      children: [`Frame:${nId}`],
      overrides: [`Frame:${breakId}`],
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
      overrides: [`Frame:${breakFId}`],
      children: [],
      width: 100,
      height: 100,
      layoutSizingHorizontal: 'Fixed',
      layoutSizingVertical: 'Fixed',
      fillType: 'Solid',
      positionType: 'absolute',
      solidFill: 'rgba(32, 44, 255, 1)',
      name: 'Frame'
    },
    [`Frame:${breakId}`]: {
      _type: 'Frame',
      _id: breakId,
      children: [`Frame:${breakFId}`],
      left: 370,
      width: 768,
      name: 'Frame',
      isPrimary: false,
      isBreakpoint: true,
      threshold: 768
    },
    [`Frame:${breakFId}`]: {
      _type: 'Frame',
      _id: breakFId,
      children: [],
      name: 'Frame'
    }
  }
}
