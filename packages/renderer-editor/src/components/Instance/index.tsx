import { createContext, FC } from "react";
import { LinkKey } from "@graph-state/core";
import { useInstance } from "@/components/Instance/hooks/useInstance.ts";
import { Fragment } from "@/components/Fragment";
import { animated } from "@react-spring/web";

export interface InstanceProps {
  layerKey?: LinkKey;
  fragmentId?: string;
  props?: Record<string, unknown>;
}

export const InstanceContext = createContext({
  layerKey: null,
  parentManager: null,
  innerManager: null,
  props: {},
  definitions: [],
});

export const Instance: FC<InstanceProps> = (instanceProps) => {
  const {
    styles,
    fragmentId,
    parentManager,
    props,
    innerManager,
    definitions,
  } = useInstance(instanceProps);

  return (
    <InstanceContext
      value={{
        layerKey: instanceProps.layerKey,
        definitions,
        innerManager,
        parentManager,
        props,
      }}
    >
      {parentManager ? (
        <animated.div data-key={instanceProps.layerKey} style={styles}>
          <Fragment fragmentId={fragmentId} />
        </animated.div>
      ) : (
        <Fragment fragmentId={fragmentId} />
      )}
    </InstanceContext>
  );
};
