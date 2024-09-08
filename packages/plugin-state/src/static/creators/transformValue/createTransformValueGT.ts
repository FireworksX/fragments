import { generateId } from "@fragments/utils";
import { nodes, variableTransforms } from "@/definitions.ts";

export interface CreateTransformValueGTOptions {
  value: string | number;
}

export const createTransformValueGT = (
  options: CreateTransformValueGTOptions
) => ({
  _type: nodes.TransformValue,
  _id: generateId(),
  name: variableTransforms.gt,
  value: options?.value ?? null,
});
