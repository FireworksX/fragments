import { isVariableLink } from "@fragmentsx/definition";
import { useContext } from "preact/compat";
import { FragmentContext } from "@/components/Fragment/FragmentContext";
import { useGraph } from "@graph-state/react";
import { pick } from "@fragmentsx/utils";

export const useLayerCssVariable = (inputValue) => {
  const { manager } = useContext(FragmentContext);
  const isVariable = isVariableLink(inputValue);
  const [variableValue] = useGraph(isVariable ? manager : null, inputValue, {
    selector: (graph) => pick(graph, "defaultValue", "_id"),
  });

  return {
    value: isVariable
      ? `var(--${variableValue?._id}, ${variableValue?.defaultValue})`
      : null,
  };
};
