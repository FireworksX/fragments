import { aspectRatioExtend } from "./aspectRatioExtend";
import { sizeExtend } from "./sizeExtend";
import { sizingExtend } from "./sizingExtend";
import { zIndexExtend } from "./zIndexExtend";
import { Extender } from "@/types";

export const layoutExtend: Extender = (payload) => {
  const aspectRatioProps = aspectRatioExtend(payload);
  const sizeProps = sizeExtend(payload);
  const zIndexProps = zIndexExtend(payload);
  const sizingProps = sizingExtend(payload);

  return {
    ...payload.graph,
    x: payload.getValue("x", 0),
    y: payload.getValue("y", 0),
    ...aspectRatioProps,
    ...sizeProps,
    ...zIndexProps,
    ...sizingProps,
    rotation: payload.getValue("rotation", 0),

    rotate(deg: number) {
      if (typeof deg !== "number") {
        return;
      }

      payload.state.mutate(payload.graphKey, {
        rotation: deg,
      });
    },
    move(x: number, y: number) {
      if (typeof x !== "number" || typeof y !== "number") {
        return;
      }

      payload.state.mutate(payload.graphKey, {
        x,
        y,
      });
    },
  };
};
