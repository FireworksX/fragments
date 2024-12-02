import { BaseStyleProps, SolidPaint } from "./props";
import {
  ComponentNode,
  DocumentNode,
  FrameNode,
  ScreenNode,
  TextNode,
} from "./nodes";
import {
  constrain,
  layerAlign,
  layerDirection,
  layerDistribute,
  layerMode,
  nodes,
  paintMode,
  positionType,
  renderTarget,
  sizing,
} from "@/definitions.ts";
import { Graph, GraphState, LinkKey } from "@graph-state/core";
import { filterDeep, findDeep } from "@fragments/utils";

export type RenderTarget = keyof typeof renderTarget;

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

// export type BaseNode = DocumentNode | ScreenNode | SceneNode;

export interface ExtenderPayload<TGrpah> {
  state: GraphState;
  graph: TGrpah;
  graphKey: LinkKey;
  resolveField: (field: string, fallback?: unknown) => unknown;
  getValue: (fieldKey: string, fallbackValue?: unknown) => unknown;
}

export type Extender = <TGrpah, TExtend>(
  payload: ExtenderPayload<TGrpah>
) => TGrpah & TExtend;

export type StateEntity = FrameNode;

// Тип для модулей
export type Module<N> = (node: N) => N;

export type Maybe<T> = T | null;

export interface BaseNode extends Graph {
  overrides: LinkKey[];
  overrideFrom?: LinkKey;
  children?: LinkKey[];
  parent?: LinkKey;
  getParent(): BaseNode | null;
}

export interface WithPosition<T extends BaseNode> {
  top: Maybe<number>;
  left: Maybe<number>;
  positionType: Maybe<keyof typeof positionType>;
  setPositionType(type: keyof typeof positionType): WithPosition<T>;
  move(x: number, y: number): WithPosition<T>;
}

export interface WithChildren<T extends BaseNode> {
  children: LinkKey[];
  appendChild(child: BaseNode): void;
  removeChild(child: string): void;
  insertChild(index: number, child: BaseNode): void;
  changeOrder(childLink: LinkKey, to: number): void;
  // findChildren(callback: (child: BaseNode) => boolean): readonly BaseNode[];
  // findChild(callback: (child: BaseNode) => boolean): readonly BaseNode[];
  // findChildIndex(callback: (child: BaseNode) => boolean): number;
  // findAll(callback: (child: BaseNode) => boolean): BaseNode[];
  // findOne(callback: (child: BaseNode) => boolean): BaseNode;
}

export interface WithSize<T extends BaseNode> {
  width: Maybe<number>;
  height: Maybe<number>;
  setWidth(value: number): void;
  setHeight(value: number): void;
}

export interface WithSizing<T extends BaseNode> {
  layoutSizingHorizontal: Maybe<keyof typeof sizing>;
  layoutSizingVertical: Maybe<keyof typeof sizing>;
  setSizeMode(value: keyof typeof sizing): void;
  getAllowResizeHorizontal(): boolean;
  getAllowResizeVertical(): boolean;
}

export interface WithAspectRatio<T extends BaseNode> {
  aspectRatio: Maybe<number>;
  syncSize(): void;
  isSynced(): boolean;
}

export interface WithOpacity<T extends BaseNode> {
  opacity: Maybe<number>;
  setOpacity(value: number): void;
}

export interface WithVisible<T extends BaseNode> {
  visible: Maybe<number>;
  setVisible(value: number): void;
}

export interface WithOverflow<T extends BaseNode> {
  overflow: Maybe<number>;
  setOverflow(value: number): void;
}

export interface WithZIndex<T extends BaseNode> {
  zIndex: Maybe<number>;
  setZIndex(value: number): void;
}

export interface WithSolidFill<T extends BaseNode> {
  solidFill: Maybe<string>;
  setSolidFill(value: string): void;
}

export interface WithFillType<T extends BaseNode> {
  fillType: keyof typeof paintMode;
  setSolidFill(value: keyof typeof paintMode): void;
}

export interface WithCorners<T extends BaseNode> {
  cornerRadius: Maybe<number>;
  topLeftRadius: Maybe<number>;
  topRightRadius: Maybe<number>;
  bottomLeftRadius: Maybe<number>;
  bottomRightRadius: Maybe<number>;
  isMixedRadius(): boolean;
  setCornerRadius(): void;
}

export interface WithPadding<T extends BaseNode> {
  padding: Maybe<number>;
  paddingLeft: Maybe<number>;
  paddingRight: Maybe<number>;
  paddingTop: Maybe<number>;
  paddingBottom: Maybe<number>;
  isMixedPadding(): boolean;
  setPadding(): void;
}

export interface WithLayer<T extends BaseNode> {
  layerMode: Maybe<keyof typeof layerMode>;
  layerAlign: Maybe<keyof typeof layerAlign>;
  layerDirection: Maybe<keyof typeof layerDirection>;
  layerDistribute: Maybe<keyof typeof layerDistribute>;
  layerWrap: Maybe<boolean>;
  layerGap: Maybe<number>;
  setLayerMode(value: keyof typeof layerMode): void;
  setLayerDirection(value: keyof typeof layerDirection): void;
  setLayerDistribute(value: keyof typeof layerDistribute): void;
  setLayerAlign(value: keyof typeof layerAlign): void;
  setLayerWrap(value: boolean): void;
  setLayerGap(value: number): void;
}

export type FrameNode = WithPosition<BaseNode>;
