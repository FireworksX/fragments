'use client'
import { ElementRef, FC, PropsWithChildren, ReactNode, useRef } from 'react'
import Tippy, { TippyProps } from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'
import { isBrowser } from '@fragments/utils'

export interface PopoverProps extends TippyProps, PropsWithChildren {
  appendTo?: TippyProps['appendTo'] | 'body'
  trigger?: TippyProps['trigger'] | 'rightClick'
  content?: ReactNode
  className?: string
}

export type Instance = Parameters<NonNullable<TippyProps['onCreate']>>[0]

const Popover: FC<PopoverProps> = ({ className, content, children, trigger, appendTo, ...restProps }) => {
  const targetRef = useRef<ElementRef<'div'>>()

  const onCreate: TippyProps['onCreate'] = instance => {
    if (trigger === 'rightClick') {
      // TODO Make unsubscribe
      targetRef.current?.addEventListener('contextmenu', event => {
        event.preventDefault()
        instance.show()
      })
    }

    if (restProps.onCreate) {
      restProps.onCreate(instance)
    }
  }

  const closeHandler = (instance: Instance) => instance.hide()

  return (
    <Tippy
      className={className}
      content={content}
      trigger={trigger === 'rightClick' ? 'manual' : trigger}
      appendTo={appendTo === 'body' && isBrowser ? document.body : appendTo}
      {...restProps}
      onCreate={onCreate}
      onShown={instance => {
        if (restProps.hideOnClick) {
          instance.popper.addEventListener('click', () => closeHandler(instance))
        }
      }}
      onHide={instance => instance.popper.removeEventListener('click', () => closeHandler(instance))}
    >
      <div ref={targetRef}>{children}</div>
    </Tippy>
  )
}

export default Popover
