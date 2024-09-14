import { isObject, isPrimitive } from "@fragments/utils";
import { Plugin } from "@graph-state/core";
import { SpringValue } from "@react-spring/web";

export const toJSON: Plugin = (state) => {
  const nodeToJSON = (node: unknown) => {
    const resultNode = Object.entries(node).reduce((acc, [key, value]) => {
      if (isPrimitive(value) && value) {
        return { ...acc, [key]: value };
      }

      if (Array.isArray(value) && value.length) {
        return { ...acc, [key]: value.map(nodeToJSON) };
      }

      if (isObject(value)) {
        return {
          ...acc,
          [key]:
            value instanceof SpringValue ? value.toJSON() : nodeToJSON(value),
        };
      }

      return acc;
    }, {});

    return resultNode;
  };

  state.toJSONState = () => {
    return nodeToJSON(state.resolve(state, { deep: true }));
  };
};
