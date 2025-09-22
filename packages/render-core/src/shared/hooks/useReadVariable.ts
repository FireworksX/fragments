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

    const lastCollectionItem = scopes.findLast(
      (scope) => scope?.type === definition.scopeTypes.CollectionItemScope
    );

    const collectionItemProp =
      isPrimitive(lastCollectionItem?.value) &&
      entityOfKey(lastCollectionItem?.sourceDefinition)?._id === variableId
        ? lastCollectionItem?.value
        : lastCollectionItem?.value?.[variableId];

    const fragmentDefinition = scopes.findLast(
      (scope) => scope.type === definition.scopeTypes.FragmentScope //&&
      // scope?.definitions?.find((def) => def === variableKey)
    );

    // if (variableId === "fdb3f5406b956") {
    //   console.log(
    //     variableId,
    //     scopes,
    //     lastCollectionItem,
    //     collectionItemProp,
    //     fragmentDefinition
    //   );
    // }

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
