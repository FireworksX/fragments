import { Plugin } from "@graph-state/core";
import { nodes } from "@fragments/plugin-state";
import extendPlugin from "@graph-state/plugin-extend";
import { collectExtends } from "@/extend";
import { positionExtend } from "@/extend/positionExtend";
import { layoutExtend } from "@/extend/layoutExtend";
import { addStatic } from "@/static";
import { rectExtend } from "@/extend/rectExtend";
import { frameExtend } from "@/extend/nodes/frameExtend";
import { fragmentExtend } from "@/extend/nodes/fragmentExtend";
import { solidPaintStyleExtend } from "@/extend/nodes/solidPaintStyleExtend";
import { fillExtend } from "@/extend/fillExtend";
import { sceneExtend } from "@/extend/sceneExtend";
import { cornerExtend } from "@/extend/cornerExtend";
import { borderExtend } from "@/extend/borderExtend";
import { layerExtend } from "@/extend/layerExtend";
import { variableExtend } from "@/extend/variableExtend";

export const pluginStateBuilder: Plugin = (state, overrides) => {
  addStatic(state);

  extendPlugin<typeof state>(
    {
      [nodes.Fragment]: collectExtends([
        fragmentExtend,
        // baseExtend,
        // childrenExtend,
        // sceneExtend,
        rectExtend,
      ]),
      [nodes.Breakpoint]: collectExtends([
        // breakpointExtend,
        // baseExtend,
        // childrenExtend,
        // cloneExtend,
        rectExtend,
        positionExtend,
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
        rectExtend,
        frameExtend,
      ]),
      [nodes.SolidPaintStyle]: collectExtends([solidPaintStyleExtend]),
      [nodes.Variable]: collectExtends([variableExtend]),
      // [nodes.TransformValue]: collectExtends([transformValueExtend]),
      // [nodes.ComputedValue]: collectExtends([computedValueExtend]),
      [nodes.Text]: collectExtends([
        positionExtend,
        layoutExtend,
        rectExtend,
        sceneExtend,
        borderExtend,
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