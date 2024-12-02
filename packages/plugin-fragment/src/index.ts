import { GraphState, isGraph, LinkKey, Plugin } from "@graph-state/core";
import { BaseNode, FrameNode, StateEntity } from "@/types";
import { createFrameNode } from "@/creators/createFrameNode.ts";
import { createBreakpointNode } from "@/creators/createBreakpointNode.ts";
import { makeSnapshot } from "@/shared/makeSnapshot.ts";
import { applySnapshot } from "@/shared/applySnapshot.ts";
import { createNode } from "@/shared/createNode.ts";

const plugin: Plugin = (state: GraphState<StateEntity>) => {
  state.$fragment = {
    createFrameNode: (initialNode: Partial<FrameNode>) =>
      createFrameNode(initialNode, state),

    createBreakpointNode: (initialNode: Partial<unknown>) =>
      createBreakpointNode(initialNode, state),

    createNode: (initialNode: Partial<BaseNode>, appendTo?: LinkKey) =>
      createNode(initialNode, state, appendTo),

    makeSnapshot: (target: LinkKey) => makeSnapshot(state, target),
    applySnapshot: (snapshot) => applySnapshot(state, snapshot),
  };

  return state;
};

export default plugin;

export { createBaseNode } from "./creators/createBaseNode.ts";

export { deepMergeObjects } from "@/shared/deepMergeObjexts.ts";
export { getFieldValue } from "@/shared/getFieldValue.ts";
export { isFieldOverridden } from "@/shared/isFieldOverridden.ts";
export { toPercent } from "@/shared/toPercent.ts";
export { toPx } from "@/shared/toPx.ts";
export * from "./definitions.ts";

export { childrenModule } from "./modules/childrenModule.ts";
export { cloneModule } from "./modules/cloneModule.ts";
export { createBreakpointNode, createFrameNode };
