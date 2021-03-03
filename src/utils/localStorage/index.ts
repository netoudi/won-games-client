const APP_KEY = 'WONGAMES'

export function getStorageItem(key: string) {
  // no Next via Server/Static NÃO tem window
  if (typeof window === 'undefined') return

  const data = window.localStorage.getItem(`${APP_KEY}_${key}`)
  return JSON.parse(data!)
}

export function setStorageItem(key: string, value: string[]) {
  // no Next via Server/Static NÃO tem window
  if (typeof window === 'undefined') return

  const data = JSON.stringify(value)
  window.localStorage.setItem(`${APP_KEY}_${key}`, data)
}
