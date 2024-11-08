export const useExtendStyle = (sourceStyle, overrideStyle = {}) => {
  const copyStyle = Object.assign({}, sourceStyle)

  Object.entries(overrideStyle).forEach(([key, value]) => {
    if (value !== undefined) {
      copyStyle[key] = typeof value === 'function' ? value(copyStyle[key]) : value
    }
  })

  return copyStyle
}
