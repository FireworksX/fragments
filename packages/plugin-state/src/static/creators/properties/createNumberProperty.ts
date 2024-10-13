import { generateId } from "@fragments/utils";
import { nodes, propertyType } from "@/definitions.ts";

export type CreateNumberOptions = Partial<{
  name: string;
  required: boolean;
  defaultValue: number;
  min: number;
  max: number;
  step: number;
  displayStepper: boolean;
}>;

export const createNumberProperty = (options: CreateNumberOptions) => {
  const id = generateId();

  return {
    _type: nodes.Property,
    _id: id,
    name: options?.name ?? id,
    required: options?.required ?? false,
    type: propertyType.Number,
    defaultValue: options?.defaultValue ?? 1,
    min: options?.min ?? 1,
    max: options?.max ?? 100,
    step: options?.step ?? 1,
    displayStepper: options?.displayStepper ?? true,
    value: null,
  };
};
