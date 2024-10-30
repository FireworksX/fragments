import { Extender } from "@/types";
import { Color } from "@/types/props";
import {
  applyObjectValues,
  interpolationObject,
  toSpringFields,
} from "@fragments/utils";

const DEFAULT_COLOR = { r: 0, g: 0, b: 0, a: 1 };

export const solidPaintStyleExtend: Extender = ({
  graph,
  state,
  graphKey,
  getValue,
}) => {
  const toAnimateValues = toSpringFields(getValue("color") ?? DEFAULT_COLOR);

  return {
    ...graph,
    color: interpolationObject(toAnimateValues),
    rename(name: string) {
      state.mutate(graphKey, { name });
    },
    update(color: Color) {
      applyObjectValues(toAnimateValues, color);
    },
  };
};
