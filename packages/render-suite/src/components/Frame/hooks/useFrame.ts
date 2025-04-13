import { useContext } from "react";
import { LinkKey } from "@graph-state/core";
import { FragmentContext, useLayerChildren } from "@fragmentsx/render-core";
import { useLayerStyles } from "@/hooks/useLayerStyles";
import { useGraphEffect } from "@graph-state/react";

export const useFrame = (layerKey: LinkKey) => {
  const { manager: fragmentManager } = useContext(FragmentContext);
  const layer = fragmentManager.entityOfKey(layerKey);
  const styles = useLayerStyles(layerKey);
  const children = useLayerChildren(layerKey);

  // useGraphEffect(fragmentManager, layerKey, (nextValue, prevValue) => {
  //   if (layerKey === "Frame:19cf35670bf088") {
  //     console.log(layerKey, nextValue, prevValue);
  //   }
  // });

  return {
    type: layer._type,
    styles,
    children,
  };
};
