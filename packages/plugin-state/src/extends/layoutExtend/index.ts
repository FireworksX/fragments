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
  };
};
