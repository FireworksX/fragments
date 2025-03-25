import { Entity, GraphState, LinkKey } from "@graph-state/core";
import { isPartOfPrimary } from "@/shared/helpers/isPartOfPrimary";
import { createLayer } from "@/shared/helpers/createLayer";
import { getOverrider } from "@/shared/helpers/getOverrider";
import { nodes } from "@/definitions";

/**
 * Метод добавляет слой в массив children. Но есть дополнительная логика.
 * Если добавление происходит в primary экран, то добавляется ко всем
 * зависимым экранам. Если это не primary, то так же добавляется во все экраны,
 * но на primary экране visible = false
 */
export const appendChildren = (
  manager: GraphState,
  target: LinkKey,
  ...children: Entity[]
) => {
  const targetEntity = manager.entityOfKey(target);
  if (targetEntity._type !== nodes.Frame) {
    manager.mutate(manager.keyOfEntity(target), {
      children,
    });
    return;
  }

  const primaryTarget = getOverrider(manager, target);
  const isPrimaryTarget = isPartOfPrimary(manager, target);
  const resolveChildren = children
    .map((child) => createLayer(manager.entityOfKey(child) ?? child))
    .filter(Boolean);

  (primaryTarget?.overrides ?? []).forEach((override) => {
    const overridesChildren = resolveChildren
      .map((child) => {
        const nextChild = createLayer(child, true);

        if (!isPrimaryTarget) {
          nextChild.visible = true;
        }

        return nextChild;
      })
      .filter(Boolean);

    overridesChildren.forEach((child, index) => {
      const primaryChild = resolveChildren.at(index);
      if ("overrides" in primaryChild) {
        primaryChild.overrides.push(manager.keyOfEntity(child));
      } else {
        primaryChild.overrides = [manager.keyOfEntity(child)];
      }
    });

    manager.mutate(manager.keyOfEntity(override), {
      children: overridesChildren,
    });
  });

  manager.mutate(manager.keyOfEntity(primaryTarget), {
    children: resolveChildren.map((child) => ({
      ...child,
      visible: isPrimaryTarget,
    })),
  });

  return resolveChildren.map(manager.keyOfEntity);
};

export const insertChildren = (manager: GraphState) => {};

export const removeChildren = (manager: GraphState, ...layerKeys: Entity[]) => {
  layerKeys.map(manager.resolve).forEach((layer) => {
    const isPrimary = isPartOfPrimary(manager, layer);

    if (isPrimary || layer?.isBreakpoint) {
      (layer?.overrides ?? [])
        .concat(layer?.children ?? [])
        .forEach(manager.invalidate);
      manager.invalidate(layer);
    } else {
      manager.mutate(manager.keyOfEntity(layer), {
        visible: false,
      });
    }
  });
};
