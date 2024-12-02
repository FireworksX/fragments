import { isLinkKey, LinkKey } from "@graph-state/core";
import { Extender } from "@/types";
import { nodes } from "@/definitions.ts";
import { valueSetter } from "@/shared/valueSetter.ts";

export const solidFillExtend: Extender = ({
  graph,
  graphKey,
  state,
  getValue,
}) => {
  const setSolidFillLink = (link: LinkKey) => {
    const linkGraph = state.resolve(link);
    if (linkGraph && linkGraph._type === nodes.SolidPaintStyle) {
      state.mutate(graphKey, {
        solidFill: link,
      });
    }
  };

  const setSolidFill = (colorOrLink) => {
    if (isLinkKey(colorOrLink)) {
      setSolidFillLink(colorOrLink);
    } else {
      valueSetter(state, graphKey, "solidFill")(colorOrLink);
    }
  };

  return {
    solidFill: getValue("solidFill"),
    setSolidFill,
  };
};
