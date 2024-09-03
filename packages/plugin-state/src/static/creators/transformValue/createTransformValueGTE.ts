import { generateId } from "@fragments/utils";
import { nodes, variableTransforms } from "@/defenitions.ts";

export interface CreateTransformValueGTEOptions {
  value: string | number;
}

export const createTransformValueGTE = (
  options: CreateTransformValueGTEOptions
) => ({
  _type: nodes.TransformValue,
  _id: generateId(),
  name: variableTransforms.gte,
  value: options?.value ?? null,
});
