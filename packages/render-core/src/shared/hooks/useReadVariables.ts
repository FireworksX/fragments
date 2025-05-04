import { useContext } from "preact/compat";
import { LinkKey } from "@graph-state/core";
import { useGraph, useGraphStack } from "@graph-state/react";
import { pick } from "@fragmentsx/utils";
import { FragmentContext } from "@/components/Fragment/FragmentContext";
import { isVariableLink } from "@fragmentsx/definition";
import { InstanceContext } from "@/components/Instance";

export const useReadVariables = (variableKeys: LinkKey[]) => {
  const filterKeys = variableKeys.filter(isVariableLink);
  const { manager: fragmentManager } = useContext(FragmentContext);
  const { props, innerManager, layerKey } = useContext(InstanceContext);

  const resultManager = innerManager ?? fragmentManager;

  const variableLayers = useGraphStack(
    !!filterKeys.length ? resultManager : null,
    filterKeys,
    {
      selector: (graph) =>
        graph ? pick(graph, "defaultValue", "required") : graph,
    }
  );

  return variableLayers.map((layer) => {
    const { _id: propertyId } = layer ?? {};
    const currentValue = props?.[propertyId] ?? null;
    const required = layer?.required ?? false;
    const defaultValue = layer?.defaultValue ?? null;
    const resultValue = required ? currentValue : currentValue ?? defaultValue;

    return {
      value: resultValue,
      layer: layer,
    };
  });
};
