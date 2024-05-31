import { iterator, Visitor } from "./iterator";
import { get, isPrimitive } from "./index";
import { AnyObject } from "../types";

/**
 *
 * @param target - Объект, который будет заполняться
 * @param input - Данные, которыми будет заполняться target
 * @param customFilter - Кастомный Фильтр, если возвращает true - данные заменяются, иначе нет
 */
export const mergeIterator = (target: AnyObject, input: AnyObject, customFilter?: Visitor<boolean, [unknown, unknown]>) =>
  iterator(target, (key, value, path) => {
    if (isPrimitive(value) || (Array.isArray(value) && value.every(isPrimitive))) {
      if (customFilter) {
        if (customFilter(key, [value, get(input, path)], path)) {
          return get(input, path, value)
        } else {
          return value
        }
      }
      return get(input, path, value)
    }

    return value
  })
