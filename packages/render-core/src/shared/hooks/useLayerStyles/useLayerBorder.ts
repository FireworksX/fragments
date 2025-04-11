import { LinkKey } from "@graph-state/core";
import { useContext, useMemo } from "preact/compat";
import { useLayerValue } from "@/shared/hooks/useLayerValue";
import { toPx } from "@fragmentsx/utils";
import { definition } from "@fragmentsx/definition";
import { FragmentContext } from "@/components/Fragment/FragmentContext";

export const useLayerBorder = (layerKey: LinkKey) => {
  const { manager: fragmentManager } = useContext(FragmentContext);
  const [borderTypeValue] = useLayerValue(
    layerKey,
    "borderType",
    fragmentManager
  );
  const [borderWidth] = useLayerValue(layerKey, "borderWidth", fragmentManager);
  const [borderColor] = useLayerValue(layerKey, "borderColor", fragmentManager);

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
