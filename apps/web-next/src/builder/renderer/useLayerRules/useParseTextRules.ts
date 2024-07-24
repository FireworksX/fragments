import { useGraph } from '@graph-state/react'
import { builderNodes } from '@fragments/fragments-plugin'
import { useContext } from 'react'
import { BuilderContext } from '@/builder/BuilderContext'
import { useLayerInvoker } from '@/builder/hooks/useLayerInvoker'
import { useSerializeText } from '@/builder/hooks/useSerializeText'

export const useParseTextRules = (layerField: Field) => {
  const { documentManager } = useContext(BuilderContext)
  const [layerValue] = useGraph(documentManager, layerField)
  const layerInvoker = useLayerInvoker(layerField)
  const serialize = useSerializeText()

  let content = ''

  if (layerValue?._type === builderNodes.Text) {
    content = serialize(layerInvoker('content').value)
  }

  return content
}
