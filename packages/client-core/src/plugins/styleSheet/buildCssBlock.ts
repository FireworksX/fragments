export const buildCssBlock = (block) => {
  if (!block || block.css === "") return "";

  return `.${block.hash} {${block.css}}`;
};
