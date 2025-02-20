import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'
import { useRenderTarget as useRenderTargetLib } from '@fragments/renderer-editor'

export const useRenderTarget = () => {
  const { documentManager } = useBuilderDocument()
  return useRenderTargetLib(documentManager)
}
