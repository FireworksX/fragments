import { createContext, FC } from "preact/compat";
import { LinkKey } from "@graph-state/core";
import { Fragment } from "@/components/Fragment";
import { useInstance } from "./hooks/useInstance";

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
        <div data-key={instanceProps.layerKey} style={styles}>
          <Fragment fragmentId={fragmentId} globalManager={globalManager} />
        </div>
      ) : (
        <Fragment fragmentId={fragmentId} globalManager={globalManager} />
      )}
    </InstanceContext>
  );
};
