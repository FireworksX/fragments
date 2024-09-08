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
} from "@/static/creators/variables/numberVariable.ts";
import {
  CreateObjectOptions,
  createObjectVariable,
} from "@/static/creators/variables/objectVariable.ts";
import {
  CreateStringOptions,
  createStringVariable,
} from "@/static/creators/variables/stringVariable.ts";
import {
  CreateBooleanOptions,
  createBooleanVariable,
} from "@/static/creators/variables/booleanVariable.ts";

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

export const creators: Plugin = (state) => {
  state.findPrimaryBreakpoint = () =>
    state
      .inspectFields(nodes.Breakpoint)
      .map(state.resolve)
      .filter((s) => s.isPrimary)[0];

  state.createBreakpoint = (options: { name: string; width: number }) => {
    const primaryBreakpoint = state.findPrimaryBreakpoint();

    if (primaryBreakpoint) {
      const nextScreenLink = primaryBreakpoint.clone();
      const nextBreakpoint = state.mutate(nextScreenLink, {
        ...options,
        isPrimary: false,
      });

      state.mutate(state.root, {
        children: [nextBreakpoint],
      });
    }
  };

  state.createSolidPaintStyle = (options: CreateSolidPaintStyleOptions) => {
    if (options) {
      return state.mutate({
        _type: nodes.SolidPaintStyle,
        _id: generateId(),
        color: options.color,
        name: options.name ?? "Solid style",
      });
    }

    return null;
  };

  state.createFrame = () => {
    return state.mutate({ _type: nodes.Frame, _id: generateId() });
  };

  state.createNumberVariable = (options: CreateNumberOptions) =>
    state.mutate(createNumberVariable(options));

  state.createBooleanVariable = (options: CreateBooleanOptions) =>
    state.mutate(createBooleanVariable(options));

  state.createObjectVariable = (options: CreateObjectOptions) =>
    state.mutate(createObjectVariable(options));

  state.createStringVariable = (options: CreateStringOptions) =>
    state.mutate(createStringVariable(options));

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
      inputValue: options?.inputValue ?? null,
      inputType: options?.inputType ?? null,
      outputType: options?.outputType ?? null,
      transforms: options?.transforms ?? [],
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

    if (creator) {
      const transform = creator(options);
      return state.mutate(transform);
    }
  };
};
