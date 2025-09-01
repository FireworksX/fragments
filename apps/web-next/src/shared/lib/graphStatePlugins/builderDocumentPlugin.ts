import { entityOfKey, Plugin } from '@graph-state/core'

export const builderDocumentPlugin: Plugin = state => {
  const builderKey = 'BuilderDocument:root'

  state.mutate(builderKey, {
    isSaving: false,
    savingState: false
  })

  state.$builder = {
    ...entityOfKey(builderKey),
    setSaving: (flag: boolean) => state.mutate(builderKey, { isSaving: flag }),
    setSavingState: (savingState: string) => state.mutate(builderKey, { savingState: savingState })
  }
}
