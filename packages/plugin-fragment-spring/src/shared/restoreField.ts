import { nodes, restoreVariableField } from "@fragments/plugin-fragment";
import { GraphState, LinkKey } from "@graph-state/core";

export const restoreField = (
  node: LinkKey,
  field: string,
  cache: GraphState
) => {
  const targetNode = cache.resolve(node);

  if (targetNode) {
    if (targetNode._type === nodes.Text) {
      cache.mutate(cache.keyOfEntity(targetNode), {
        variableLink: null,
      });
    } else {
      const fieldValue = targetNode[field];
      const restoreNode = restoreVariableField([targetNode], fieldValue, field);
      cache.mutate(restoreNode);
    }
  }
};
