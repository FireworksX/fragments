import { useGlobalManager } from "@/hooks/useGlobalManager";
import { useGraph } from "@graph-state/react";
import { definition } from "@fragmentsx/definition";

export const useRenderTarget = () => {
  const { globalManagerGraph, setRenderTarget } = useGlobalManager();
  // console.log("useRenderTarget");

  const renderTargetValue =
    globalManagerGraph?.renderTarget ?? definition.renderTarget.canvas;

  // Subscribe to root fragment
  // useGraph(documentManager, documentManager.$fragment.root);

  return {
    renderTarget: renderTargetValue,
    isCanvas: renderTargetValue === definition.renderTarget.canvas,
    isDocument: renderTargetValue === definition.renderTarget.document,
    setRenderTarget,
  };
};
