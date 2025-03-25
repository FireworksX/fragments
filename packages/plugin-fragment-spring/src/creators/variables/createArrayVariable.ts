import { createBaseVariableNode } from "@/creators/variables/createBaseVariableNode.ts";
import { GraphState, isPartOfGraph, LinkKey } from "@graph-state/core";
import { getSpringValue } from "@/shared/getSpringValue.ts";
import { setValueToNode } from "@/shared/setValueToNode.ts";
import { getStaticValue } from "@/shared/getStaticValue.ts";
import { variableType } from "@fragments/plugin-fragment";

export type CreateNumberOptions = Partial<{
  name: string;
  required: boolean;
  defaultValue: number;
  min: number;
  max: number;
  step: number;
  displayStepper: boolean;
}>;

export const createArrayVariable = (
  initialNode: Partial<unknown> = {},
  cache: GraphState
) => {
  const baseNode = createBaseVariableNode(
    {
      ...initialNode,
      defaultValue: initialNode?.defaultValue ?? [],
    },
    cache,
    {
      staticDefaultValue: true,
    }
  );
  const nodeKey = cache.keyOfEntity(baseNode);

  return {
    ...baseNode,
    required: getSpringValue(baseNode, "required", false, cache),
    type: variableType.Array,
    valueType: getStaticValue(baseNode, "valueType", null, cache),
    setRequired(value) {
      setValueToNode(baseNode, "required", value, cache);
    },

    setValueType(type: keyof typeof variableType) {
      cache.mutate(nodeKey, {
        valueType: type,
      });
    },

    // removeField(key) {
    //   cache.mutate(
    //     nodeKey,
    //     (prev) => {
    //       delete prev.defaultValue[key];
    //       return {
    //         ...prev,
    //         defaultValue: prev.defaultValue,
    //       };
    //     },
    //     {
    //       replace: (graph) => {
    //         return (
    //           cache.keyOfEntity(graph) === nodeKey ||
    //           isPartOfGraph(cache.keyOfEntity(graph), nodeKey)
    //         );
    //       },
    //     }
    //   );
    // },
  };
};
