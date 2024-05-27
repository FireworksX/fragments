import { useHotkeys } from 'react-hotkeys-hook'
import { useBuilderActions } from './useBuilderActions'

export const useBuilderHotkeys = () => {
  const { remove, removeWrapper, wrapFrame, duplicate, addFrame, addText, convertToComponent, toggleVisible } =
    useBuilderActions()

  useHotkeys('backspace', remove)
  useHotkeys('mod+;', () => toggleVisible())
  useHotkeys('mod+backspace', removeWrapper)
  useHotkeys('mod+enter', wrapFrame)
  useHotkeys('mod+d', keyboardEvent => {
    keyboardEvent.preventDefault()
    duplicate()
  })
  useHotkeys('mod+k', keyboardEvent => {
    keyboardEvent.preventDefault()
    convertToComponent()
  })
  useHotkeys('ctrl+f', addFrame)
  useHotkeys('ctrl+t', addText)
}
