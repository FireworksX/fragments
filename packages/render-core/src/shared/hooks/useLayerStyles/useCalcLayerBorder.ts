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

  return (width: string, color: string) => {
    let value = {
      borderTop: ``,
      borderRight: ``,
      borderBottom: ``,
      borderLeft: ``,
    };
    if (
      typeof borderTypeValue === "string" &&
      borderTypeValue !== definition.borderType.None
    ) {
      const staticPart = `${borderTypeValue.toLowerCase()} ${color}`;
      const widthSides = width?.split(" ");

      if (widthSides.length === 1) {
        const widthValue = widthSides?.at(0);
        value = {
          borderTop: `${widthValue} ${staticPart}`,
          borderRight: `${widthValue} ${staticPart}`,
          borderBottom: `${widthValue} ${staticPart}`,
          borderLeft: `${widthValue} ${staticPart}`,
        };
      } else {
        value = {
          borderTop: `${widthSides?.at(0)} ${staticPart}`,
          borderRight: `${widthSides?.at(1)} ${staticPart}`,
          borderBottom: `${widthSides?.at(2)} ${staticPart}`,
          borderLeft: `${widthSides?.at(3)} ${staticPart}`,
        };
      }
    }

    return value;
  };
};
