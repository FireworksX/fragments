import { FC, PropsWithChildren, useContext } from "preact/compat";
import { GraphState } from "@graph-state/core";
import { useGraph } from "@graph-state/react";
import { useParseRules } from "../hooks/usePageRules/useParseRules.ts";
import { GraphStateContext } from "./GraphStateProvider.tsx";
import { builderNodes } from "@fragments/fragments-plugin";
import { createContext } from "preact";
import { Layer } from "./Layer.tsx";

interface LayerProps extends PropsWithChildren {
  graphState?: GraphState;
  componentKey: string;
  variantKey?: string;
  mode?: "development";
  onClick?: (e, options: OnClickSelectorOptions) => void;
}

export const ComponentContext = createContext({
  componentKey: "",
  variantKey: "",
});

export const Component: FC<LayerProps> = ({
  componentKey,
  variantKey,
  graphState: inputGraphState,
  ...rest
}) => {
  const { graphState } = useContext(GraphStateContext);
  const state = graphState || inputGraphState;
  const componentValue = useGraph(state, componentKey);
  const componentVariantKey =
    variantKey ??
    state?.keyOfEntity({
      _type: builderNodes.ComponentVariant,
      _id: componentValue?.defaultVariant,
    });

  if (!componentKey || !variantKey || !state?.resolve(componentVariantKey)) {
    return null;
  }

  return (
    <ComponentContext.Provider
      value={{
        componentKey,
        variantKey,
      }}
    >
      <Layer graphState={state} layerKey={variantKey} {...rest} />
    </ComponentContext.Provider>
  );
};
