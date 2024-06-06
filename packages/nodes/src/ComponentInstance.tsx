import { FC, useContext } from "preact/compat";
import { useGraph } from "@graph-state/react";
import { GraphStateContext } from "./GraphStateProvider.tsx";
import { ComponentContext } from "./Component.tsx";
import { Layer } from "./Layer.tsx";

interface ComponentInstanceProps {
  instanceKey: string;
}

export const ComponentInstance: FC<ComponentInstanceProps> = ({
  instanceKey,
  ...rest
}) => {
  const { graphState } = useContext(GraphStateContext);
  const [instanceValue] = useGraph(graphState, instanceKey);
  const variantKey = instanceValue?.variant;

  if (!variantKey) {
    return null;
  }

  return (
    <ComponentContext.Provider
      value={{
        componentKey: graphState.getKey(instanceValue.mainComponent),
        variantKey,
        instanceKey,
      }}
    >
      <Layer layerKey={variantKey} {...rest} />
    </ComponentContext.Provider>
  );
};
