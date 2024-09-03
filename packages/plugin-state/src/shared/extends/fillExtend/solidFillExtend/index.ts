import { isLinkKey, LinkKey } from "@graph-state/core";
import { Extender } from "@/types";
import { SolidPaint } from "@/types/props.ts";
import { nodes } from "@/defenitions.ts";
import { valueSetter } from "@/shared/valueSetter.ts";

export const getDefaultFillColor = ({ r, g, b, a } = {}): SolidPaint => ({
  r: r ?? 86,
  g: g ?? 196,
  b: b ?? 187,
  a: a ?? 1,
});

export const solidFillExtend: Extender = ({
  graph,
  graphKey,
  state,
  getValue,
}) => {
  const setSolidFillLink = (link: LinkKey) => {
    const linkGraph = state.resolve(link);
    if (linkGraph && linkGraph._type === nodes.SolidPaintStyle) {
      state.mutate(state.keyOfEntity(graph), {
        solidFill: link,
      });
    }
  };

  const setSolidFill = (colorOrLink) => {
    if (isLinkKey(colorOrLink)) {
      setSolidFillLink(colorOrLink);
    } else {
      valueSetter(state, graphKey, "solidFill")(colorOrLink);
      // const solidFill = state.resolve(graph).solidFill;
      // const linkGraph = state.safeResolve(colorOrLink);
      //
      // if (solidFill && linkGraph) {
      //   Object.entries(colorOrLink).forEach(([key, value]) => {
      //     if (key in solidFill) {
      //       solidFill[key].set(value);
      //     }
      //   });
      // } else {
      //   state.mutate(state.keyOfEntity(graph), {
      //     solidFill: getDefaultFillColor(colorOrLink),
      //   });
      // }
    }
  };

  return {
    solidFill: getValue("solidFill", getDefaultFillColor()),
    setSolidFill,
  };
};
