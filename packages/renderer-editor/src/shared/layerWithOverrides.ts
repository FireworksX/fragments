import { GraphState, LinkKey } from "@graph-state/core";
import { isValue } from "@fragments/utils";

export const layerWithOverrides = (
  schemaLayerData: unknown,
  layerData,
  manager: GraphState
) => {
  const layerKey = manager.keyOfEntity(layerData);
  if (!layerData) return layerData;

  const layerParents = manager.resolveParents(layerKey);

  const overrideLayer = layerParents?.find((parent) =>
    parent?.overrides?.includes(layerKey)
  );

  return Object.entries(schemaLayerData).reduce((acc, [key, defaultValue]) => {
    const layerValue = layerData?.[key];

    if (!isValue(layerValue) && !!overrideLayer) {
      acc[key] = overrideLayer?.[key] ?? layerValue ?? defaultValue;
    } else if (isValue(layerValue)) {
      acc[key] = layerValue;
    }

    return acc;
  }, schemaLayerData);
};
