import { LinkKey, Plugin } from "@graph-state/core";

export const moveNode: Plugin = (state) => {
  /**
   * Передаём ссылку на ноду, которую хотим переместить.
   * Мы можем переместить ноду в другую ноду, если toLink - null,
   * то родитель будет Document.
   *
   * Так же можно изменить порядок вложенных нод, передав order.
   */
  state.moveNode = (
    nodeLink: LinkKey,
    toLink: LinkKey | null,
    order?: number
  ) => {
    const node = state.resolve(nodeLink);
    const nodeParent = node?.getParent();
    const toNode = state.resolve(toLink) || state.resolve(state.key);
    const parentKey = state.keyOfEntity(nodeParent);

    if (toLink !== parentKey) {
      nodeParent?.removeChild(node);
      toNode?.insertChild(order || 0, node);
    } else if (typeof order === "number") {
      nodeParent?.changeOrder(nodeLink, order);
    }
  };
};
