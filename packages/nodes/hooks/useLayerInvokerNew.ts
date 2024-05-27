import { Field } from "@adstore/statex";
import { SetOptions } from "@adstore/statex/src/createState";
import { SceneNode } from "../types";
import { useContext } from "preact/compat";
import { GraphStateContext } from "../src/GraphStateProvider.tsx";
import { useGraph } from "@graph-state/react";

export type LayerInvokerValue<TValue = unknown> = {
  value: TValue;
  onChange: (newValue: TValue, options?: SetOptions) => void;
};

type SetterOptions = {
  node: SceneNode;
  key: string;
  value: unknown;
  options?: SetOptions;
};

type Setter = (options: SetterOptions) => void;
type Getter = (options: Omit<SetterOptions, "options">) => void;

export const useLayerInvokerNew = (
  field: Field,
  setter?: Setter,
  getter?: Getter
) => {
  const { graphState } = useContext(GraphStateContext);
  const [entity] = useGraph(graphState, field);

  return (key: string): LayerInvokerValue => ({
    value: entity
      ? getter?.({
          node: entity,
          key,
          value: graphState.resolveValue(field, key),
        }) ?? graphState.resolveValue(field, key)
      : null,
    onChange: (newValue: any, options?: SetOptions) =>
      setter?.({
        node: entity,
        key,
        value: newValue,
        options,
      }),
  });
};
