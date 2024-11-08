import { to } from "@react-spring/web";
import { nodes, sizing } from "@fragments/plugin-state";
import { Extender } from "@/types";

const autoSizes = [sizing.Hug, sizing.Fill];

export const sizeStylesExtend: Extender = ({
  resolveField,
  graphKey,
  state,
}) => {
  const widthType$ = resolveField("layoutSizingHorizontal");
  const heightType$ = resolveField("layoutSizingVertical");
  const width$ = resolveField("width");
  const height$ = resolveField("height");
  const minWidth$ = resolveField("minWidth");
  const minHeight$ = resolveField("minHeight");

  const toValue = (type: keyof typeof sizing, value: number) => {
    const node = state.resolve(graphKey);
    if (autoSizes.includes(type)) {
      return node._type === nodes.FragmentInstance ? "auto" : "min-content";
    }

    if (type === sizing.Relative) {
      return `${value}%`;
    }

    return value;
  };

  return {
    width: to([widthType$, width$], toValue),
    height: to([heightType$, height$], toValue),
    minWidth: to([sizing.Fixed, minWidth$], toValue),
    minWeight: to([sizing.Fixed, minHeight$], toValue),
  };
};
