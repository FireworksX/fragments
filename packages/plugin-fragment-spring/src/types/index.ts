import { BaseStyleProps, SolidPaint } from "./props";
import {
  ComponentNode,
  DocumentNode,
  FrameNode,
  ScreenNode,
  TextNode,
} from "./nodes";
import { constrain, nodes, positionType, renderTarget } from "@/definitions.ts";
import { Graph, GraphState, LinkKey } from "@graph-state/core";
import { filterDeep, findDeep } from "@fragments/utils";
import { Interpolation, SpringValue } from "@react-spring/web";
import {
  paintMode,
  sizing,
  layerMode,
  layerDistribute,
  layerDirection,
  layerAlign,
} from "@fragments/plugin-fragment";

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
  parentId?: LinkKey;
}

export interface WithSpringPosition<T extends BaseNode> {
  top$: Maybe<SpringValue<number>>;
  left$: Maybe<SpringValue<number>>;
  positionType$: Maybe<SpringValue<keyof typeof positionType>>;
  setPositionType$(type: keyof typeof positionType): WithSpringPosition<T>;
  move$(x: number, y: number): WithSpringPosition<T>;
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

export interface WithSpringSize<T extends BaseNode> {
  width$: Maybe<SpringValue<number>>;
  height$: Maybe<SpringValue<number>>;
  setWidth$(value: number): void;
  setHeight$(value: number): void;
}

export interface WithSpringSizing<T extends BaseNode> {
  layoutSizingHorizontal$: Maybe<SpringValue<keyof typeof sizing>>;
  layoutSizingVertical$: Maybe<SpringValue<keyof typeof sizing>>;
  setSizeMode$(value: keyof typeof sizing): void;
  getAllowResizeHorizontal$(): Interpolation<boolean>;
  getAllowResizeVertical$(): Interpolation<boolean>;
}

export interface WithSpringAspectRatio<T extends BaseNode> {
  aspectRatio$: Maybe<SpringValue<number>>;
  isSynced$(): Interpolation<boolean>;
  syncSize$(): void;
}

export interface WithSpringOpacity<T extends BaseNode> {
  opacity$: Maybe<SpringValue<number>>;
  setOpacity$(value: number): void;
}

export interface WithSpringVisible<T extends BaseNode> {
  visible$: Maybe<SpringValue<number>>;
  setVisible$(value: number): void;
}

export interface WithSpringOverflow<T extends BaseNode> {
  overflow$: Maybe<SpringValue<number>>;
  setOverflow$(value: number): void;
}

export interface WithSpringZIndex<T extends BaseNode> {
  zIndex$: Maybe<SpringValue<number>>;
  setZIndex$(value: number): void;
}

export interface WithSpringSolidFill<T extends BaseNode> {
  solidFill$: Maybe<SpringValue<string>>;
  setSolidFill$(value: string): void;
}

export interface WithSpringFillType<T extends BaseNode> {
  fillType$: SpringValue<keyof typeof paintMode>;
  setSolidFill$(value: keyof typeof paintMode): void;
}

export interface WithSpringCorners<T extends BaseNode> {
  cornerRadius$: Maybe<SpringValue<number>>;
  topLeftRadius$: Maybe<SpringValue<number>>;
  topRightRadius$: Maybe<SpringValue<number>>;
  bottomLeftRadius$: Maybe<SpringValue<number>>;
  bottomRightRadius$: Maybe<SpringValue<number>>;
  isMixedRadius$(): Interpolation<boolean>;
  setCornerRadius$(): void;
}

export interface WithSpringPadding<T extends BaseNode> {
  padding$: Maybe<number>;
  paddingLeft$: Maybe<number>;
  paddingRight$: Maybe<number>;
  paddingTop$: Maybe<number>;
  paddingBottom$: Maybe<number>;
  isMixedPadding$(): boolean;
  setPadding$(): void;
}

export interface WithSpringLayer<T extends BaseNode> {
  layerMode$: Maybe<SpringValue<keyof typeof layerMode>>;
  layerAlign$: Maybe<SpringValue<keyof typeof layerAlign>>;
  layerDirection$: Maybe<SpringValue<keyof typeof layerDirection>>;
  layerDistribute$: Maybe<SpringValue<keyof typeof layerDistribute>>;
  layerWrap$: Maybe<SpringValue<boolean>>;
  layerGap$: Maybe<SpringValue<number>>;
  setLayerMode$(value: keyof typeof layerMode): void;
  setLayerDirection$(value: keyof typeof layerDirection): void;
  setLayerDistribute$(value: keyof typeof layerDistribute): void;
  setLayerAlign$(value: keyof typeof layerAlign): void;
  setLayerWrap$(value: boolean): void;
  setLayerGap$(value: number): void;
}

export type FrameNode = WithPosition<BaseNode>;
