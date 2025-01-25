import { GraphState, isGraph, LinkKey, Plugin } from "@graph-state/core";
import { renderTarget } from "@fragments/plugin-fragment";
import { BaseNode, FrameNode, StateEntity } from "@/types";
import { createFrameNode } from "@/creators/createFrameNode.ts";
import { makeSnapshot } from "@/shared/makeSnapshot.ts";
import { applySnapshot } from "@/shared/applySnapshot.ts";
import { createNode } from "@/shared/createNode.ts";
import { createBreakpointNode } from "@/creators/createBreakpointNode.ts";
import { createTextNode } from "@/creators/createTextNode.ts";
import { createImageNode } from "@/creators/createImageNode.ts";
import { createFragmentInstanceNode } from "@/creators/createFragmentInstanceNode.ts";
import { linkFragment } from "@/shared/linkFragment.ts";

const plugin: (root: LinkKey) => Plugin =
  (root: LinkKey) => (state: GraphState<StateEntity>) => {
    const updateGraph = {
      _type: "Updater",
      _id: "root",
      updateCount: 0,
    };

    const orig = state.resolve;

    state.resolve = (...args) => {
      console.log(args);

      return orig(...args);
    };

    state.$fragment = {
      renderTarget: renderTarget.canvas,
      updateGraphKey: state.keyOfEntity(updateGraph),
      setRenderTarget: (renderTarget) => {
        state.$fragment.renderTarget = renderTarget;
        state.mutate(root, (prev) => ({
          updateIndex: (prev?.updateIndex ?? 0) + 1,
        }));
      },

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

      createFragmentInstanceNode: (initialNode: Partial<FrameNode>) =>
        createFragmentInstanceNode(initialNode, state),

      createNode: (initialNode: Partial<BaseNode>, appendTo?: LinkKey = root) =>
        createNode(initialNode, state, appendTo),

      makeSnapshot: (target?: LinkKey = root) => makeSnapshot(state, target),
      applySnapshot: (snapshot) => applySnapshot(state, snapshot),
      linkFragments: (fragments: GraphState[] = []) =>
        linkFragment(state, fragments),

      update: () => {
        state.mutate(state.keyOfEntity(updateGraph), (prev) => ({
          updateCount: prev.updateCount + 1,
        }));
      },

      root,
    };

    state.mutate(state.key, {
      updater: updateGraph,
    });

    return state;
  };

export default plugin;

export { skips } from "./skips.ts";
export { resetFieldOverride } from "@/shared/resetFieldOverride.ts";
export { isOverriddenNode } from "@/shared/isOverriddenNode.ts";
export { moveNode } from "@/shared/moveNode.ts";
export { createNode } from "@/shared/createNode.ts";
export { getResolvedValue } from "@/shared/getResolvedValue.ts";
export { restoreField } from "@/shared/restoreField.ts";
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
