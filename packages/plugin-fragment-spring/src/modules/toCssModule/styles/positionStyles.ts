import { GraphState } from "@graph-state/core";
import {
  getFieldValue,
  nodes,
  positionType,
  renderTarget,
} from "@fragments/plugin-fragment";
import { animatableValue } from "@/shared/animatableValue.ts";
import { to } from "@react-spring/web";

export const positionStyles = (node, cache: GraphState) => {
  const renderTargetValue = cache.resolve(cache.$fragment.root)?.renderTarget;
  const graphType = node?._type;
  //

  // if (
  //   renderTargetValue === renderTarget.document &&
  //   graphType === nodes.Frame &&
  //   cache.resolve(node)?.isTopLevel()
  // )
  //   return {};
  // //
  // const positionType = getFieldValue(node, "positionType", cache) ?? "absolute";
  //
  // if (animatableValue(positionType) === "absolute") {
  //   // if (graph?._type !== nodes.Breakpoint || isCanvas) {
  //   //   const rect = graph.rect?.()
  //   //
  //   const top = getFieldValue(node, "top", cache);
  //   const left = getFieldValue(node, "left", cache);
  //
  //   return {
  //     position: positionType,
  //     left: left,
  //     top: top,
  //   };
  //   // }
  // }

  const isSkip = () =>
    renderTargetValue === renderTarget.document &&
    graphType === nodes.Frame &&
    cache.resolve(node)?.isTopLevel();

  return {
    position: to(positionType, (position) => {
      return isSkip()
        ? "static"
        : position === positionType.absolute
        ? position
        : null;
    }),

    top: to(getFieldValue(node, "top", cache), (top) =>
      isSkip() ? "initial" : top
    ),

    left: to(getFieldValue(node, "left", cache), (left) =>
      isSkip() ? "initial" : left
    ),
  };
};
