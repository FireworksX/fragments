import { AnyZodObject } from "zod";

interface Options {
  withFallback?: boolean;
  // Слой с которого брать данные если их нет у rawLayer
  overrideTarget?: unknown;
}

export const parseRawLayer = (
  schema: AnyZodObject,
  rawLayer: unknown,
  options?: Options
) => {
  try {
    if (!rawLayer) return null;

    const withFallback = options?.withFallback ?? true;
    const overrideTarget = options?.overrideTarget;
    const parsedLayer = schema.parse(rawLayer);

    return Object.fromEntries(
      Object.entries(schema.shape).map(([key, schemaEntity]) => {
        const schemaMeta = schemaEntity?.getMeta();
        const fallback = withFallback ? schemaMeta?.fallback : null;
        const overrideValue =
          schemaMeta?.overridable !== false && overrideTarget
            ? overrideTarget?.[key]
            : null;

        return [key, parsedLayer[key] ?? overrideValue ?? fallback];
      })
    );
  } catch (e) {
    console.error(e);
    return null;
  }
};
