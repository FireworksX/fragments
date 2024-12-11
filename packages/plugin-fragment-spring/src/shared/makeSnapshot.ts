import { GraphState, LinkKey } from "@graph-state/core";
import { toJsonNode } from "@/shared/toJsonNode.ts";
import { getKey, isKey } from "@/shared/index.ts";

export function makeSnapshot(cache: GraphState, target: LinkKey) {
  if (!target || isKey(target)) return {};
  let result = {};

  result[target] = toJsonNode(cache.resolve(target));

  const children = cache.cache.getChildren(target);
  if (Array.isArray(children)) {
    children.forEach((child) => {
      result = { ...result, ...makeSnapshot(cache, child) };
    });
  }

  return result;
}
