import { z, layerField, linkValidator } from "@/lib/zod.ts";
import { graphFieldSchema } from "@/shared/schemas/graphFieldSchema.ts";
import { overridesSchema } from "@/shared/schemas/overridesSchema.ts";
import { textStylesSchema } from "@/shared/schemas/styles/nodes/textStylesSchema.ts";
import { instanceStylesSchema } from "@/shared/schemas/styles/nodes/instanceStylesSchema.ts";

export const instanceSchema = z
  .object({
    name: layerField(z.string(), { fallback: "Instance", overridable: false }),
    fragment: layerField(z.string()),
    props: layerField(
      z.record(z.string(), z.union([z.string(), z.number(), z.boolean()])),
      {
        fallback: {},
      }
    ),
  })
  .merge(graphFieldSchema)
  .merge(instanceStylesSchema)
  .merge(overridesSchema);
