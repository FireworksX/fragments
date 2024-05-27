export type BuilderFieldOverrides = ReturnType<ReturnType<typeof useBuilderFieldOverrides>>

export const useBuilderFieldOverrides = layer => {
  const statex = null //useStore($statex)

  return (key: string) => {
    const hasOverrideField = !statex?.hasOverride(layer, key)
    const hasOverrideEntity = statex?.hasOverride(layer)
    const hasOverride = !!(hasOverrideField && hasOverrideEntity)

    return {
      isOverride: hasOverride,
      actions: hasOverride
        ? [
            {
              label: 'Reset override',
              onClick: () => statex.resetOverride(layer, key)
            }
          ]
        : []
    }
  }
}
