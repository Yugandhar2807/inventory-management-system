import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export default function Login() {
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async e => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    const res = await login(form)
    setLoading(false)
    if (res.success) navigate('/dashboard')
    else setError(res.error || 'Login failed')
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-6 rounded shadow">
        <h2 className="text-2xl mb-4">Login</h2>
        {error && <div className="text-red-600 mb-3">{error}</div>}
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange}
               className="w-full mb-3 p-2 border rounded" />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange}
               className="w-full mb-3 p-2 border rounded" />
        <button type="submit" disabled={loading}
                className="w-full bg-blue-600 text-white py-2 rounded">{loading ? 'Logging in...' : 'Login'}</button>
        <p className="mt-3 text-center">Don't have an account? <Link to="/register" className="text-blue-600">Register</Link></p>
      </form>
    </div>
  )
}