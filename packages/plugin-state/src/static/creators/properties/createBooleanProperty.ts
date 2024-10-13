import { generateId } from "@fragments/utils";
import { nodes, propertyType } from "@/definitions.ts";

export type CreateBooleanOptions = Partial<{
  required: boolean;
  name: string;
  defaultValue: boolean;
}>;

export const createBooleanProperty = (options: CreateBooleanOptions) => {
  const id = generateId();

  return {
    _type: nodes.Property,
    _id: id,
    name: options?.name || id,
    required: options?.required || false,
    type: propertyType.Boolean,
    defaultValue: false,
    value: null,
  };
};
