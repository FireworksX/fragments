import { LinkKey } from "@graph-state/core";
import { useLayerValue } from "@/shared/hooks/useLayerValue";
import { definition } from "@fragmentsx/definition";
import { useContext, useMemo } from "preact/compat";
import { FragmentContext } from "@/components/Fragment/FragmentContext";

export const useLayerLayout = (layerKey: LinkKey) => {
  const { manager: fragmentManager } = useContext(FragmentContext);
  const [layerModeValue] = useLayerValue(
    layerKey,
    "layerMode",
    fragmentManager
  );
  const [layerWrap] = useLayerValue(layerKey, "layerWrap", fragmentManager);
  const [layerDistribute] = useLayerValue(
    layerKey,
    "layerDistribute",
    fragmentManager
  );
  const [layerDirectionValue] = useLayerValue(
    layerKey,
    "layerDirection",
    fragmentManager
  );
  const [layerAlign] = useLayerValue(layerKey, "layerAlign", fragmentManager);
  const [padding] = useLayerValue(layerKey, "padding", fragmentManager);

  const isFlex = layerModeValue === definition.layerMode.flex;

  return useMemo(
    () => ({
      isFlex,
      flexWrap: isFlex ? layerWrap : null,
      justifyContent: isFlex ? layerDistribute : null,
      flexDirection: isFlex
        ? layerDirectionValue === definition.layerDirection.vertical
          ? "column"
          : "row"
        : null,
      alignItems: isFlex ? layerAlign : null,
      padding: isFlex ? padding : null,
    }),
    [
      isFlex,
      layerWrap,
      layerDistribute,
      layerDirectionValue,
      layerAlign,
      padding,
    ]
  );
};
