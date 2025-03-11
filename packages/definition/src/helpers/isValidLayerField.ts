import * as v from "valibot";
import { getLayerSchema } from "@/helpers/getLayerSchema";

export const isValidLayerField = (
  layer: unknown,
  field: string,
  value: unknown
) => {
  const schema = getLayerSchema(layer);
  if (schema && schema?.entries?.[field]) {
    const { success } = v.safeParse(schema.entries?.[field], value);
    return success;
  }

  return false;
};
