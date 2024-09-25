import { generateId } from "@fragments/utils";
import { nodes, variableTransforms } from "@/definitions.ts";

export interface CreateTransformValueExistsOptions {
  value: string | number;
}

export const createTransformValueExists = (
  options: CreateTransformValueExistsOptions
) => ({
  _type: nodes.TransformValue,
  _id: generateId(),
  name: variableTransforms.exists,
  value: options?.value ?? null,
});
