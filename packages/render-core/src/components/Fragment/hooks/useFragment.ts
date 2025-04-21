import { useRenderTarget } from "@/shared/hooks/useRenderTarget";
import { useFragmentManager } from "@/shared/hooks/useFragmentManager";
import { definition } from "@fragmentsx/definition";
import { GraphState } from "@graph-state/core";
import { useFragmentChildren } from "@/shared/hooks/useFragmentChildren";

export const useFragment = (fragmentId: string, globalManager?: GraphState) => {
  const { manager } = useFragmentManager(fragmentId, globalManager);
  const { isDocument } = useRenderTarget(globalManager);
  const { setRef, children, primary } = useFragmentChildren(fragmentId);

  return {
    isDocument,
    manager,
    setRef,
    children: primary ? [primary] : [],
  };
};
