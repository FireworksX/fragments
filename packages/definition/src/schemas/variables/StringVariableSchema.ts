import * as v from "valibot";
import { layerField } from "@/helpers/layerField";
import { variableType } from "@/constants";
import { GraphFieldSchema } from "@/schemas/GraphFieldSchema";

export const StringVariableSchema = v.object({
  nodePropertyControlReference: layerField(v.string(), { fallback: null }),
  name: layerField(v.string(), {
    fallback: "String",
    overridable: false,
  }),
  type: layerField(v.literal(variableType.String), {
    fallback: variableType.String,
  }),
  parent: layerField(v.nullable(v.string()), { overridable: false }),
  defaultValue: layerField(v.string(), { fallback: "" }),
  required: layerField(v.boolean(), { fallback: false }),
  placeholder: layerField(v.string(), { fallback: "" }),
  isTextarea: layerField(v.boolean(), { fallback: false }),
  ...GraphFieldSchema.entries,
});
