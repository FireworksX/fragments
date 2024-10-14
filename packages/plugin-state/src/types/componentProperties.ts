import { variableType } from "@/definitions.ts";
export type ComponentProperty =
  | StringType
  | BooleanType
  | NumberType
  | ArrayType;

interface TypeWithValue<T> {
  name: string;
  /**
   * Значение на которое можно вернуться, если удалить переменную
   */
  initialValue?: T;
  $value?: T;
}

export type TypeValue<TProperty> = TProperty extends {
  $value: infer TValue;
}
  ? TValue
  : unknown;

export type StringType = {
  type: typeof variableType.String;
  defaultValue: string;
  placeholder: string;
  displayTextArea: boolean;
} & TypeWithValue<string>;

export type BooleanType = {
  type: typeof variableType.Boolean;
  title?: string;
  defaultValue?: boolean;
  enabledTitle: string;
  disabledTitle: string;
} & TypeWithValue<boolean>;

export type NumberType = {
  type: typeof variableType.Number;
  defaultValue: number;
  min: number;
  max: number;
  step: number;
  displayStepper: boolean;
} & TypeWithValue<number>;

export type ArrayType = { type: typeof variableType.Array } & TypeWithValue<
  unknown[]
>;
