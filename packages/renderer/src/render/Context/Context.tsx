import { createContext } from "preact/compat";
import { GraphState } from "@graph-state/core";

export const RendererContext = createContext({
  globalContext: null as any as GraphState,
  context: null as any as GraphState,
});
