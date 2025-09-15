import { Entity, GraphState, LinkKey } from "@graph-state/core";
import { isPartOfPrimary } from "@/shared/helpers/isPartOfPrimary";
import { createLayer } from "@/shared/helpers/createLayer";
import { getOverrider } from "@/shared/helpers/getOverrider";
import { definition } from "@fragmentsx/definition";
import { setKey } from "@/shared/helpers/keys";
import { pick } from "@fragmentsx/utils";
import { cloneLayer } from "@/shared/helpers/cloneLayer";
import { duplicateLayer } from "@/shared/helpers/duplicateLayer";

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
  const parseChildren = children
    .map((child) =>
      createLayer({
        ...(manager.entityOfKey(child) ?? child),
        parent: setKey(manager.keyOfEntity(target)),
      })
    )
    .filter(Boolean);

  if (targetEntity._type !== definition.nodes.Frame) {
    manager.mutate(manager.keyOfEntity(target), {
      children: parseChildren,
    });
    return;
  }

  const primaryTarget = getOverrider(manager, target);
  const isPrimaryTarget = isPartOfPrimary(manager, target);

  (primaryTarget?.overrides ?? []).forEach((override) => {
    const overridesChildren = parseChildren
      .map((child) => {
        const nextChild = createLayer(
          {
            ...pick(child, "parent", "_type"),
            overrideFrom: setKey(manager.keyOfEntity(child)),
          },
          true
        );

        if (!isPrimaryTarget) {
          nextChild.visible = true;
        }

        return nextChild;
      })
      .filter(Boolean);

    overridesChildren.forEach((child, index) => {
      const primaryChild = parseChildren.at(index);
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

  // TODO Должен скрываться со всех других экранов, не только с primary
  manager.mutate(manager.keyOfEntity(primaryTarget), {
    children: parseChildren.map((child) => ({
      ...child,
      visible: isPrimaryTarget,
    })),
  });

  return parseChildren.map(manager.keyOfEntity);
};

export const insertChildren = (
  manager: GraphState,
  target: Entity,
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

export const moveChildren = (
  manager: GraphState,
  targetKey: Entity,
  toKey: Entity,
  index: number
) => {
  const targetClone = duplicateLayer(manager, targetKey, true);

  // TODO ну нужно удалять детей
  insertChildren(manager, toKey, index, targetClone);
  removeChildren(manager, targetKey);
};
