import {
  builderBorderType,
  builderConstrain,
  builderEffectName,
  builderEffectType,
  builderImagePaintScaleModes,
  builderLayerAlign,
  builderLayerDirection,
  builderLayerDistribute,
  builderLayerMode,
  builderPaintMode,
  builderSizing,
  builderTextDecorations,
  builderTextTransform
} from 'src/defenitions'
import { Constrains } from './index'
import { ComponentProperty, TypeValue } from './componentProperties'
import { SpringValue } from '@react-spring/web'

type Entity = any

export const mixed: unique symbol = Symbol('mixed')
export const empty: unique symbol = Symbol('empty')
export const override: unique symbol = Symbol('override')

export interface Rect {
  x: number
  y: number
  width: number
  height: number
}

export interface Vector {
  x: number
  y: number
}

interface RGB {
  r: number | SpringValue<number>
  g: number | SpringValue<number>
  b: number | SpringValue<number>
}

interface RGBA extends RGB {
  a: number
}

export type Color = RGBA | RGB

export interface Rect {
  x: number
  y: number
  width: number
  height: number
}

export interface Border {
  type: keyof typeof builderBorderType
  width: number | SpringValue<number>
  color: Color
}

export interface SolidPaint {
  type: typeof builderPaintMode.Solid
  color: Color
}

export interface ImagePaint {
  type: typeof builderPaintMode.Image
  scaleMode: typeof builderImagePaintScaleModes
  url?: string
}

export type Paint = SolidPaint | ImagePaint

export type EntityKey = string

export type Descendant = any

export interface BaseProps extends Entity {
  name: string | null
  getParents(): ReadonlyArray<BaseProps[]> | null
  toString(): string
  remove(): void
}

export interface CloneProps extends Entity {
  overrides: ReadonlyArray<EntityKey>
  clone(): string
}

export interface GeometryProps extends Entity {
  fills: ReadonlyArray<Paint>
  fillType: keyof typeof builderPaintMode
  border?: Border
  setFill(fill: Paint): void
  setBorder(border: Border): void
}

export interface ChildrenRelatedProps<TChild, TNestedChild = TChild> {
  readonly children: ReadonlyArray<TChild>
  removeChild(child: TChild | EntityKey): void
  appendChild(child: TChild | EntityKey): void
  insertChild(index: number, child: TChild | EntityKey): void
  findChildren(callback: (child: TChild) => boolean): ReadonlyArray<TChild>
  findChild(callback: (child: TChild) => boolean): TChild | null
  findChildIndex(callback: (child: TChild) => boolean): number
  findAll(callback: (child: TChild | TNestedChild) => boolean): ReadonlyArray<TChild>
  findOne(callback: (child: TChild | TNestedChild) => boolean): TChild | null
}

export interface LayoutProps extends Rect {
  constrains: Constrains
  rotation: number
  layoutSizingHorizontal: typeof builderSizing
  layoutSizingVertical: typeof builderSizing
  rotate(deg: number): void
  resize(width: number, height: number): void
  move(x: number, y: number): void
  setSizeMode(mode: 'horizontal' | 'vertical', value: typeof builderSizing): void
  setConstrains(mode: 'horizontal' | 'vertical', value: typeof builderConstrain): void
}

type CornerSide = 'topLeft' | 'topRight' | 'bottomRight' | 'bottomLeft'

export interface CornerProps {
  cornerRadius: number | typeof mixed
  topLeftRadius: number
  topRightRadius: number
  bottomLeftRadius: number
  bottomRightRadius: number
  setCornerRadius(radius: number): void
  setCornerRadius(side: CornerSide, value: number): void
}

export interface SceneProps {
  visible: boolean
  locked: boolean
  toggleLock(forceValue?: boolean): void
  toggleVisible(forceValue?: boolean): void
}

type PaddingSide = 'top' | 'right' | 'bottom' | 'left'

export interface PaddingProps {
  padding: number | typeof mixed
  paddingLeft: number
  paddingRight: number
  paddingTop: number
  paddingBottom: number
  setPadding(padding: number): void
  setPadding(side: PaddingSide, value: number): void
}

export interface LayerProps {
  layerMode: typeof builderLayerMode
  layerDirection: typeof builderLayerDirection
  layerAlign: typeof builderLayerAlign
  layerDistribute: typeof builderLayerDistribute
  layerWrap: boolean
  layerGap: number
  setLayerMode(mode: typeof builderLayerMode): void
  setLayerDirection(direction: typeof builderLayerDirection): void
  setLayerAlign(align: typeof builderLayerAlign): void
  setLayerDistribute(distribute: typeof builderLayerDistribute): void
  setLayerWrap(isWrap: boolean): void
  setLayerGap(gap: number): void
}

export interface HyperlinkProps {
  hyperlinkHref?: string
  hyperlinkNewTab: boolean
  setHyperlinkHref(href: string): void
  setHyperlinkNewTab(flag: boolean): void
}

export interface Effect {
  type: keyof typeof builderEffectType
  duration: number
  delay: number
  name: keyof typeof builderEffectName
}

export interface EffectsProps {
  effects: ReadonlyArray<Effect>
  setEffect(effect: Effect): void
  removeEffect(type: keyof typeof builderEffectType): void
}

export interface TextContentProps {
  content: Descendant
  setContent(content: Descendant): void
}

export interface TextRangeProps {
  fill: Color | typeof mixed
  fontSize: number | typeof mixed
  fontName: string | typeof mixed
  fontWeight: number | typeof mixed
  textTransform: keyof typeof builderTextTransform | typeof mixed
  textDecoration: keyof typeof builderTextDecorations | typeof mixed
  letterSpacing: number | typeof mixed
  lineHeight: number | typeof mixed
}

export interface TextRangeFunctionsProps {
  getStyledTextSegments<Field extends keyof TextRangeProps>(
    fields: Field[],
    start?: number,
    end?: number
  ): ReadonlyArray<{ start: number; end: number } & Pick<TextRangeProps, Field>>

  setRangeFontSize(fontSize: number, start?: number, end?: number): void
  setRangeFontName(fontName: string, start?: number, end?: number): void
  setRangeFontWeight(fontWeight: number, start?: number, end?: number): void
  setRangeTextTransform(textTransform: keyof typeof builderTextTransform, start?: number, end?: number): void
  setRangeTextDecoration(textDecoration: keyof typeof builderTextDecorations, start?: number, end?: number): void
  setRangeLetterSpacing(letterSpacing: number, start?: number, end?: number): void
  setRangeLineHeight(lineHeight: number, start?: number, end?: number): void
  setRangeFill(color: Color, start?: number, end?: number): void
}

export interface BaseStyleProps extends Entity {
  name: string
}

export type ComponentPropertyKey = string

export interface ComponentPropertiesProps {
  componentPropertyDefinitions: Record<ComponentPropertyKey, ComponentProperty>
  addComponentProperty(key: ComponentPropertyKey, property: ComponentProperty): void
  editComponentProperty(key: ComponentPropertyKey, property: ComponentProperty): void
  removeComponentProperty(propertyKey: ComponentPropertyKey): void
}

export interface ComponentInstancePropertiesProps {
  instanceProperties: Record<ComponentPropertyKey, TypeValue<ComponentProperty>>
  setProperties(properties: Record<ComponentPropertyKey, TypeValue<ComponentProperty>>): void
}
