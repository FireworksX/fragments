import { positionSchema } from "@/shared/schemas/styles/positionSchema.ts";
import { sizeSchema } from "@/shared/schemas/styles/sizeSchema.ts";
import { sceneSchema } from "@/shared/schemas/styles/sceneSchema.ts";
import { layerSchema } from "@/shared/schemas/styles/layerSchema.ts";
import { fillSchema } from "@/shared/schemas/styles/fillSchema.ts";
import { borderSchema } from "@/shared/schemas/styles/borderSchema.ts";
import { z } from "@/lib/zod.ts";

export const frameStylesSchema = z
  .object({})
  .merge(positionSchema)
  .merge(sceneSchema)
  .merge(fillSchema)
  .merge(borderSchema)
  .merge(layerSchema)
  .merge(sizeSchema);
