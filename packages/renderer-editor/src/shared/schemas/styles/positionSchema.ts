import { z } from "zod";
import { positionType } from "@fragments/plugin-fragment";

export const positionSchema = z.object({
  position: z.enum(Object.keys(positionType)).default(positionType.absolute),
  top: z.number().default(0),
  left: z.number().default(0),
});
