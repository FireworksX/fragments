import { LinkKey } from "@graph-state/core";
import { Fragment } from "@/components/Fragment";
import { useInstance } from "./hooks/useInstance";
import { createContext, FC } from "react";
import { animated } from "@react-spring/web";
import { InstanceContext } from "@fragmentsx/render-core";

export interface InstanceProps {
  layerKey?: LinkKey;
  fragmentId?: string;
  props?: Record<string, unknown>;
  globalManager?: unknown;
}

export const Instance: FC<InstanceProps> = (instanceProps) => {
  const {
    styles,
    fragmentId,
    parentManager,
    props,
    innerManager,
    definitions,
    globalManager,
  } = useInstance(instanceProps);

  return (
    <InstanceContext.Provider
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
          <Fragment fragmentId={fragmentId} globalManager={globalManager} />
        </animated.div>
      ) : (
        <Fragment fragmentId={fragmentId} globalManager={globalManager} />
      )}
    </InstanceContext.Provider>
  );
};
