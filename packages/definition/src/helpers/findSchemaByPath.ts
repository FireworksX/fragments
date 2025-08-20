import { type Schema, type BaseSchema } from "valibot";

/**
 * Рекурсивно находит вложенную схему по пути (например, "address.city")
 * @param schema - Корневая схема Valibot
 * @param path - Путь через точки (например, "user.address.street")
 * @returns Найденная вложенная схема или undefined
 */
export function findSchemaByPath(
  schema: Schema,
  path: string
): BaseSchema | undefined {
  if (!path) return undefined;

  const parts = path.split(".");
  let current: any = schema;

  for (const part of parts) {
    if (!current || typeof current !== "object") return undefined;

    // Для объектов
    if ("entries" in current) {
      if (!(part in current.entries)) return undefined;
      current = current.entries[part];
    } else if ("wrapped" in current && "entries" in current.wrapped) {
      current = current.wrapped.entries[part];
    }
  }

  return current as BaseSchema;
}
