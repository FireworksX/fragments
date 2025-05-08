import { definition } from "@fragmentsx/definition";
import { useContext } from "preact/compat";
import { RenderTargetContext } from "@/providers/RenderTargetProvider";

export const useRenderTarget = () => {
  const renderTarget = useContext(RenderTargetContext);

  return {
    renderTarget,
    isCanvas: renderTarget === definition.renderTarget.canvas,
    isDocument: renderTarget === definition.renderTarget.document,
  };
};
