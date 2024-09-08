import { Extender } from "@/types";
import { createNumberVariable } from "@/static/creators/variables/numberVariable.ts";
import { createStringVariable } from "@/static/creators/variables/stringVariable.ts";
import { createBooleanVariable } from "@/static/creators/variables/booleanVariable.ts";
import { createObjectVariable } from "@/static/creators/variables/objectVariable.ts";
import { noop } from "@fragments/utils";
import { variableType } from "@/definitions.ts";
import { numberVariableExtend } from "@/extends/nodes/variableExtend/variables/numberVariableExtend.ts";
import { booleanVariableExtend } from "@/extends/nodes/variableExtend/variables/booleanVariableExtend.ts";
import { objectVariableExtend } from "@/extends/nodes/variableExtend/variables/objectVariableExtend.ts";
import { stringVariableExtend } from "@/extends/nodes/variableExtend/variables/stringVariableExtend.ts";

export const variableExtend: Extender = ({ graph, ...rest }) => {
  const creatorsMap: any[] = {
    [variableType.Number]: [createNumberVariable, numberVariableExtend],
    [variableType.Boolean]: [createBooleanVariable, booleanVariableExtend],
    [variableType.Object]: [createObjectVariable, objectVariableExtend],
    [variableType.String]: [createStringVariable, stringVariableExtend],
    none: [noop, noop],
  }[graph?.type ?? "none"];

  const [createDefaultGraph, extendGraph] = creatorsMap ?? [noop, noop];

  return extendGraph({ ...rest, graph: createDefaultGraph(graph) }) ?? graph;
};
