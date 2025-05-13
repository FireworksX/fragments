import * as v from "valibot";
import { layerField } from "@/helpers/layerField";
import { paintMode, imagePaintScaleModes } from "@/constants";

export const FillSchema = v.object({
  fillType: layerField(v.picklist(Object.keys(paintMode)), {
    fallback: paintMode.None,
  }),
  solidFill: layerField(v.string(), { fallback: "#fff" }),
  imageFill: layerField(v.string()),
  imageSize: layerField(v.picklist(Object.keys(imagePaintScaleModes)), {
    fallback: imagePaintScaleModes.Fill,
  }),
});
