import { generateId } from "@fragments/utils";
import { nodes, variableTransforms, propertyType } from "@/definitions.ts";

export interface CreateTransformValueConvertFromBooleanOptions {
  outputType: keyof typeof propertyType;
  truthy: unknown;
  falsy: unknown;
}

export const createTransformValueConvertFromBoolean = (
  options: CreateTransformValueConvertFromBooleanOptions
) => ({
  _type: nodes.TransformValue,
  _id: generateId(),
  name: variableTransforms.convertFromBoolean,
  outputType: options?.outputType ?? null,
  truthy: options?.truthy ?? null,
  falsy: options?.falsy ?? null,
});
