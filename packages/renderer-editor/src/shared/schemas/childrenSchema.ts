import { z, layerField } from "@/lib/zod.ts";

export const childrenSchema = z.object({
  children: layerField(z.array(z.string()), {
    fallback: [],
    overridable: false,
  }),
});
