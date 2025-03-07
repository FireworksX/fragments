import { LinkKey } from "@graph-state/core";
import { useMemo } from "react";
import { to } from "@react-spring/web";
import { borderType, paintMode, toPx } from "@fragments/plugin-fragment";
import { useLayerStyleValue } from "@/shared/hooks/useLayerStyles/useLayerStyleValue.ts";

export const useLayerBorder = (layerKey: LinkKey) => {
  const borderType$ = useLayerStyleValue(layerKey, "borderType");
  const borderWidth$ = useLayerStyleValue(layerKey, "borderWidth");
  const borderColor$ = useLayerStyleValue(layerKey, "borderColor");

  return useMemo(
    () => ({
      border$: to(
        [borderType$, borderWidth$, borderColor$],
        (type, width, color) => {
          if (typeof type === "string" && type !== borderType.None) {
            return `${toPx(width)} ${type.toLowerCase()} ${color}`;
          }

          return "";
        }
      ),
    }),
    [borderType$, borderWidth$, borderColor$]
  );
};
