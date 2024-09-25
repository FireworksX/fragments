import { BaseStyleProps, SolidPaint } from "./props";
import {
  ComponentNode,
  DocumentNode,
  FrameNode,
  ScreenNode,
  TextNode,
} from "./nodes";
import { constrain, nodes } from "@/definitions.ts";
import { Graph, GraphState, LinkKey } from "@graph-state/core";

// export interface ComponentSetNode extends BaseProps, ChildrenRelatedProps<ComponentNode> {
//   _type: typeof nodes.ComponentSet
//   defaultVariant: ComponentNode
// }

export interface Constrains {
  readonly vertical: typeof constrain;
  readonly horizontal: typeof constrain;
}

export interface SolidPaintStyle extends BaseStyleProps, SolidPaint {
  _type: typeof nodes.SolidPaintStyle;
}

export type SceneNode = FrameNode | TextNode | ComponentNode;

export type BaseNode = DocumentNode | ScreenNode | SceneNode;

export interface ExtenderPayload<TGrpah> {
  state: GraphState;
  graph: TGrpah;
  graphKey: LinkKey;
  resolveField: (field: string) => unknown;
  getValue: (fieldKey: string, fallbackValue?: unknown) => unknown;
}

export type Extender = <TGrpah, TExtend>(
  payload: ExtenderPayload<TGrpah>
) => TGrpah & TExtend;

export type StateEntity = FrameNode;
