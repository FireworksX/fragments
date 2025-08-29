import { useContext } from "preact/compat";
import { entityOfKey, GraphState, LinkKey } from "@graph-state/core";
import { useGraph } from "@graph-state/react";
import { isPrimitive, pick } from "@fragmentsx/utils";
import { isVariableLink, definition } from "@fragmentsx/definition";
import { ScopeContext } from "@/providers/Scope/ScopeContext";

export const useReadVariable = (variableKey?: LinkKey | null) => {
  const scopes = useContext(ScopeContext) as unknown[];

  // useGraph(fragmentDefinition?.manager, variableKey, {
  //   selector: (graph) =>
  //     graph ? pick(graph, "defaultValue", "required") : graph,
  // });

  const readVariable = (variableKey?: LinkKey) => {
    const variableId = entityOfKey(variableKey)?._id;

    const isVariable = isVariableLink(variableKey);
    const instanceProp = scopes.findLast(
      (scope) => scope?.type === definition.scopeTypes.InstanceScope
    )?.props?.[variableId];

    const lastCollectionItemValue = scopes.findLast(
      (scope) => scope?.type === definition.scopeTypes.CollectionItemScope
    )?.value;
    const collectionItemProp = isPrimitive(lastCollectionItemValue)
      ? lastCollectionItemValue
      : lastCollectionItemValue?.[variableId];

    const fragmentDefinition = scopes.findLast(
      (scope) =>
        scope.type === definition.scopeTypes.FragmentScope &&
        scope?.definitions?.find((def) => def === variableKey)
    );

    if (!isVariable) {
      return {
        value: null,
        layer: null,
      };
    }

    const variableLayer = pick(
      fragmentDefinition?.manager?.resolve(variableKey) ?? {},
      "defaultValue",
      "required"
    );

    const currentValue =
      variableKey === instanceProp
        ? null
        : collectionItemProp ?? instanceProp ?? null;

    const required = variableLayer?.required ?? false;
    const defaultValue = variableLayer?.defaultValue ?? null;
    const resultValue = required
      ? currentValue
      : currentValue ?? collectionItemProp ?? defaultValue;

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
