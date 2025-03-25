import { z, layerField } from "@/lib/zod.ts";
import { graphFieldSchema } from "@/shared/schemas/graphFieldSchema.ts";
import { variableType } from "@fragments/plugin-fragment";

export const colorVariableSchema = z
  .object({
    name: layerField(z.string(), {
      fallback: "String",
      overridable: false,
    }),
    type: layerField(z.literal(variableType.Color), {
      fallback: variableType.Color,
    }),
    // TODO Add color validator
    defaultValue: layerField(z.string(), { fallback: "#000" }),
    required: layerField(z.boolean(), { fallback: false }),
  })
  .merge(graphFieldSchema);
