import { LinkKey } from "@graph-state/core";
import { useLayerValue } from "@/shared/hooks/useLayerValue";
import { layerDirection, layerMode } from "@/definitions";

export const useLayerLayout = (layerKey: LinkKey) => {
  const [layerModeValue] = useLayerValue(layerKey, "layerMode", layerMode.none);
  const [layerGap] = useLayerValue(layerKey, "layerGap", 0);
  const [layerWrap] = useLayerValue(layerKey, "layerWrap", false);
  const [layerDistribute] = useLayerValue(layerKey, "layerDistribute");
  const [layerDirectionValue] = useLayerValue(layerKey, "layerDirection");
  const [layerAlign] = useLayerValue(layerKey, "layerAlign");
  const [padding] = useLayerValue(layerKey, "padding");

  const isFlex = layerModeValue === layerMode.flex;

  return {
    gap: isFlex ? layerGap : null,
    flexWrap: isFlex ? layerWrap : null,
    justifyContent: isFlex ? layerDistribute : null,
    flexDirection: isFlex
      ? layerDirectionValue === layerDirection.vertical
        ? "column"
        : "row"
      : null,
    alignItems: isFlex ? layerAlign : null,
    padding: isFlex ? padding : null,
  };
};
