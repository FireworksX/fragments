import { nodes } from "@fragments/plugin-fragment";
import { frameSchema } from "@/shared/schemas/frameSchema.ts";

export const getLayerSchema = (layer?: unknown) => {
  if (!layer?._type) return null;

  if (layer?._type === nodes.Frame) return frameSchema;
};
