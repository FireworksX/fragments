import { generateId, isObject } from "@fragments/utils";

export const createLayer = (externalLayerData: unknown, overrideId = false) => {
  if (!externalLayerData || !isObject(externalLayerData)) return null;

  return overrideId
    ? {
        ...externalLayerData,
        _id: generateId(),
      }
    : {
        _id: generateId(),
        ...externalLayerData,
      };
};
