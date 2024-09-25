import { generateId } from "@fragments/utils";
import { LinkKey } from "@graph-state/core";
import { nodes, variableType } from "@/definitions.ts";

export type CreateObjectOptions = Partial<{
  name: string;
  required: boolean;
  fields: LinkKey[];
}>;

export const createObjectVariable = (options: CreateObjectOptions) => {
  const id = generateId();

  return {
    _type: nodes.Variable,
    _id: id,
    name: options?.name || id,
    required: options?.required || false,
    type: variableType.Object,
    fields: [],
    value: null,
  };
};
