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

  minWidth: layerField(v.nullable(v.pipe(v.number(), v.minValue(-1))), {
    fallback: -1,
    transform: Math.ceil,
  }),
  minWidthType: layerField(v.picklist(Object.keys(sizing)), {
    fallback: sizing.Fixed,
  }),

  maxWidth: layerField(v.nullable(v.pipe(v.number(), v.minValue(-1))), {
    fallback: -1,
    transform: Math.ceil,
  }),
  maxWidthType: layerField(v.picklist(Object.keys(sizing)), {
    fallback: sizing.Fixed,
  }),

  minHeight: layerField(v.nullable(v.pipe(v.number(), v.minValue(-1))), {
    fallback: -1,
    transform: Math.ceil,
  }),
  minHeightType: layerField(v.picklist(Object.keys(sizing)), {
    fallback: sizing.Fixed,
  }),

  maxHeight: layerField(v.nullable(v.pipe(v.number(), v.minValue(-1))), {
    fallback: -1,
    transform: Math.ceil,
  }),
  maxHeightType: layerField(v.picklist(Object.keys(sizing)), {
    fallback: sizing.Fixed,
  }),
});
