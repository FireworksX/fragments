import { FC, useContext } from "react";
import { LinkKey } from "@graph-state/core";
import { animated } from "@react-spring/web";
import { useFrame } from "./hooks/useFrame";
import { definition } from "@fragmentsx/definition";
import { Text } from "../Text";
import { CustomRender } from "@/providers/CustomRender";
import { Instance } from "@/components/Instance";

interface FrameProps {
  layerKey: LinkKey;
}

export const Frame: FC<FrameProps> = ({ layerKey, ref }) => {
  const customRender = useContext(CustomRender);
  const { styles, children, type } = useFrame(layerKey);

  if (type === definition.nodes.Text) {
    return <Text layerKey={layerKey} />;
  }

  if (type === definition.nodes.Instance) {
    return <Instance layerKey={layerKey} />;
  }

  return customRender(
    layerKey,
    <animated.div ref={ref} style={styles} data-key={layerKey}>
      {children.map((childLink) => (
        <Frame key={childLink} layerKey={childLink} />
      ))}
    </animated.div>
  );
};
