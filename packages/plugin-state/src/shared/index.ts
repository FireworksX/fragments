export const setKey = (key: string) => `$$${key}`;
export const getKey = (key: string) =>
  typeof key === "string" && key.startsWith("$$") ? key.slice(2) : key;