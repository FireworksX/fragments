import { generateId } from "@fragments/utils";
import { nodes, variableTransforms } from "@/defenitions.ts";

export interface CreateTransformValueStartWithOptions {
  value: string | number;
}

export const createTransformValueStartWith = (
  options: CreateTransformValueStartWithOptions
) => ({
  _type: nodes.TransformValue,
  _id: generateId(),
  name: variableTransforms.startWith,
  value: options?.value ?? null,
});
