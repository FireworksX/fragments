import { useContext, useMemo, useRef } from "react";
import { FragmentContext } from "@/components/Fragment/FragmentContext.tsx";
import { to, useSpring } from "@react-spring/web";
import { layerWithOverrides } from "@/shared/layerWithOverrides.ts";
import { useGraphEffect } from "@graph-state/react";
import { LinkKey } from "@graph-state/core";
import { toSize } from "@/shared/hooks/useLayerStyles/toSize.ts";
import { toDisplay } from "@/shared/hooks/useLayerStyles/toDisplay.ts";
import { toPosition } from "@/shared/hooks/useLayerStyles/toPosition.ts";
import { toLayer } from "@/shared/hooks/useLayerStyles/toLayer.ts";
import { toBackground } from "@/shared/hooks/useLayerStyles/toBackground.ts";
import { toBorder } from "@/shared/hooks/useLayerStyles/toBorder.ts";

export const useLayerStyles = (layerKey: LinkKey, schema) => {
  const { manager: fragmentManager } = useContext(FragmentContext);
  const layerStylesSchema = useRef(schema.safeParse({}).data);

  const [schemaSprings, schemaSpringsApi] = useSpring(() => {
    const initialData = layerWithOverrides(
      layerStylesSchema.current,
      fragmentManager.resolve(layerKey),
      fragmentManager
    );

    return initialData;
  }, []);

  useGraphEffect(fragmentManager, layerKey, (data) => {
    const dataWithOverrides = layerWithOverrides(
      layerStylesSchema.current,
      data,
      fragmentManager
    );

    schemaSpringsApi.set(dataWithOverrides);
  });

  return useMemo(() => {
    const { width, height } = toSize(schemaSprings);
    const { display } = toDisplay(schemaSprings);
    const { position, top, left } = toPosition(schemaSprings);
    const { background } = toBackground(schemaSprings);
    const { border } = toBorder(schemaSprings);
    const layerStyle = toLayer(schemaSprings);

    return {
      opacity: schemaSprings.opacity,
      zIndex: schemaSprings.zIndex,
      overflow: schemaSprings.overflow,
      borderRadius: schemaSprings.borderRadius,
      position,
      top,
      left,
      width,
      height,
      background,
      display,
      border,
      ...layerStyle,
    };
  }, Object.values(schemaSprings));
};
