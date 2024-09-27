import { sizing } from "@/definitions.ts";

export interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface RectProperties {
  left: number;
  right: number;
  top: number;
  bottom: number;
  width: number;
  height: number;
  widthType: keyof typeof sizing;
  heightType: keyof typeof sizing;
  aspectRatio: number;
  fixedSize: boolean;
  centerAnchorX: number;
  centerAnchorY: number;
}
