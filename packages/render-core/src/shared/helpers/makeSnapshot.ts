import { GraphState, LinkKey } from "@graph-state/core";
import { definition } from "@fragmentsx/definition";

export function makeSnapshotOld(
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

export function makeSnapshot(
  globalManager: GraphState,
  targetFragmentId: number
) {
  if (!globalManager || !targetFragmentId) return null;

  const targetFragment =
    globalManager?.$fragments?.getManager?.(targetFragmentId);

  if (!targetFragment) return null;

  const fragmentDocument = targetFragment.resolve(
    targetFragment.$fragment.root,
    { deep: true }
  );
  const linkedFragments = Array.from(
    new Set(
      targetFragment
        .inspectFields(definition.nodes.Instance)
        .map((link) => targetFragment.resolve(link)?.fragment)
        .values()
    )
  );

  return {
    document: fragmentDocument,
    linkedFragments,
  };
}
