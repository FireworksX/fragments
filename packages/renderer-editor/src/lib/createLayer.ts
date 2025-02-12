import { nodes } from "@fragments/plugin-fragment";
import { frameSchema } from "@/shared/schemas/frameSchema.ts";

export const createLayer = (layerData) => {
  if (!layerData) return layerData;

  if (layerData?._type === nodes.Frame) {
    const schemaData = frameSchema.safeParse(layerData);
    return schemaData?.data;
  }

  return layerData;
};
