import { generateId } from "@fragments/utils";
import { nodes, variableTransforms } from "@/defenitions.ts";

export interface CreateTransformValueLTEOptions {
  value: string | number;
}

export const createTransformValueLTE = (
  options: CreateTransformValueLTEOptions
) => ({
  _type: nodes.TransformValue,
  _id: generateId(),
  name: variableTransforms.lt,
  value: options?.value ?? null,
});
