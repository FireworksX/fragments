import { positionSchema } from "@/shared/schemas/styles/positionSchema.ts";
import { sizeSchema } from "@/shared/schemas/styles/sizeSchema.ts";
import { sceneSchema } from "@/shared/schemas/styles/sceneSchema.ts";
import { z } from "@/lib/zod.ts";

export const textStylesSchema = z
  .object({})
  .merge(positionSchema)
  .merge(sceneSchema)
  .merge(sizeSchema);
