import * as v from "valibot";
import { layerField } from "@/helpers/layerField";
import { paintMode } from "@/constants";

export const FillSchema = v.object({
  fillType: layerField(v.picklist(Object.keys(paintMode)), {
    fallback: paintMode.None,
  }),
  solidFill: layerField(v.string(), { fallback: "#fff" }),
});
