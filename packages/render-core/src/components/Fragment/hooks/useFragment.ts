import { useRenderTarget } from "@/shared/hooks/useRenderTarget";
import { useFragmentManager } from "@/shared/hooks/useFragmentManager";
import { definition } from "@fragmentsx/definition";
import { GraphState } from "@graph-state/core";
import { useFragmentChildren } from "@/shared/hooks/useFragmentChildren";
import { useHash } from "@/shared/hooks/useHash";
import { useStyleSheet } from "@/shared/hooks/useStyleSheet";
import { useContext } from "preact/compat";
import { FragmentContext } from "@/components/Fragment/FragmentContext";

export const useFragment = (fragmentId: string, globalManager?: GraphState) => {
  const fragmentContext = useFragmentManager(fragmentId);
  const { isDocument } = useRenderTarget(globalManager);
  const { setRef, children, isResize, primary } =
    useFragmentChildren(fragmentId);
  const hash = useHash(
    fragmentContext.fragmentLayerKey,
    fragmentContext.manager
  );

  const { addLayerStyle } = useStyleSheet(fragmentContext.manager);

  if (fragmentContext.manager) {
    addLayerStyle(
      fragmentContext.fragmentLayerKey,
      {
        width: "100%",
        height: "100%",
        "container-type": children?.length === 1 ? "normal" : "inline-size",
      },
      fragmentContext.manager?.resolve(fragmentContext.fragmentLayerKey),
      fragmentContext.manager?.key
    );
  }

  return {
    hash,
    isDocument,
    fragmentContext,
    setRef,
    children,
    isResize,
  };
};
