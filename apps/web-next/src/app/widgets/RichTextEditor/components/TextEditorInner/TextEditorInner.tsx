import { FC, useCallback, useContext } from 'react'
import { Editable } from 'slate-react'
import { CSS } from '@react-spring/web'
import { GraphValue } from '@graph-state/react'
import { BuilderContext } from '@/builder/BuilderContext'
import { useDisplayColor } from '@/builder/hooks/useDisplayColor'

interface TextEditorInnerProps {
  className?: string
}

const Leaf = ({ attributes, children, leaf }) => {
  // const statex = useStore($statex)
  const { documentManager } = useContext(BuilderContext)
  const { getColor } = useDisplayColor()
  const style: CSS.Properties = {}

  Object.entries(leaf).forEach(([key, value]) => {
    switch (key) {
      case 'fontSize':
        style.fontSize = value
        break
      case 'weight':
        style.fontWeight = value
        break
      case 'lineHeight':
        style.lineHeight = value
        break
      case 'letterSpacing':
        style.letterSpacing = value
        break
      case 'align':
        style.textAlign = value
        break
      case 'transform':
        style.textTransform = value
        break
      case 'decoration':
        style.textDecoration = value
        break
      case 'color':
        style.color = value
        break
    }
  })

  return (
    <GraphValue graphState={documentManager} field={style.color}>
      {value => (
        <span
          {...attributes}
          style={{
            ...style,
            color: getColor(value)
          }}
        >
          {children}
        </span>
      )}
    </GraphValue>
  )
}

const TextEditorInner: FC<TextEditorInnerProps> = ({ className }) => {
  const renderLeaf = useCallback(props => <Leaf {...props} />, [])

  return (
    <Editable
      className={className}
      renderLeaf={renderLeaf}
      spellCheck
      autoFocus
      style={{ wordWrap: 'normal', height: '100%' }}
    />
  )
}

export default TextEditorInner
