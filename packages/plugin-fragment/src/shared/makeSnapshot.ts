import { GraphState, LinkKey } from "@graph-state/core";

export function makeSnapshot(cache: GraphState, target: LinkKey) {
  if (!target) return [];

  const result: unknown[] = [];
  result.push(cache.resolve(target));

  const children = cache.cache.getChildren(target);
  if (Array.isArray(children)) {
    children.forEach((child) => {
      result.push(...makeSnapshot(cache, child));
    });
  }

  return result;
}
