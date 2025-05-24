import { FC, memo, Profiler, useContext, useEffect } from "react";
import { LinkKey } from "@graph-state/core";
import { animated } from "@react-spring/web";
import { useFrame } from "./hooks/useFrame";
import { definition } from "@fragmentsx/definition";
import { Text } from "../Text";
import { CustomRender } from "@/providers/CustomRender";
import { Instance } from "@/components/Instance";
import { useMounted } from "@fragmentsx/render-core";

interface FrameProps {
  hidden?: boolean;
  layerKey: LinkKey;
}

export const Frame: FC<FrameProps> = memo(({ layerKey, hidden }) => {
  const customRender = useContext(CustomRender);
  const { styles, children, type, hash, events } = useFrame(layerKey);
  const isMounted = useMounted();

  if (hidden && isMounted) {
    return null;
  }

  if (type === definition.nodes.Text) {
    return <Text layerKey={layerKey} />;
  }

  if (type === definition.nodes.Instance) {
    return <Instance layerKey={layerKey} />;
  }

  return customRender(
    layerKey,
    // <Profiler
    //   id={layerKey}
    //   onRender={(id, phase, actualDuration) => {
    //     // if (id === "Instance:94de72bbc2561") {
    //     //   console.log(phase, actualDuration);
    //     // }
    //   }}
    // >
    <animated.div
      className={hash}
      data-key={layerKey}
      style={{ ...styles, display: hidden ? "none" : styles.display }}
    >
      {children.map((childLink) => (
        <Frame key={childLink} layerKey={childLink} />
      ))}
    </animated.div>
    // </Profiler>
  );
});
