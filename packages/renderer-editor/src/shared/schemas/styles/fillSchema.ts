import { z, layerField } from "@/lib/zod.ts";
import { paintMode } from "@fragments/plugin-fragment";

export const fillSchema = z.object({
  fillType: layerField(z.enum(Object.keys(paintMode)), {
    fallback: paintMode.None,
  }),
  solidFill: layerField(z.string(), { fallback: "#fff" }),
});
