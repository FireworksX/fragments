import { useGlobalManager } from "@/hooks/useGlobalManager";
import { useGraph } from "@graph-state/react";
import { definition } from "@fragments/definition";

export const useRenderTarget = () => {
  const globalManager = useGlobalManager();
  const [globalManagerGraph] = useGraph(globalManager, globalManager?.key);

  const renderTargetValue =
    globalManagerGraph?.renderTarget ?? definition.renderTarget.canvas;

  // Subscribe to root fragment
  // useGraph(documentManager, documentManager.$fragment.root);

  return {
    renderTarget: renderTargetValue,
    isCanvas: renderTargetValue === definition.renderTarget.canvas,
    isDocument: renderTargetValue === definition.renderTarget.document,
    setRenderTarget: (target) => {
      globalManager?.setRenderTarget(target);
    },
  };
};
