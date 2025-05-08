import * as v from "valibot";
import { layerField } from "@/helpers/layerField";
import { variableType } from "@/constants";
import { GraphFieldSchema } from "@/schemas/GraphFieldSchema";

export const EventVariableSchema = v.object({
  name: layerField(v.string(), {
    fallback: "Event",
    overridable: false,
  }),
  type: layerField(v.literal(variableType.Event), {
    fallback: variableType.Event,
  }),
  defaultValue: layerField(v.null(), { fallback: false }),
  required: layerField(v.boolean(), { fallback: false }),
  ...GraphFieldSchema.entries,
});
