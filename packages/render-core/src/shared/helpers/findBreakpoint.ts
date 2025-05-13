export const findBreakpoint = (
  breakpoints: { width: number }[] = [],
  width: number
) => {
  if (!breakpoints?.length) return null;

  const sortBreakpoints = breakpoints.toSorted((a, b) => a?.width - b?.width);

  return sortBreakpoints.reduce((prev, curr) =>
    width >= curr.width ? curr : prev
  );
};
