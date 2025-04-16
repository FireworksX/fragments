import { useLayerValue } from "@/hooks/useLayerValue";
import { LinkKey } from "@graph-state/core";
import { useContext, useMemo } from "react";
import { FragmentContext } from "@fragmentsx/render-core";
import { to } from "@react-spring/web";
import { definition } from "@fragmentsx/definition";
import { toPx } from "@fragmentsx/utils";

type SizeType = "minWidth" | "minHeight" | "maxWidth" | "maxHeight";

export const useOptionalSize = (type: SizeType, layerKey: LinkKey) => {
  const { manager: fragmentManager } = useContext(FragmentContext);

  const [, , valueInfo] = useLayerValue(layerKey, type, fragmentManager);
  const [valueType] = useLayerValue(layerKey, `${type}Type`, fragmentManager);

  return useMemo(() => {
    return to([valueInfo?.value$, valueType], (value, type) => {
      if (value === -1) return "";

      if (type === definition.sizing.Fixed) return toPx(value);
      if (type === definition.sizing.Relative) return `${value}%`;

      return null;
    });
  }, [valueType, valueInfo?.value$]);
};
