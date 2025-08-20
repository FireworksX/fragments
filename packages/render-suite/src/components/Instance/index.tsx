import { LinkKey } from "@graph-state/core";
import { Instance as InstanceBase } from "@fragmentsx/render-react";
import { Fragment } from "@/components/Fragment";
import { useInstance } from "./hooks/useInstance";
import { createContext, FC, memo, Profiler, useContext } from "react";
import { animated } from "@react-spring/web";
import { InstanceContext } from "@fragmentsx/render-react";
import { Scope } from "@/providers/Scope";
import { definition } from "@fragmentsx/definition";
import { useLayerStyles } from "@/hooks/useLayerStyles";
import { Frame } from "@/components/Frame";

export interface InstanceProps {
  layerKey?: LinkKey;
  fragmentId?: string;
  props?: Record<string, unknown>;
  globalManager?: unknown;
}

export const Instance: FC<InstanceProps> = (instanceProps) => {
  const { layerKey } = useContext(InstanceContext);
  const isDeepInstance = !!layerKey;

  // const { styles, hash, isDeepInstance, cssProps, ...allProps } =
  //   useInstance(instanceProps);

  const styles = useLayerStyles(instanceProps.layerKey);

  return (
    <InstanceBase
      Tag={animated.div}
      style={styles}
      FrameElement={Frame}
      {...instanceProps}
    />
  );

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
