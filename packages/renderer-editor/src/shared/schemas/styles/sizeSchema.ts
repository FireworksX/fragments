import { z, layerField } from "@/lib/zod.ts";
import { sizing } from "@fragments/plugin-fragment";

export const sizeSchema = z.object({
  widthType: layerField(z.enum(Object.keys(sizing)), {
    fallback: sizing.Fixed,
  }),
  heightType: layerField(z.enum(Object.keys(sizing)), {
    fallback: sizing.Fixed,
  }),
  width: layerField(z.number().nonnegative(), { fallback: 0 }),
  height: layerField(z.number().nonnegative(), { fallback: 0 }),
  aspectRatio: layerField(z.number(), { fallback: -1 }),
});
