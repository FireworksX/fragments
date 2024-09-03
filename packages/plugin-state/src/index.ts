import { GraphState, Plugin } from "@graph-state/core";
import { addStatic } from "@/static";
import extendPlugin from "@graph-state/plugin-extend";
import { nodes } from "@/defenitions.ts";
import { collectExtends } from "@/shared/extends";
import { baseExtend } from "@/shared/extends/baseExtend";
import { childrenExtend } from "@/shared/extends/childrenExtend";
import { sceneExtend } from "@/shared/extends/sceneExtend";
import { breakpointExtend } from "src/shared/extends/nodes/breakpointExtend";
import { layoutExtend } from "@/shared/extends/layoutExtend";
import { cornerExtend } from "@/shared/extends/cornerExtend";
import { fragmentExtend } from "src/shared/extends/nodes/fragmentExtend";
import { paddingExtend } from "@/shared/extends/paddingExtend";
import { layerExtend } from "@/shared/extends/layerExtend";
import { borderExtend } from "@/shared/extends/borderExtend";
import { fillExtend } from "@/shared/extends/fillExtend";
import { cloneExtend } from "@/shared/extends/cloneExtend";
import { solidPaintStyleExtend } from "@/shared/extends/nodes/solidPaintStyleExtend";
import { variableExtend } from "@/shared/extends/nodes/variableExtend";
import { transformValueExtend } from "@/shared/extends/nodes/transformValueExtend";
import { computedValueExtend } from "@/shared/extends/nodes/computedValueExtend";
import { textExtend } from "@/shared/extends/nodes/textExtend";
import { StateEntity } from "@/types";

const plugin: Plugin = (state: GraphState<StateEntity>) => {
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
        sceneExtend,
        childrenExtend,
        layoutExtend,
        cornerExtend,
        paddingExtend,
        layerExtend,
        borderExtend,
        fillExtend,
        cloneExtend,
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
      ]),
    },
    {
      excludePartialGraph: true,
    }
  )(state);

  return state;
};

export default plugin;
export * from "./defenitions.ts";
export * from "./skips.ts";
