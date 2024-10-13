import { generateId } from "@fragments/utils";
import { nodes, propertyType } from "@/definitions.ts";

export type CreateStringOptions = Partial<{
  required: boolean;
  name: string;
  defaultValue: string;
  placeholder: string;
  displayTextArea: boolean;
}>;

export const createStringProperty = (options: CreateStringOptions) => {
  const id = generateId();

  return {
    _type: nodes.Property,
    _id: id,
    name: options?.name || id,
    required: options?.required || false,
    type: propertyType.String,
    defaultValue: options?.defaultValue ?? "",
    placeholder: options?.placeholder ?? null,
    displayTextArea: options?.displayTextArea ?? false,
    value: null,
  };
};
