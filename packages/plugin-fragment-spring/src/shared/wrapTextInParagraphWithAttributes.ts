import { isValue, toKebabCase } from "@fragments/utils";

const allowAttributes = [
  "fontSize",
  "fontWeight",
  "color",
  "lineHeight",
  "letterSpacing",
  "textTransform",
  "textDecoration",
  "textAlign",
];

/**
 * Оборачивает текст в параграф и добавляет стили
 * @param text - Чистый текст
 * @param attributes - Атрибуты параграфа (например, fontSize, color)
 * @returns {string} - HTML обёрнутый в <p> с атрибутами
 */
export const wrapTextInParagraphWithAttributes = (
  text: string,
  attributes: Record<string, any>
): string => {
  if (text.startsWith("<p")) return text;

  const style = Object.entries(attributes)
    .filter(
      ([key, value]) =>
        isValue(value) &&
        allowAttributes.includes(key) &&
        typeof value === "string" &&
        !!value.length
    )
    .map(([key, value]) => `${toKebabCase(key)}: ${value}`)
    .join("; ");

  return `<p style="${style}">${text}</p>`;
};
