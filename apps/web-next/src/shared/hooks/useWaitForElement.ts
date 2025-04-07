import { useEffect, useState } from 'react'

export const useWaitForElement = (selector: string): HTMLElement | null => {
  const [element, setElement] = useState<HTMLElement | null>(null)

  useEffect(() => {
    // Если элемент уже есть в DOM — сразу возвращаем
    const existingElement = document.querySelector<HTMLElement>(selector)
    if (existingElement) {
      setElement(existingElement)
      return
    }

    // Иначе ждём его появления
    const observer = new MutationObserver(() => {
      const el = document.querySelector<HTMLElement>(selector)
      if (el) {
        setElement(el)
        observer.disconnect() // Как только нашли — отключаемся
      }
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true
    })

    // Очистка при размонтировании
    return () => observer.disconnect()
  }, [selector])

  return element
}
