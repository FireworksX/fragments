import { builderVariableType, builderNodes } from 'src'
import { generateId } from '@fragments/utils'
import { GraphState } from '@graph-state/core'

export type CreateNumberOptions = Partial<{
  name: string
  required: boolean
  defaultValue: number
  min: number
  max: number
  step: number
  displayStepper: boolean
}>

export const createNumberVariable = (state: GraphState, options: CreateNumberOptions) => {
  const id = generateId()

  return {
    _type: builderNodes.Variable,
    _id: id,
    name: options?.name || id,
    required: options?.required || false,
    type: builderVariableType.Number,
    defaultValue: options?.defaultValue || 1,
    min: options?.min || 1,
    max: options?.max || 100,
    step: options?.step || 1,
    displayStepper: options?.displayStepper || true
  }
}
