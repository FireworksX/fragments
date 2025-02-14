import { z } from "@/lib/zod.ts";
import { nodes } from "@fragments/plugin-fragment";

export const graphFieldSchema = z.object({
  _id: z.union([z.string(), z.number()]),
  _type: z.enum(Object.keys(nodes)),
});
