import { createConstants } from '@fragments/utils'

export const builderNodes = createConstants(
  'Viewport',
  'Document',
  'Screen',
  'Frame',
  'Text',
  'Component',
  'ComponentVariant',
  'ComponentInstance',
  'SolidPaintStyle',
  'CssLink',
  'ComponentProperty'
)

export const builderBorderType = createConstants('Solid', 'Dashed', 'Dotted')
export const builderPaintMode = createConstants('Solid', 'Image')
export const builderImagePaintScaleModes = createConstants('Fill', 'Fit', 'Crop', 'Tile')
export const builderConstrain = createConstants('Min', 'Center', 'Max', 'Stretch', 'Scale')
export const builderSizing = createConstants('Fixed', 'Hug', 'Fill', 'Relative')
export const builderLayerMode = createConstants('none', 'flex')
export const builderLayerDirection = createConstants('vertical', 'horizontal')
export const builderLayerAlign = createConstants('start', 'center', 'end')
export const builderLayerDistribute = createConstants('start', 'center', 'end', 'space-between', 'space-around')
export const builderTextTransform = createConstants('none', 'uppercase', 'lowercase', 'capitalize')
export const builderTextDecorations = createConstants('none', 'underline', 'line-through')
export const builderEffectType = createConstants('loop', 'appear', 'hover', 'tap')
export const builderEffectName = createConstants('fade', 'slide', 'bounce', 'wiggle', 'increase')
export const builderComponentControlType = createConstants(
  'String',
  'Boolean',
  'Array',
  'Color',
  'ComponentInstance',
  'Date',
  'Enum',
  'Number',
  'Object'
)
