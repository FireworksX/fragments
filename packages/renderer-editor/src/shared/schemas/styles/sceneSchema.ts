import { z, layerField } from "@/lib/zod.ts";
import { overflow, positionType } from "@fragments/plugin-fragment";

export const sceneSchema = z.object({
  opacity: layerField(z.number().nonnegative().max(1), {
    fallback: 1,
    variable: true,
  }),
  visible: layerField(z.boolean(), { fallback: true, variable: true }),
  zIndex: layerField(z.number(), { fallback: -1 }),
  borderRadius: layerField(z.string(), { fallback: "0px" }),
  overflow: layerField(z.enum(Object.keys(overflow)), {
    fallback: overflow.hidden,
  }),
});
