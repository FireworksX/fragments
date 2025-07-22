import { useContext } from "preact/compat";
import { GraphState, LinkKey } from "@graph-state/core";
import { useGraph } from "@graph-state/react";
import { pick } from "@fragmentsx/utils";
import { FragmentContext } from "@/components/Fragment/FragmentContext";
import { isVariableLink } from "@fragmentsx/definition";
import { InstanceContext } from "@/components/Instance";

export const useReadVariable = (
  variableKey?: LinkKey | null,
  customManager?: GraphState
) => {
  const isVariable = isVariableLink(variableKey);
  const { manager: fragmentManager } = useContext(FragmentContext);
  const { props, innerManager } = useContext(InstanceContext);

  // const { props, innerManager, layerKey } = use(InstanceContext);
  const resultManager = customManager ?? innerManager ?? fragmentManager;
  const { _id: propertyId } = resultManager?.entityOfKey(variableKey) ?? {};
  // const { layer: propertyLayer } = useLayer(propertyKey, resultManager);

  const [variableLayer] = useGraph(
    isVariable ? fragmentManager : null,
    variableKey,
    {
      selector: (graph) =>
        graph ? pick(graph, "defaultValue", "required") : graph,
    }
  );

  const currentValue = props?.[propertyId] ?? null;
  const required = variableLayer?.required ?? false;
  const defaultValue = variableLayer?.defaultValue ?? null;
  const resultValue = required ? currentValue : currentValue ?? defaultValue;

  const readVariable = (variableKey?: LinkKey) => {
    const isVariable = isVariableLink(variableKey);

    if (!isVariable) {
      return {
        value: null,
        layer: null,
      };
    }

    const variableLayer = pick(
      resultManager?.resolve(variableKey) ?? {},
      "defaultValue",
      "required"
    );

    const { _id: propertyId } = resultManager?.entityOfKey(variableKey) ?? {};
    const currentValue = props?.[propertyId] ?? null;
    const required = variableLayer?.required ?? false;
    const defaultValue = variableLayer?.defaultValue ?? null;
    const resultValue = required ? currentValue : currentValue ?? defaultValue;

    if (isVariableLink(resultValue)) {
      return readVariable(resultValue);
    }

    return {
      value: resultValue,
      layer: variableLayer,
    };
  };

  const { layer, value } = readVariable(variableKey);

  return {
    value,
    layer,
    readVariable,
  };
};
