import { createConstants } from '@fragments/utils'

export const builderNodes = createConstants(
  'Document',
  'Breakpoint',
  'Frame',
  'Text',
  'SolidPaintStyle',
  'CssLink',
  'Variable',
  'ComputedValue',
  'TransformValue'
)

export const builderBorderType = createConstants('None', 'Solid', 'Dashed', 'Dotted')
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
export const builderVariableType = createConstants(
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

export const builderVariableTransforms = createConstants(
  'convert',
  'exists',
  'equals',
  'startWith',
  'endWith',
  'contains',
  'dateBefore',
  'dateAfter',
  'dateBetween',
  'feature',
  'notFeature',
  'gt', // Greater than
  'gte', // Greater than or equals
  'lt', // Less than
  'lte', // Less than or equals,
  'convertFromBoolean',
  'negative'
)
