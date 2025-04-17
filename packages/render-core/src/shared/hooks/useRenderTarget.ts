import { GraphState } from "@graph-state/core";
import { definition } from "@fragmentsx/definition";
import { useGlobalManager } from "@/shared/hooks/useGlobalManager";

export const useRenderTarget = () => {
  const { globalManagerGraph, manager, setRenderTarget } = useGlobalManager();

  const renderTargetValue =
    globalManagerGraph?.renderTarget ?? definition.renderTarget.document;

  // Subscribe to root fragment
  // useGraph(documentManager, documentManager.$fragment.root);

  return {
    renderTarget: renderTargetValue,
    isCanvas: renderTargetValue === definition.renderTarget.canvas,
    isDocument: renderTargetValue === definition.renderTarget.document,
    setRenderTarget: (target) => {
      setRenderTarget(target);
    },
  };
};
