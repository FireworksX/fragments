import { z } from "zod";

export const childrenSchema = z.object({
  children: z.array(z.string()).default([]),
});
