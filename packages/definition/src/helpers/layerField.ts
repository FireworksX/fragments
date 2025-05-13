import * as v from "valibot";
import { BaseTransformation } from "valibot/dist";
import { nodes } from "@/constants";

export const linkValidator = v.check(
  (value) => !!value && value?.split?.(":")?.length === 2
);

export const isLink = (value: unknown) =>
  v.safeParse(linkValidator, value)?.success;

export const isVariableLink = (value: unknown) =>
  isLink(value) && value?.split?.(":")?.at(0) === nodes.Variable;

export const getMetadata = (schema: v.ObjectSchema<any, any>) => {
  const pipelines = schema?.pipe ?? [];

  return (
    pipelines?.find((pipe) => v.isOfKind("metadata", pipe))?.metadata ?? null
  );
};

export const layerField = <T>(
  schema: v.BaseSchema<any, any, any>,
  meta?: {
    fallback: T;
    overridable?: boolean;
    variable?: boolean;
    transform?: <TInput>(value: TInput) => TInput;
  }
) => {
  const modifiedSchema = meta?.variable
    ? v.union([schema, v.pipe(v.string(), linkValidator)])
    : schema;

  return v.pipe(
    v.optional(modifiedSchema),
    v.transform(meta?.transform ?? ((v) => v)),
    v.metadata(meta ?? {})
  );
};
