import { GraphState, isGraph, LinkKey, Plugin } from "@graph-state/core";
import { BaseNode, FrameNode, StateEntity } from "@/types";
import { createFrameNode } from "@/creators/createFrameNode.ts";
import { makeSnapshot } from "@/shared/makeSnapshot.ts";
import { applySnapshot } from "@/shared/applySnapshot.ts";
import { createNode } from "@/shared/createNode.ts";
import { createBreakpointNode } from "@/creators/createBreakpointNode.ts";
import { createTextNode } from "@/creators/createTextNode.ts";
import { toJsonNode } from "@/shared/toJsonNode.ts";
import { createImageNode } from "@/creators/createImageNode.ts";

const plugin: (root: LinkKey) => Plugin =
  (root: LinkKey) => (state: GraphState<StateEntity>) => {
    state.$fragment = {
      findPrimaryLayer: () =>
        state.resolve(
          (state.resolve(root)?.children ?? []).find((child) =>
            state.resolve(child).isRootLayer?.()
          )
        ),

      createFrameNode: (initialNode: Partial<FrameNode>) =>
        createFrameNode(initialNode, state),

      createBreakpointNode: (initialNode: Partial<FrameNode>) =>
        createBreakpointNode(initialNode, state),

      createTextNode: (initialNode: Partial<FrameNode>) =>
        createTextNode(initialNode, state),

      createImageNode: (initialNode: Partial<FrameNode>) =>
        createImageNode(initialNode, state),

      createNode: (initialNode: Partial<BaseNode>, appendTo?: LinkKey = root) =>
        createNode(initialNode, state, appendTo),

      makeSnapshot: (target?: LinkKey = root) => makeSnapshot(state, target),
      applySnapshot: (snapshot) => applySnapshot(state, snapshot),

      root,
    };

    return state;
  };

export default plugin;

export { skips } from "./skips.ts";
export { resetFieldOverride } from "@/shared/resetFieldOverride.ts";
export { isOverriddenNode } from "@/shared/isOverriddenNode.ts";
export { moveNode } from "@/shared/moveNode.ts";
export { createNode } from "@/shared/createNode.ts";
export { getResolvedValue } from "@/shared/getResolvedValue.ts";
export * from "@/shared/cssSpacingParser.ts";
// export { toJsonNode } from "@/shared/toJsonNode.ts";

export {
  nodes,
  variableType,
  renderTarget,
  renderMode,
  layerMode,
  layerAlign,
  layerDirection,
  layerDistribute,
  whiteSpace,
  overflow,
  sizing,
  paintMode,
  borderType,
  fragmentGrowingMode,
  textDecorations,
  textTransform,
  positionType,
  imagePaintScaleModes,
  variableTransforms,
} from "@fragments/plugin-fragment";
