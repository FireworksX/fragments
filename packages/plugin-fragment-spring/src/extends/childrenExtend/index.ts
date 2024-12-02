import { BaseNode, Extender, SceneNode } from "@/types";
import { filterDeep, findDeep } from "@fragments/utils";
import { isPartialKey, LinkKey } from "@graph-state/core";
import { baseExtend } from "@/extends/baseExtend";

export const childrenExtend: Extender = <TChild extends SceneNode = SceneNode>({
  graph,
  graphKey,
  state,
}) => {
  const wrapChildren = (children) => {
    return children;
    return (children ?? [])
      .filter((child) =>
        typeof child === "string" ? !isPartialKey(child) : true
      )
      .map((child) => {
        const childEntity =
          typeof child === "string" ? state.resolve(child) : child;

        return state.resolve(childEntity)
          ? {
              ...childEntity,
              parentKey: state.setKey(graphKey),
            }
          : child;
      });
  };

  return {
    ...graph,
    children: wrapChildren(graph?.children),
    appendChild(child: unknown): void {
      const childNode: any =
        typeof child === "string" ? state.resolve(child) : child;
      childNode.parentKey = state.setKey(graphKey);

      state.mutate(graphKey, {
        children: [childNode],
      });
    },

    removeChild(child: string | TChild): void {
      state.mutate(state.keyOfEntity(child), { parentKey: null });

      state.mutate(
        graphKey,
        (prev) => {
          const childKey =
            child instanceof Object ? state.keyOfEntity(child as any) : child;
          return {
            children: ((prev.children ?? []) as any)?.filter(
              (c: string) => c !== childKey
            ),
          };
        },
        {
          replace: true,
        }
      );
    },

    insertChild(index: number, child: TChild): void {
      state.mutate(
        graphKey,
        (prev) => {
          const children = [...(prev.children as any)];
          const childNode: any =
            typeof child === "string" ? state.resolve(child) : child;

          children.splice(index, 0, {
            ...childNode,
            parentKey: state.setKey(graphKey),
          });

          return {
            ...prev,
            children,
          };
        },
        { replace: true }
      );
    },

    changeOrder(childLink: LinkKey, to: number): void {
      state.mutate(
        graphKey,
        (prev) => {
          const children = prev?.children ?? [];
          const index = children.indexOf(childLink);

          if (index !== -1) {
            children.splice(index, 1);
            children.splice(to, 0, childLink);
          }

          return {
            children,
          };
        },
        { replace: true }
      );
    },

    findChildren(callback: (child: TChild) => boolean): readonly TChild[] {
      return (state.resolve(graphKey)?.children ?? [])
        .map(state.resolve)
        .filter(Boolean)
        .filter(callback);
    },

    findChild(callback: (child: TChild) => boolean): TChild {
      return (
        (state.resolve(graphKey)?.children ?? [])
          .map(state.resolve)
          .find(callback) ?? null
      );
    },

    findChildIndex(callback: (child: TChild) => boolean): number {
      return (
        (state.resolve(graphKey)?.children ?? [])
          .map(state.resolve)
          .findIndex(callback) ?? null
      );
    },

    findAll(callback: (child: TChild) => boolean): readonly TChild[] {
      const tree = state.resolve(state.keyOfEntity(this), { deep: true });
      return (
        filterDeep(
          tree,
          (_, value) => state.keyOfEntity(value) && callback(value)
        ) ?? []
      ).map((el) => el.value) as BaseNode[];
    },

    findOne(callback: (child: TChild) => boolean): TChild {
      const tree = state.deepResolve(state.keyOfEntity(this));
      return (findDeep(
        tree,
        (_, value) => state.keyOfEntity(value) && callback(value)
      )?.value ?? null) as BaseNode | null;
    },
  };
};

childrenExtend.symbol = Symbol("childrenExtend");
