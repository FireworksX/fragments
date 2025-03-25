import { renderTarget } from "@fragments/plugin-fragment";

let GLOBAL_ENV = {
  renderTarget: renderTarget.canvas,
};

export const getRenderTarget = () => GLOBAL_ENV.renderTarget;

export const setRenderTarget = (renderTarget) => {
  GLOBAL_ENV = { ...GLOBAL_ENV, renderTarget };
};
