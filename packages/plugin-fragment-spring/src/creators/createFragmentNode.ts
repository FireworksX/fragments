import { applyModules } from "@/shared/applyModules.ts";
import { GraphState } from "@graph-state/core";
import {
  childrenModule,
  createBaseNode,
  fragmentGrowingMode,
  getFieldValue,
  nodes,
  renderTarget,
  variableType,
} from "@fragments/plugin-fragment";
import { getStaticValue } from "@/shared/getStaticValue.ts";
import { createNode } from "@/shared/createNode.ts";
import { animatableValue } from "@/shared/animatableValue.ts";
import { SpringValue } from "@fragments/springs-factory";

export const modules = [childrenModule];
const BREAKPOINT_GAP = 50;

export function createFragmentNode(
  initialNode: Partial<unknown> = {},
  cache: GraphState
) {
  const baseNode = createBaseNode(nodes.Fragment, initialNode, cache);
  const fragmentNode = applyModules(baseNode, modules, cache);
  const nodeKey = cache.keyOfEntity(baseNode);

  return {
    ...fragmentNode,
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

    properties: getStaticValue(baseNode, "properties", [], cache),
    createProperty: (type: keyof typeof variableType) => {
      const createdProperty = createNode(
        { _type: nodes.Variable, type },
        cache
      );

      if (createdProperty) {
        cache.mutate(nodeKey, {
          properties: [createdProperty],
        });

        return cache.resolve(createdProperty);
      }

      return null;
    },

    addBreakpoint(node) {
      const primaryLayerNode = cache.$fragment?.findPrimaryLayer?.();
      if (primaryLayerNode) {
        const lastLayer = cache
          .resolve(cache.$fragment?.root)
          ?.children?.at(-1);
        const nextLeft =
          animatableValue(getFieldValue(lastLayer, "left", cache)) +
          animatableValue(getFieldValue(lastLayer, "width", cache)) +
          BREAKPOINT_GAP;
        const nextTop = animatableValue(getFieldValue(lastLayer, "top", cache));

        const nextBreakpointNode = primaryLayerNode.clone({
          ...node,
          left: new SpringValue(nextLeft),
          top: new SpringValue(nextTop),
          isBreakpoint: true,
        });

        const parentNode = cache.resolve(cache?.$fragment?.root);
        parentNode?.appendChild?.(nextBreakpointNode);
      }
    },
  };
}
