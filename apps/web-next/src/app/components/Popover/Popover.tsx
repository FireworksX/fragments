'use client'
import { ElementRef, FC, PropsWithChildren, ReactNode, useRef } from 'react'
import Tippy, { TippyProps } from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'
import isBrowser from '@/app/utils/isBrowser'

export interface PopoverProps extends TippyProps, PropsWithChildren {
  appendTo?: TippyProps['appendTo'] | 'body'
  trigger?: TippyProps['trigger'] | 'rightClick'
  content?: ReactNode
  className?: string
}

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

  return (
    <Tippy
      className={className}
      content={content}
      onCreate={onCreate}
      trigger={trigger === 'rightClick' ? 'manual' : trigger}
      appendTo={appendTo === 'body' && isBrowser ? document.body : appendTo}
      {...restProps}
    >
      <div ref={targetRef}>{children}</div>
    </Tippy>
  )
}

export default Popover
