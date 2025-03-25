import { z, layerField } from "@/lib/zod.ts";
import { graphFieldSchema } from "@/shared/schemas/graphFieldSchema.ts";
import { childrenSchema } from "@/shared/schemas/childrenSchema.ts";
import { fragmentGrowingMode } from "@fragments/plugin-fragment";

export const fragmentSchema = z
  .object({
    name: layerField(z.string(), { fallback: "Fragment", overridable: false }),
    horizontalGrow: layerField(z.enum(Object.keys(fragmentGrowingMode)), {
      fallback: fragmentGrowingMode.auto,
      overridable: false,
    }),
    verticalGrow: layerField(z.enum(Object.keys(fragmentGrowingMode)), {
      fallback: fragmentGrowingMode.auto,
      overridable: false,
    }),
    properties: layerField(z.array(z.string()), {
      fallback: [],
      overridable: false,
    }),
  })
  .merge(graphFieldSchema)
  .merge(childrenSchema);
