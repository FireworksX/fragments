import { generateId } from "@fragments/utils";
import { nodes, variableType } from "@/definitions.ts";

export type CreateStringOptions = Partial<{
  required: boolean;
  name: string;
  defaultValue: string;
  placeholder: string;
  displayTextArea: boolean;
}>;

export const createStringVariable = (options: CreateStringOptions) => {
  const id = generateId();

  return {
    _type: nodes.Variable,
    _id: options?._id ?? id,
    name: options?.name || id,
    required: options?.required || false,
    type: variableType.String,
    defaultValue: options?.defaultValue ?? "",
    placeholder: options?.placeholder ?? null,
    displayTextArea: options?.displayTextArea ?? false,
    value: null,
  };
};
