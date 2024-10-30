import { Extender } from "@/types";
import { sizingFrameExtend } from "@/extends/nodes/frameExtend/sizingFrameExtend.ts";

export const frameExtend: Extender = (payload) => {
  const sizing = sizingFrameExtend(payload);

  return {
    ...payload.graph,
    ...sizing,
  };
};
