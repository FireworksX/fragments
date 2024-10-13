import { Extender } from "@/types";
import { createNumberProperty } from "@/static/creators/properties/createNumberProperty.ts";
import { createStringProperty } from "@/static/creators/properties/createStringProperty.ts";
import { createBooleanProperty } from "@/static/creators/properties/createBooleanProperty.ts";
import { createObjectProperty } from "@/static/creators/properties/createObjectProperty.ts";
import { noop } from "@fragments/utils";
import { propertyType } from "@/definitions.ts";
import { numberVariableExtend } from "@/extends/nodes/propertyExtend/properties/numberVariableExtend.ts";
import { booleanVariableExtend } from "@/extends/nodes/propertyExtend/properties/booleanVariableExtend.ts";
import { objectVariableExtend } from "@/extends/nodes/propertyExtend/properties/objectVariableExtend.ts";
import { stringVariableExtend } from "@/extends/nodes/propertyExtend/properties/stringVariableExtend.ts";

export const variableExtend: Extender = ({ graph, ...rest }) => {
  const creatorsMap: any[] = {
    [propertyType.Number]: [createNumberProperty, numberVariableExtend],
    [propertyType.Boolean]: [createBooleanProperty, booleanVariableExtend],
    [propertyType.Object]: [createObjectProperty, objectVariableExtend],
    [propertyType.String]: [createStringProperty, stringVariableExtend],
    none: [noop, noop],
  }[graph?.type ?? "none"];

  const [createDefaultGraph, extendGraph] = creatorsMap ?? [noop, noop];

  return extendGraph({ ...rest, graph: createDefaultGraph(graph) }) ?? graph;
};
