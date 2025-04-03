import { useMemo } from "preact/compat";
import useMeasure from "react-use-measure";
import { useLayerChildren } from "@/shared/hooks/useLayerChildren";
import { useRenderTarget } from "@/shared/hooks/useRenderTarget";
import { findBreakpoint } from "@/shared/helpers/findBreakpoint";
import { useFragmentManager } from "@/shared/hooks/useFragmentManager";
import { nodes } from "@/definitions";
import { GraphState } from "@graph-state/core";
import { useLayerStyles } from "@/shared/hooks/useLayerStyles/useLayerStyles";

export const useFragment = (fragmentId: string, globalManager?: GraphState) => {
  const { manager } = useFragmentManager(fragmentId, globalManager);
  const layerKey = `${nodes.Fragment}:${fragmentId}`;
  const [ref, fragmentRect] = useMeasure();
  const children = useLayerChildren(layerKey, manager);
  const { isDocument, renderTarget } = useRenderTarget(globalManager);

  const resultChildren = useMemo(() => {
    if (isDocument && manager) {
      const breakpoints = children?.map(manager.resolve);
      const activeBreakpoint = findBreakpoint(breakpoints, fragmentRect.width);

      return activeBreakpoint ? [manager.keyOfEntity(activeBreakpoint)] : [];
    }

    return children;
  }, [children, manager, fragmentRect.width]);

  return {
    isDocument,
    manager,
    ref,
    children: resultChildren,
  };
};
