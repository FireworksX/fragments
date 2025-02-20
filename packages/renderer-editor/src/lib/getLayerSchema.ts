import { nodes } from "@fragments/plugin-fragment";
import { frameSchema } from "@/shared/schemas/frameSchema.ts";
import { textSchema } from "@/shared/schemas/textSchema.ts";
import { fragmentSchema } from "@/shared/schemas/fragmentSchema.ts";

export const getLayerSchema = (layer?: unknown) => {
  if (!layer?._type) return null;

  if (layer?._type === nodes.Frame) return frameSchema;
  if (layer?._type === nodes.Text) return textSchema;
  if (layer?._type === nodes.Fragment) return fragmentSchema;
};
