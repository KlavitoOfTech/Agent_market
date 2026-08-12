import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Bot,
  Mail,
  Lock,
  User,
  AtSign,
  ArrowRight,
  Eye,
  EyeOff,
  Sparkles,
  Check,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function Signup() {
  const { signup } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
  })

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    setError('')
    setLoading(true)

    const { error } = await signup(form)

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen bg-[#070b14] text-white">

      {/* Background effects */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-purple-600/10 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl" />

        <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/5 blur-3xl" />
      </div>

      {/* Navbar */}
      <header className="relative z-10 border-b border-white/10 bg-[#070b14]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">

          <Link
            to="/"
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 shadow-lg shadow-purple-900/20">
              <Bot size={22} />
            </div>

            <span className="text-lg font-bold tracking-tight">
              Agent Market
            </span>
          </Link>

          <div className="text-sm text-slate-400">
            Already have an account?

            <Link
              to="/login"
              className="ml-2 font-semibold text-purple-400 transition hover:text-purple-300"
            >
              Sign in
            </Link>
          </div>

        </div>
      </header>

      {/* Main */}
      <main className="relative z-10 flex min-h-[calc(100vh-80px)] items-center justify-center px-4 py-12 sm:px-6">

        <div className="grid w-full max-w-6xl overflow-hidden rounded-3xl border border-white/10 bg-[#0b111d]/80 shadow-2xl shadow-black/30 backdrop-blur-xl lg:grid-cols-2">

          {/* Left side */}
          <div className="relative hidden overflow-hidden border-r border-white/10 bg-gradient-to-br from-purple-900/20 via-[#0b111d] to-blue-900/10 p-10 lg:flex lg:flex-col lg:justify-between">

            {/* Glow */}
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-purple-600/20 blur-3xl" />

            <div className="relative">

              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1.5 text-xs font-medium text-purple-300">
                <Sparkles size={14} />
                Welcome to Agent Market
              </div>

              <h1 className="max-w-md text-4xl font-bold leading-tight">
                Discover the future of
                <span className="block bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  AI Agents.
                </span>
              </h1>

              <p className="mt-5 max-w-md text-sm leading-7 text-slate-400">
                Join Agent Market and discover AI agents, emerging trends,
                new releases, and the tools shaping the future of technology.
              </p>

            </div>

            {/* Feature list */}
            <div className="relative mt-10 space-y-4">

              <Feature
                title="Discover AI Agents"
                description="Explore useful AI tools and agents."
              />

              <Feature
                title="Track AI Trends"
                description="Stay ahead of emerging technologies."
              />

              <Feature
                title="Save Your Favorites"
                description="Keep your most useful agents in one place."
              />

            </div>

            {/* Robot */}
            <div className="relative mt-12 flex justify-center">

              <div className="relative flex h-40 w-40 items-center justify-center rounded-[2.5rem] border border-purple-400/20 bg-gradient-to-br from-purple-500/20 to-blue-500/10 shadow-2xl shadow-purple-900/20">

                <div className="absolute inset-0 rounded-[2.5rem] bg-purple-500/10 blur-2xl" />

                <Bot
                  size={82}
                  strokeWidth={1}
                  className="relative text-purple-300"
                />

              </div>

            </div>

          </div>

          {/* Signup form */}
          <div className="p-6 sm:p-10 lg:p-12">

            {/* Mobile logo */}
            <div className="mb-8 flex items-center gap-3 lg:hidden">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-blue-600">
                <Bot size={21} />
              </div>

              <span className="font-bold">
                Agent Market
              </span>

            </div>

            <div className="mb-8">

              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
                <Sparkles size={22} />
              </div>

              <h2 className="text-2xl font-bold sm:text-3xl">
                Create your account
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Start discovering the best AI agents and trends.
              </p>

            </div>

            {/* Error */}
            {error && (
              <div className="mb-5 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm leading-6 text-red-400">
                {error}
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              {/* Full name */}
              <InputField
                label="Full name"
                name="fullName"
                type="text"
                placeholder="Enter your full name"
                value={form.fullName}
                onChange={handleChange}
                icon={User}
              />

              {/* Username */}
              <InputField
                label="Username"
                name="username"
                type="text"
                placeholder="Choose a username"
                value={form.username}
                onChange={handleChange}
                icon={AtSign}
              />

              {/* Email */}
              <InputField
                label="Email address"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                icon={Mail}
              />

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  Password
                </label>

                <div className="relative">

                  <Lock
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                  />

                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Create a password"
                    value={form.password}
                    onChange={handleChange}
                    className="
                      w-full rounded-xl border border-white/10
                      bg-[#0d1421]
                      py-3.5 pl-11 pr-12
                      text-sm text-white
                      outline-none
                      transition
                      placeholder:text-slate-600
                      focus:border-purple-500/60
                      focus:ring-2
                      focus:ring-purple-500/10
                    "
                    required
                    minLength={6}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-white"
                    aria-label={
                      showPassword
                        ? 'Hide password'
                        : 'Show password'
                    }
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>

                </div>

                <p className="mt-2 text-xs text-slate-600">
                  Password must be at least 6 characters.
                </p>

              </div>

              {/* Terms */}
              <div className="flex items-start gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-4">

                <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border border-purple-500/40 bg-purple-500/10">
                  <Check
                    size={11}
                    className="text-purple-400"
                  />
                </div>

                <p className="text-xs leading-5 text-slate-500">
                  By creating an account, you agree to the Agent Market
                  terms and privacy policy.
                </p>

              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="
                  group flex w-full items-center justify-center
                  gap-2 rounded-xl
                  bg-gradient-to-r from-purple-600 to-blue-600
                  py-3.5
                  text-sm font-semibold
                  shadow-lg shadow-purple-900/20
                  transition
                  hover:from-purple-500
                  hover:to-blue-500
                  hover:shadow-purple-900/30
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >
                {loading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Creating account...
                  </>
                ) : (
                  <>
                    Create account

                    <ArrowRight
                      size={17}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </>
                )}
              </button>

            </form>

            {/* Login */}
            <p className="mt-7 text-center text-sm text-slate-500">
              Already have an account?

              <Link
                to="/login"
                className="ml-1 font-semibold text-purple-400 transition hover:text-purple-300"
              >
                Sign in
              </Link>
            </p>

          </div>

        </div>

      </main>

    </div>
  )
}


/* -------------------------------- */
/* Input Component                  */
/* -------------------------------- */

function InputField({
  label,
  name,
  type,
  placeholder,
  value,
  onChange,
  icon: Icon,
}) {
  return (
    <div>

      <label
        htmlFor={name}
        className="mb-2 block text-sm font-medium text-slate-300"
      >
        {label}
      </label>

      <div className="relative">

        <Icon
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
        />

        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="
            w-full rounded-xl border border-white/10
            bg-[#0d1421]
            px-4 py-3.5 pl-11
            text-sm text-white
            outline-none
            transition
            placeholder:text-slate-600
            focus:border-purple-500/60
            focus:ring-2
            focus:ring-purple-500/10
          "
          required
        />

      </div>

    </div>
  )
}


/* -------------------------------- */
/* Feature Component                */
/* -------------------------------- */

function Feature({
  title,
  description,
}) {
  return (
    <div className="flex items-start gap-3">

      <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400">
        <Check size={15} />
      </div>

      <div>
        <h3 className="text-sm font-semibold text-slate-200">
          {title}
        </h3>

        <p className="mt-1 text-xs text-slate-500">
          {description}
        </p>
      </div>

    </div>
  )
}