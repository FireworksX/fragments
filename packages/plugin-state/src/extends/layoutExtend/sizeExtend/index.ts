import { ExtenderPayload } from "@/types";
import { valueSetter } from "@/shared/valueSetter.ts";

const DEFAULT_WIDTH = 100;
const DEFAULT_HEIGHT = 100;

export const sizeExtend = ({
  state,
  graphKey,
  getValue,
}: ExtenderPayload<unknown>) => {
  const widthSetter = valueSetter(state, graphKey, "width");
  const heightSetter = valueSetter(state, graphKey, "height");

  const setWidth = (value: number | ((prev: number) => number)) => {
    value = typeof value === "function" ? value(getValue("width")) : value;

    if (typeof value !== "number") {
      return;
    }

    const aspectRatio = state.resolve(graphKey).aspectRatio;
    const isSynced = state.resolve(graphKey)?.isSynced();

    widthSetter(value);
    if (isSynced) {
      heightSetter(+(value * aspectRatio).toFixed(1));
    }
  };

  const setHeight = (value: number | ((prev: number) => number)) => {
    value = typeof value === "function" ? value(getValue("height")) : value;

    if (typeof value !== "number") {
      return;
    }

    const aspectRatio = state.resolve(graphKey).aspectRatio;
    const isSynced = state.resolve(graphKey)?.isSynced();

    heightSetter(value);
    if (isSynced) {
      widthSetter(+(value / aspectRatio).toFixed(1));
    }
  };

  return {
    width: getValue("width", DEFAULT_WIDTH),
    height: getValue("height", DEFAULT_HEIGHT),
    setWidth,
    setHeight,
  };
};
