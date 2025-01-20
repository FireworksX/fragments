import { GraphState, isPartOfGraph, LinkKey } from "@graph-state/core";
import { BaseNode, WithChildren } from "@/types";
import { getStaticValue } from "@/shared/getStaticValue.ts";

export function attributesModule<T extends BaseNode>(
  node: T,
  cache: GraphState
): WithChildren<T> {
  const nodeKey = cache.keyOfEntity(node);

  return {
    ...node,
    attributes: getStaticValue(node, "attributes", {}, cache),
    setAttribute(key, value) {
      cache.mutate(nodeKey, {
        attributes: {
          [key]: value,
        },
      });
    },
    removeAttribute(key) {
      cache.mutate(
        nodeKey,
        (prev) => {
          delete prev.attributes[key];
          return {
            ...prev,
            attributes: prev.attributes,
          };
        },
        {
          replace: (graph) => {
            return (
              cache.keyOfEntity(graph) === nodeKey ||
              isPartOfGraph(cache.keyOfEntity(graph), nodeKey)
            );
          },
        }
      );
    },
  };
}
