import * as v from "valibot";

export const linkValidator = v.pipe(
  v.string(),
  v.check((value) => !!value && value.split(":")?.length === 2)
);

// export const isLink = (value: unknown) =>
//   linkValidator.safeParse(value)?.success;
//
// export const isVariableLink = (value: unknown) =>
//   isLink(value) && value?.split(":")?.at(0) === nodes.Variable;

export const getMetadata = (schema: v.ObjectSchema<any, any>) => {
  const pipelines = schema?.pipe ?? [];

  return (
    pipelines?.find((pipe) => v.isOfKind("metadata", pipe))?.metadata ?? null
  );
};

export const layerField = <T>(
  schema: v.UnknownSchema,
  meta?: { fallback: T; overridable?: boolean; variable?: boolean }
) => {
  let base = v.optional(schema);

  if (meta?.variable) {
    base = v.pipe(base, v.union([base, linkValidator]));
  }

  if (typeof meta?.fallback !== "undefined") {
    base = v.fallback(base, meta.fallback);
  }

  if (meta) {
    base = v.pipe(base, v.metadata(meta));
  }

  return base;
};
