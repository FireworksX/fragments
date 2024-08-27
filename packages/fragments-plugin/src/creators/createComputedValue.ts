import { builderNodes, builderVariableType } from 'src'
import { generateId } from '@fragments/utils'
import { LinkKey } from '@graph-state/core'

export interface ComputedValueOptions {
  inputValue: string | number | boolean | LinkKey
  outputType: keyof typeof builderVariableType
  transforms: unknown[]
}

export const createComputedValue = (options: ComputedValueOptions) => ({
  _type: builderNodes.ComputedValue,
  _id: generateId(),
  inputValue: options?.inputValue ?? null,
  outputType: options?.outputType ?? null,
  transforms: options?.transforms ?? []
})
