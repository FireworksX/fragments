import { LinkKey } from "@graph-state/core";
import { useMemo } from "react";
import { to } from "@react-spring/web";
import { paintMode } from "@fragments/plugin-fragment";
import { useLayerStyleValue } from "@/shared/hooks/useLayerStyles/useLayerStyleValue.ts";

export const useLayerBackground = (layerKey: LinkKey) => {
  const fillType$ = useLayerStyleValue(layerKey, "fillType");
  const solidFill$ = useLayerStyleValue(layerKey, "solidFill");

  return useMemo(
    () => ({
      background$: to([fillType$, solidFill$], (type, color) =>
        type === paintMode.Solid ? color : "transparent"
      ),
    }),
    [fillType$, solidFill$]
  );
};
