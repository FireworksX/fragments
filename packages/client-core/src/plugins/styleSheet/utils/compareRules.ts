export type CSSRules = Record<string, string | number>;

export function compareRules(
  prev: CSSRules = {},
  next: CSSRules = {}
): CSSRules {
  const diff: CSSRules = {};

  // Сравниваем каждое свойство из next
  for (const key of Object.keys(next)) {
    if (prev[key] !== next[key]) {
      diff[key] = next[key];
    }
  }

  return diff;
}
