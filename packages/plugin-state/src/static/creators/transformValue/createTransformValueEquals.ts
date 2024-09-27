import { generateId } from "@fragments/utils";
import { nodes, variableTransforms } from "@/definitions.ts";

export interface CreateTransformValueEqualsOptions {
  value: string | number;
}

export const createTransformValueEquals = (
  options: CreateTransformValueEqualsOptions
) => ({
  _type: nodes.TransformValue,
  _id: generateId(),
  name: variableTransforms.equals,
  value: options?.value ?? null,
});
