import { generateId } from "@fragments/utils";
import { nodes, variableTransforms } from "@/defenitions.ts";

export interface CreateTransformValueContainsOptions {
  value: string | number;
}

export const createTransformValueContains = (
  options: CreateTransformValueContainsOptions
) => ({
  _type: nodes.TransformValue,
  _id: generateId(),
  name: variableTransforms.contains,
  value: options?.value ?? null,
});
