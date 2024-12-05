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
import { createBaseNode, nodes, whiteSpace } from "@fragments/plugin-fragment";
import { cloneModule } from "@/modules/cloneModule.ts";
import { setValueToNode } from "@/shared/setValueToNode.ts";
import { getStaticValue } from "@/shared/getStaticValue.ts";
import { getStableValue } from "@/shared/getStableValue.ts";
import { copyModule } from "@/modules/copyModule.ts";
import { duplicateModule } from "@/modules/duplicateModule.ts";

export const modules = [
  positionModule,
  toCssModule,
  sizeModule,
  sizingModule,
  aspectRatioModule,
  visibleModule,
  opacityModule,
  overflowModule,
  zIndexModule,
  cloneModule,
  copyModule,
  duplicateModule,
];

export function createTextNode(
  initialNode: Partial<FrameNode> = {},
  cache: GraphState
) {
  const baseNode = createBaseNode(nodes.Text, initialNode, cache);
  const textNode = applyModules(baseNode, modules, cache);

  return {
    ...textNode,
    content: getStaticValue(textNode, "content", "", cache),
    setContent(value: string) {
      cache.mutate(cache.keyOfEntity(textNode), {
        content: value,
      });
    },

    whiteSpace: getStableValue(
      textNode,
      "whiteSpace",
      whiteSpace.normal,
      cache
    ),
    setWhiteSpace(value: keyof typeof whiteSpace) {
      setValueToNode(textNode, "whiteSpace", value, cache);
    },
  };
}
