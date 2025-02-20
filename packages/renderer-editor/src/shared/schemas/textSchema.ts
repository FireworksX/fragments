import { z, layerField } from "@/lib/zod.ts";
import { graphFieldSchema } from "@/shared/schemas/graphFieldSchema.ts";
import { overridesSchema } from "@/shared/schemas/overridesSchema.ts";
import { textStylesSchema } from "@/shared/schemas/styles/nodes/textStylesSchema.ts";

export const textSchema = z
  .object({
    name: layerField(z.string(), { fallback: "Text", overridable: false }),
    content: layerField(z.string(), {
      fallback: "",
    }),
    variableContent: layerField(z.string(), { fallback: null }),
    attributes: layerField(
      z.object({
        fontSize: layerField(z.number().nonnegative(), { fallback: 14 }),
      }),
      { fallback: {} }
    ),
  })
  .merge(graphFieldSchema)
  .merge(textStylesSchema)
  .merge(overridesSchema);
