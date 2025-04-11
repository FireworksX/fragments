import { LinkKey } from "@graph-state/core";
import { definition } from "@fragmentsx/definition";
import { useContext } from "react";
import { FragmentContext } from "@fragmentsx/render-core";
import { useLayerValue } from "@/hooks/useLayerValue";

export const useLayerLayout = (layerKey: LinkKey) => {
  const { manager } = useContext(FragmentContext);
  const [layerModeValue] = useLayerValue(layerKey, "layerMode", manager);
  const [, , { resultValue: layerGap }] = useLayerValue(
    layerKey,
    "layerGap",
    manager
  );
  const [layerWrap] = useLayerValue(layerKey, "layerWrap", manager);
  const [layerDistribute] = useLayerValue(layerKey, "layerDistribute", manager);
  const [layerDirectionValue] = useLayerValue(
    layerKey,
    "layerDirection",
    manager
  );
  const [layerAlign] = useLayerValue(layerKey, "layerAlign", manager);
  const [padding] = useLayerValue(layerKey, "padding", manager);

  const isFlex = layerModeValue === definition.layerMode.flex;

  return {
    gap: isFlex ? layerGap : null,
    flexWrap: isFlex ? layerWrap : null,
    justifyContent: isFlex ? layerDistribute : null,
    flexDirection: isFlex
      ? layerDirectionValue === definition.layerDirection.vertical
        ? "column"
        : "row"
      : null,
    alignItems: isFlex ? layerAlign : null,
    padding: isFlex ? padding : null,
  };
};
