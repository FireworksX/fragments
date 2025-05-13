import { createContext } from "preact/compat";
import { definition } from "@fragmentsx/definition";

export const RenderTargetContext = createContext(
  definition.renderTarget.document
);

export const RenderTargetProvider = RenderTargetContext.Provider;
