import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { useLayerPropertyValue } from '@/shared/hooks/fragmentBuilder/useLayerPropertyVariable'
import { entityOfKey } from '@graph-state/core'
import { RenderDropdown } from '@/shared/ui/RenderDropdown'
import styles from './styles.module.css'

export const VariablesList = props => {
  const {
    layerVariable: {
      setVariableOption: { options: contentAllowedVariables }
    }
  } = useLayerPropertyValue('content', {
    ignoreDefaultSetValue: true,
    onSetValue: value => {
      console.log(value)
    }
  })
  const [selectedIndex, setSelectedIndex] = useState(0)

  const selectItem = index => {
    const item = props.items[index]

    if (item) {
      props.command({ id: item })
    }
  }

  // const upHandler = () => {
  //   setSelectedIndex((selectedIndex + props.items.length - 1) % props.items.length)
  // }
  //
  // const downHandler = () => {
  //   setSelectedIndex((selectedIndex + 1) % props.items.length)
  // }

  // const enterHandler = () => {
  //   selectItem(selectedIndex)
  // }
  //
  // useEffect(() => setSelectedIndex(0), [props.items])
  //
  // useImperativeHandle(ref, () => ({
  //   onKeyDown: ({ event }) => {
  //     if (event.key === 'ArrowUp') {
  //       upHandler()
  //       return true
  //     }
  //
  //     if (event.key === 'ArrowDown') {
  //       downHandler()
  //       return true
  //     }
  //
  //     if (event.key === 'Enter') {
  //       enterHandler()
  //       return true
  //     }
  //
  //     return false
  //   }
  // }))

  return null

  return <RenderDropdown className={styles.root} options={contentAllowedVariables} pause />

  // return (
  //   <div className='dropdown-menu'>
  //     {props.items.length ? (
  //       props.items.map((item, index) => (
  //         <button
  //           className={index === selectedIndex ? 'is-selected' : ''}
  //           key={index}
  //           onClick={() => selectItem(index)}
  //         >
  //           {item}
  //         </button>
  //       ))
  //     ) : (
  //       <div className='item'>No result</div>
  //     )}
  //   </div>
  // )
}
