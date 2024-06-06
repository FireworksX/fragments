import { useBuilderSelection } from '@/app/builder/widgets/Builder/hooks/useBuilderSelection'
import { useLayerInvokerNew } from '@/app/builder/widgets/Builder/hooks/useLayerInvokerNew'
import { useContext } from 'react'
import { BuilderContext } from '@/app/builder/widgets/Builder/BuilderContext'
import { builderEffectType } from '@fragments/fragments-plugin'

export const useBuilderEffects = () => {
  const { graphState } = useContext(BuilderContext)
  const { selection, selectionGraph } = useBuilderSelection()
  const layerInvoker = useLayerInvokerNew(selection, ({ key, value, node }) => {
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
    graphState.resolve(selection).removeEffect(type)
  }

  return {
    selectionGraph,
    addEffect,
    effects: effects.value,
    clickEffect,
    resetEffect
  }
}
