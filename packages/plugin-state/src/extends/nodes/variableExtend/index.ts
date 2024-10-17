import { Extender } from "@/types";
import { noop } from "@fragments/utils";
import { variableType } from "@/definitions.ts";
import { numberVariableExtend } from "@/extends/nodes/variableExtend/variables/numberVariableExtend.ts";
import { booleanVariableExtend } from "@/extends/nodes/variableExtend/variables/booleanVariableExtend.ts";
import { objectVariableExtend } from "@/extends/nodes/variableExtend/variables/objectVariableExtend.ts";
import { stringVariableExtend } from "@/extends/nodes/variableExtend/variables/stringVariableExtend.ts";

export const variableExtend: Extender = ({ graph, state, ...rest }) => {
  const creatorsMap: any[] = {
    [variableType.Number]: [state.createNumberVariable, numberVariableExtend],
    [variableType.Boolean]: [
      state.createBooleanVariable,
      booleanVariableExtend,
    ],
    [variableType.Object]: [state.createObjectVariable, objectVariableExtend],
    [variableType.String]: [state.createStringVariable, stringVariableExtend],
    none: [noop, noop],
  }[graph?.type ?? "none"];

  const [createDefaultGraph, extendGraph] = creatorsMap ?? [noop, noop];

  return (
    extendGraph({ ...rest, state, graph: createDefaultGraph(graph) }) ?? graph
  );
};
