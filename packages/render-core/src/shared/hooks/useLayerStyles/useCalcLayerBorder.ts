import { LinkKey } from "@graph-state/core";
import { useContext, useMemo } from "preact/compat";
import { useLayerValue } from "@/shared/hooks/useLayerValue";
import { toPx } from "@fragmentsx/utils";
import { definition } from "@fragmentsx/definition";
import { FragmentContext } from "@/components/Fragment/FragmentContext";

export const useCalcLayerBorder = (layerKey: LinkKey) => {
  const { manager: fragmentManager } = useContext(FragmentContext);
  const [borderTypeValue] = useLayerValue(
    layerKey,
    "borderType",
    fragmentManager
  );

  return (width: number, color: string) => {
    let value = "";
    if (
      typeof borderTypeValue === "string" &&
      borderTypeValue !== definition.borderType.None
    ) {
      value = `${toPx(width)} ${borderTypeValue.toLowerCase()} ${color}`;
    }

    return value;
  };
};
