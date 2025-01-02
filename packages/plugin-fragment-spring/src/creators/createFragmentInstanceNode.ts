import { nodes } from "@/definitions.ts";
import { positionModule } from "@/modules/positionModule.ts";
import { applyModules } from "@/shared/applyModules.ts";
import { GraphState, LinkKey } from "@graph-state/core";
import { FrameNode } from "@/types";
import { sizeModule } from "@/modules/sizeModule.ts";
import { sizingModule } from "@/modules/sizingModule.ts";
import { aspectRatioModule } from "@/modules/aspectRationModule.ts";
import { visibleModule } from "@/modules/visibleModule.ts";
import { opacityModule } from "@/modules/opacityModule.ts";
import { overflowModule } from "@/modules/overflowModule.ts";
import { zIndexModule } from "@/modules/zIndexModule.ts";
import {
  childrenModule,
  createBaseNode,
  getFieldValue,
} from "@fragments/plugin-fragment";
import { cloneModule } from "@/modules/cloneModule.ts";
import { copyModule } from "@/modules/copyModule.ts";
import { duplicateModule } from "@/modules/duplicateModule.ts";
import { attributesModule } from "@/modules/attributesModule.ts";
import { getSpringValue } from "@/shared/getSpringValue.ts";
import { get, set } from "@fragments/utils";
import { setValueToNode } from "@/shared/setValueToNode.ts";
import { findPathToProperty } from "@/shared/findPathToProperty.ts";
import { animatableValue } from "@/shared/animatableValue.ts";
import { SpringValue, to } from "@fragments/springs-factory";
import { clone } from "@/shared/clone.ts";

export const modules = [
  positionModule,
  sizeModule,
  sizingModule,
  aspectRatioModule,
  visibleModule,
  opacityModule,
  zIndexModule,
  cloneModule,
  copyModule,
  duplicateModule,
  attributesModule,
];

export function createFragmentInstanceNode(
  initialNode: Partial<FrameNode> = {},
  cache: GraphState
) {
  const baseNode = createBaseNode(nodes.FragmentInstance, initialNode, cache);
  const frameNode = applyModules(baseNode, modules, cache);
  const nodeKey = cache.keyOfEntity(frameNode);

  const baseClone = frameNode.clone;

  return {
    ...frameNode,
    props: getSpringValue(frameNode, "props", {}, cache),
    readProperty(link: LinkKey) {
      const node = cache.resolve(nodeKey);
      const nodeFragment = getFieldValue(node, "fragment", cache);
      const nodeProps = getFieldValue(node, "props", cache);

      const propsDefinition = cache.resolve(nodeFragment, {
        deep: true,
      }).properties;

      const { path, property } = findPathToProperty(
        propsDefinition,
        cache.entityOfKey(link)?._id
      );

      const propValue$ = get(nodeProps, path, null);
      const required$ = property?.required;
      const defaultValue$ = property.defaultValue;

      return to(
        [required$, propValue$, defaultValue$],
        (required, propValue, defaultValue) => {
          return required ? propValue : propValue ?? defaultValue;
        }
      );
    },
    updateProperty(link: LinkKey, value) {
      const node = cache.resolve(nodeKey);
      const nodeFragment = getFieldValue(node, "fragment", cache);
      const nodeProps = getFieldValue(node, "props", cache);

      const propsDefinition = cache.resolve(nodeFragment, {
        deep: true,
      }).properties;

      const { path } = findPathToProperty(
        propsDefinition,
        cache.entityOfKey(link)?._id
      );

      const propValue = get(nodeProps, path);
      if (propValue instanceof SpringValue) {
        propValue.set(value);
      } else if (path) {
        const nextProps = { ...nodeProps };
        set(nextProps, path, new SpringValue(value));

        cache.mutate(
          nodeKey,
          {
            ...node,
            props: nextProps,
          },
          {
            replace: (graph) => cache.keyOfEntity(graph) === nodeKey,
          }
        );
      }
    },

    clone() {
      const nodeProps = cache.resolve(nodeKey)?.props ?? {};
      const clonedProps = clone(nodeProps);

      return baseClone({
        props: clonedProps,
      });
    },
  };
}
