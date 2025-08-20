import * as v from "valibot";
import { layerField, linkValidator } from "@/helpers/layerField";
import { variableType } from "@/constants";
import { GraphFieldSchema } from "@/schemas/GraphFieldSchema";

export const ObjectVariableSchema = v.object({
  nodePropertyControlReference: layerField(v.string(), { fallback: null }),
  name: layerField(v.string(), {
    fallback: "Object",
    overridable: false,
  }),
  type: layerField(v.literal(variableType.Object), {
    fallback: variableType.Object,
  }),
  parent: layerField(v.nullable(v.string()), { overridable: false }),
  defaultValue: layerField(v.object({}), { fallback: {} }),
  fields: layerField(v.record(v.string(), linkValidator), { fallback: {} }),
  required: layerField(v.boolean(), { fallback: false }),
  ...GraphFieldSchema.entries,
});
