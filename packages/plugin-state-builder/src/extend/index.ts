import { Extender } from "@/types";
import { Graph, GraphState } from "@graph-state/core";
import { getRefValue } from "@/shared/getRefValue.ts";
import { getResolvedValue } from "@/shared/getResolvedValue.ts";
import { $EXTENDED_BUILDER } from "@/shared";

export const collectExtends =
  (extendCollection: Extender[]) =>
  (graph: Graph & { __extendted_builder?: any }, state: GraphState) => {
    if (graph.__extendted_builder === $EXTENDED_BUILDER) return graph;

    const graphKey = state.keyOfEntity(graph);
    const getValue = getRefValue(state, graph);
    const resolveField = (field: string, fallback: unknown) => {
      const node = state.resolve(graph);
      if (!(field in node)) return fallback;

      const overrideValue = state.resolveValue(graph, field);
      return getResolvedValue(state, overrideValue);
    };
    const extendedData = extendCollection.reduce(
      (acc, extender) =>
        extender({ graph: acc, graphKey, getValue, state, resolveField }),
      graph
    );

    extendedData.__extendted_builder = $EXTENDED_BUILDER;

    return extendedData;
  };
