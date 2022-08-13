export const isExternalSVG = (path) => {
  if (/^(https?:|mailto:|tel:)/.test(path)) {
    return true
  }
  return false
}
