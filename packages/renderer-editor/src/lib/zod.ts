import { register } from "zod-metadata";
import zod, { ZodSchema } from "zod";

register(zod);

const layerField = <T>(
  schema: ZodSchema,
  meta: { fallback: T; overridable?: boolean }
) => schema.optional().nullable().meta(meta);

export { zod as z, layerField };
