import * as v from "valibot";
import { layerField } from "@/helpers/layerField";
import { borderType } from "@/constants";

export const BorderSchema = v.object({
  borderType: layerField(v.picklist(Object.keys(borderType)), {
    fallback: borderType.None,
  }),
  borderWidth: layerField(v.pipe(v.number(), v.minValue(0)), { fallback: 0 }),
  borderColor: layerField(v.string(), { fallback: "#fff" }),
});
