import { LinkKey } from "@graph-state/core";
import { toPx } from "@fragmentsx/utils";
import { definition } from "@fragmentsx/definition";
import { useLayerValue } from "@/hooks/useLayerValue";
import { useContext, useMemo } from "react";
import { FragmentContext } from "@fragmentsx/render-core";

export const useLayerBorder = (layerKey: LinkKey) => {
  const { manager } = useContext(FragmentContext);
  const [borderTypeValue] = useLayerValue(layerKey, "borderType", manager);
  const [borderWidth] = useLayerValue(layerKey, "borderWidth", manager);
  const [borderColor] = useLayerValue(layerKey, "borderColor", manager);

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
