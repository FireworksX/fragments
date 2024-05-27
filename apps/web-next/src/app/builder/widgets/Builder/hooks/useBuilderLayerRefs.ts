import { useCallback, useContext, useMemo } from 'react'
import { useStore } from '@nanostores/react'
import {
  $builderView,
  $layers,
  $statex,
  selectLayerAction,
  selectLayerActionNew
} from '../../../store/builderRouterStore'
import { useBuilderAssetsComponents } from '../../../routes/BuilderRoute/widgets/BuilderAssets/hooks/useBuilderAssetsComponents'
import { builderNodes } from '../../../data/promos/creators'
import isBrowser from '../../../utils/isBrowser'
import { useBuilderSelection } from '../../../hooks/useBuilderSelection'
import { BuilderContext } from '@/app/builder/widgets/Builder/BuilderContext'

export interface OnClickSelectorOptions {
  layerKey: string
  variantKey?: string
  componentKey?: string
  instanceKey?: string
}

export const useBuilderLayerRefs = () => {
  const { graphState } = useContext(BuilderContext)
  const { selection, select } = useBuilderSelection()
  const { activeLayerField, rootLayerField, fullLayerKey } = useStore($layers)
  const builderView = useStore($builderView)
  const { open: openComponent } = useBuilderAssetsComponents()

  const findRefNodes = useCallback((fullKey: string[]) => {
    if (fullKey) {
      return Array.from(document.querySelectorAll(`[data-key="${fullKey.at(-1)}"][data-root-key="${fullKey.at(0)}"]`))
    }
    return []
  }, [])

  const findRefNode = useCallback((nodeKey: string) => {
    if (nodeKey && isBrowser) {
      return document.querySelector(`[data-key="${nodeKey}"]`)
    }
    return null
  }, [])

  const onMouseEnter = useCallback((e: MouseEvent) => {
    // console.log(e.target?.getBoundingClientRect())
  }, [])

  const onMouseLeave = useCallback(e => {
    // console.log(e)
  }, [])

  const onClick = useCallback(
    (e, options: OnClickSelectorOptions) => {
      e.preventDefault()
      e.stopPropagation()

      // $builderView.set('default')
      // if (e.detail === 2) {
      //   $layers.setKey('openLayerField', options.layerKey)
      //   // $builderView.set('textEdit')
      //   // $richText.setKey(
      //   //   'layerKey',
      //   //   entityOfKey(options.layerKey)?._type === constants.Text ? options.layerKey : undefined
      //   // )
      // } else {
      //   // $richText.setKey('layerKey', undefined)
      // }

      /*
      Если тыкать на внутренний элемент компонента, то нужно
      прерывать показ параметров. Т.к. для просмотра внутренностей
      нужно перейти в режим просмотра "component"
       */
      // if (options.componentKey) {
      //   const topLevelComponentKey = options.tree.find(leaf => entityOfKey(leaf)?._type === constants.Component)
      //   const topLevelVariantKey = options.tree.find(leaf => entityOfKey(leaf)?._type === constants.ComponentVariant)
      //

      if (options.componentKey) {
        const componentNode = graphState.resolve(options.instanceKey ?? options.componentKey)
        /*
          Если мы находимся в режиме просмотра экранов и 2 раза нажимаем,
          то нужно открыть компонент.
           */
        if (e.detail === 2 && builderView !== 'component') {
          openComponent(options.componentKey)
          // if (componentNode?._type === builderNodes.ComponentInstance) {
          //   openComponent(componentNode.mainComponent.slice(1))
          // } else {
          //   openComponent(options.componentKey)
          // }
        } else if (builderView === 'component') {
          /*
            Если мы в режиме просмотра "компонент" и 2 раза нажимаем,
            то открываем внутренний компонент.
             */
          if (e.detail === 2) {
            openComponent(options.componentKey)
          } else {
            select(options.layerKey)
          }

          // if (e.detail === 2 && options.componentKey) {
          //   openComponent(options.componentKey)
          // } else if (options.parentComponentKey) {
          //   /*
          //   Если мы нажали на слой который находится внутри другого
          //   компонента, нужно подсветить компонент в котором находится слой.
          //    */
          //   selectLayerAction(options.componentKey, topLevelComponentKey, options.tree)
          // } else {
          //   selectLayerAction(options.layerKey, topLevelVariantKey, options.tree)
          // }
        } else {
          select(componentNode)
        }

        return
      }

      const clickedLayerValue = graphState.resolve(options.layerKey)

      if (clickedLayerValue?._type === builderNodes.Text) {
        if (e.detail === 2) {
          $layers.setKey('openLayerField', options.layerKey)
          select(options.layerKey)
          return
        }
      }

      if (activeLayerField !== options.layerKey) {
        $layers.setKey('openLayerField', undefined)
        select(options.layerKey)
        selectLayerAction(options.layerKey, options.rootKey, options.tree)
        selectLayerActionNew(options.tree)
      }
    },
    [activeLayerField, builderView, openComponent, graphState]
  )

  const activeRefs = useMemo(() => (isBrowser ? findRefNodes(fullLayerKey) : []), [fullLayerKey, findRefNodes])
  const activeRef = useMemo(() => (isBrowser ? document.querySelector(`[data-key="${selection}"]`) : null), [selection])

  return {
    activeRefs,
    activeRef,
    onMouseEnter,
    onMouseLeave,
    findRefNodes,
    findRefNode,
    onClick
  }
}
