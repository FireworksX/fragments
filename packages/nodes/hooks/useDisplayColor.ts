import { Color } from "react-color";
import { useContext } from "preact/compat";
import { useCallback } from "react";
import { GraphStateContext } from "../src/GraphStateProvider.tsx";
import { builderNodes } from "@fragments/fragments-plugin";
import { displayColor } from "../helpers/displayColor.ts";

export const useDisplayColor = (inputColor?: Color) => {
  const { graphState } = useContext(GraphStateContext);

  const getColor = useCallback(
    (color?: Color) => {
      const resolveValue = graphState?.resolve(color);
      const variableValue =
        resolveValue &&
        resolveValue?._type === builderNodes.SolidPaintStyle &&
        resolveValue?.color;

      return displayColor(variableValue || color);
    },
    [graphState]
  );

  const getNameColor = useCallback(
    (color?: Color) => {
      const resolveValue = graphState?.resolve(color);
      const variableValue =
        resolveValue && resolveValue?._type === builderNodes.SolidPaintStyle;

      return variableValue ? resolveValue?.name : displayColor(color);
    },
    [graphState]
  );

  return {
    getColor,
    getNameColor,
    color: getColor(inputColor),
  };
};
