// Функция для глубокого слияния объектов
export function deepMergeObjects<T extends object, U extends object>(
  base: T,
  update: U
): T & U {
  const result = { ...base } as T & U;

  for (const key in update) {
    const baseValue = (base as any)[key];
    const updateValue = (update as any)[key];

    if (Array.isArray(updateValue)) {
      // Копируем массивы
      result[key] = [...updateValue];
    } else if (
      typeof baseValue === "object" &&
      typeof updateValue === "object"
    ) {
      // Рекурсивно сливаем вложенные объекты
      result[key] = deepMergeObjects(baseValue || {}, updateValue);
    } else {
      // Копируем скалярные значения
      result[key] = updateValue;
    }
  }

  return result;
}
