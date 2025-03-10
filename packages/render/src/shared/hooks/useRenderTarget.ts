import { getRenderTarget, setRenderTarget } from "@/lib/renderTarget";
import { GraphState } from "@graph-state/core";
import { renderTarget } from "@/definitions";

export const useRenderTarget = (manager: GraphState) => {
  const renderTargetValue = getRenderTarget() ?? renderTarget.canvas;

  // Subscribe to root fragment
  // useGraph(documentManager, documentManager.$fragment.root);

  return {
    renderTarget: renderTargetValue,
    isCanvas: renderTargetValue === renderTarget.canvas,
    isDocument: renderTargetValue === renderTarget.document,
    setRenderTarget: (target) => {
      setRenderTarget(target);
      manager.mutate(manager.key);
    },
  };
};
