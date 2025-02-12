import { z } from "zod";
import { borderType, paintMode } from "@fragments/plugin-fragment";

export const borderSchema = z.object({
  borderType: z.enum(Object.keys(borderType)).default(borderType.None),
  borderWidth: z.number().nonnegative().default(0),
  borderColor: z.string().optional().default("#fff"),
});
