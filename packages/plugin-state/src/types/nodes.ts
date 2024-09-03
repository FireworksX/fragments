import {
  BaseProps,
  ChildrenRelatedProps,
  CloneProps,
  ComponentInstancePropertiesProps,
  ComponentPropertiesProps,
  CornerProps,
  GeometryProps,
  HyperlinkProps,
  LayerProps,
  LayoutProps,
  PaddingProps,
  Paint,
  Rect,
  SceneProps,
  TextContentProps,
  TextRangeFunctionsProps,
  TextRangeProps,
  Vector,
} from "./props";
import { SceneNode } from "./index";
import { nodes } from "src/defenitions";
import { Graph } from "@graph-state/core";

export interface FragmentNode
  extends Graph,
    ChildrenRelatedProps<SceneNode, SceneNode> {
  _type: typeof nodes.Document;
  selection: ReadonlyArray<SceneNode>;
  setSelection(firstArg: SetSelection, ...rest: any[]): void;
}

export interface ScreenNode
  extends Entity,
    BaseProps,
    PaddingProps,
    LayerProps,
    LayoutProps,
    SceneProps,
    GeometryProps,
    CloneProps {
  _type: typeof nodes.Screen;
  background: ReadonlyArray<Paint>;
  isPrimary: boolean;
  width: number;
  setPrimary(): void;
}

export interface BreakpointNode extends ScreenNode {}

export interface FrameNode extends Graph, BaseProps {
  _type: typeof nodes.Frame;
}

export interface TextNode
  extends Entity,
    BaseProps,
    SceneProps,
    LayoutProps,
    PaddingProps,
    CornerProps,
    LayerProps,
    HyperlinkProps,
    TextContentProps,
    TextRangeProps,
    TextRangeFunctionsProps {
  _type: typeof nodes.Text;
  clone(): FrameNode;
}

export interface ComponentNode
  extends Entity,
    BaseProps,
    ChildrenRelatedProps<ComponentVariantNode>,
    ComponentPropertiesProps {
  _type: typeof nodes.Component;
  instances: ReadonlyArray<ComponentInstanceNode[]>;
  defaultVariant: ComponentVariantNode;
  createInstance(): ComponentInstanceNode;
}

export interface ComponentVariantNode
  extends Entity,
    CornerProps,
    LayoutProps,
    LayerProps,
    PaddingProps,
    ChildrenRelatedProps<ScreenNode> {
  type: typeof nodes.ComponentVariant;
}

export interface ComponentInstanceNode
  extends Entity,
    BaseProps,
    ComponentInstancePropertiesProps {
  _type: typeof nodes.ComponentInstance;
  mainComponent: ComponentNode;
  variant: ComponentVariantNode;
  clone(): ComponentInstanceNode;
  detachInstance(): FrameNode;
}
