import * as v from "valibot";
import { layerField, linkValidator } from "@/helpers/layerField";
import { layerAlign, variableType } from "@/constants";
import { GraphFieldSchema } from "@/schemas/GraphFieldSchema";

const definitionSchema = v.union([v.picklist(Object.keys(variableType))]);

export const ArrayVariableSchema = v.object({
  nodePropertyControlReference: layerField(v.string(), { fallback: null }),
  name: layerField(v.string(), {
    fallback: "Collection",
    overridable: false,
  }),
  type: layerField(v.literal(variableType.Array), {
    fallback: variableType.Array,
  }),
  parent: layerField(v.nullable(v.string()), { overridable: false }),
  defaultValue: layerField(v.array(v.any()), { fallback: [] }),
  definition: layerField(linkValidator, { fallback: null }),
  required: layerField(v.boolean(), { fallback: false }),
  ...GraphFieldSchema.entries,
});
