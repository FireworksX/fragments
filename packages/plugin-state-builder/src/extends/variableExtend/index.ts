import { Extender } from "@/types";
import { noop } from "@fragments/utils";
import { numberVariableExtend } from "./variables/numberVariableExtend.ts";
import { booleanVariableExtend } from "./variables/booleanVariableExtend.ts";
import { objectVariableExtend } from "./variables/objectVariableExtend.ts";
import { stringVariableExtend } from "./variables/stringVariableExtend.ts";
import { variableType } from "@fragments/plugin-state";

export const variableExtend: Extender = ({ graph, state, ...rest }) => {
  const creator: any[] = {
    [variableType.Number]: numberVariableExtend,
    [variableType.Boolean]: booleanVariableExtend,
    [variableType.Object]: objectVariableExtend,
    [variableType.String]: stringVariableExtend,
    none: noop,
  }[graph?.type ?? "none"];

  const extendGraph = creator ?? noop;

  return extendGraph?.({ ...rest, state, graph }) ?? graph;
};

variableExtend.symbol = Symbol("variableExtend");
