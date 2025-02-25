import { variableType } from '@fragments/plugin-fragment'

export const fieldsConfig = {
  opacity: {
    type: variableType.Number,
    name: 'Opacity',
    defaultValue: 1,
    step: 0.1,
    max: 1,
    min: 0,
    withSlider: true
  },
  visible: {
    type: variableType.Boolean,
    name: 'Visible',
    defaultValue: true
  },
  solidFill: {
    type: variableType.Color,
    name: 'Fill',
    defaultValue: '#fff'
  },
  content: {
    type: variableType.String,
    name: 'Content'
  }
}
