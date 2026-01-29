import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export default function Register() {
  const { register } = useContext(AuthContext)
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    const res = await register(form)
    setLoading(false)
    if (res.success) navigate('/login')
    else setError(res.error || 'Registration failed')
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-6 rounded shadow">
        <h2 className="text-2xl mb-4">Register</h2>
        {error && <div className="text-red-600 mb-3">{error}</div>}
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange}
               className="w-full mb-3 p-2 border rounded" />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange}
               className="w-full mb-3 p-2 border rounded" />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange}
               className="w-full mb-3 p-2 border rounded" />
        <button type="submit" disabled={loading}
                className="w-full bg-green-600 text-white py-2 rounded">{loading ? 'Registering...' : 'Register'}</button>
        <p className="mt-3 text-center">Already have an account? <Link to="/login" className="text-blue-600">Login</Link></p>
      </form>
    </div>
  )
}