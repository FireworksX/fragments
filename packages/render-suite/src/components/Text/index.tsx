import { LinkKey } from "@graph-state/core";
import { Text as TextCore } from "@fragmentsx/render-react";
import { FC, memo, useContext } from "react";
import { animated } from "@react-spring/web";
import { useLayerStyles } from "@/hooks/useLayerStyles";

interface TextProps {
  layerKey: LinkKey;
}

export const Text: FC<TextProps> = memo(({ layerKey, ...restProps }) => {
  const styles = useLayerStyles(layerKey);

  return (
    <TextCore
      layerKey={layerKey}
      Tag={animated.div}
      style={styles}
      {...restProps}
    />
  );
});
