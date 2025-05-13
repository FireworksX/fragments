import * as v from "valibot";
import { getLayerSchema } from "@/helpers/getLayerSchema";

export const parseLayerField = (
  layer: unknown,
  field: string,
  value: unknown
) => {
  const schema = getLayerSchema(layer);

  if (schema && schema?.entries?.[field]) {
    return v.safeParse(schema.entries?.[field], value);
  }

  return { success: false, output: value };
};
