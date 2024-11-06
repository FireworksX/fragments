import { isObject, isPrimitive } from "@fragments/utils";
import { Plugin } from "@graph-state/core";
import { Interpolation, SpringValue } from "@react-spring/web";

export const toJSON: Plugin = (state) => {
  const nodeToJSON = (node: unknown) => {
    const resultNode = Object.entries(node).reduce((acc, [key, value]) => {
      if (typeof value !== "function" && typeof value !== "symbol") {
        acc[key] =
          value instanceof SpringValue || value instanceof Interpolation
            ? value.toJSON()
            : value;
      }

      return acc;
    }, {});

    return resultNode;
  };

  state.toJSONState = () => {
    const graphs = state.cache.links.values();

    return Array.from(graphs).map((value) => {
      return nodeToJSON(value);
    });
  };
};
