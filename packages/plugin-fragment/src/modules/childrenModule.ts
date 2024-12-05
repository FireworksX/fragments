import { GraphState, LinkKey } from "@graph-state/core";
import { BaseNode, WithChildren } from "@/types";
import { setKey } from "@/shared";

export function childrenModule<T extends BaseNode>(
  node: T,
  cache: GraphState
): WithChildren<T> {
  const nodeKey = cache.keyOfEntity(node);

  return {
    ...node,
    children: node?.children ?? [],
    appendChild(child: unknown): void {
      const childNode: any =
        typeof child === "string" ? cache.resolve(child) : child;
      childNode.parent = setKey(nodeKey);

      cache.mutate(nodeKey, {
        children: [childNode],
      });
    },

    removeChild(child: string | unknown): void {
      cache.mutate(cache.keyOfEntity(child), { parentKey: null });

      cache.mutate(
        nodeKey,
        (prev) => {
          const childKey =
            child instanceof Object ? cache.keyOfEntity(child as any) : child;
          return {
            ...prev,
            children: ((prev.children ?? []) as any)?.filter(
              (c: string) => c !== childKey
            ),
          };
        },
        {
          replace: (graph) => cache.keyOfEntity(graph) === nodeKey,
        }
      );
    },

    insertChild(index: number, child: unknown): void {
      cache.mutate(
        nodeKey,
        (prev) => {
          const children = [...(prev.children as any)];
          const childNode: any =
            typeof child === "string" ? cache.resolve(child) : child;

          children.splice(index, 0, {
            ...childNode,
            parent: setKey(nodeKey),
          });

          return {
            ...prev,
            children,
          };
        },
        { replace: (graph) => cache.keyOfEntity(graph) === nodeKey }
      );
    },

    changeOrder(childLink: LinkKey, to: number): void {
      cache.mutate(
        nodeKey,
        (prev) => {
          const children = prev?.children ?? [];
          const index = children.indexOf(childLink);

          if (index !== -1) {
            children.splice(index, 1);
            children.splice(to, 0, childLink);
          }

          return {
            ...prev,
            children,
          };
        },
        { replace: (graph) => cache.keyOfEntity(graph) === nodeKey }
      );
    },
    //
    // findChildren(callback: (child: TChild) => boolean): readonly TChild[] {
    //   return (state.resolve(graphKey)?.children ?? [])
    //     .map(state.resolve)
    //     .filter(Boolean)
    //     .filter(callback);
    // },
    //
    // findChild(callback: (child: TChild) => boolean): TChild {
    //   return (
    //     (state.resolve(graphKey)?.children ?? [])
    //       .map(state.resolve)
    //       .find(callback) ?? null
    //   );
    // },
    //
    // findChildIndex(callback: (child: TChild) => boolean): number {
    //   return (
    //     (state.resolve(graphKey)?.children ?? [])
    //       .map(state.resolve)
    //       .findIndex(callback) ?? null
    //   );
    // },
    //
    // findAll(callback: (child: TChild) => boolean): readonly TChild[] {
    //   const tree = state.resolve(state.keyOfEntity(this), { deep: true });
    //   return (
    //     filterDeep(
    //       tree,
    //       (_, value) => state.keyOfEntity(value) && callback(value)
    //     ) ?? []
    //   ).map((el) => el.value) as BaseNode[];
    // },
    //
    // findOne(callback: (child: TChild) => boolean): TChild {
    //   const tree = state.deepResolve(state.keyOfEntity(this));
    //   return (findDeep(
    //     tree,
    //     (_, value) => state.keyOfEntity(value) && callback(value)
    //   )?.value ?? null) as BaseNode | null;
    // },
  };
}
