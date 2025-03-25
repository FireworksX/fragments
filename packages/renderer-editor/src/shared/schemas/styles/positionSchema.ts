import { z, layerField } from "@/lib/zod.ts";
import { positionType } from "@fragments/plugin-fragment";

export const positionSchema = z.object({
  position: layerField(z.enum(Object.keys(positionType)), {
    fallback: positionType.absolute,
  }),
  top: layerField(z.number().nullable(), { fallback: 0 }),
  left: layerField(z.number().nullable(), { fallback: 0 }),
});
