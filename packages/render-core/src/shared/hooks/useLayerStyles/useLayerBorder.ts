import { LinkKey } from "@graph-state/core";
import { useMemo } from "preact/compat";
import { useLayerValue } from "@/shared/hooks/useLayerValue";
import { toPx } from "@fragmentsx/utils";
import { definition } from "@fragmentsx/definition";

export const useLayerBorder = (layerKey: LinkKey) => {
  const [borderTypeValue] = useLayerValue(layerKey, "borderType");
  const [borderWidth] = useLayerValue(layerKey, "borderWidth");
  const [borderColor] = useLayerValue(layerKey, "borderColor");

  return useMemo(() => {
    let value = "";
    if (
      typeof borderTypeValue === "string" &&
      borderTypeValue !== definition.borderType.None
    ) {
      value = `${toPx(
        borderWidth
      )} ${borderTypeValue.toLowerCase()} ${borderColor}`;
    }

    return {
      border: value,
    };
  }, [borderTypeValue, borderWidth, borderColor]);
};
