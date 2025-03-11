import * as v from "valibot";
import { layerField } from "@/helpers/layerField";
import { variableType } from "@/constants";
import { GraphFieldSchema } from "@/schemas/GraphFieldSchema";

export const BooleanVariableSchema = v.object({
  name: layerField(v.string(), {
    fallback: "Boolean",
    overridable: false,
  }),
  type: layerField(v.literal(variableType.Boolean), {
    fallback: variableType.Boolean,
  }),
  defaultValue: layerField(v.boolean(), { fallback: false }),
  required: layerField(v.boolean(), { fallback: false }),
  ...GraphFieldSchema.entries,
});
