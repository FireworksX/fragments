import { Extender } from "@/types";
import { Graph, GraphState } from "@graph-state/core";
import { $EXTENDED } from "@/definitions.ts";
import { getRefValue } from "@/shared/getRefValue.ts";
import { getResolvedValue } from "@/shared/getResolvedValue.ts";

export const collectExtends =
  (extendCollection: Extender[]) =>
  (graph: Graph & { __extendted?: any }, state: GraphState) => {
    if (graph.__extendted === $EXTENDED) return graph;

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

    extendedData.resolveField = resolveField;
    extendedData.__extendted = $EXTENDED;

    return extendedData;
  };
