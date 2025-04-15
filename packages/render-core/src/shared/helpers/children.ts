import { Entity, GraphState, LinkKey } from "@graph-state/core";
import { isPartOfPrimary } from "@/shared/helpers/isPartOfPrimary";
import { createLayer } from "@/shared/helpers/createLayer";
import { getOverrider } from "@/shared/helpers/getOverrider";
import { definition } from "@fragmentsx/definition";
import { setKey } from "@/shared/helpers/keys";

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
  const parseChildren = children.map((child) => ({
    ...(manager.entityOfKey(child) ?? child),
    parent: setKey(target),
  }));

  if (targetEntity._type !== definition.nodes.Frame) {
    manager.mutate(manager.keyOfEntity(target), {
      children,
    });
    return;
  }

  const primaryTarget = getOverrider(manager, target);
  const isPrimaryTarget = isPartOfPrimary(manager, target);
  const resolveChildren = parseChildren.map(createLayer).filter(Boolean);

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

    console.log(override, overridesChildren);
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

export const insertChildren = (
  manager: GraphState,
  target: LinkKey,
  index: number,
  ...layerKeys: Entity[]
) => {
  appendChildren(manager, target, ...layerKeys);
  const targetLayer = manager.resolve(target);
  const overrideLayers = (targetLayer?.overrides ?? []).map(manager.resolve);

  [targetLayer, ...overrideLayers].forEach((layer) => {
    const children = layer?.children ?? [];
    const appendedLayers = children.slice(layerKeys.length * -1);
    const nextChildren = children.slice(0, layerKeys.length * -1);
    nextChildren.splice(index, 0, ...appendedLayers);

    manager.mutate(
      manager.keyOfEntity(layer),
      (prev) => ({
        ...prev,
        children: nextChildren,
      }),
      { replace: true }
    );
  });
};

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
