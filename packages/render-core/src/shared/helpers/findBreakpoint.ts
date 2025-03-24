export const findBreakpoint = (
  breakpoints: { threshold: number }[] = [],
  width: number
) => {
  if (!breakpoints?.length) return null;

  const sortBreakpoints = breakpoints.toSorted(
    (a, b) => a.threshold - b.threshold
  );

  return sortBreakpoints.reduce((prev, curr) =>
    width >= curr.threshold ? curr : prev
  );
};
