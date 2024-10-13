import { generateId } from "@fragments/utils";
import { LinkKey } from "@graph-state/core";
import { nodes, propertyType } from "@/definitions.ts";

export type CreateObjectOptions = Partial<{
  name: string;
  required: boolean;
  fields: LinkKey[];
}>;

export const createObjectProperty = (options: CreateObjectOptions) => {
  const id = generateId();

  return {
    _type: nodes.Property,
    _id: id,
    name: options?.name || id,
    required: options?.required || false,
    type: propertyType.Object,
    fields: [],
    value: null,
  };
};
