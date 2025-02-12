import { z } from "zod";
import { paintMode } from "@fragments/plugin-fragment";

export const fillSchema = z.object({
  fillType: z.enum(Object.keys(paintMode)).default(paintMode.None),
  solidFill: z.string().default("#fff"),
});
