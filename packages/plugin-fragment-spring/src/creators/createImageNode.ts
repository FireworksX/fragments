import { imagePaintScaleModes, nodes } from "@/definitions.ts";
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
import { getStaticValue } from "@/shared/getStaticValue.ts";
import { setValueToNode } from "@/shared/setValueToNode.ts";
import { attributesModule } from "@/modules/attributesModule.ts";

export const modules = [
  positionModule,
  toCssModule,
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

export function createImageNode(
  initialNode: Partial<FrameNode> = {},
  cache: GraphState
) {
  const baseNode = createBaseNode(nodes.Image, initialNode, cache);
  const imageNode = applyModules(baseNode, modules, cache);

  return {
    ...imageNode,
    src: getStaticValue(baseNode, "src", null),
    alt: getStaticValue(baseNode, "alt", null),
    objectFit: getStaticValue(baseNode, "objectFit", imagePaintScaleModes.Fit),

    setSrc(value) {
      setValueToNode(baseNode, "src", value, cache, { staticValue: true });
    },
  };
}
