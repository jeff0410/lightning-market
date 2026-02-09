import axios, {
  type AxiosError,
  type AxiosInstance,
  type InternalAxiosRequestConfig,
} from 'axios'
import { /* clearAuthStorage, */ getLanguage /* , getToken */ } from './storage'

const instance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  timeout: 10000,
  maxContentLength: 24576,
  maxBodyLength: 24576,
  headers: {
    'Content-Type': 'application/json',
  },
})

instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    // const token = getToken()
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`
    // }

    const language = getLanguage()
    config.headers['Accept-Language'] = language

    if (config.method === 'get' && config.params) {
      const cleanedParams = Object.fromEntries(
        Object.entries(config.params).filter(
          ([_, v]) => v !== null && v !== undefined && v !== ''
        )
      )

      config.paramsSerializer = () => {
        const serialized = Object.keys(cleanedParams)
          .map((key) => {
            const value = cleanedParams[key]

            if (Array.isArray(value)) {
              return value
                .map((v) => `${encodeURIComponent(key)}=${encodeURIComponent(String(v))}`)
                .join('&')
            }

            return `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`
          })
          .filter((param) => param !== '')
          .join('&')

        return serialized
      }
    }

    return config
  },
  (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    // if (error.response?.status === 401) {
    //   clearAuthStorage()
    //   if (typeof window !== 'undefined') {
    //     window.location.href = '/login'
    //   }
    // }
    return Promise.reject(error)
  }
)

export const api = {
  get: instance.get.bind(instance),
  post: instance.post.bind(instance),
  put: instance.put.bind(instance),
  patch: instance.patch.bind(instance),
  delete: instance.delete.bind(instance),
}

export default instance
