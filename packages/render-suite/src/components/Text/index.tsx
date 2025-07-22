import { LinkKey } from "@graph-state/core";
import cssStyles from "./styles.module.css";
import { useTextAttributes } from "@/components/Text/hooks/useTextAttributes";
import { FC, memo } from "react";
import { animated } from "@react-spring/web";

interface TextProps {
  layerKey: LinkKey;
}

export const Text: FC<TextProps> = memo(({ layerKey }) => {
  const { hash, styles, content } = useTextAttributes(layerKey);

  return (
    <animated.div style={styles} className={hash} data-key={layerKey}>
      <div
        className={cssStyles.text}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </animated.div>
  );
});
