import { GraphState, isLinkKey, LinkKey } from "@graph-state/core";
import { nodes } from "@/definitions.ts";
import { BaseNode, WithSpringSolidFill } from "@/types";
import { setValueToNode } from "@/shared/setValueToNode.ts";
import { getStableValue } from "@/shared/getStableValue.ts";
import { getRandomColor } from "@/shared/random.ts";

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
    solidFill: getStableValue(node, "solidFill", null, cache),
    setSolidFill,
  };
}
