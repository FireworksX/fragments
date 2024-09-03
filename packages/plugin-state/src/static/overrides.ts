import { Entity, LinkKey, Plugin } from "@graph-state/core";

export const overrides: Plugin = (state) => {
  state.isEmpty = (value: unknown) =>
    typeof value === undefined || value == null;

  /**
   * Перезаписывается ли в данный момент это поле
   */
  state.isOverrideFromField = (entity: Entity, fieldKey: string) => {
    const resolvedEntity: any =
      typeof entity === "string" ? state.resolve(entity) : entity;
    const resolvedOverride: any = state.resolve(
      resolvedEntity?.overrideFrom ?? ""
    );
    const fieldValue = resolvedEntity?.[fieldKey];
    return !!resolvedOverride && !fieldValue;
  };

  /**
   * true - если кто-то перезаписывает Entity
   */
  state.hasOverrider = (entity: Entity) => {
    const resolvedEntity: any =
      typeof entity === "string" ? state.resolve(entity) : entity;
    return !!resolvedEntity?.overrideFrom;
  };

  state.resetOverride = (entity: Entity, field: string) => {
    state.mutate(state.keyOfEntity(entity) as any, {
      [field]: null,
    });
  };

  state.resolveValue = (link: LinkKey, field: string) => {
    const graph: any = state.resolve(link);
    const value = graph?.[field];

    if (!state.isEmpty(value) && !state.isOverrideFromField(value)) {
      return value;
    } else if (graph?.overrideFrom) {
      return state.resolveValue(graph.overrideFrom, field);
    }

    return undefined;
  };
};
