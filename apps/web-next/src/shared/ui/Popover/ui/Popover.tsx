'use client'
import { ComponentRef, ElementRef, FC, PropsWithChildren, ReactNode, useRef } from 'react'
import Tippy, { TippyProps } from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'
import { isBrowser } from '@fragments/utils'

export interface PopoverProps extends TippyProps, PropsWithChildren {
  appendTo?: TippyProps['appendTo'] | 'body'
  trigger?: TippyProps['trigger'] | 'rightClick'
  content?: ReactNode
  className?: string
  stopPropagation?: boolean
}

export type Instance = Parameters<NonNullable<TippyProps['onCreate']>>[0]

const Popover: FC<PopoverProps> = ({
  className,
  content,
  children,
  trigger,
  appendTo,
  stopPropagation,
  ...restProps
}) => {
  const targetRef = useRef<ComponentRef<'div'>>()

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

  const handleClickTarget = e => {
    if (stopPropagation) {
      e.stopPropagation()
    }
  }

  return (
    <Tippy
      className={className}
      content={content}
      trigger={trigger === 'rightClick' ? 'manual' : trigger}
      appendTo={appendTo === 'body' && isBrowser ? document.body : appendTo}
      offset={restProps.arrow === false ? [0, 5] : undefined}
      {...restProps}
      onCreate={onCreate}
      onShown={instance => {
        if (restProps.hideOnClick) {
          instance.popper.addEventListener('click', () => closeHandler(instance))
        }
        restProps?.onShown?.(instance)
      }}
      onHide={instance => {
        instance.popper.removeEventListener('click', () => closeHandler(instance))
        restProps?.onHide?.(instance)
      }}
    >
      <div ref={targetRef} onClick={event => handleClickTarget(event)}>
        {children}
      </div>
    </Tippy>
  )
}

export default Popover
