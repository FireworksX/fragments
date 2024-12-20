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
import {
  createBaseNode,
  getFieldValue,
  nodes,
  whiteSpace,
} from "@fragments/plugin-fragment";
import { cloneModule } from "@/modules/cloneModule.ts";
import { setValueToNode } from "@/shared/setValueToNode.ts";
import { getStaticValue } from "@/shared/getStaticValue.ts";
import { getSpringValue } from "@/shared/getSpringValue.ts";
import { copyModule } from "@/modules/copyModule.ts";
import { duplicateModule } from "@/modules/duplicateModule.ts";
import { isVariableLink } from "@/shared/isVariableLink.ts";
import { SpringValue, to } from "@react-spring/web";
import { getResolvedValue } from "@/shared/getResolvedValue.ts";
import { wrapTextInParagraphWithAttributes } from "@/shared/wrapTextInParagraphWithAttributes.ts";
import { attributesModule } from "@/modules/attributesModule.ts";

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
  attributesModule,
];

export function createTextNode(
  initialNode: Partial<FrameNode> = {},
  cache: GraphState
) {
  const baseNode = createBaseNode(nodes.Text, initialNode, cache);
  const textNode = applyModules(baseNode, modules, cache);
  const nodeKey = cache.keyOfEntity(textNode);

  return {
    ...textNode,
    content: getStaticValue(textNode, "content", "", cache),
    variableLink: getStaticValue(textNode, "variableLink", null, cache),
    setContent(value: string) {
      if (isVariableLink(value)) {
        cache.mutate(nodeKey, {
          variableLink: value,
        });
      } else {
        if (value.startsWith("<p")) {
          cache.mutate(nodeKey, {
            content: value,
          });
        } else {
          const styleAttributes = getFieldValue(
            nodeKey,
            "styleAttributes",
            cache
          );

          cache.mutate(nodeKey, {
            content: wrapTextInParagraphWithAttributes(value, styleAttributes),
          });
        }
      }
    },

    /**
     * Если текст находится внутри FragmentInstance и используется переменная,
     * то в customContent будет приходить значение из этой переменной
     * и эта функция будет оборачивать customContent в html со стилями.
     */
    getContent(customContent?: string | SpringValue<string>) {
      const content = customContent ?? getFieldValue(nodeKey, "content", cache);
      const styleAttributes = getFieldValue(nodeKey, "styleAttributes", cache);

      if (content instanceof SpringValue) {
        return to(content, (v) =>
          wrapTextInParagraphWithAttributes(v, styleAttributes)
        );
      }

      return content;
    },

    styleAttributes: getStaticValue(textNode, "styleAttributes", {}, cache),
    setStyleAttributes(value) {
      cache.mutate(nodeKey, {
        styleAttributes: value,
      });
    },

    whiteSpace: getSpringValue(
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
