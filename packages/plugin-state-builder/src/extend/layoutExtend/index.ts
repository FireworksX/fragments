import { sizeExtend } from "./sizeExtend";
import { Extender } from "@/types";
import { sizingExtend } from "./sizingExtend";

export const layoutExtend: Extender = (payload) => {
  const sizeProps = sizeExtend(payload);
  const sizingProps = sizingExtend(payload);

  return {
    ...payload.graph,
    ...sizeProps,
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
