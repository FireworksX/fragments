import { Plugin } from "@graph-state/core";
import { nodes } from "@fragments/plugin-state";
import extendPlugin from "@graph-state/plugin-extend";
import { collectExtends } from "src/extends";
import { positionExtend } from "@/extends/positionExtend";
import { layoutExtend } from "@/extends/layoutExtend";
import { addStatic } from "@/static";
import { frameExtend } from "@/extends/nodes/frameExtend";
import { fragmentExtend } from "@/extends/nodes/fragmentExtend";
import { solidPaintStyleExtend } from "@/extends/nodes/solidPaintStyleExtend";
import { fillExtend } from "@/extends/fillExtend";
import { sceneExtend } from "@/extends/sceneExtend";
import { cornerExtend } from "@/extends/cornerExtend";
import { borderExtend } from "@/extends/borderExtend";
import { layerExtend } from "@/extends/layerExtend";
import { variableExtend } from "@/extends/variableExtend";
import { toCssExtend } from "@/extends/toCssExtend";

export const pluginStateBuilder: Plugin = (state, overrides) => {
  addStatic(state);

  extendPlugin<typeof state>(
    {
      [nodes.Fragment]: collectExtends([
        fragmentExtend,
        // baseExtend,
        // childrenExtend,
        // sceneExtend,
      ]),
      [nodes.Breakpoint]: collectExtends([
        // breakpointExtend,
        // baseExtend,
        // childrenExtend,
        // cloneExtend,
        positionExtend,
        toCssExtend,
      ]),
      [nodes.Frame]: collectExtends([
        // baseExtend,
        sceneExtend,
        // childrenExtend,
        // layoutExtend,
        cornerExtend,
        // paddingExtend,
        layerExtend,
        borderExtend,
        fillExtend,
        // cloneExtend,
        positionExtend,
        layoutExtend,
        frameExtend,
        toCssExtend,
      ]),
      [nodes.SolidPaintStyle]: collectExtends([solidPaintStyleExtend]),
      [nodes.Variable]: collectExtends([variableExtend]),
      // [nodes.TransformValue]: collectExtends([transformValueExtend]),
      // [nodes.ComputedValue]: collectExtends([computedValueExtend]),
      [nodes.Text]: collectExtends([
        positionExtend,
        layoutExtend,
        sceneExtend,
        borderExtend,
        toCssExtend,
      ]),
    },
    {
      excludePartialGraph: true,
    }
  )(state, overrides);

  return state;
};

export default pluginStateBuilder;

export { skips } from "./skips.ts";
