import { register } from "zod-metadata";
import zod, { ZodSchema } from "zod";
import { nodes } from "@fragments/plugin-fragment";

register(zod);

export const linkValidator = zod
  .string()
  .refine((value) => value && value.split(":")?.length === 2);

export const isLink = (value: unknown) =>
  linkValidator.safeParse(value)?.success;

export const isVariableLink = (value: unknown) =>
  isLink(value) && value?.split(":")?.at(0) === nodes.Variable;

const layerField = <T>(
  schema: ZodSchema,
  meta?: { fallback: T; overridable?: boolean; variable?: boolean }
) => {
  let base = schema.optional().nullable();

  if (meta?.variable) {
    base = zod.union([base, linkValidator]);
  }

  if (meta) {
    base = base.meta(meta);
  }

  return base;
};

export { zod as z, layerField };
