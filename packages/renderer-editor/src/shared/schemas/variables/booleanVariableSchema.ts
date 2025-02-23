import { z, layerField } from "@/lib/zod.ts";
import { graphFieldSchema } from "@/shared/schemas/graphFieldSchema.ts";
import { variableType } from "@fragments/plugin-fragment";

export const booleanVariableSchema = z
  .object({
    name: layerField(z.string(), {
      fallback: "Boolean",
      overridable: false,
    }),
    type: layerField(z.literal(variableType.Boolean), {
      fallback: variableType.Boolean,
    }),
    defaultValue: layerField(z.boolean(), { fallback: false }),
    required: layerField(z.boolean(), { fallback: false }),
  })
  .merge(graphFieldSchema);
