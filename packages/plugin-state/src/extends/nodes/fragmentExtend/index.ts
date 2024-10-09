import { Extender, RenderTarget } from "@/types";
import { Entity } from "@graph-state/core";
import { renderMode, renderTarget } from "@/definitions.ts";
import { fragmentSizeExtend } from "@/extends/nodes/fragmentExtend/fragmentSizeExtend.ts";

export const fragmentExtend: Extender = (payload) => {
  const widthSize = fragmentSizeExtend(payload);

  return {
    ...payload.graph,
    ...widthSize,
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
    props: payload.getValue("props", []),
    addProp: (variable) => {
      payload.state.mutate(payload.graphKey, {
        props: [variable],
      });
    },
    removeProp: (prop: Entity) => {
      payload.state.invalidate(prop);
    },
  };
};
