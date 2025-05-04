import { LinkKey } from "@graph-state/core";
import { Fragment } from "@/components/Fragment";
import { useInstance } from "./hooks/useInstance";
import { createContext, FC, memo, Profiler } from "react";
import { animated } from "@react-spring/web";
import { InstanceContext } from "@fragmentsx/render-core";

export interface InstanceProps {
  layerKey?: LinkKey;
  fragmentId?: string;
  props?: Record<string, unknown>;
  globalManager?: unknown;
}

const Inner = memo((allProps) => {
  if (!allProps.innerManager) return null;

  return (
    <InstanceContext.Provider
      value={{
        layerKey: allProps.layerKey,
        definitions: allProps.definitions,
        innerManager: allProps.innerManager,
        parentManager: allProps.parentManager,
        props: allProps.props,
      }}
    >
      <Fragment
        fragmentId={allProps.fragmentId}
        globalManager={allProps.globalManager}
      />
    </InstanceContext.Provider>
  );
});

export const Instance: FC<InstanceProps> = (instanceProps) => {
  const { styles, hash, isDeepInstance, propsVars, ...allProps } =
    useInstance(instanceProps);

  if (allProps.parentManager) {
    return (
      <animated.div
        className={isDeepInstance ? hash : null}
        style={!isDeepInstance ? { ...styles, ...propsVars } : {}}
        data-key={instanceProps.layerKey}
      >
        <Inner {...allProps} />
      </animated.div>
    );
  }

  return <Inner {...allProps} />;
};
