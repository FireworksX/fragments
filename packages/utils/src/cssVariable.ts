export const isCssLink = (value: unknown) =>
  typeof value === "string" ? value.startsWith("var(--") : false;

export const linkToCssVariable = (link: string) =>
  link ? `var(--${link?.split(":")?.[1]})` : link;

export const cssVariableToLink = (cssVariable: string) => {
  if (typeof cssVariable !== "string") return cssVariable;

  const cssMatch = cssVariable.match(/var\(--(.*?)\)/);
  if (cssMatch) {
    return `Variable:${cssMatch[1]}`;
  }
};
