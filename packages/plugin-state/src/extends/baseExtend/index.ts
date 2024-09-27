import { Extender } from "@/types";
import { LinkKey } from "@graph-state/core";
import { BaseProps } from "@/types/props.ts";
import { nodes } from "@/definitions.ts";

export const baseExtend: Extender = ({ graph, state, graphKey, getValue }) => {
  const getParents = (key: LinkKey): ReadonlyArray<BaseProps[]> | null =>
    state.resolveParents(key);

  /*
  Если удаляемый элемент является ребёнком основного Экрана, то
  он удаляется, иначе скрывается
   */
  const remove = () => {
    const node = state.resolve(graphKey);
    const nodeParents = node.getAllParents();

    if (nodeParents) {
      const treeScreen = nodeParents.find(
        ({ _type }) => _type === nodes.Breakpoint
      );

      if (treeScreen?.isPrimary || !treeScreen) {
        state.invalidate(graphKey);
      } else {
        node.toggleVisible(false);
      }
    }
  };

  // const getValue = (key: string) => {
  //   const entityValue = state.resolve(key)
  //
  //   if (key in entityValue) {
  //     const value = entityValue[key]
  //     if (value === undefined && !!entityValue.overrideFrom) {
  //       return state.resolve(entityValue.overrideFrom).getValue(key)
  //     }
  //   }
  //
  //   return entityValue[key]
  // }

  const duplicate = () => {
    const node = state.resolve(graphKey);
    const cloneNode = node.clone();
    const parentNode = node.getParent();

    if (parentNode) {
      parentNode.appendChild(cloneNode);
    }
  };

  // const wrapFrameNode = () => {
  //   const node = state.resolve(entityKey)
  //
  //   if (canWrapFrame.includes(node._type)) {
  //     const parentNode = node.getParent()
  //     const nodeIndex = parentNode.findChildIndex(child => child._id === node._id)
  //
  //     if (nodeIndex !== -1) {
  //       const nextFrame = state.createFrame()
  //       state.resolve(state.root).removeChild(nextFrame)
  //       state.resolve(nextFrame).appendChild(node)
  //
  //       parentNode.removeChild(node)
  //       parentNode.insertChild(nodeIndex, keyOfEntity(nextFrame))
  //     }
  //   }
  // }

  const removeWrapNode = () => {
    const node = state.resolve(graphKey);
    const parentNode = node.getParent();
    const nodeIndex = parentNode.findChildIndex(
      (child) => child._id === node._id
    );

    // const parentChildren = [...parent.children]
    // const layerIndex = parentChildren.findIndex(child => child === activeLayerField)
    // parentChildren.splice(layerIndex, 1, ...layerChildren)
    //
    // state.mutate(
    //   {
    //     _type: parent._type,
    //     _id: parent._id,
    //     children: parentChildren
    //   },
    //   { replace: true }
    // )
  };

  const getParent = (inputKey: string) => {
    const parentKey = state.resolve(inputKey)?.parentKey;

    if (parentKey) {
      return state.resolve(state.getKey(parentKey));
    }

    return null;
  };

  return {
    ...graph,
    name: getValue("name"),
    getParents: () => getParents(graphKey),
    getParent: () => getParent(graphKey),
    getAllParents(stack = []) {
      const parent = getParent(graphKey);

      if (parent) {
        stack.push(parent);
        parent.getAllParents(stack);
      }

      return stack;
    },
    toStringState: (): string => JSON.stringify(state.resolve(graphKey)),
    rename: (name: string) => state.mutate(graphKey, { name }),
    remove,
    // getValue,
    duplicate,
    // wrapFrameNode,
  };
};
