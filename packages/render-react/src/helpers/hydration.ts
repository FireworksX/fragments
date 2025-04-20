export function serializeData(data: any) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c"); // чтобы не сломать HTML
  return `<script id="fragmentsx-initial-data">window.FRAGMENTSX_DATA=${json}</script>`;
}

export function getHydratedData(id: string) {
  const el = document.getElementById(`fragments-data-${id}`);
  if (!el) return null;

  try {
    const data = JSON.parse(el.textContent || "");
    el.remove(); // удалить после использования
    return data;
  } catch (e) {
    console.error("Failed to parse preloaded fragment data", e);
    return null;
  }
}
