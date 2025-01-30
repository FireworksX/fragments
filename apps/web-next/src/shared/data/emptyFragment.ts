import { generateId } from '@fragments/utils'

export const getEmptyFragment = (fragmentId: string) => {
  const layerId = generateId()

  return {
    [`Fragment:${fragmentId}`]: {
      _type: 'Fragment',
      _id: fragmentId,
      children: [`Frame:${layerId}`],
      layoutSizingHorizontal: 'Fixed',
      layoutSizingVertical: 'Fixed',
      horizontalGrow: 'auto',
      verticalGrow: 'auto',
      renderTarget: 'canvas',
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
      children: [],
      width: 200,
      height: 200,
      layoutSizingHorizontal: 'Fixed',
      layoutSizingVertical: 'Fixed',
      fillType: 'Solid',
      positionType: 'absolute',
      parent: `$$Fragment:${fragmentId}`,
      solidFill: 'rgba(255, 255, 255, 1)',
      name: 'Layer'
    }
  }
}
