import { Entity, GraphState, LinkKey } from "@graph-state/core";
import { LayerResolver, LayerStyles } from "../fragment";

export const getAllChildren = (
  layerResolver: LayerResolver,
  layerKey: LinkKey,
  acc: string[] = []
): string[] => {
  const layer = layerResolver(layerKey) ?? {};

  if (acc.length === 0) {
    acc.push(layerKey);
  }

  layer?.children?.forEach((child: string | null) => {
    if (child) {
      acc.push(child);
      getAllChildren(layerResolver, child, acc);
    }
  });

  return acc;
};
