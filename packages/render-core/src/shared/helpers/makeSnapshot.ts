import { GraphState, LinkKey } from "@graph-state/core";

export function makeSnapshot(
  manager: GraphState,
  target: LinkKey = manager?.$fragment?.root
) {
  if (!target) return {};
  let result = {};

  result[target] = manager.resolve(target);

  const children = manager.cache.getChildren(target);
  if (Array.isArray(children)) {
    children.forEach((child) => {
      result = { ...result, ...makeSnapshot(manager, child) };
    });
  }

  return result;
}
