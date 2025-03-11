import { useContext } from "preact/compat";
import { LinkKey } from "@graph-state/core";
import { useGraph } from "@graph-state/react";
import { pick } from "@fragments/utils";
import { FragmentContext } from "@/components/Fragment/FragmentContext";
import { isVariableLink } from "@/shared/helpers/checks";

export const useReadVariable = (variableKey: LinkKey) => {
  const isVariable = isVariableLink(variableKey);
  const { manager: fragmentManager } = useContext(FragmentContext);
  // const { props, innerManager, layerKey } = use(InstanceContext);
  const resultManager = fragmentManager; //innerManager ?? fragmentManager;
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

  const currentValue = null; //props?.[propertyId] ?? null;
  const required = variableLayer?.required ?? false;
  const defaultValue = variableLayer?.defaultValue ?? null;
  const resultValue = required ? currentValue : currentValue ?? defaultValue;

  return {
    value: resultValue,
    layer: variableLayer,
  };
};
