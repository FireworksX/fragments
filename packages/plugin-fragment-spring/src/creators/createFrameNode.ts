import { nodes } from "@/definitions.ts";
import { positionModule } from "@/modules/positionModule.ts";
import { applyModules } from "@/shared/applyModules.ts";
import { GraphState } from "@graph-state/core";
import { FrameNode } from "@/types";
import { sizeModule } from "@/modules/sizeModule.ts";
import { toCssModule } from "@/modules/toCssModule";
import { sizingModule } from "@/modules/sizingModule.ts";
import { aspectRatioModule } from "@/modules/aspectRationModule.ts";
import { visibleModule } from "@/modules/visibleModule.ts";
import { opacityModule } from "@/modules/opacityModule.ts";
import { overflowModule } from "@/modules/overflowModule.ts";
import { zIndexModule } from "@/modules/zIndexModule.ts";
import { solidFillModule } from "@/modules/solidFillModule.ts";
import { fillTypeModule } from "@/modules/fillTypeModule.ts";
import { cornersModule } from "@/modules/cornersModule.ts";
import { layerModule } from "@/modules/layerModule.ts";
import { paddingModule } from "@/modules/paddingModule.ts";
import { childrenModule, createBaseNode } from "@fragments/plugin-fragment";
import { cloneModule } from "@/modules/cloneModule.ts";
import { copyModule } from "@/modules/copyModule.ts";
import { duplicateModule } from "@/modules/duplicateModule.ts";
import { attributesModule } from "@/modules/attributesModule.ts";

export const modules = [
  childrenModule,
  positionModule,
  toCssModule,
  sizeModule,
  sizingModule,
  aspectRatioModule,
  visibleModule,
  opacityModule,
  overflowModule,
  zIndexModule,
  solidFillModule,
  fillTypeModule,
  cornersModule,
  layerModule,
  paddingModule,
  cloneModule,
  copyModule,
  duplicateModule,
  attributesModule,
];

export function createFrameNode(
  initialNode: Partial<FrameNode> = {},
  cache: GraphState
) {
  const baseNode = createBaseNode(nodes.Frame, initialNode, cache);
  const frameNode = applyModules(baseNode, modules, cache);

  return {
    ...frameNode,
    isRootLayer: () => {
      const resolvedNode = cache.resolve(frameNode);
      return (
        resolvedNode.getParent()?._type === nodes.Fragment &&
        !resolvedNode?.isBreakpoint
      );
    },
    isTopLevel: () => {
      const resolvedNode = cache.resolve(frameNode);
      return resolvedNode.getParent()?._type === nodes.Fragment;
    },
  };
}
