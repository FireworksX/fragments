import { GraphState, LinkKey } from "@graph-state/core";
import { definition } from "@fragmentsx/definition";

export const findGroups = (state: GraphState) => {
  const cache = state.$styleSheet?.cache;
  const fragments =
    Array.from(cache.keys()).filter((key) =>
      key?.includes(definition.nodes.Fragment)
    ) ?? [];

  // fragments;

  const createFragmentSlice = (fragmentLayerKey: LinkKey) => {
    const rootLayer = cache.get(fragmentLayerKey)?.layer;
    const breakpoints = (rootLayer?.children ?? []).map(
      (child) => cache.get(child)?.layer
    );

    const primaryBreakpoint = breakpoints.find(
      (breakpoint) => breakpoint?.isPrimary
    );

    const smaller = breakpoints
      .filter((f) => !!f && f?.width < primaryBreakpoint?.width)
      .sort((a, b) => b.width - a.width);

    const larger = breakpoints
      .filter((f) => !!f && f?.width > primaryBreakpoint?.width)
      .sort((a, b) => a.width - b.width);

    return {
      fragment: rootLayer,
      primary: primaryBreakpoint,
      smaller: smaller ?? [],
      larger: larger ?? [],
    };
  };

  return fragments.map(createFragmentSlice).filter((slice) => slice.primary);
};
