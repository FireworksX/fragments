import { createBaseVariableNode } from "@/creators/variables/createBaseVariableNode.ts";
import { GraphState, isPartOfGraph, LinkKey } from "@graph-state/core";
import { variableType } from "@fragments/plugin-fragment";
import { isVariableLink } from "@/shared/isVariableLink.ts";

export type CreateNumberOptions = Partial<{
  name: string;
  required: boolean;
  defaultValue: number;
  min: number;
  max: number;
  step: number;
  displayStepper: boolean;
}>;

export const createObjectVariable = (
  initialNode: Partial<unknown> = {},
  cache: GraphState
) => {
  const baseNode = createBaseVariableNode(
    {
      ...initialNode,
      defaultValue: initialNode?.defaultValue ?? {},
    },
    cache,
    {
      staticDefaultValue: true,
    }
  );
  const nodeKey = cache.keyOfEntity(baseNode);

  return {
    ...baseNode,
    type: variableType.Object,

    setField(key: string, value: LinkKey) {
      if (isVariableLink(value)) {
        cache.mutate(nodeKey, {
          defaultValue: {
            [key]: value,
          },
        });
      }
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
