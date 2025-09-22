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
  overflow: {
    nodePropertyControlReference: 'overflow',
    type: definition.variableType.Enum,
    name: 'Overflow',
    defaultValue: definition.overflow.visible
  },
  layerDirection: {
    nodePropertyControlReference: 'layerDirection',
    type: definition.variableType.Enum,
    name: 'Direction',
    defaultValue: definition.layerDirection.horizontal
  },
  layerDistribute: {
    nodePropertyControlReference: 'layerDistribute',
    type: definition.variableType.Enum,
    name: 'Distribute',
    defaultValue: definition.layerDistribute.start
  },
  layerAlign: {
    nodePropertyControlReference: 'layerAlign',
    type: definition.variableType.Enum,
    name: 'Align',
    defaultValue: definition.layerAlign.start
  },
  layerWrap: {
    nodePropertyControlReference: 'layerWrap',
    type: definition.variableType.Enum,
    name: 'Wrap',
    defaultValue: true
  },
  layerGap: {
    nodePropertyControlReference: 'layerGap',
    type: definition.variableType.Number,
    name: 'Gap',
    defaultValue: 0
  },
  solidFill: {
    nodePropertyControlReference: 'solidFill',
    type: definition.variableType.Color,
    name: 'Fill',
    defaultValue: '#fff'
  },
  borderColor: {
    nodePropertyControlReference: 'borderColor',
    type: definition.variableType.Color,
    name: 'Border Color',
    defaultValue: '#000'
  },
  imageFill: {
    nodePropertyControlReference: 'imageFill',
    type: definition.variableType.Image,
    name: 'Image',
    defaultValue: ''
  },
  'text.color': {
    nodePropertyControlReference: 'text.color',
    type: definition.variableType.Color,
    name: 'Text color',
    defaultValue: '#000'
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
    nodePropertyControlReference: 'event',
    type: definition.variableType.Event,
    name: 'Event',
    mode: definition.eventMode.callback
  }
}
