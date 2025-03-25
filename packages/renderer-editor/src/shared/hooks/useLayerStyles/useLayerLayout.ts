import { LinkKey } from "@graph-state/core";
import { useMemo } from "react";
import { to } from "@react-spring/web";
import { layerDirection, layerMode } from "@fragments/plugin-fragment";
import { useLayerStyleValue } from "@/shared/hooks/useLayerStyles/useLayerStyleValue.ts";

export const useLayerLayout = (layerKey: LinkKey) => {
  const layerMode$ = useLayerStyleValue(layerKey, "layerMode");
  const layerGap$ = useLayerStyleValue(layerKey, "layerGap");
  const layerWrap$ = useLayerStyleValue(layerKey, "layerWrap");
  const layerDistribute$ = useLayerStyleValue(layerKey, "layerDistribute");
  const layerDirection$ = useLayerStyleValue(layerKey, "layerDirection");
  const layerAlign$ = useLayerStyleValue(layerKey, "layerAlign");
  const padding$ = useLayerStyleValue(layerKey, "padding");

  return useMemo(() => {
    const isFlex = to(layerMode$, (v) => v === layerMode.flex);

    return {
      gap$: to([isFlex, layerGap$], (flag, value) => (flag ? value : null)),
      flexWrap$: to([isFlex, layerWrap$], (flag, value) =>
        flag ? value : null
      ),
      justifyContent$: to([isFlex, layerDistribute$], (flag, value) =>
        flag ? value : null
      ),
      flexDirection$: to([isFlex, layerDirection$], (flag, value) =>
        flag ? (value === layerDirection.vertical ? "column" : "row") : null
      ),
      alignItems$: to([isFlex, layerAlign$], (flag, value) =>
        flag ? value : null
      ),
      padding$: to([isFlex, padding$], (flag, value) => (flag ? value : null)),
    };
  }, [
    layerMode$,
    layerGap$,
    layerWrap$,
    layerDistribute$,
    layerDirection$,
    layerAlign$,
    padding$,
  ]);
};
