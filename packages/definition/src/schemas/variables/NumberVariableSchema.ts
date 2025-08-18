import * as v from "valibot";
import { layerField } from "@/helpers/layerField";
import { variableType } from "@/constants";
import { GraphFieldSchema } from "@/schemas/GraphFieldSchema";

export const NumberVariableSchema = v.object({
  nodePropertyControlReference: layerField(v.string(), { fallback: null }),
  name: layerField(v.string(), {
    fallback: "Number",
    overridable: false,
  }),
  parent: layerField(v.nullable(v.string()), { overridable: false }),
  type: layerField(v.literal(variableType.Number), {
    fallback: variableType.Number,
  }),
  defaultValue: layerField(v.number(), { fallback: 0 }),
  required: layerField(v.boolean(), { fallback: false }),
  min: layerField(v.number(), { fallback: 1 }),
  max: layerField(v.number(), { fallback: 100 }),
  step: layerField(v.number(), { fallback: 1 }),
  displayStepper: layerField(v.boolean(), { fallback: true }),
  ...GraphFieldSchema.entries,
});
