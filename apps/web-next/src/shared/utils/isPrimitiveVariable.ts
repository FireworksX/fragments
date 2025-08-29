import { definition } from '@fragmentsx/definition'

export const isPrimitiveVariable = (variable?: { type: keyof typeof definition.variableType }) => {
  if (!variable) return null

  return ![definition.variableType.Object, definition.variableType.Array].includes(variable.type)
}
