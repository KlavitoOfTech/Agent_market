import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Bot,
  Mail,
  Lock,
  ArrowRight,
  Eye,
  EyeOff,
  Sparkles,
  Check,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    setError('')
    setLoading(true)

    const { error } = await login({
      email,
      password,
    })

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
            Don't have an account?

            <Link
              to="/signup"
              className="ml-2 font-semibold text-purple-400 transition hover:text-purple-300"
            >
              Sign up
            </Link>
          </div>

        </div>
      </header>

      {/* Main */}
      <main className="relative z-10 flex min-h-[calc(100vh-80px)] items-center justify-center px-4 py-12 sm:px-6">

        <div className="grid w-full max-w-6xl overflow-hidden rounded-3xl border border-white/10 bg-[#0b111d]/80 shadow-2xl shadow-black/30 backdrop-blur-xl lg:grid-cols-2">

          {/* Left side */}
          <div className="relative hidden overflow-hidden border-r border-white/10 bg-gradient-to-br from-purple-900/20 via-[#0b111d] to-blue-900/10 p-10 lg:flex lg:flex-col lg:justify-between">

            {/* Background glow */}
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-purple-600/20 blur-3xl" />

            <div className="relative">

              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1.5 text-xs font-medium text-purple-300">
                <Sparkles size={14} />
                Welcome Back
              </div>

              <h1 className="max-w-md text-4xl font-bold leading-tight">
                Your gateway to the
                <span className="block bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  AI ecosystem.
                </span>
              </h1>

              <p className="mt-5 max-w-md text-sm leading-7 text-slate-400">
                Discover AI agents, track emerging trends, explore new
                releases, and stay ahead of what's happening in AI.
              </p>

            </div>

            {/* Benefits */}
            <div className="relative mt-10 space-y-4">

              <Benefit
                title="Discover AI Agents"
                description="Find the right AI tools for your workflow."
              />

              <Benefit
                title="Stay Ahead of Trends"
                description="Track what's gaining momentum in AI."
              />

              <Benefit
                title="Build Your Collection"
                description="Save agents you want to explore later."
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

          {/* Login form */}
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
                Welcome back
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Sign in to continue exploring Agent Market.
              </p>

            </div>

            {/* Error */}
            {error && (
              <div className="mb-5 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm leading-6 text-red-400">
                {error}
              </div>
            )}

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              {/* Email */}
              <div>

                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  Email address
                </label>

                <div className="relative">

                  <Mail
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                  />

                  <input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="
                      w-full rounded-xl border border-white/10
                      bg-[#0d1421]
                      py-3.5 pl-11 pr-4
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

              {/* Password */}
              <div>

                <div className="mb-2 flex items-center justify-between">

                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-slate-300"
                  >
                    Password
                  </label>

                  <button
                    type="button"
                    className="text-xs font-medium text-purple-400 transition hover:text-purple-300"
                  >
                    Forgot password?
                  </button>

                </div>

                <div className="relative">

                  <Lock
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                  />

                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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

              </div>

              {/* Remember */}
              <div className="flex items-center gap-3">

                <div className="flex h-4 w-4 items-center justify-center rounded border border-purple-500/40 bg-purple-500/10">
                  <Check
                    size={11}
                    className="text-purple-400"
                  />
                </div>

                <span className="text-xs text-slate-500">
                  Keep me signed in
                </span>

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
                    Logging in...
                  </>
                ) : (
                  <>
                    Sign in

                    <ArrowRight
                      size={17}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </>
                )}
              </button>

            </form>

            {/* Signup */}
            <p className="mt-7 text-center text-sm text-slate-500">
              Don't have an account?

              <Link
                to="/signup"
                className="ml-1 font-semibold text-purple-400 transition hover:text-purple-300"
              >
                Create one
              </Link>
            </p>

            {/* Divider */}
            <div className="my-7 flex items-center gap-4">

              <div className="h-px flex-1 bg-white/5" />

              <span className="text-xs text-slate-600">
                Secure authentication
              </span>

              <div className="h-px flex-1 bg-white/5" />

            </div>

            <p className="text-center text-xs leading-5 text-slate-600">
              Your account is securely authenticated through
              Agent Market's authentication system.
            </p>

          </div>

        </div>

      </main>

    </div>
  )
}


/* -------------------------------- */
/* Benefit Component                */
/* -------------------------------- */

function Benefit({
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