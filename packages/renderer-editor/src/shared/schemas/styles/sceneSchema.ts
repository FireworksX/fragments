import { z, layerField } from "@/lib/zod.ts";
import { overflow, positionType } from "@fragments/plugin-fragment";

export const sceneSchema = z.object({
  opacity: layerField(z.number(), { fallback: 1 }),
  visible: layerField(z.boolean(), { fallback: true }),
  zIndex: layerField(z.number(), { fallback: 0 }),
  borderRadius: layerField(z.string(), { fallback: "0px" }),
  overflow: layerField(z.enum(Object.keys(overflow)), {
    fallback: overflow.hidden,
  }),
});
