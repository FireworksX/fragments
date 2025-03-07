import React, { FC } from "react";
import { animated } from "@react-spring/web";
import { LinkKey } from "@graph-state/core";
import { useTextAttributes } from "@/components/Text/hooks/useTextAttributes.ts";
import cssStyles from "./styles.module.css";

interface TextProps {
  layerKey: LinkKey;
}

export const Text: FC<TextProps> = ({ layerKey }) => {
  const { styles, content } = useTextAttributes(layerKey);

  return (
    <animated.div style={styles} data-key={layerKey}>
      <div
        className={cssStyles.text}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </animated.div>
  );
};
