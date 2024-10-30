import { solidFillExtend } from "./solidFillExtend";
import { Extender } from "@/types";

export const fillExtend: Extender = (payload) => {
  const solidFill = solidFillExtend(payload);

  return {
    ...payload.graph,
    ...solidFill,
  };
};
