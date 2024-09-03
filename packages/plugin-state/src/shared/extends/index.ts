import { Extender } from "@/types";
import { Graph, GraphState } from "@graph-state/core";
import { $EXTENDED } from "@/defenitions.ts";
import { getRefValue } from "@/shared/getRefValue.ts";

export const collectExtends =
  (extendCollection: Extender[]) =>
  (graph: Graph & { __extendted?: any }, state: GraphState) => {
    if (graph.__extendted === $EXTENDED) return graph;

    const graphKey = state.keyOfEntity(graph);
    const getValue = getRefValue(state, graph);
    const extendedData = extendCollection.reduce(
      (acc, extender) => extender({ graph: acc, graphKey, getValue, state }),
      graph
    );

    extendedData.__extendted = $EXTENDED;

    return extendedData;
  };
