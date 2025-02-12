import { z } from "zod";
import { sizing } from "@fragments/plugin-fragment";

export const sizeSchema = z.object({
  widthType: z.enum(Object.keys(sizing)).default(sizing.Fixed),
  heightType: z.enum(Object.keys(sizing)).default(sizing.Fixed),
  width: z.number().nonnegative().default(0),
  height: z.number().nonnegative().default(0),
  aspectRatio: z.number().nonnegative().optional(),
});
