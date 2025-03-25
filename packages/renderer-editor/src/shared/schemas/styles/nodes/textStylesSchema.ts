import { positionSchema } from "@/shared/schemas/styles/positionSchema.ts";
import { sizeSchema } from "@/shared/schemas/styles/sizeSchema.ts";
import { sceneSchema } from "@/shared/schemas/styles/sceneSchema.ts";
import { layerField, z } from "@/lib/zod.ts";
import { whiteSpace } from "@fragments/plugin-fragment";

export const textStylesSchema = z
  .object({
    whiteSpace: layerField(z.enum(Object.keys(whiteSpace)), {
      fallback: whiteSpace.pre,
    }),
  })
  .merge(positionSchema)
  .merge(sceneSchema)
  .merge(sizeSchema);
