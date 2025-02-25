import { generateId } from '@fragments/utils'

export const getButtonFragment = () => {
  return {
    [`Fragment:button`]: {
      _type: 'Fragment',
      _id: 'button',
      children: [`Frame:100`],
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
    [`Frame:100`]: {
      _type: 'Frame',
      _id: 100,
      opacity: 1,
      visible: true,
      overflow: 'visible',
      children: [],
      width: 200,
      height: 50,
      layoutSizingHorizontal: 'Fixed',
      layoutSizingVertical: 'Fixed',
      fillType: 'Solid',
      positionType: 'absolute',
      solidFill: 'rgb(123,229,80)',
      name: 'Frame',
      isPrimary: true,
      threshold: 320
    }
  }
}
