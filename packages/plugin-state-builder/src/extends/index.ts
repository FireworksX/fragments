import { Extender } from "@/types";
import { Graph, GraphState } from "@graph-state/core";
import { getRefValue } from "@/shared/getRefValue.ts";
import { getResolvedValue } from "@/shared/getResolvedValue.ts";
import { $EXTENDED_BUILDER } from "@/shared";
import { nodes } from "@fragments/plugin-state";
import { gray } from "next/dist/lib/picocolors";

export const collectExtends =
  (extendCollection: Extender[]) =>
  (graph: Graph & { __extendted_builder?: any }, state: GraphState) => {
    if (graph.__extendted_builder === $EXTENDED_BUILDER) return graph;

    const graphKey = state.keyOfEntity(graph);

    const createResolveField =
      (graph) => (field: string, fallback: unknown) => {
        const node = state.resolve(graph);
        if (!!node && !(field in node)) return fallback;

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
      // } else if (!acc.extenders?.includes(extender.symbol)) {
      //   // acc.extenders?.push(extender.symbol);
      // }

      return acc;
    }, graph);

    extendedData.__extendted_builder = $EXTENDED_BUILDER;

    console.log("__extendted_builder", graph, extendedData);

    return extendedData;
  };
