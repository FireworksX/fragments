import { definition } from '@fragmentsx/definition'

export const fieldsConfig = {
  opacity: {
    nodePropertyControlReference: 'opacity',
    type: definition.variableType.Number,
    name: 'Opacity',
    defaultValue: 1,
    step: 0.1,
    max: 1,
    min: 0,
    withSlider: true
  },
  visible: {
    nodePropertyControlReference: 'visible',
    type: definition.variableType.Boolean,
    name: 'Visible',
    defaultValue: true
  },
  solidFill: {
    nodePropertyControlReference: 'solidFill',
    type: definition.variableType.Color,
    name: 'Fill',
    defaultValue: '#fff'
  },
  content: {
    nodePropertyControlReference: 'content',
    type: definition.variableType.String,
    name: 'Content'
  },
  href: {
    nodePropertyControlReference: 'href',
    type: definition.variableType.Link,
    name: 'Link'
  },
  hrefNewTab: {
    nodePropertyControlReference: 'hrefNewTab',
    type: definition.variableType.Boolean,
    name: 'New tab'
  },
  event: {
    type: definition.variableType.Event,
    name: 'Event',
    mode: definition.eventMode.callback
  }
}
