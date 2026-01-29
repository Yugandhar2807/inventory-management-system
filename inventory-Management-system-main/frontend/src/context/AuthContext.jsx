import React, { createContext, useState, useEffect } from 'react'
import api from '../services/api'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('token'))
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (token) api.defaults.headers.common['Authorization'] = `Bearer ${token}`
    else delete api.defaults.headers.common['Authorization']
  }, [token])

  const login = async ({ email, password }) => {
    setLoading(true)
    try {
      const res = await api.post('/auth/login', { email, password })
      const t = res.data.token
      setToken(t)
      localStorage.setItem('token', t)
      setLoading(false)
      return { success: true }
    } catch (err) {
      setLoading(false)
      return { success: false, error: err.response?.data?.message || err.message }
    }
  }

  const register = async ({ name, email, password }) => {
    setLoading(true)
    try {
      await api.post('/auth/register', { name, email, password })
      setLoading(false)
      return { success: true }
    } catch (err) {
      setLoading(false)
      return { success: false, error: err.response?.data?.message || err.message }
    }
  }

  const logout = () => {
    setToken(null)
    localStorage.removeItem('token')
    delete api.defaults.headers.common['Authorization']
  }

  return (
    <AuthContext.Provider value={{ token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}