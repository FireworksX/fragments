// ✅ Генератор короткого хеша из строки ключа "LayerType:LayerId"
export function hashGenerator(layerKey: string): string {
  let hash = 0;
  for (let i = 0; i < layerKey.length; i++) {
    hash = (hash << 5) - hash + layerKey.charCodeAt(i);
    hash |= 0;
  }
  const raw = Math.abs(hash).toString(36);
  // Ensure hash does not start with a digit (invalid CSS selector class)
  return /^[0-9]/.test(raw) ? `h${raw}` : raw;
}
