import { nextTick } from '@/shared/utils/nextTick'

export function watchInlineStyleChange(element: HTMLElement, callback: () => void) {
  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
        callback()
        // const currentValue = element.style.getPropertyValue(property)
        // callback(currentValue)
      }
    })
  })

  observer.observe(element, { attributes: true, attributeFilter: ['style'], subtree: true })

  nextTick(() => {
    callback()
  })

  return () => observer.disconnect()
}
