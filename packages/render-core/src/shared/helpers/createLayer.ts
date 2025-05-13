import { generateId, isObject } from "@fragmentsx/utils";
import { isPartialKey } from "@graph-state/core";

export const createLayer = (externalLayerData: unknown, overrideId = false) => {
  if (!externalLayerData || !isObject(externalLayerData)) return null;

  const cleanLayer = Object.entries(externalLayerData).reduce(
    (acc, [key, value]) => {
      if (
        isObject(value) &&
        "_type" in value &&
        "_id" in value &&
        isPartialKey(`${value._type}:${value._id}`)
      ) {
        delete value._id;
        delete value._type;
      }

      acc[key] = value;
      return acc;
    },
    {}
  );

  return overrideId
    ? {
        ...cleanLayer,
        _id: generateId(),
      }
    : {
        _id: generateId(),
        ...cleanLayer,
      };
};
