import { Extender, RenderTarget } from "@/types";
import { renderMode, renderTarget } from "@/definitions.ts";
import { fragmentSizeExtend } from "./fragmentSizeExtend.ts";
import { fragmentAssetsExtend } from "./fragmentAssetsExtend.ts";
import { fragmentPropertiesExtend } from "./fragmentPropertiesExtend.ts";
import { fragmentGrowingExtend } from "./fragmentGrowingExtend.ts";

export const fragmentExtend: Extender = (payload) => {
  const widthSize = fragmentSizeExtend(payload);
  const withAssets = fragmentAssetsExtend(payload);
  const withProps = fragmentPropertiesExtend(payload);
  const withGrowing = fragmentGrowingExtend(payload);

  return {
    ...payload.graph,
    ...widthSize,
    ...withAssets,
    ...withProps,
    ...withGrowing,
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
