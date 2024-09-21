import {
  finiteNumber,
  isFiniteNumber,
  isValue,
  valueToDimensionType,
} from "@fragments/utils";
import { animatableValue } from "../../../../plugin-state-builder/src/shared/animatableValue.ts";
import { Graph, GraphState } from "@graph-state/core";
import { sizing } from "@/definitions.ts";

export const fromProperties = (state: GraphState, graph: Graph) => {
  graph = state.resolve(graph);

  const width = animatableValue(graph.resolveField("width"));
  const widthType = graph.resolveField("layoutSizingHorizontal");
  const height = animatableValue(graph.resolveField("height"));
  const heightType = graph.resolveField("layoutSizingVertical");
  const top = graph.resolveField("top");
  const bottom = graph.resolveField("bottom");
  const left = graph.resolveField("left");
  const right = graph.resolveField("right");
  const aspectRatio = graph.resolveField("aspectRatio");
  const centerX = graph.resolveField("centerX");
  const centerY = graph.resolveField("centerY");

  const constraints = {
    left: isFiniteNumber(left) || animatableValue(left),
    right: isFiniteNumber(right) || animatableValue(right),
    top: isFiniteNumber(top) || animatableValue(top),
    bottom: isFiniteNumber(bottom) || animatableValue(bottom),
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
    left: constraints.left ? animatableValue(left) : null,
    right: constraints.right ? animatableValue(right) : null,
    top: constraints.top ? animatableValue(top) : null,
    bottom: constraints.bottom ? animatableValue(bottom) : null,
    widthType,
    heightType,
    width,
    height,
    aspectRatio: constraints.aspectRatio || null,
    centerAnchorX,
    centerAnchorY,
  };
};
