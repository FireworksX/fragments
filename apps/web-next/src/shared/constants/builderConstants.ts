import { createConstants } from '@fragmentsx/utils'
import { definition } from '@fragmentsx/definition'

export const builderCanvasMode = createConstants(
  'select',
  'pan',
  'panning',
  definition.nodes.Frame,
  definition.nodes.Text,
  definition.nodes.Image,
  definition.nodes.Collection
)
