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

  // const goals = Array.from(
  //   new Set(
  //     targetFragment
  //       .inspectFields(definition.nodes.Variable)
  //       .filter((link) => {
  //         const graph = targetFragment?.resolve(link);
  //         return (
  //           graph?.type === definition.variableType.Event &&
  //           graph?.mode === definition.eventMode.goal
  //         );
  //       })
  //       .map((link) => targetFragment.resolve(link)?.fragment)
  //       .values()
  //   )
  // );

  return {
    document: fragmentDocument,
    linkedFragments,
    // goals,
  };
}
