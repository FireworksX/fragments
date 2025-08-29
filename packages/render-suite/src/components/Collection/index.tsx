import { FC, memo, Profiler, useContext, useEffect } from "react";
import { LinkKey } from "@graph-state/core";
import { animated } from "@react-spring/web";
import {
  Collection as CollectionCore,
  ScopeContext,
  InstanceContext,
} from "@fragmentsx/render-react";
import { CustomRender } from "@/providers/CustomRender";
import { useLayerStyles } from "@/hooks/useLayerStyles";
import { Text } from "@/components/Text";
import { Instance } from "@/components/Instance";
import { FrameProps } from "@fragmentsx/render-react/dist/components/Frame";
import { Frame } from "@/components/Frame";

interface CollectionProps extends FrameProps {}

export const Collection: FC<CollectionProps> = (props) => {
  const { layerKey: instanceLayerKey } = useContext(InstanceContext);
  const isNestedInstanceLayer = !!instanceLayerKey;
  const styles = useLayerStyles(props.layerKey);

  return (
    <CollectionCore
      {...props}
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
