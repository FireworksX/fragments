import { Extender } from "@/types";
import { getResolvedValue } from "@/shared/getResolvedValue.ts";

export const computedValueExtend: Extender = ({
  graphKey,
  getValue,
  graph,
  state,
}): unknown => {
  return {
    ...graph,
    inputType: getValue("inputType"),
    outputType: getValue("outputType"),
    transforms: getValue("transforms", []),
    inputValue: getValue("inputValue"),
    addTransform: (...transforms) => {
      state.mutate(graphKey, {
        transforms,
      });
    },
    getValue: () => {
      const node = state.resolve(graphKey);
      const transforms = node?.transforms?.map(state.resolve) ?? [];
      const inputValue = getResolvedValue(state, node.inputValue);

      return transforms.reduce(
        (result, transformer) => transformer.transform(result),
        inputValue
      );
    },
  };
};
