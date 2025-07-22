import * as v from "valibot";
import { layerField } from "@/helpers/layerField";
import { variableType } from "@/constants";
import { GraphFieldSchema } from "@/schemas/GraphFieldSchema";

export const ColorVariableSchema = v.object({
  nodePropertyControlReference: layerField(v.string(), { fallback: null }),
  name: layerField(v.string(), {
    fallback: "String",
    overridable: false,
  }),
  type: layerField(v.literal(variableType.Color), {
    fallback: variableType.Color,
  }),
  // TODO Add color validator
  defaultValue: layerField(v.string(), { fallback: "#000" }),
  required: layerField(v.boolean(), { fallback: false }),
  ...GraphFieldSchema.entries,
});
