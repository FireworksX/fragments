import { layerField, z } from "@/lib/zod.ts";

export const overridesSchema = z.object({
  overrides: layerField(z.array(z.string()), { overridable: false }),
});
