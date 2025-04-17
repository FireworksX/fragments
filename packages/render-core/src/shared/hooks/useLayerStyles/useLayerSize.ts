import { LinkKey } from "@graph-state/core";
import { useContext } from "preact/compat";
import { FragmentContext } from "@/components/Fragment/FragmentContext";
import { useLayerValue } from "@/shared/hooks/useLayerValue";
import { useLayerSizeValue } from "@/shared/hooks/useLayerStyles/useLayerSizeValue";
import { useOptionalSize } from "@/shared/hooks/useLayerStyles/useOptionalSize";

export const useLayerSize = (layerKey: LinkKey) => {
  const { manager } = useContext(FragmentContext);
  const [widthValue] = useLayerValue(layerKey, "width", manager);
  const [heightValue] = useLayerValue(layerKey, "height", manager);

  const widthCalc = useLayerSizeValue(layerKey, "width");
  const heightCalc = useLayerSizeValue(layerKey, "height");
  const minWidth = useOptionalSize("minWidth", layerKey);
  const minHeight = useOptionalSize("minHeight", layerKey);
  const maxWidth = useOptionalSize("maxWidth", layerKey);
  const maxHeight = useOptionalSize("maxHeight", layerKey);

  return {
    width: widthCalc(widthValue),
    height: heightCalc(heightValue),
    minWidth,
    minHeight,
    maxWidth,
    maxHeight,
  };
};
