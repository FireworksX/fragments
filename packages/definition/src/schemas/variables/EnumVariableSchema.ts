import * as v from "valibot";
import { layerField, linkValidator } from "@/helpers/layerField";
import { interactions, variableType } from "@/constants";
import { GraphFieldSchema } from "@/schemas/GraphFieldSchema";

export const EnumVariableSchema = v.object({
  nodePropertyControlReference: layerField(v.string(), { fallback: null }),
  name: layerField(v.string(), {
    fallback: "Option",
    overridable: false,
  }),
  parent: layerField(v.nullable(v.string()), { overridable: false }),
  type: layerField(v.literal(variableType.Enum), {
    fallback: variableType.Enum,
  }),
  defaultValue: layerField(v.string(), { fallback: "" }),
  required: layerField(v.boolean(), { fallback: false }),
  cases: layerField(
    v.array(
      v.object({
        id: v.string(),
        name: v.string(),
      })
    ),
    { fallback: [] }
  ),
  ...GraphFieldSchema.entries,
});
