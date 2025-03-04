import useMeasure from "react-use-measure";
import { useLayerChildren } from "@/shared/hooks/useLayerChildren.ts";
import { useMemo } from "react";
import { useRenderTarget } from "@/shared/hooks/useRenderTarget.ts";
import { findBreakpoint } from "@/shared/helpers/findBreakpoint.ts";
import { useFragmentManager } from "@/shared/hooks/useFragmentManager.ts";
import { nodes } from "@fragments/plugin-fragment";

export const useFragment = (fragmentId: string) => {
  const manager = useFragmentManager(fragmentId);

  const layerKey = `${nodes.Fragment}:${fragmentId}`;
  const [ref, fragmentRect] = useMeasure();
  const children = useLayerChildren(layerKey, manager);
  const { isDocument } = useRenderTarget(manager);

  const resultChildren = useMemo(() => {
    if (isDocument) {
      const breakpoints = children?.map(manager.resolve);
      const activeBreakpoint = findBreakpoint(breakpoints, fragmentRect.width);

      return [manager.keyOfEntity(activeBreakpoint)];
    }

    return children;
  }, [children, manager, fragmentRect.width]);

  return {
    manager,
    ref,
    children: resultChildren,
  };
};
