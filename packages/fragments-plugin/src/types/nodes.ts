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
  Vector
} from './props'
import { SceneNode } from './index'
import { builderNodes } from 'src/defenitions'
import { Entity } from '@adstore/statex'

export type SelectionType = Entity | string
export type SetSelection = SelectionType[] | ((prevNodes: string) => SelectionType[])

export interface DocumentNode extends Entity, ChildrenRelatedProps<SceneNode, SceneNode> {
  _type: typeof builderNodes.Document
  selection: ReadonlyArray<SceneNode>
  setSelection(firstArg: SetSelection, ...rest: any[]): void
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
  _type: typeof builderNodes.Screen
  background: ReadonlyArray<Paint>
  isPrimary: boolean
  width: number
  setPrimary(): void
}

export interface FrameNode
  extends Entity,
    BaseProps,
    SceneProps,
    ChildrenRelatedProps<ScreenNode>,
    CornerProps,
    LayoutProps,
    LayerProps,
    PaddingProps,
    HyperlinkProps {
  _type: typeof builderNodes.Frame
  clone(): FrameNode
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
  _type: typeof builderNodes.Text
  clone(): FrameNode
}

export interface ComponentNode
  extends Entity,
    BaseProps,
    ChildrenRelatedProps<ComponentVariantNode>,
    ComponentPropertiesProps {
  _type: typeof builderNodes.Component
  instances: ReadonlyArray<ComponentInstanceNode[]>
  defaultVariant: ComponentVariantNode
  createInstance(): ComponentInstanceNode
}

export interface ComponentVariantNode
  extends Entity,
    CornerProps,
    LayoutProps,
    LayerProps,
    PaddingProps,
    ChildrenRelatedProps<ScreenNode> {
  type: typeof builderNodes.ComponentVariant
}

export interface ComponentInstanceNode extends Entity, BaseProps, ComponentInstancePropertiesProps {
  _type: typeof builderNodes.ComponentInstance
  mainComponent: ComponentNode
  variant: ComponentVariantNode
  clone(): ComponentInstanceNode
  detachInstance(): FrameNode
}

export interface ViewportNode extends Entity {
  center: {
    x: number
    y: number
  }
  zoom: number
  bounds: Rect
  setZoom(zoom: number): void
  setCenter(vector: Vector): void
  setBound(rect: Rect): void
}
