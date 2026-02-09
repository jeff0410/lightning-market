import { api } from './axios'
import type { ApiResponse } from '../types/api'

export const apiClient = {
  get: async <T = any>(url: string, params?: any): Promise<ApiResponse<T>> => {
    const response = await api.get(url, { params })
    return response.data
  },

  post: async <T = any>(url: string, data?: any): Promise<ApiResponse<T>> => {
    const response = await api.post(url, data)
    return response.data
  },

  put: async <T = any>(url: string, data?: any): Promise<ApiResponse<T>> => {
    const response = await api.put(url, data)
    return response.data
  },

  patch: async <T = any>(url: string, data?: any): Promise<ApiResponse<T>> => {
    const response = await api.patch(url, data)
    return response.data
  },

  delete: async <T = any>(url: string): Promise<ApiResponse<T>> => {
    const response = await api.delete(url)
    return response.data
  },
}
