import { Extender } from "@/types";
import { valueSetter } from "@/shared/valueSetter.ts";
import { isLinkKey } from "@graph-state/core";
import {
  applyObjectValues,
  interpolationObject,
  toSpringFields,
} from "@fragments/utils";

export const borderExtend: Extender = ({
  graph,
  graphKey,
  state,
  getValue,
  resolveField,
}) => {
  const originalSetBorderColor = graph.setBorderColor;
  const borderColorSetter = valueSetter(state, graphKey, "borderColor");

  const getSpringValue = (color) => {
    if (!color || isLinkKey(color)) return color;
    return toSpringFields(color);
  };

  const setBorderColor = (colorOrLink) => {
    const currentValue = resolveField("borderColor");

    if (
      !isLinkKey(colorOrLink) ||
      (isLinkKey(currentValue) && !isLinkKey(colorOrLink))
    ) {
      if (!localValue || isLinkKey(currentValue)) {
        localValue = getSpringValue(colorOrLink);
        borderColorSetter(interpolationObject(localValue));
      } else {
        applyObjectValues(localValue, colorOrLink);
      }
    } else {
      originalSetBorderColor(colorOrLink);
    }
  };

  let localValue = getSpringValue(getValue("borderColor"));

  return {
    ...graph,
    borderColor: interpolationObject(localValue),
    setBorderColor,
  };
};
