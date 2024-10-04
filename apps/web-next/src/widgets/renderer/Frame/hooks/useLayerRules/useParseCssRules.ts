import * as CSS from 'csstype'
import { useLayerInvokerNew } from '../useLayerInvokerNew.ts'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { useContext } from 'react'
import { useLayerInvoker } from '@/shared/hooks/fragmentBuilder/useLayerInvoker'

const getCssRules = (cssText?: string) => {
  const rules: CSS.Properties = {}
  const placeholderNode = true && document.createElement('div')

  if (placeholderNode && typeof cssText === 'string') {
    placeholderNode.style.cssText = cssText
    Object.entries(placeholderNode.style)
      .filter(([key, value]) => value?.length && isNaN(+key))
      .forEach(([key, value]) => (rules[key] = value))
  }

  return rules
}

export const useParseCssRules = (layerField: Field) => {
  const { documentManager } = useContext(BuilderContext)
  const layerInvoker = useLayerInvoker(layerField)

  // const layerInvoker = useLayerInvokerNew(layerField);
  // const cssText = layerInvoker("cssText");
  // const cssLinks = layerInvoker("cssLinks");
  //
  // const cssTextRules = getCssRules(cssText.value);
  // const cssLinkRules = cssLinks.value?.reduce?.((acc, link: EntityKey) => {
  //   const linkValue = graphState?.resolve(link);
  //   if (linkValue) {
  //     return {
  //       ...acc,
  //       ...getCssRules(linkValue.cssText),
  //     };
  //   }
  //
  //   return acc;
  // }, {});
  //
  // return {
  //   ...cssLinkRules,
  //   ...cssTextRules,
  // };
}
