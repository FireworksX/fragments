import { FC } from "react";
import { LinkKey } from "@graph-state/core";
import { animated } from "@react-spring/web";
import { useFrame } from "./hooks/useFrame";
import { definition } from "@fragmentsx/definition";
import { Text } from "../Text";

interface FrameProps {
  layerKey: LinkKey;
}

export const Frame: FC<FrameProps> = ({ layerKey }) => {
  const { styles, children, type } = useFrame(layerKey);

  if (type === definition.nodes.Text) {
    return <Text layerKey={layerKey} />;
  }
  //
  // if (type === definition.nodes.Instance) {
  //   return <Instance layerKey={layerKey} />;
  // }

  return (
    <animated.div style={styles} data-key={layerKey}>
      {children.map((childLink) => (
        <Frame key={childLink} layerKey={childLink} />
      ))}
    </animated.div>
  );
};
