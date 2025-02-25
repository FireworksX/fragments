import React, { FC, useContext } from "react";
import { animated, useSpring } from "@react-spring/web";
import { LinkKey } from "@graph-state/core";
import { useFrame } from "./hooks/useFrame.ts";
import { nodes } from "@fragments/plugin-fragment";
import { Text } from "@/components/Text";
import { Instance } from "@/components/Instance";

interface FrameProps {
  layerKey: LinkKey;
}

export const Frame: FC<FrameProps> = ({ layerKey }) => {
  const { styles, children, type } = useFrame(layerKey);

  if (type === nodes.Text) {
    return <Text layerKey={layerKey} />;
  }

  if (type === nodes.Instance) {
    return <Instance layerKey={layerKey} />;
  }

  return (
    <animated.div style={styles} data-key={layerKey}>
      {children.map((childLink) => (
        <Frame key={childLink} layerKey={childLink} />
      ))}
    </animated.div>
  );
};
