export const storageKey = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
  LANGUAGE: 'language',
} as const

export const getToken = (): string | null => {
  return localStorage.getItem(storageKey.ACCESS_TOKEN)
}

export const setToken = (token: string): void => {
  localStorage.setItem(storageKey.ACCESS_TOKEN, token)
}

export const getRefreshToken = (): string | null => {
  return localStorage.getItem(storageKey.REFRESH_TOKEN)
}

export const setRefreshToken = (token: string): void => {
  localStorage.setItem(storageKey.REFRESH_TOKEN, token)
}

export const clearAuthStorage = (): void => {
  localStorage.removeItem(storageKey.ACCESS_TOKEN)
  localStorage.removeItem(storageKey.REFRESH_TOKEN)
}

export const getLanguage = (): string => {
  return localStorage.getItem(storageKey.LANGUAGE) ?? 'ko'
}

export const setLanguage = (language: string): void => {
  localStorage.setItem(storageKey.LANGUAGE, language)
}
