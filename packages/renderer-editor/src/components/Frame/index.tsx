import React, { FC, useContext } from "react";
import { animated, useSpring } from "@react-spring/web";
import { LinkKey } from "@graph-state/core";
import { useFrameAttributes } from "./hooks/useFrameAttributes.ts";

interface FrameProps {
  layerKey: LinkKey;
}

export const Frame: FC<FrameProps> = ({ layerKey }) => {
  const { styles, children } = useFrameAttributes(layerKey);

  return (
    <animated.div style={styles} data-key={layerKey}>
      {children.map((childLink) => (
        <Frame key={childLink} layerKey={childLink} />
      ))}
    </animated.div>
  );
};
