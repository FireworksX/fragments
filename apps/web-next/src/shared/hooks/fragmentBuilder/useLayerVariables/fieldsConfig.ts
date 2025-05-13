import { definition } from '@fragmentsx/definition'

export const fieldsConfig = {
  opacity: {
    type: definition.variableType.Number,
    name: 'Opacity',
    defaultValue: 1,
    step: 0.1,
    max: 1,
    min: 0,
    withSlider: true
  },
  visible: {
    type: definition.variableType.Boolean,
    name: 'Visible',
    defaultValue: true
  },
  solidFill: {
    type: definition.variableType.Color,
    name: 'Fill',
    defaultValue: '#fff'
  },
  content: {
    type: definition.variableType.String,
    name: 'Content'
  },
  event: {
    type: definition.variableType.Event,
    name: 'Event'
  }
}
