import { z, layerField } from "@/lib/zod.ts";
import { borderType, paintMode } from "@fragments/plugin-fragment";

export const borderSchema = z.object({
  borderType: layerField(z.enum(Object.keys(borderType)), {
    fallback: borderType.None,
  }),
  borderWidth: layerField(z.number().nonnegative(), { fallback: 0 }),
  borderColor: layerField(z.string(), { fallback: "#fff" }),
});
