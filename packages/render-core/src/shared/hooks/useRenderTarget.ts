import { renderTarget as defRenderTarget } from "@fragments/plugin-fragment";
import { getRenderTarget, setRenderTarget } from "@/lib/renderTarget.ts";
import { GraphState } from "@graph-state/core";

export const useRenderTarget = (manager: GraphState) => {
  const renderTarget = getRenderTarget() ?? defRenderTarget.canvas;

  // Subscribe to root fragment
  // useGraph(documentManager, documentManager.$fragment.root);

  return {
    renderTarget: renderTarget,
    isCanvas: renderTarget === defRenderTarget.canvas,
    isDocument: renderTarget === defRenderTarget.document,
    setRenderTarget: (target) => {
      setRenderTarget(target);
      manager.mutate(manager.key);
    },
  };
};
