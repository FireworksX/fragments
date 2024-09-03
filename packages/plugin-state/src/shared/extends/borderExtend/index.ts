import { LinkKey } from "@graph-state/core";
import { Extender } from "@/types";
import { valueSetter } from "@/shared/valueSetter.ts";
import { Border } from "@/types/props.ts";
import { borderType } from "@/defenitions.ts";

export const getDefaultBorder = (): Border => ({
  type: borderType.Solid,
  width: 1,
  color: {
    r: 13,
    g: 196,
    b: 45,
  },
});

const getDefaultBorderColor = (color: Color = {}) => ({
  r: color.r ?? 13,
  g: color.g ?? 196,
  b: color.b ?? 45,
  a: color.a ?? 1,
});

export const borderExtend: Extender = ({
  graph,
  graphKey,
  state,
  getValue,
}) => {
  const borderTypeSetter = valueSetter(state, graphKey, "borderType");
  const borderWidthSetter = valueSetter(state, graphKey, "borderWidth");
  const borderColorSetter = valueSetter(state, graphKey, "borderColor");

  return {
    ...graph,
    borderType: getValue("borderType", borderType.None),
    borderWidth: getValue("borderWidth", 1),
    borderColor: getValue("borderColor", getDefaultBorderColor()),

    setBorderType: borderTypeSetter,
    setBorderWidth: borderWidthSetter,
    setBorderColor: borderColorSetter,
    //   const linkGraph = state.resolve(colorOrLink);
    //
    //   if (isLinkKey(colorOrLink)) {
    //     if (linkGraph && linkGraph._type === nodes.SolidPaintStyle) {
    //       state.mutate(graphKey, {
    //         borderColor: colorOrLink,
    //       });
    //     }
    //   } else {
    //     const currentBorderColor = state.resolve(graphKey).borderColor;
    //     if (isObject(currentBorderColor) && colorOrLink && !linkGraph) {
    //       if (isObject(colorOrLink)) {
    //         Object.entries(colorOrLink).forEach(([key, value]) => {
    //           if (key in currentBorderColor) {
    //             borderColorSetter
    //             currentBorderColor[key].set(value);
    //           }
    //         });
    //       }
    //     } else {
    //       state.mutate(graphKey, {
    //         borderColor: getDefaultBorderColor(colorOrLink),
    //       });
    //     }
    //   }
    // },
  };
};
