import { nodes } from "@/definitions.ts";
import { applyModules } from "@/shared/applyModules.ts";
import { GraphState } from "@graph-state/core";
import {
  childrenModule,
  createBaseNode,
  fragmentGrowingMode,
  renderTarget,
  variableType,
} from "@fragments/plugin-fragment";
import { getStaticValue } from "@/shared/getStaticValue.ts";
import { createNumberVariable } from "@/creators/variables/createNumberVariable.ts";
import { createBooleanVariable } from "@/creators/variables/createBooleanVariable.ts";

export const modules = [childrenModule];

export function createFragmentNode(
  initialNode: Partial<unknown> = {},
  cache: GraphState
) {
  const baseNode = createBaseNode(nodes.Fragment, initialNode, cache);
  const fragmentNode = applyModules(baseNode, modules, cache);
  const nodeKey = cache.keyOfEntity(baseNode);

  const creatorsMethodsMap = {
    [variableType.Number]: createNumberVariable,
    [variableType.Boolean]: createBooleanVariable,
    // [variableType.String]: createStringVariable,
  };

  return {
    ...fragmentNode,
    renderTarget: renderTarget.document,
    setRenderTarget: (renderTarget) => {
      cache.mutate(nodeKey, {
        renderTarget,
      });
    },
    horizontalGrow: getStaticValue(
      baseNode,
      "horizontalGrow",
      fragmentGrowingMode.auto,
      cache
    ),
    verticalGrow: getStaticValue(
      baseNode,
      "verticalGrow",
      fragmentGrowingMode.auto,
      cache
    ),
    setHorizontalGrow(value) {
      cache.mutate(nodeKey, {
        horizontalGrow: value,
      });
    },
    setVerticalGrow(value) {
      cache.mutate(nodeKey, {
        verticalGrow: value,
      });
    },

    properties: getStaticValue(baseNode, "properties", []),
    createProperty: (type: keyof typeof variableType) => {
      const createdProperty = creatorsMethodsMap[type]?.({}, cache);

      if (createdProperty) {
        cache.mutate(nodeKey, {
          properties: [createdProperty],
        });

        return cache.resolve(createdProperty);
      }

      return null;
    },
  };
}
