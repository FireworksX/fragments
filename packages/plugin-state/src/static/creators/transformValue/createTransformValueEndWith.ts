import { generateId } from "@fragments/utils";
import { nodes, variableTransforms } from "@/defenitions.ts";

export interface CreateTransformValueEndWithOptions {
  value: string | number;
}

export const createTransformValueEndWith = (
  options: CreateTransformValueEndWithOptions
) => ({
  _type: nodes.TransformValue,
  _id: generateId(),
  name: variableTransforms.endWith,
  value: options?.value ?? null,
});
