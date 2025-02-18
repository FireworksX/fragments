import { z, layerField } from "@/lib/zod.ts";
import { frameStylesSchema } from "@/shared/schemas/styles/nodes/frameStylesSchema.ts";
import { childrenSchema } from "@/shared/schemas/childrenSchema.ts";
import { graphFieldSchema } from "@/shared/schemas/graphFieldSchema.ts";
import { overridesSchema } from "@/shared/schemas/overridesSchema.ts";

export const frameSchema = z
  .object({
    name: layerField(z.string(), { fallback: "Frame", overridable: false }),
    isBreakpoint: layerField(z.boolean(), {
      fallback: false,
      overridable: false,
    }),
    isPrimary: layerField(z.boolean(), { fallback: false, overridable: false }),
    threshold: layerField(z.number().nonnegative(), {
      fallback: 320,
      overridable: false,
    }),
  })
  .merge(graphFieldSchema)
  .merge(frameStylesSchema)
  .merge(overridesSchema)
  .merge(childrenSchema);
