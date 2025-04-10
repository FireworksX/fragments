import { LinkKey } from "@graph-state/core";
import { useGraph } from "@graph-state/react";
import { pick } from "@fragmentsx/utils";
import { FragmentContext } from "@/components/Fragment/FragmentContext";
import { isVariableLink } from "@fragmentsx/definition";
import { useContext } from "react";
import { InstanceContext } from "@/components/Instance";

export const useReadVariable = (variableKey: LinkKey) => {
  const isVariable = isVariableLink(variableKey);
  const { manager: fragmentManager } = useContext(FragmentContext);
  const { props, innerManager, layerKey } = useContext(InstanceContext);

  // const { props, innerManager, layerKey } = use(InstanceContext);
  const resultManager = innerManager ?? fragmentManager;
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

  return {
    value: resultValue,
    layer: variableLayer,
  };
};
