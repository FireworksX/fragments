export const setKey = (v: string) => `$${v}`;

export const getKey = (v: string) => (isKey(v) ? v.slice(1) : null);

export const isKey = (v: string) => typeof v === "string" && v.startsWith("$");
