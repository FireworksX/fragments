import { BaseStyleProps, SolidPaint } from './props'
import { ComponentNode, DocumentNode, FrameNode, ScreenNode, TextNode } from './nodes'
import { builderConstrain, builderNodes } from 'src/defenitions'

// export interface ComponentSetNode extends BaseProps, ChildrenRelatedProps<ComponentNode> {
//   _type: typeof builderNodes.ComponentSet
//   defaultVariant: ComponentNode
// }

export interface Constrains {
  readonly vertical: typeof builderConstrain
  readonly horizontal: typeof builderConstrain
}

export interface SolidPaintStyle extends BaseStyleProps, SolidPaint {
  _type: typeof builderNodes.SolidPaintStyle
}

export type SceneNode = FrameNode | TextNode | ComponentNode

export type BaseNode = DocumentNode | ScreenNode | SceneNode
