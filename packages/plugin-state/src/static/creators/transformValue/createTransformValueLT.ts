import { generateId } from "@fragments/utils";
import { nodes, variableTransforms } from "@/definitions.ts";

export interface CreateTransformValueLTOptions {
  value: string | number;
}

export const createTransformValueLT = (
  options: CreateTransformValueLTOptions
) => ({
  _type: nodes.TransformValue,
  _id: generateId(),
  name: variableTransforms.lt,
  value: options?.value ?? null,
});
