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
  const layerKey = `${definition.nodes.Fragment}:${fragmentId}`;
  const { manager } = useContext(FragmentContext);
  const { isDocument } = useRenderTarget(globalManager);
  const { setRef, children, isResize, primary } =
    useFragmentChildren(fragmentId);
  const hash = useHash(layerKey);

  const { addLayerStyle } = useStyleSheet();

  if (manager) {
    addLayerStyle(
      layerKey,
      {
        width: "100%",
        height: "100%",
        "container-type": children?.length === 1 ? "normal" : "inline-size",
      },
      manager?.resolve(layerKey),
      manager?.key
    );
  }

  return {
    hash,
    isDocument,
    manager,
    setRef,
    children,
    isResize,
  };
};
