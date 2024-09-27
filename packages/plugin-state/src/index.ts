import { GraphState, Plugin } from "@graph-state/core";
import { addStatic } from "@/static";
import extendPlugin from "@graph-state/plugin-extend";
import { nodes } from "@/definitions.ts";
import { collectExtends } from "@/extends";
import { baseExtend } from "@/extends/baseExtend";
import { childrenExtend } from "@/extends/childrenExtend";
import { sceneExtend } from "@/extends/sceneExtend";
import { breakpointExtend } from "@/extends/nodes/breakpointExtend";
import { layoutExtend } from "@/extends/layoutExtend";
import { cornerExtend } from "@/extends/cornerExtend";
import { fragmentExtend } from "@/extends/nodes/fragmentExtend";
import { paddingExtend } from "@/extends/paddingExtend";
import { layerExtend } from "@/extends/layerExtend";
import { borderExtend } from "@/extends/borderExtend";
import { fillExtend } from "@/extends/fillExtend";
import { cloneExtend } from "@/extends/cloneExtend";
import { solidPaintStyleExtend } from "@/extends/nodes/solidPaintStyleExtend";
import { variableExtend } from "@/extends/nodes/variableExtend";
import { transformValueExtend } from "@/extends/nodes/transformValueExtend";
import { computedValueExtend } from "@/extends/nodes/computedValueExtend";
import { textExtend } from "@/extends/nodes/textExtend";
import { StateEntity } from "@/types";
import { positionExtend } from "@/extends/positionExtend";
import { rectExtend } from "@/extends/rectExtend";

const plugin: Plugin = (state: GraphState<StateEntity>, overrides) => {
  addStatic(state);

  extendPlugin<typeof state>(
    {
      [nodes.Fragment]: collectExtends([
        fragmentExtend,
        baseExtend,
        childrenExtend,
        sceneExtend,
      ]),
      [nodes.Breakpoint]: collectExtends([
        breakpointExtend,
        baseExtend,
        childrenExtend,
        cloneExtend,
        layoutExtend,
        positionExtend,
        rectExtend,
      ]),
      [nodes.Frame]: collectExtends([
        baseExtend,
        sceneExtend,
        childrenExtend,
        layoutExtend,
        cornerExtend,
        paddingExtend,
        layerExtend,
        borderExtend,
        fillExtend,
        cloneExtend,
        positionExtend,
        rectExtend,
      ]),
      [nodes.SolidPaintStyle]: collectExtends([solidPaintStyleExtend]),
      [nodes.Variable]: collectExtends([variableExtend]),
      [nodes.TransformValue]: collectExtends([transformValueExtend]),
      [nodes.ComputedValue]: collectExtends([computedValueExtend]),
      [nodes.Text]: collectExtends([
        textExtend,
        sceneExtend,
        baseExtend,
        cloneExtend,
        layoutExtend,
        positionExtend,
        rectExtend,
      ]),
    },
    {
      excludePartialGraph: true,
    }
  )(state, overrides);

  return state;
};

export default plugin;
export * as definitions from "./definitions.ts";
export * from "./definitions.ts";
export * from "./skips.ts";
