import * as v from "valibot";
import { getMetadata } from "@/helpers/layerField";

interface Options {
  withFallback?: boolean;
  // Слой с которого брать данные если их нет у rawLayer
  overrideTarget?: unknown;
}

export const normalizeLayer = (
  schema: v.ObjectSchema<any, any>,
  rawLayer: unknown,
  options?: Options
) => {
  try {
    if (!rawLayer) return null;

    const withFallback = options?.withFallback ?? true;
    const overrideTarget = options?.overrideTarget;

    const parsedLayer = v.parse(schema, rawLayer);

    return Object.fromEntries(
      Object.entries(schema.entries).map(([key, schemaEntity]) => {
        const schemaMeta = getMetadata(schemaEntity);
        const fallback = withFallback ? schemaMeta?.fallback : null;

        const overrideValue =
          schemaMeta?.overridable !== false && overrideTarget
            ? overrideTarget?.[key]
            : null;

        const resultValue = parsedLayer[key] ?? overrideValue ?? fallback;
        return [key, resultValue];
      })
    );
  } catch (e) {
    console.error(e);
    return null;
  }
};
