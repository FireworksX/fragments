import { getLayerSchema } from "@/helpers/getLayerSchema";
import { normalizeLayer } from "@/helpers/normalizeLayer";

export const getNormalizeLayer = (layer: unknown, overrider?: unknown) => {
  if (!layer) return null;

  const schema = getLayerSchema(layer);
  if (!schema) return null;

  return normalizeLayer(schema, layer, {
    overrideTarget: overrider,
  });
};
