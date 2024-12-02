import { LinkKey, Plugin } from "@graph-state/core";
import { nodes, variableTransforms, variableType } from "@/definitions.ts";
import { generateId } from "@fragments/utils";
import { Color } from "@/types/props.ts";
import { createTransformValueEquals } from "@/static/creators/transformValue/createTransformValueEquals.ts";
import { createTransformValueConvertFromBoolean } from "@/static/creators/transformValue/createTransformValueConvertFromBoolean.ts";
import { createTransformValueNegative } from "@/static/creators/transformValue/createTransformValueNegative.ts";
import { createTransformValueStartWith } from "@/static/creators/transformValue/createTransformValueStartWith.ts";
import { createTransformValueEndWith } from "@/static/creators/transformValue/createTransformValueEndWith.ts";
import { createTransformValueContains } from "@/static/creators/transformValue/createTransformValueContains.ts";
import { createTransformValueGT } from "@/static/creators/transformValue/createTransformValueGT.ts";
import { createTransformValueGTE } from "@/static/creators/transformValue/createTransformValueGTE.ts";
import { createTransformValueLT } from "@/static/creators/transformValue/createTransformValueLT.ts";
import { createTransformValueLTE } from "@/static/creators/transformValue/createTransformValueLTE.ts";
import {
  CreateNumberOptions,
  createNumberVariable,
} from "@/static/creators/variables/createNumberVariable.ts";
import {
  CreateObjectOptions,
  createObjectVariable,
} from "@/static/creators/variables/createObjectVariable.ts";
import {
  CreateStringOptions,
  createStringVariable,
} from "@/static/creators/variables/createStringVariable.ts";
import {
  CreateBooleanOptions,
  createBooleanVariable,
} from "@/static/creators/variables/createBooleanVariable.ts";
import { Rect } from "@fragments/plugin-helpers";
import { animatableValue } from "@/shared/animatableValue.ts";

interface CreateSolidPaintStyleOptions {
  color: Color;
  name: string;
}

export interface ComputedValueOptions {
  inputValue: string | number | boolean | LinkKey;
  outputType: keyof typeof variableType;
  inputType: keyof typeof variableType;
  transforms: unknown[];
}

const BREAKPOINT_GAP = 50;

export const creators: Plugin = (state) => {
  state.findPrimaryLayer = () =>
    state.resolve(
      (state.resolve(state.fragment)?.children ?? []).find((child) =>
        state.resolve(child).isPrimaryLayer?.()
      )
    );

  state.atLayer = (at?: number) =>
    (state.resolve(state.fragment)?.children ?? []).map(state.resolve).at(at);

  state.createBreakpoint = (options: { name: string; width: number }) => {
    const primaryLayer = state.findPrimaryLayer();

    if (primaryLayer) {
      const lastLayer = state.atLayer(-1);
      const nextScreenLink = primaryLayer.clone();

      const nextBreakpoint = state.mutate(nextScreenLink, {
        name: options.name,
        isPrimary: false,
        isBreakpoint: true,
        threshold: options.width,
        top: animatableValue(lastLayer.resolveField("top")),
        left:
          animatableValue(lastLayer.resolveField("left")) +
          animatableValue(lastLayer.resolveField("width")) +
          BREAKPOINT_GAP,
      });

      state.resolve(state.fragment).appendChild(nextBreakpoint);
    }
  };

  state.createSolidPaintStyle = (options: CreateSolidPaintStyleOptions) => {
    if (options) {
      const id = generateId();
      const colorGraph = {
        _type: nodes.SolidPaintStyle,
        _id: id,
        color: options.color,
        name: options.name ?? "Solid style",
      };

      state.resolve(state.fragment)?.addSolidPaintStyle(colorGraph);
      return state.keyOfEntity(colorGraph);
    }

    return null;
  };

  state.createFrame = () => {
    return state.mutate({ _type: nodes.Frame, _id: generateId() });
  };

  state.createNumberVariable = (options: CreateNumberOptions) =>
    createNumberVariable(options);

  state.createBooleanVariable = (options: CreateBooleanOptions) =>
    createBooleanVariable(options);

  state.createObjectVariable = (options: CreateObjectOptions) =>
    createObjectVariable(options);

  state.createStringVariable = (options: CreateStringOptions) =>
    createStringVariable(options);

  state.createText = () => {
    return state.mutate({
      _type: nodes.Text,
      _id: generateId(),
    });
  };

  state.createWrapper = (targetLink: LinkKey) => {
    const node = state.resolve(targetLink);
    const parent = node.getParent();

    if (parent) {
      const targetIndex = parent.findChildIndex(
        (child) => child._id === node._id
      );
      const wrapperFrameLink = state.createFrame();
      state.moveNode(targetLink, wrapperFrameLink);

      parent.insertChild(targetIndex, wrapperFrameLink);
    }
  };

  state.createComputedValue = (options: ComputedValueOptions) => {
    return state.mutate({
      _type: nodes.ComputedValue,
      _id: generateId(),
      ...options,
    });
  };

  state.createTransformValue = (
    type: keyof typeof variableTransforms,
    options
  ) => {
    const creator = {
      [variableTransforms.equals]: createTransformValueEquals,
      [variableTransforms.convertFromBoolean]:
        createTransformValueConvertFromBoolean,
      [variableTransforms.negative]: createTransformValueNegative,
      [variableTransforms.startWith]: createTransformValueStartWith,
      [variableTransforms.endWith]: createTransformValueEndWith,
      [variableTransforms.contains]: createTransformValueContains,
      [variableTransforms.gt]: createTransformValueGT,
      [variableTransforms.gte]: createTransformValueGTE,
      [variableTransforms.lt]: createTransformValueLT,
      [variableTransforms.lte]: createTransformValueLTE,
    }[type];

    console.trace(type, options);

    if (creator) {
      const transform = creator(options);
      return state.mutate(transform);
    }
  };
};
