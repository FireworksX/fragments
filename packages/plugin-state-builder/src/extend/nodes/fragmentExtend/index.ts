import { Extender } from "@/types";
import { fragmentSizeExtend } from "@/extend/nodes/fragmentExtend/fragmentSizeExtend.ts";
import { fragmentCurrentBreakpoint } from "@/extend/nodes/fragmentExtend/fragmentCurrentBreakpoint.ts";

export const fragmentExtend: Extender = (payload) => {
  const withSizing = fragmentSizeExtend(payload);
  const withCurrentBreakpoint = fragmentCurrentBreakpoint(payload, withSizing);

  return {
    ...payload.graph,
    ...withSizing,
    ...withCurrentBreakpoint,
  };
};
