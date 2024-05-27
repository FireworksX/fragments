import { BooleanType, NumberType } from '../types/componentProperties'
import { builderComponentControlType, builderNodes } from '../defenitions'
import { generateId } from '../helpers'

export const createNumberProperty = (custom?: Partial<NumberType>): NumberType => ({
  _type: builderNodes.ComponentProperty,
  _id: generateId(),
  type: builderComponentControlType.Number,
  name: 'Number',
  defaultValue: 0,
  min: 0,
  max: 360,
  step: 1,
  displayStepper: false,
  ...custom
})

export const createBooleanProperty = (custom?: Partial<BooleanType>): BooleanType => ({
  _type: builderNodes.ComponentProperty,
  _id: generateId(),
  name: 'Boolean',
  type: builderComponentControlType.Boolean,
  enabledTitle: 'Enabled',
  disabledTitle: 'Disabled',
  defaultValue: true,
  ...custom
})
