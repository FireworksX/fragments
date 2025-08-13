import { LinkKey } from "@graph-state/core";
import { Instance as InstanceBase } from "@fragmentsx/render-react";
import { Fragment } from "@/components/Fragment";
import { useInstance } from "./hooks/useInstance";
import { createContext, FC, memo, Profiler, useContext } from "react";
import { animated } from "@react-spring/web";
import { InstanceContext } from "@fragmentsx/render-core";
import { Scope } from "@/providers/Scope";
import { definition } from "@fragmentsx/definition";
import { useLayerStyles } from "@/hooks/useLayerStyles";

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
  const { layerKey } = useContext(InstanceContext);
  const isDeepInstance = !!layerKey;

  // const { styles, hash, isDeepInstance, cssProps, ...allProps } =
  //   useInstance(instanceProps);

  const styles = useLayerStyles(instanceProps.layerKey);

  return <InstanceBase Tag={animated.div} style={styles} {...instanceProps} />;

  // if (allProps.parentManager) {
  // return (
  //   <Scope
  //     fragmentManager={allProps.innerManager}
  //     layerKey={allProps.layerKey}
  //     value={{
  //       type: definition.scopeTypes.InstanceScope,
  //       props: allProps.props,
  //       definitions: allProps.definitions,
  //     }}
  //   >
  //     <animated.div
  //       className={isDeepInstance ? hash : null}
  //       style={!isDeepInstance ? { ...styles, ...cssProps } : {}}
  //       data-key={instanceProps.layerKey}
  //     >
  //       <Inner {...allProps} />
  //     </animated.div>
  //   </Scope>
  // );
  // }

  // return <Inner {...allProps} />;
};
