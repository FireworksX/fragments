
export interface EventEmitter<TEvents extends AnyEvents = AnyEvents> {
  on<TKey extends keyof TEvents>(event: TKey, callback: TEvents[TKey]): ReturnType<TEvents[TKey]>

  /**
   * Метод emit() принимает event который нужно вызвать + параметры
   * Возвращает массив того что вернули подписчики
   */
  emit<TKey extends keyof TEvents>(event: TKey, ...args: Parameters<TEvents[TKey]>): ReturnType<TEvents[TKey]>[]
  has<TKey extends keyof TEvents>(event: TKey): boolean
  get<TKey extends keyof TEvents>(event: TKey): unknown
  reset(): void
}

export type AnyEvents = Record<any, () => any>

export const eventEmitter = <TEvents extends AnyEvents = AnyEvents>(): EventEmitter<TEvents> => {
  let listeners = {} as Record<keyof TEvents, TEvents[keyof TEvents][]>

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const on = <TKey extends keyof TEvents>(event: TKey, callback: TEvents[TKey]): ReturnType<TEvents[TKey]> => {
    if (event in listeners) {
      listeners[event].push(callback)
    } else {
      listeners[event] = [callback]
    }
  }

  const emit = <TKey extends keyof TEvents>(
    event: TKey,
    ...args: Parameters<TEvents[TKey]>
  ): ReturnType<TEvents[TKey]>[] => {
    if (event in listeners) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return listeners[event].map(cb => cb(...args)).filter(Boolean)
    }

    return []
  }

  const reset = () => (listeners = {} as typeof listeners)
  const has = (event: keyof TEvents) => event in listeners
  const get = (event: keyof TEvents) => listeners[event]

  return {
    on,
    has,
    get,
    emit,
    reset
  }
}
