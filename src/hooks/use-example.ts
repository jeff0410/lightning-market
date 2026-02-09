import { useState } from 'react'
import { exampleService } from '../services/example.service'
import type { AxiosError } from 'axios'

export const useExample = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchUsers = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await exampleService.getUsers()
      return response.data
    } catch (err) {
      const error = err as AxiosError
      setError(error.message)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const createUser = async (data: { name: string; email: string }) => {
    setLoading(true)
    setError(null)
    try {
      const response = await exampleService.createUser(data)
      return response.data
    } catch (err) {
      const error = err as AxiosError
      setError(error.message)
      throw error
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    error,
    fetchUsers,
    createUser,
  }
}
