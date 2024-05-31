import { builderComponentControlType } from 'src/defenitions'
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
  type: typeof builderComponentControlType.String
  defaultValue: string
  placeholder: string
  displayTextArea: boolean
} & TypeWithValue<string>

export type BooleanType = {
  type: typeof builderComponentControlType.Boolean
  title?: string
  defaultValue?: boolean
  enabledTitle: string
  disabledTitle: string
} & TypeWithValue<boolean>

export type NumberType = {
  type: typeof builderComponentControlType.Number
  defaultValue: number
  min: number
  max: number
  step: number
  displayStepper: boolean
} & TypeWithValue<number>

export type ArrayType = { type: typeof builderComponentControlType.Array } & TypeWithValue<unknown[]>
