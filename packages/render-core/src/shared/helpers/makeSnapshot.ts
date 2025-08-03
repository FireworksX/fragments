import { GraphState, LinkKey } from "@graph-state/core";
import { definition } from "@fragmentsx/definition";

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

  const linkedGoals = Array.from(
    new Set(
      targetFragment
        .inspectFields(definition.nodes.Variable)
        .map(targetFragment?.resolve)
        .filter((graph) => {
          return (
            graph?.type === definition.variableType.Event &&
            graph?.mode === definition.eventMode.goal
          );
        })
        .map((graph) => graph?.defaultValue?.goalId)
        .filter(Boolean)
        .values()
    )
  );

  return {
    document: fragmentDocument,
    linkedFragments,
    linkedGoals,
  };
}
