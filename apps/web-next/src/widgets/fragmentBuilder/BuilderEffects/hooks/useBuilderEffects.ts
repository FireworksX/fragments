import { builderEffectType } from '@fragments/fragments-plugin'
import { useLayerInvoker } from '@/builder/hooks/useLayerInvoker'
import { useBuilderSelection } from '@/builder/hooks/useBuilderSelection'

export const useBuilderEffects = () => {
  const { selection, selectionGraph } = useBuilderSelection()
  const layerInvoker = useLayerInvoker(selection, ({ key, value, node }) => {
    switch (key) {
      case 'effects':
        node.setEffect(value)
        break
    }
  })
  const effects = layerInvoker('effects')

  const addEffect = (type: keyof typeof builderEffectType) => {
    // effects.onChange(createEffect(type))
  }

  const clickEffect = (type: keyof typeof builderEffectType) => {
    const findEffect = effects.value?.find(e => e.type === type)

    if (findEffect) {
      if (type === builderEffectType.loop) {
        // $openPopout('loopEffect', {
        //   context: {
        //     value: findEffect,
        //     onChange: effects.onChange
        //   },
        //   initial: true
        // })
      }
    }
  }

  const resetEffect = (type: keyof typeof builderEffectType) => {
    documentManager.resolve(selection).removeEffect(type)
  }

  return {
    selectionGraph,
    addEffect,
    effects: effects.value,
    clickEffect,
    resetEffect
  }
}
