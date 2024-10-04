import {
  $isTextNode,
  DOMConversion,
  DOMConversionMap,
  DOMConversionOutput,
  NodeKey,
  TextNode,
  SerializedTextNode
} from 'lexical'

export class ExtendedTextNode extends TextNode {
  constructor(text: string, key?: NodeKey) {
    super(text, key)
  }

  static getType(): string {
    return 'extended-text'
  }

  static clone(node: ExtendedTextNode): ExtendedTextNode {
    return new ExtendedTextNode(node.__text, node.__key)
  }

  static importDOM(): DOMConversionMap | null {
    const importers = TextNode.importDOM()
    return {
      ...importers,
      span: () => ({
        conversion: patchStyleConversion(importers?.span),
        priority: 1
      }),
      strong: () => ({
        conversion: patchStyleConversion(importers?.strong),
        priority: 1
      })
    }
  }

  static importJSON(serializedNode: SerializedTextNode): TextNode {
    return TextNode.importJSON(serializedNode)
  }

  exportJSON(): SerializedTextNode {
    return super.exportJSON()
  }
}

function patchStyleConversion(
  originalDOMConverter?: (node: HTMLElement) => DOMConversion | null
): (node: HTMLElement) => DOMConversionOutput | null {
  return node => {
    const original = originalDOMConverter?.(node)
    if (!original) {
      return null
    }
    const originalOutput = original.conversion(node)

    if (!originalOutput) {
      return originalOutput
    }

    const backgroundColor = node.style.backgroundColor
    const color = node.style.color
    const fontFamily = node.style.fontFamily
    const fontWeight = node.style.fontWeight
    const fontSize = node.style.fontSize
    const lineHeight = node.style.lineHeight
    const textDecoration = node.style.textDecoration
    const textTransform = node.style.textTransform

    return {
      ...originalOutput,
      forChild: (lexicalNode, parent) => {
        const originalForChild = originalOutput?.forChild ?? (x => x)
        const result = originalForChild(lexicalNode, parent)

        if ($isTextNode(result)) {
          const style = [
            backgroundColor ? `background-color: ${backgroundColor}` : null,
            color ? `color: ${color}` : null,
            fontFamily ? `font-family: ${fontFamily}` : null,
            fontWeight ? `font-weight: ${fontWeight}` : null,
            fontSize ? `font-size: ${fontSize}` : null,
            textDecoration ? `text-decoration: ${textDecoration}` : null,
            textTransform ? `text-transform: ${textTransform}` : null,
            lineHeight ? `line-height: ${lineHeight}` : null
          ]
            .filter(value => value != null)
            .join('; ')

          if (style.length) {
            return result.setStyle(style)
          }
        }
        return result
      }
    }
  }
}
