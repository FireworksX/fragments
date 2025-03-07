import { z, layerField } from "@/lib/zod.ts";
import { graphFieldSchema } from "@/shared/schemas/graphFieldSchema.ts";
import { variableType } from "@fragments/plugin-fragment";

export const stringVariableSchema = z
  .object({
    name: layerField(z.string(), {
      fallback: "String",
      overridable: false,
    }),
    type: layerField(z.literal(variableType.String), {
      fallback: variableType.String,
    }),
    defaultValue: layerField(z.string(), { fallback: "" }),
    required: layerField(z.boolean(), { fallback: false }),
    placeholder: layerField(z.string(), { fallback: "" }),
    isTextarea: layerField(z.boolean(), { fallback: false }),
  })
  .merge(graphFieldSchema);
