import { nodes, variableType } from '@fragments/plugin-fragment'
import { frameSchema } from '@/shared/data/schemas/frameSchema'
import { textSchema } from '@/shared/data/schemas/textSchema'
import { fragmentSchema } from '@/shared/data/schemas/fragmentSchema'
import { booleanVariableSchema } from '@/shared/data/schemas/variables/booleanVariableSchema'
import { numberVariableSchema } from '@/shared/data/schemas/variables/numberVariableSchema'
import { stringVariableSchema } from '@/shared/data/schemas/variables/stringVariableSchema'
import { colorVariableSchema } from '@/shared/data/schemas/variables/colorVariableSchema'
import { instanceSchema } from '@/shared/data/schemas/instanceSchema'

export const getLayerSchema = (layer?: unknown) => {
  if (!layer?._type) return null

  if (layer?._type === nodes.Frame) return frameSchema
  if (layer?._type === nodes.Text) return textSchema
  if (layer?._type === nodes.Fragment) return fragmentSchema
  if (layer?._type === nodes.Instance) return instanceSchema

  if (layer._type === nodes.Variable) {
    const types = {
      [variableType.Number]: numberVariableSchema,
      [variableType.Boolean]: booleanVariableSchema,
      [variableType.String]: stringVariableSchema,
      [variableType.Color]: colorVariableSchema
    }

    if (layer.type in types) {
      return types[layer.type]
    }
  }
}
