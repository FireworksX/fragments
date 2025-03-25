import { isObject, isPrimitive, isValue } from "@fragments/utils";
import { Graph, GraphState, isGraph, isLinkKey } from "@graph-state/core";
import { isLink } from "@graph-state/checkers";

export const getRefValue =
  (state: GraphState, graph: Graph) =>
  (fieldKey: string, fallbackValue: unknown) => {
    if (state.isOverrideFromField(graph, fieldKey)) {
      return null;
    }

    const value = graph[fieldKey];

    if (isValue(value)) {
      if ((isPrimitive(value) && !isLinkKey(value)) || isLink(value)) {
        return value;
      }

      if (!isPrimitive(value)) {
        if (isObject(value) && isGraph(value)) {
          return Object.keys(value).reduce((acc, key) => {
            acc[key] = getRefValue(state, value)(key, null);

            return acc;
          }, {});
        }

        // if (Array.isArray(value)) {
        //   const res = value.map(v => clonedField(graphState, v, key, fallback, isSpring))
        //   console.log(res, value, key)
        //   return res
        // }
      }

      return value;
    }

    if (isValue(fallbackValue)) {
      return fallbackValue;
    }

    return null;
  };
