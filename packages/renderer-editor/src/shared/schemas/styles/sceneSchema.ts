import { z } from "zod";
import { overflow, positionType } from "@fragments/plugin-fragment";

export const sceneSchema = z.object({
  opacity: z.number().default(1),
  visible: z.boolean().default(true),
  zIndex: z.number().default(0),
  borderRadius: z.string().default("0px"),
  overflow: z.enum(Object.keys(overflow)).default(overflow.hidden),
});
