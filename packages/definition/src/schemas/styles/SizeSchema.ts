import * as v from "valibot";
import { layerField } from "@/helpers/layerField";
import { sizing } from "@/constants";

export const SizeSchema = v.object({
  widthType: layerField(v.picklist(Object.keys(sizing)), {
    fallback: sizing.Fixed,
  }),
  heightType: layerField(v.picklist(Object.keys(sizing)), {
    fallback: sizing.Fixed,
  }),
  width: layerField(v.pipe(v.number(), v.minValue(0)), {
    fallback: 0,
    transform: Math.ceil,
  }),
  height: layerField(v.pipe(v.number(), v.minValue(0)), {
    fallback: 0,
    transform: Math.ceil,
  }),
  aspectRatio: layerField(v.number(), { fallback: -1 }),
});
