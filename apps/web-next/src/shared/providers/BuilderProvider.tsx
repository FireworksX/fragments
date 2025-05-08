import { FC, memo, PropsWithChildren } from 'react'
import { RenderTargetProvider } from '@fragmentsx/render-suite'
import { HotKeysProvider } from '@/shared/hooks/hotkeys/HotKeysProvider'
import { useBuilderHotKeys } from '@/shared/hooks/hotkeys/useBuilderHotKeys'
import { CanvasTextEditorProvider } from '@/widgets/fragmentBuilder/BuilderHighlight'
import { ToastProvider } from '@/widgets/Toast/providers/ToastContext'

const MemoBuilder = memo(({ children }) => {
  return children
})

const BuilderProviderInitial: FC<PropsWithChildren> = ({ children }) => {
  useBuilderHotKeys()

  return <MemoBuilder>{children}</MemoBuilder>
}

export const BuilderProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <RenderTargetProvider>
      <ToastProvider>
        <HotKeysProvider>
          <CanvasTextEditorProvider>
            <BuilderProviderInitial>{children}</BuilderProviderInitial>
          </CanvasTextEditorProvider>
        </HotKeysProvider>
      </ToastProvider>
    </RenderTargetProvider>
  )
}
