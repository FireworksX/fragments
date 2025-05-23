import { generateId } from '@fragmentsx/utils'

export const getEmptyFragment = (fragmentId: string) => {
  const layerId = generateId()
  const nId = '123'

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
      properties: ['Variable:62218c840bd111']
    },
    [`Instance:123`]: {
      _type: 'Instance',
      _id: '123',
      fragment: 'button',
      widthType: 'Hug',
      height: 50,
      props: {
        '62218c840bd11': 0.7
      }
    },
    [`Instance:321`]: {
      _type: 'Instance',
      _id: '321',
      fragment: 'button',
      widthType: 'Hug',
      height: 50,
      top: 100,
      props: {
        '62218c840bd11': 0.4
      }
    },
    [`Frame:${layerId}`]: {
      _type: 'Frame',
      _id: layerId,
      opacity: 1,
      visible: true,
      overflow: 'visible',
      children: [`Frame:${nId}`, 'Instance:123', 'Instance:321'],
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
      opacity: 'Variable:62218c840bd111',
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
    },
    'Variable:62218c840bd111': {
      _id: '62218c840bd111',
      _type: 'Variable',
      type: 'Number',
      name: 'Opacity',
      max: 1,
      min: 0,
      step: 0.01,
      displayStepper: false
    }
  }
}

const cardComponent = {
  _type: 'Component',
  _id: 'card',
  children: [
    { _type: 'Frame' },
    {
      _type: 'Instance',
      ref: 'Component:button',
      props: {
        opacity: 1,
        content: 'Action'
      }
    }
  ]
}

const buttonComponent = {
  _type: 'Component',
  _id: 'button',
  propsDefinition: {
    opacity: 'number',
    content: 'string'
  },
  children: [{ _type: 'Frame', style: { opacity: 'Component:button.opacity' } }]
}
