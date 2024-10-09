import {
  finiteNumber,
  isFiniteNumber,
  isValue,
  valueToDimensionType,
} from "@fragments/utils";
import { Graph, GraphState } from "@graph-state/core";
import { positionType } from "@/definitions.ts";
import { animatableValue } from "@/shared/animatableValue.ts";
import { getDOMOffset } from "@/shared/getDOMOffset.ts";

export const fromProperties = (state: GraphState, graph: Graph) => {
  graph = state.resolve(graph);

  const positionTypeField = animatableValue(graph.resolveField("positionType"));
  const isRelative = positionTypeField === positionType.relative;
  const width = animatableValue(graph.resolveField("width"));
  const widthType = animatableValue(
    graph.resolveField("layoutSizingHorizontal")
  );
  const height = animatableValue(graph.resolveField("height"));
  const heightType = animatableValue(
    graph.resolveField("layoutSizingVertical")
  );
  const top = animatableValue(graph.resolveField("top"));
  const bottom = animatableValue(graph.resolveField("bottom"));
  const left = animatableValue(graph.resolveField("left"));
  const right = animatableValue(graph.resolveField("right"));
  const aspectRatio = graph.resolveField("aspectRatio");
  const centerX = graph.resolveField("centerX");
  const centerY = graph.resolveField("centerY");
  const minHeight = graph.resolveField("minHeight");
  const maxHeight = graph.resolveField("maxHeight");
  const minWidth = graph.resolveField("minWidth");
  const maxWidth = graph.resolveField("maxWidth");
  const relativeOffset = isRelative
    ? getDOMOffset(state.keyOfEntity(graph))
    : {};

  const constraints = {
    left: isRelative ? relativeOffset.left : isFiniteNumber(left) ? left : null,
    right: isFiniteNumber(right) ? right : null,
    top: isRelative ? relativeOffset.top : isFiniteNumber(top) ? top : null,
    bottom: isFiniteNumber(bottom) ? bottom : null,
    aspectRatio: aspectRatio || null,
    // fixedSize: autoSize === true,
  };

  let centerAnchorX = 0.5;
  let centerAnchorY = 0.5;
  if (centerX) {
    centerAnchorX = parseFloat(centerX) / 100;
  }
  if (centerY) {
    centerAnchorY = parseFloat(centerY) / 100;
  }

  return {
    left: constraints.left,
    right: constraints.right,
    top: constraints.top,
    bottom: constraints.bottom,
    widthType,
    heightType,
    width,
    height,
    aspectRatio: constraints.aspectRatio || null,
    centerAnchorX,
    centerAnchorY,
    minHeight,
    maxHeight,
    minWidth,
    maxWidth,
  };
};
