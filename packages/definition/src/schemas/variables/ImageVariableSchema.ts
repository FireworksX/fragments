import * as v from "valibot";
import { layerField } from "@/helpers/layerField";
import { imagePaintScaleModes, variableType } from "@/constants";
import { GraphFieldSchema } from "@/schemas/GraphFieldSchema";

export const ImageVariableSchema = v.object({
  nodePropertyControlReference: layerField(v.string(), { fallback: null }),
  name: layerField(v.string(), {
    fallback: "Image",
    overridable: false,
  }),
  type: layerField(v.literal(variableType.Image), {
    fallback: variableType.Image,
  }),
  parent: layerField(v.nullable(v.string()), { overridable: false }),
  defaultValue: layerField(v.string(), { fallback: "" }),
  required: layerField(v.boolean(), { fallback: false }),
  imageSize: layerField(v.picklist(Object.keys(imagePaintScaleModes)), {
    fallback: imagePaintScaleModes.Auto,
  }),
  ...GraphFieldSchema.entries,
});
