import { Extender } from "@/types";
import { animatableValue } from "@/shared/animatableValue.ts";

interface SizingFragmentExtend {
  setWidth: (value: number) => unknown;
}

export const fragmentCurrentBreakpoint: Extender = (
  { graph, state, graphKey, getValue, resolveField },
  { setWidth }: SizingFragmentExtend
) => {
  const computeCurrentBreakpoint = (width: number) => {
    const breakpoints = (state.resolve(graphKey)?.children ?? []).map(
      state.resolve
    );

    const breakpointWithRects = breakpoints?.map((breakpoint) => ({
      breakpoint,
      threshold: animatableValue(breakpoint.minWidth),
    }));

    const sortedBreakpoints = breakpointWithRects.toSorted(
      (a, b) => b.threshold - a.threshold
    );

    const resultBreakpoint =
      sortedBreakpoints.find(({ threshold }) => threshold <= width) ??
      sortedBreakpoints.at(-1);

    return state.keyOfEntity(resultBreakpoint?.breakpoint);
  };

  return {
    ...graph,
    currentBreakpoint: computeCurrentBreakpoint(resolveField("width")),
    setWidth: (value: number) => {
      setWidth(value);

      const aa = computeCurrentBreakpoint(value);

      state.mutate(graphKey, {
        currentBreakpoint: aa,
      });
    },
  };
};
