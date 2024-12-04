import { GraphState, LinkKey } from "@graph-state/core";

/**
 * Передаём ссылку на ноду, которую хотим переместить.
 * Мы можем переместить ноду в другую ноду, если toLink - null,
 * то родитель будет Document.
 *
 * Так же можно изменить порядок вложенных нод, передав order.
 */
export function moveNode(
  cache: GraphState,
  nodeLink: LinkKey,
  toLink: LinkKey | null,
  order?: number
) {
  const node = cache.resolve(nodeLink);
  const nodeParent = node?.getParent();
  const toNode =
    cache.resolve(toLink) || cache.resolve(cache.$fragmentSpring.root);
  const parentKey = cache.keyOfEntity(nodeParent);

  if (toLink !== parentKey) {
    toNode?.insertChild(order || 0, node);
    nodeParent?.removeChild(node);
  } else if (typeof order === "number") {
    nodeParent?.changeOrder(nodeLink, order);
  }
}
