import { BaseNode } from "@/types";
import { generateId, isValue } from "@fragments/utils";
import { GraphState } from "@graph-state/core";
import { nodes } from "@fragments/plugin-fragment";
import { createCachedInterpolate } from "@/shared/cachedInterpolate.ts";
import { getStableValue } from "@/shared/getStableValue.ts";
import { getStaticValue } from "@/shared/getStaticValue.ts";
import { valueSetter } from "../../../../plugin-state-builder/src/shared/valueSetter.ts";
import { setValueToNode } from "@/shared/setValueToNode.ts";

export function createBaseVariableNode(
  initialNode: Partial<BaseNode>,
  cache: GraphState
): BaseNode {
  const id = initialNode?._id ?? generateId();
  const nodeKey = cache.keyOfEntity({ _type: nodes.Variable, _id: id });
  const cacheInterpolate = createCachedInterpolate();

  const node: BaseNode = {
    ...initialNode,
    _type: nodes.Variable,
    _id: id,
    name: initialNode?.name,
    defaultValue: getStableValue(initialNode, "defaultValue", null, cache),
    value: null,

    rename(name: string) {
      cache.mutate({
        _type: nodes.Variable,
        _id: id,
        name,
      });
    },

    remove() {
      cache.invalidate(nodeKey);
    },

    setDefaultValue(value) {
      setValueToNode(nodeKey, "defaultValue", value, cache);
    },

    getValue() {
      const graph = cache.resolve(nodeKey);
      const value = graph.value;
      const defaultValue = graph.defaultValue;
      return cacheInterpolate([value, defaultValue], (val, defValue) =>
        isValue(val) ? val : defValue
      );
    },
  };

  return node;
}
