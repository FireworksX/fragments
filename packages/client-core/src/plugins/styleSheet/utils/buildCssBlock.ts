export type CSSBlock = { hash: string; css: string };

export const buildCssBlock = (block: CSSBlock | undefined): string => {
  if (!block || block.css === "") return "";

  return `.${block.hash} {${block.css}}`;
};
