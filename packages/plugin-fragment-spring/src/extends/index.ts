import { Extender } from "@/types";
import { Graph, GraphState } from "@graph-state/core";
import { $EXTENDED, nodes } from "@/definitions.ts";
import { getRefValue } from "@/shared/getRefValue.ts";
import { getResolvedValue } from "@/shared/getResolvedValue.ts";

export const collectExtends =
  (extendCollection: Extender[]) =>
  (graph: Graph & { __extendted?: any }, state: GraphState) => {
    if (graph.__extendted === $EXTENDED) return graph;

    const graphKey = state.keyOfEntity(graph);

    const createResolveField =
      (graph) => (field: string, fallback: unknown) => {
        const node = state.resolve(graph);
        if (!(field in node)) return fallback;

        const overrideValue = state.resolveValue(graph, field);
        return getResolvedValue(state, overrideValue);
      };

    const extendedData = extendCollection.reduce((acc, extender) => {
      const getValue = getRefValue(state, acc);
      const resolveField = createResolveField(acc);

      // if (acc.extenders?.includes(extender.symbol)) {
      //   return acc;
      // }

      acc = extender({
        graph: acc,
        graphKey,
        getValue,
        state,
        resolveField,
      });

      // if (!acc.extenders) {
      //   acc.extenders = [];
      // } else {
      //   acc.extenders?.push(extender.symbol);
      // }

      return acc;
    }, graph);

    extendedData.resolveField = createResolveField(extendedData);
    extendedData.__extendted = $EXTENDED;

    return extendedData;
  };
