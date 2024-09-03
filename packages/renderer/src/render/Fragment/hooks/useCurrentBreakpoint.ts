import { useContext, useMemo } from "preact/compat";
import useMeasure from "react-use-measure";
import { useGraphFields, useGraphStack } from "@graph-state/react";
import { RendererContext } from "../../Context/Context.tsx";

export const useCurrentBreakpoint = () => {
  const { context } = useContext(RendererContext);
  const breakpoints = useGraphFields(context, "Breakpoint");
  const [containerRef, containerRect] = useMeasure();
  const breakpointValues: any = useGraphStack(context, breakpoints);

  const currentBreakpoint = useMemo(() => {
    const sortedBreakpoints = breakpointValues.toSorted((a: any, b: any) => {
      return b.width - a.width;
    });

    return (
      sortedBreakpoints.find(
        (breakpoint: any) => breakpoint.width <= containerRect.width
      ) ?? sortedBreakpoints.at(-1)
    );
  }, [containerRect.width, breakpointValues]);

  return {
    containerRef,
    currentBreakpoint,
    currentBreakpointLink: context.keyOfEntity(currentBreakpoint),
  };
};
