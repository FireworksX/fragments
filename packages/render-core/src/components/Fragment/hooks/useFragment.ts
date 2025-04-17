import { useMemo } from "preact/compat";
import useMeasure from "react-use-measure";
import { useLayerChildren } from "@/shared/hooks/useLayerChildren";
import { useRenderTarget } from "@/shared/hooks/useRenderTarget";
import { findBreakpoint } from "@/shared/helpers/findBreakpoint";
import { useFragmentManager } from "@/shared/hooks/useFragmentManager";
import { definition } from "@fragmentsx/definition";
import { GraphState } from "@graph-state/core";
import { index } from "@/shared/hooks/useLayerStyles";
import { useFragmentChildren } from "@/shared/hooks/useFragmentChildren";

export const useFragment = (fragmentId: string, globalManager?: GraphState) => {
  const { manager } = useFragmentManager(fragmentId, globalManager);
  const layerKey = `${definition.nodes.Fragment}:${fragmentId}`;
  const { isDocument } = useRenderTarget(globalManager);
  const { setRef, children } = useFragmentChildren(fragmentId);

  return {
    isDocument,
    manager,
    setRef,
    children,
  };
};
