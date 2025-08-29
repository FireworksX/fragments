import { FC, memo, Profiler, useContext, useEffect } from "react";
import { LinkKey } from "@graph-state/core";
import { animated } from "@react-spring/web";
import {
  Frame as FrameCore,
  ScopeContext,
  InstanceContext,
} from "@fragmentsx/render-react";
import { CustomRender } from "@/providers/CustomRender";
import { useLayerStyles } from "@/hooks/useLayerStyles";
import { Text } from "@/components/Text";
import { Instance } from "@/components/Instance";
import { Collection } from "@/components/Collection";

interface FrameProps {
  hidden?: boolean;
  layerKey: LinkKey;
}

export const Frame: FC<FrameProps> = ({ layerKey, hidden }) => {
  const customRender = useContext(CustomRender);
  const styles = useLayerStyles(layerKey);
  const { layerKey: instanceLayerKey } = useContext(InstanceContext);
  const isNestedInstanceLayer = !!instanceLayerKey;

  return customRender(
    layerKey,
    <FrameCore
      layerKey={layerKey}
      hidden={hidden}
      styles={styles}
      FrameTag={animated.div}
      FrameElement={Frame}
      TextElement={Text}
      InstanceElement={Instance}
      CollectionElement={Collection}
      collectStyle={isNestedInstanceLayer}
    />
  );
};
