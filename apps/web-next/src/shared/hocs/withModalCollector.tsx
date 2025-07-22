import { ModalCollector } from '@/widgets/ModalCollector'
import { ModalCollectorProps } from '@/widgets/ModalCollector/ui/ModalCollector'
import { ComponentType } from 'react'

export const withModalCollector =
  <TProps,>(WrappedComponent: ComponentType<TProps>, modals: ModalCollectorProps['modals']) =>
  (props: TProps) => {
    return (
      <ModalCollector modals={modals}>
        <WrappedComponent {...(props as any)} />
      </ModalCollector>
    )
  }
