import { GraphState, LinkKey } from "@graph-state/core";
import { definition } from "@fragmentsx/definition";
import { LayerResolver, LayerStyles } from "../fragment";

export interface FragmentGroup {
  fragmentLayerKey: LinkKey;
  fragment: any;
  primary: any;
  smaller: any[];
  larger: any[];
}

export const findGroups = (
  styles: LayerStyles,
  layerResolver: LayerResolver
): FragmentGroup[] => {
  const fragments = Object.keys(styles).filter((key: string) =>
    key?.includes(definition.nodes.Fragment)
  );

  // fragments;

  const createFragmentSlice = (fragmentLayerKey: string): FragmentGroup => {
    const rootLayer = layerResolver(fragmentLayerKey);
    const breakpoints = (rootLayer?.children ?? []).map((child: string) =>
      layerResolver(child)
    );

    const primaryBreakpoint = breakpoints.find(
      (breakpoint: any) => breakpoint?.isPrimary
    );

    const smaller = breakpoints
      .filter((f: any) => !!f && f?.width < primaryBreakpoint?.width)
      .sort((a: any, b: any) => b.width - a.width);

    const larger = breakpoints
      .filter((f: any) => !!f && f?.width > primaryBreakpoint?.width)
      .sort((a: any, b: any) => a.width - b.width);

    return {
      fragmentLayerKey,
      fragment: rootLayer,
      primary: `${primaryBreakpoint._type}:${primaryBreakpoint?._id}`,
      smaller: smaller ?? [],
      larger: larger ?? [],
    };
  };

  return fragments.map(createFragmentSlice).filter((slice) => slice.primary);
};
