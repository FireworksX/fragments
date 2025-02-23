import { z, layerField } from "@/lib/zod.ts";
import { graphFieldSchema } from "@/shared/schemas/graphFieldSchema.ts";
import { variableType } from "@fragments/plugin-fragment";

export const numberVariableSchema = z
  .object({
    name: layerField(z.string(), {
      fallback: "Number",
      overridable: false,
    }),
    type: layerField(z.literal(variableType.Number), {
      fallback: variableType.Number,
    }),
    defaultValue: layerField(z.number(), { fallback: 0 }),
    required: layerField(z.boolean(), { fallback: false }),
    min: layerField(z.number(), { fallback: 1 }),
    max: layerField(z.number(), { fallback: 100 }),
    step: layerField(z.number(), { fallback: 1 }),
    displayStepper: layerField(z.boolean(), { fallback: true }),
  })
  .merge(graphFieldSchema);
