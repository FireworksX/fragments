import { GraphState, isLinkKey, LinkKey } from "@graph-state/core";
import { BaseNode, WithSpringSolidFill } from "@/types";
import { setValueToNode } from "@/shared/setValueToNode.ts";
import { getSpringValue } from "@/shared/getSpringValue.ts";
import { nodes } from "@fragments/plugin-fragment";

export function solidFillModule<T extends BaseNode>(
  node: T,
  cache: GraphState
): WithSpringSolidFill<T> {
  const setSolidFillLink = (link: LinkKey) => {
    const linkGraph = cache.resolve(link);
    if (linkGraph && linkGraph._type === nodes.SolidPaintStyle) {
      // cache.mutate(graphKey, {
      //   solidFill: link,
      // });
    }
  };

  const setSolidFill = (colorOrLink) => {
    if (isLinkKey(colorOrLink)) {
      setSolidFillLink(colorOrLink);
    } else {
      setValueToNode(node, "solidFill", colorOrLink, cache);
    }
  };

  return {
    ...node,
    solidFill: getSpringValue(node, "solidFill", null, cache),
    setSolidFill,
  };
}
