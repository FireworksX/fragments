import { Extender, RenderTarget } from "@/types";
import { renderMode, renderTarget } from "@/definitions.ts";
import { fragmentSizeExtend } from "@/extends/nodes/fragmentExtend/fragmentSizeExtend.ts";
import { fragmentAssetsExtend } from "@/extends/nodes/fragmentExtend/fragmentAssetsExtend.ts";
import { fragmentPropertiesExtend } from "@/extends/nodes/fragmentExtend/fragmentPropertiesExtend.ts";

export const fragmentExtend: Extender = (payload) => {
  const widthSize = fragmentSizeExtend(payload);
  const withAssets = fragmentAssetsExtend(payload);
  const withProps = fragmentPropertiesExtend(payload);

  return {
    ...payload.graph,
    ...widthSize,
    ...withAssets,
    ...withProps,
    renderTarget: renderTarget.document,
    setRenderTarget: (renderTarget: RenderTarget) => {
      payload.state.mutate(payload.graphKey, {
        renderTarget,
      });
    },
    renderMode: renderMode.parent,
    setRenderMode: (renderMode: keyof typeof renderMode.parent) => {
      payload.state.mutate(payload.graphKey, {
        renderMode,
      });
    },
  };
};
