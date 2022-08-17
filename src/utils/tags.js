const blackList = ['/login', '/import', '/404', '/401']
export const isTags = path => {
  return !blackList.includes(path)
}
