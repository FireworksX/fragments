export function getTransformValues(element: HTMLElement): { x: number; y: number } {
  const style = getComputedStyle(element)
  const transform = style.transform

  if (!transform || transform === 'none') {
    return { x: 0, y: 0 }
  }

  let x = 0
  let y = 0

  if (transform && transform !== 'none') {
    const matrixMatch = transform.match(/matrix\(([^)]+)\)/)
    if (matrixMatch) {
      const values = matrixMatch[1].split(',').map(v => parseFloat(v.trim()))
      if (values.length >= 6) {
        x = values[4] // translateX в пикселях
        y = values[5] // translateY в пикселях
      }
    }
  }

  //
  // // Парсим translate значения
  // const translateRegex = /translate(3d|X|Y)?\(([^)]+)\)/g
  // let match
  //
  // while ((match = translateRegex.exec(transform)) !== null) {
  //   const values = match[2].split(',').map(v => v.trim())
  //
  //   if (match[1] === 'X' || match[1] === undefined) {
  //     x += parseTransformValue(values[0], element.offsetWidth)
  //   }
  //
  //   if (match[1] === 'Y' || match[1] === undefined) {
  //     const valueIndex = match[1] === undefined ? (values[1] ? 1 : 0) : 0
  //     y += parseTransformValue(values[valueIndex], element.offsetHeight)
  //   }
  //
  //   if (match[1] === '3d' && values.length >= 3) {
  //     x += parseTransformValue(values[0], element.offsetWidth)
  //     y += parseTransformValue(values[1], element.offsetHeight)
  //   }
  // }
  //
  // const matrixRegex = /matrix(3d)?\(([^)]+)\)/g
  // let matrixMatch
  //
  // while ((matrixMatch = matrixRegex.exec(transform)) !== null) {
  //   const values = matrixMatch[2].split(',').map(v => v.trim())
  //
  //   if (matrixMatch[1] === '3d') {
  //     // matrix3d(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p)
  //     if (values.length >= 16) {
  //       x += parseTransformValue(values[12], element.offsetWidth) // m (translateX)
  //       y += parseTransformValue(values[13], element.offsetHeight) // n (translateY)
  //     }
  //   } else {
  //     // matrix(a, b, c, d, e, f)
  //     if (values.length >= 6) {
  //       console.log(values[4])
  //       x += parseTransformValue(values[4], element.offsetWidth) // e (translateX)
  //       y += parseTransformValue(values[5], element.offsetHeight) // f (translateY)
  //     }
  //   }
  // }

  return { x, y }
}

function parseTransformValue(value: string, referenceSize: number): number {
  if (value.endsWith('%')) {
    const percent = parseFloat(value)
    return (percent / 100) * referenceSize
  } else if (value.endsWith('px')) {
    return parseFloat(value)
  } else if (value.endsWith('vw')) {
    return (parseFloat(value) / 100) * window.innerWidth
  } else if (value.endsWith('vh')) {
    return (parseFloat(value) / 100) * window.innerHeight
  } else if (value.endsWith('em')) {
    return parseFloat(value) * 16 // assuming 1em = 16px
  } else if (value.endsWith('rem')) {
    return parseFloat(value) * 16 // assuming 1rem = 16px
  }

  return parseFloat(value) || 0
}

function parseTransformMatrix(transform: string): number[] | null {
  if (transform.startsWith('matrix(') || transform.startsWith('matrix3d(')) {
    const matrixValues = transform
      .replace(/^matrix(3d)?\(/, '')
      .replace(')', '')
      .split(',')
      .map(val => parseFloat(val.trim()))

    return matrixValues
  }
  return null
}

function parseValue(value: string): number {
  if (value.endsWith('px')) {
    return parseFloat(value)
  } else if (value.endsWith('%')) {
    return parseFloat(value) / 100
  }
  return parseFloat(value) || 0
}
