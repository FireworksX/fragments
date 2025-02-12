import { z } from "zod";
import { frameStylesSchema } from "@/shared/schemas/styles/nodes/frameStylesSchema.ts";
import { childrenSchema } from "@/shared/schemas/childrenSchema.ts";
import { graphFieldSchema } from "@/shared/schemas/graphFieldSchema.ts";

export const frameSchema = z
  .object({})
  .merge(graphFieldSchema)
  .merge(frameStylesSchema)
  .merge(childrenSchema);
