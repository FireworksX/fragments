import { generateId } from "@fragments/utils";
import { nodes, variableType } from "@/definitions.ts";

export type CreateBooleanOptions = Partial<{
  required: boolean;
  name: string;
  defaultValue: boolean;
}>;

export const createBooleanVariable = (options: CreateBooleanOptions) => {
  const id = generateId();

  return {
    _type: nodes.Variable,
    _id: options?._id ?? id,
    name: options?.name || id,
    required: options?.required || false,
    type: variableType.Boolean,
    defaultValue: false,
    value: null,
  };
};
