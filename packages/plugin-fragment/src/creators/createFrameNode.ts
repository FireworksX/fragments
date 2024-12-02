import { createBaseNode } from "@/creators/createBaseNode.ts";
import { nodes } from "@/definitions.ts";
import { positionModule } from "@/modules/positionModule.ts";
import { applyModules } from "@/shared/applyModules.ts";
import { GraphState, LinkKey } from "@graph-state/core";
import { FrameNode } from "@/types";
import { childrenModule } from "@/modules/childrenModule.ts";
import { sizeModule } from "@/modules/sizeModule.ts";
import { sizingModule } from "@/modules/sizingModule.ts";
import { visibleModule } from "@/modules/visibleModule.ts";
import { opacityModule } from "@/modules/opacityModule.ts";
import { overflowModule } from "@/modules/overflowModule.ts";
import { zIndexModule } from "@/modules/zIndexModule.ts";
import { solidFillModule } from "@/modules/solidFillModule.ts";
import { fillTypeModule } from "@/modules/fillTypeModule.ts";
import { cornersModule } from "@/modules/cornersModule.ts";
import { layerModule } from "@/modules/layerModule.ts";
import { paddingModule } from "@/modules/paddingModule.ts";
import { cloneModule } from "@/modules/cloneModule.ts";

export const modules = [
  positionModule,
  childrenModule,
  sizeModule,
  sizingModule,
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
];

export function createFrameNode(
  initialNode: Partial<FrameNode> = {},
  cache: GraphState
) {
  const baseNode = createBaseNode(nodes.Frame, initialNode, cache);
  const frameNode = applyModules(baseNode, modules, cache); // Применяем модули

  return frameNode;
}
