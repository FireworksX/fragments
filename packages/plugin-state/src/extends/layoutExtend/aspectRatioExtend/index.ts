import { ExtenderPayload } from "@/types";
import { valueSetter } from "@/shared/valueSetter.ts";
import { isValue } from "@fragments/utils";

export const aspectRatioExtend = ({
  state,
  getValue,
  graphKey,
  graph,
}: ExtenderPayload<unknown>) => {
  const isSynced = () => isValue(state.resolveValue(graph, "aspectRatio"));
  const aspectRatioSetter = valueSetter(state, graphKey, "aspectRatio");

  const syncSize = () => {
    const width = state.resolveValue(graph, "width");
    const height = state.resolveValue(graph, "height");
    const nextValue = !isSynced() ? height / width : null;

    aspectRatioSetter(nextValue);
  };

  return {
    aspectRatio: getValue("aspectRatio"),
    isSynced,
    syncSize,
  };
};
