import { useLayerValue } from "@/hooks/useLayerValue";
import { LinkKey } from "@graph-state/core";
import { useContext, useMemo } from "react";
import { FragmentContext, processOptionalSize } from "@fragmentsx/render-core";
import { to } from "@react-spring/web";

type SizeType = "minWidth" | "minHeight" | "maxWidth" | "maxHeight";

export const useOptionalSize = (type: SizeType, layerKey: LinkKey) => {
  const { manager: fragmentManager } = useContext(FragmentContext);

  const [, , valueInfo] = useLayerValue(layerKey, type, fragmentManager);
  const [valueType] = useLayerValue(layerKey, `${type}Type`, fragmentManager);

  return useMemo(() => {
    return to([valueInfo?.value$, valueType], processOptionalSize);
  }, [valueType, valueInfo?.value$]);
};
