import { GraphState } from "@graph-state/core";
import { borderType } from "@fragments/plugin-fragment";
import { setValueToNode } from "@/shared/setValueToNode.ts";
import { getSpringValue } from "@/shared/getSpringValue.ts";
import { getRandomColor } from "@/shared/random.ts";

export function borderModule(node, cache: GraphState) {
  return {
    ...node,
    borderType: getSpringValue(node, "borderType", borderType.None, cache),
    borderWidth: getSpringValue(node, "borderWidth", 1, cache),
    borderColor: getSpringValue(node, "borderColor", null, cache),

    setBorderType: (value) => setValueToNode(node, "borderType", value, cache),
    setBorderWidth: (value) =>
      setValueToNode(node, "borderWidth", value, cache),
    setBorderColor: (value) =>
      setValueToNode(node, "borderColor", value, cache),
  };
}
