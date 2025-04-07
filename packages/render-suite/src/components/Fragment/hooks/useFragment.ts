import { useMemo } from "react";
import { definition } from "@fragmentsx/definition";
import { useFragmentManager } from "@/hooks/useFragmentManager";
import { useLayerChildren } from "@/hooks/useLayerChildren";
import { useRenderTarget } from "@/hooks/useRenderTarget";

export const useFragment = (fragmentId: string) => {
  const { manager } = useFragmentManager(fragmentId);
  const layerKey = `${definition.nodes.Fragment}:${fragmentId}`;
  // const [ref, fragmentRect] = useMeasure();
  const children = useLayerChildren(layerKey, manager);
  const { isDocument, renderTarget } = useRenderTarget();

  const resultChildren = useMemo(() => {
    // if (isDocument && manager) {
    //   const breakpoints = children?.map(manager.resolve);
    //   const activeBreakpoint = findBreakpoint(breakpoints, fragmentRect.width);
    //
    //   return activeBreakpoint ? [manager.keyOfEntity(activeBreakpoint)] : [];
    // }

    return children;
  }, [children, manager]);

  return {
    isDocument,
    manager,
    // ref,
    children: resultChildren,
  };
};
