export const capitalize = (string?: string) =>
  string ? string?.charAt(0).toUpperCase() + string?.toLowerCase()?.slice(1) : string
