import * as v from "valibot";
import { layerField } from "@/helpers/layerField";
import { eventMode, variableType } from "@/constants";
import { GraphFieldSchema } from "@/schemas/GraphFieldSchema";

export const EventVariableSchema = v.object({
  nodePropertyControlReference: layerField(v.string(), { fallback: null }),
  name: layerField(v.string(), {
    fallback: "Event",
    overridable: false,
  }),
  parent: layerField(v.nullable(v.string()), { overridable: false }),
  type: layerField(v.literal(variableType.Event), {
    fallback: variableType.Event,
  }),
  mode: layerField(v.picklist(Object.keys(eventMode)), {
    fallback: eventMode.callback,
  }),
  defaultValue: layerField(v.any()),
  required: layerField(v.boolean(), { fallback: false }),
  ...GraphFieldSchema.entries,
});
