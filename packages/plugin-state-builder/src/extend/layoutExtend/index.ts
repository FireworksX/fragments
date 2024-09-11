import { sizeExtend } from "./sizeExtend";
import { Extender } from "@/types";

export const layoutExtend: Extender = (payload) => {
  const sizeProps = sizeExtend(payload);

  return {
    ...payload.graph,
    ...sizeProps,
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
