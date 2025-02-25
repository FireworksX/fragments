import { LinkKey } from "@graph-state/core";
import { createContext, FC } from "react";
import { useInstance } from "@/components/Instance/hooks/useInstance.ts";
import { Fragment } from "@/components/Fragment";
import { animated } from "@react-spring/web";

interface InstanceProps {
  layerKey: LinkKey;
  startLayer?: LinkKey;
}

export const InstanceContext = createContext({
  layerKey: null,
});

export const Instance: FC<InstanceProps> = ({ layerKey }) => {
  const { styles, fragmentId } = useInstance(layerKey);

  return (
    <InstanceContext value={{ layerKey }}>
      <animated.div data-key={layerKey} style={styles}>
        <Fragment fragmentId={fragmentId} />
      </animated.div>
    </InstanceContext>
  );
};
