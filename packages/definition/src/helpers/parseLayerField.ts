import * as v from "valibot";
import { getLayerSchema } from "@/helpers/getLayerSchema";
import { findSchemaByPath } from "./findSchemaByPath";

export const parseLayerField = (
  layer: unknown,
  field: string,
  value: unknown
) => {
  const schema = getLayerSchema(layer);
  const fieldSchema = findSchemaByPath(schema, field);

  if (fieldSchema) {
    return v.safeParse(fieldSchema, value);
  }

  return { success: false, output: value };
};
