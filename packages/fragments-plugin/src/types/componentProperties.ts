import { builderVariableType } from 'src/defenitions'
export type ComponentProperty = StringType | BooleanType | NumberType | ArrayType

interface TypeWithValue<T> {
  name: string
  /**
   * Значение на которое можно вернуться, если удалить переменную
   */
  initialValue?: T
  $value?: T
}

export type TypeValue<TProperty> = TProperty extends {
  $value: infer TValue
}
  ? TValue
  : unknown

export type StringType = {
  type: typeof builderVariableType.String
  defaultValue: string
  placeholder: string
  displayTextArea: boolean
} & TypeWithValue<string>

export type BooleanType = {
  type: typeof builderVariableType.Boolean
  title?: string
  defaultValue?: boolean
  enabledTitle: string
  disabledTitle: string
} & TypeWithValue<boolean>

export type NumberType = {
  type: typeof builderVariableType.Number
  defaultValue: number
  min: number
  max: number
  step: number
  displayStepper: boolean
} & TypeWithValue<number>

export type ArrayType = { type: typeof builderVariableType.Array } & TypeWithValue<unknown[]>
