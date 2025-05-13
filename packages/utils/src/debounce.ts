type DebouncedFunction<T extends (...args: any[]) => any> = {
  (...args: Parameters<T>): ReturnType<T> | undefined;
  cancel: () => void;
  flush: () => ReturnType<T> | undefined;
};

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  immediate: boolean = false
): DebouncedFunction<T> {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  let lastArgs: Parameters<T> | null = null;
  let lastThis: any;
  let result: ReturnType<T> | undefined;
  let lastCallTime: number | null = null;

  const later = () => {
    const timeSinceLastCall = Date.now() - (lastCallTime || 0);

    if (timeSinceLastCall < wait && timeSinceLastCall >= 0) {
      timeoutId = setTimeout(later, wait - timeSinceLastCall);
    } else {
      if (!immediate) {
        result = func.apply(lastThis, lastArgs!);
      }
      timeoutId = null;
      lastArgs = null;
      lastThis = null;
    }
  };

  const debounced: DebouncedFunction<T> = function (
    this: any,
    ...args: Parameters<T>
  ): ReturnType<T> | undefined {
    lastCallTime = Date.now();
    lastArgs = args;
    lastThis = this;

    const callNow = immediate && !timeoutId;

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(later, wait);

    if (callNow) {
      result = func.apply(lastThis, lastArgs);
    }

    return result;
  };

  debounced.cancel = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = null;
    lastArgs = null;
    lastThis = null;
  };

  debounced.flush = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
      const res = func.apply(lastThis, lastArgs!);
      lastArgs = null;
      lastThis = null;
      return res;
    }
    return result;
  };

  return debounced;
}
