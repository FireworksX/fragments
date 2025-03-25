import { BaseNode } from "@/types";
import { generateId, isValue } from "@fragments/utils";
import { GraphState } from "@graph-state/core";
import { nodes, variableType } from "@fragments/plugin-fragment";
import { createCachedInterpolate } from "@/shared/cachedInterpolate.ts";
import { getSpringValue } from "@/shared/getSpringValue.ts";
import { getStaticValue } from "@/shared/getStaticValue.ts";
import { valueSetter } from "../../../../plugin-state-builder/src/shared/valueSetter.ts";
import { setValueToNode } from "@/shared/setValueToNode.ts";
import { SpringValue } from "@fragments/springs-factory";

const defaultValue = {
  staticDefaultValue: false,
};

export function createBaseVariableNode(
  initialNode: Partial<BaseNode>,
  cache: GraphState,
  inputOptions
): BaseNode {
  const options = { ...defaultValue, ...inputOptions };
  const id = initialNode?._id ?? generateId();
  const nodeKey = cache.keyOfEntity({ _type: nodes.Variable, _id: id });

  const node: BaseNode = {
    ...initialNode,
    _type: nodes.Variable,
    _id: id,
    name: initialNode?.name,
    required: getSpringValue(initialNode, "required", false, cache),
    defaultValue: !options.staticDefaultValue
      ? getSpringValue(initialNode, "defaultValue", null, cache)
      : getStaticValue(initialNode, "defaultValue", null, cache),

    setRequired(value) {
      setValueToNode(initialNode, "required", value, cache);
    },

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
      if (options.staticDefaultValue) {
        cache.mutate(nodeKey, {
          defaultValue: value,
        });
      } else {
        setValueToNode(nodeKey, "defaultValue", value, cache);
      }
    },
  };

  return node;
}
