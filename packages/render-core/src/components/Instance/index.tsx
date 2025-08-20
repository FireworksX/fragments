import { createContext, FC } from "preact/compat";
import { LinkKey } from "@graph-state/core";
import { Fragment } from "@/components/Fragment";
import { useInstance } from "./hooks/useInstance";
import { GlobalManager } from "@/providers/GlobalManager";
import { useGlobalManager } from "@/shared/hooks/useGlobalManager";
import { Scope } from "@/providers/Scope";

export interface InstanceProps {
  layerKey?: LinkKey;
  fragmentId?: string;
  props?: Record<string, unknown>;
  globalManager?: unknown;
}

export const InstanceContext = createContext({
  layerKey: null,
  parentManager: null,
  innerManager: null,
  props: {},
  definitions: [],
});

const InstanceInitial: FC<InstanceProps> = (instanceProps) => {
  const {
    styles,
    cssProps,
    fragmentId,
    parentManager,
    props,
    hash,
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
        <Scope
          fragmentManager={innerManager}
          layerKey={instanceProps.layerKey}
          value={{
            layerKey: instanceProps.layerKey,
            definitions,
          }}
        >
          <div
            className={hash}
            data-key={instanceProps.layerKey}
            style={cssProps}
          >
            <Fragment fragmentId={fragmentId} globalManager={globalManager} />
          </div>
        </Scope>
      ) : (
        <div style={cssProps}>
          <Fragment fragmentId={fragmentId} globalManager={globalManager} />
        </div>
      )}
    </InstanceContext.Provider>
  );
};

export const Instance: FC<InstanceProps> = (props) => {
  return "globalManager" in props ? (
    <GlobalManager value={props.globalManager}>
      <InstanceInitial {...props} />
    </GlobalManager>
  ) : (
    <InstanceInitial {...props} />
  );
};
