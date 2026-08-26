import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Bot,
  ArrowLeft,
  User,
  Mail,
  Bell,
  Moon,
  Save,
  LogOut,
  Check,
  AlertCircle,
} from 'lucide-react'

import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'

export default function Settings() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')

  const [emailNotifications, setEmailNotifications] = useState(true)
  const [trendNotifications, setTrendNotifications] = useState(true)

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  /*
   * Load current user information
   */
  useEffect(() => {
    if (!user) return

    setEmail(user.email || '')

    setFullName(
      user.user_metadata?.full_name ||
      user.user_metadata?.username ||
      ''
    )
  }, [user])

  /*
   * Save settings
   */
  const handleSave = async (e) => {
    e.preventDefault()

    setLoading(true)
    setMessage('')
    setError('')

    try {
      /*
       * Update Supabase Auth metadata
       */
      const { error: authError } =
        await supabase.auth.updateUser({
          data: {
            full_name: fullName,
            email_notifications: emailNotifications,
            trend_notifications: trendNotifications,
          },
        })

      if (authError) {
        throw authError
      }

      /*
       * Update profile table if you have one
       */
      if (user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .update({
            full_name: fullName,
          })
          .eq('id', user.id)

        /*
         * We don't stop the whole save if the profiles
         * table doesn't have the full_name column yet.
         */
        if (profileError) {
          console.log(
            'Profile update:',
            profileError.message
          )
        }
      }

      setMessage('Settings saved successfully.')
    } catch (err) {
      setError(
        err.message || 'Failed to save settings.'
      )
    } finally {
      setLoading(false)
    }
  }

  /*
   * Logout
   */
  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  /*
   * Not logged in
   */
  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#070b14] text-white">
        <div className="text-center">
          <h1 className="text-xl font-bold">
            Please log in
          </h1>

          <Link
            to="/login"
            className="mt-4 inline-block rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 px-5 py-3 text-sm font-semibold"
          >
            Go to Login
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#070b14] text-white">

      {/* Navbar */}
      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#070b14]/90 backdrop-blur-xl">

        <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">

          <Link
            to="/dashboard"
            className="flex items-center gap-3"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-blue-600">
              <Bot size={20} />
            </div>

            <span className="font-bold">
              Agent Market
            </span>
          </Link>

          <Link
            to="/dashboard"
            className="flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
          >
            <ArrowLeft size={16} />
            Dashboard
          </Link>

        </div>

      </header>

      {/* Main */}
      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-8">

          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
            <User size={24} />
          </div>

          <h1 className="text-3xl font-bold">
            Settings
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Manage your Agent Market account and preferences.
          </p>

        </div>

        {/* Success message */}
        {message && (
          <div className="mb-6 flex items-center gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm text-emerald-400">
            <Check size={18} />
            {message}
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="mb-6 flex items-center gap-3 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400">
            <AlertCircle size={18} />
            {error}
          </div>
        )}

        <form onSubmit={handleSave}>

          {/* Account */}
          <section className="rounded-2xl border border-white/10 bg-[#0d1421] p-6">

            <div className="mb-6">

              <h2 className="text-lg font-bold">
                Account
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Update your personal information.
              </p>

            </div>

            <div className="space-y-5">

              {/* Full name */}
              <div>

                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Full name
                </label>

                <div className="relative">

                  <User
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                  />

                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) =>
                      setFullName(e.target.value)
                    }
                    placeholder="Enter your name"
                    className="
                      w-full rounded-xl
                      border border-white/10
                      bg-[#101827]
                      py-3.5 pl-11 pr-4
                      text-sm text-white
                      outline-none
                      placeholder:text-slate-600
                      focus:border-purple-500/50
                    "
                  />

                </div>

              </div>

              {/* Email */}
              <div>

                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Email address
                </label>

                <div className="relative">

                  <Mail
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                  />

                  <input
                    type="email"
                    value={email}
                    disabled
                    className="
                      w-full rounded-xl
                      border border-white/10
                      bg-[#101827]/50
                      py-3.5 pl-11 pr-4
                      text-sm text-slate-500
                      outline-none
                      cursor-not-allowed
                    "
                  />

                </div>

                <p className="mt-2 text-xs text-slate-600">
                  Your login email cannot be changed here.
                </p>

              </div>

            </div>

          </section>

          {/* Notifications */}
          <section className="mt-6 rounded-2xl border border-white/10 bg-[#0d1421] p-6">

            <div className="mb-6">

              <h2 className="text-lg font-bold">
                Notifications
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Choose what updates you want to receive.
              </p>

            </div>

            <div className="space-y-4">

              {/* Email notifications */}
              <ToggleSetting
                icon={Mail}
                title="Email notifications"
                description="Receive important updates about your account."
                enabled={emailNotifications}
                onChange={() =>
                  setEmailNotifications(
                    !emailNotifications
                  )
                }
              />

              {/* Trend notifications */}
              <ToggleSetting
                icon={Bell}
                title="AI trend notifications"
                description="Get notified when important AI trends emerge."
                enabled={trendNotifications}
                onChange={() =>
                  setTrendNotifications(
                    !trendNotifications
                  )
                }
              />

            </div>

          </section>

          {/* Appearance */}
          <section className="mt-6 rounded-2xl border border-white/10 bg-[#0d1421] p-6">

            <div className="mb-6">

              <h2 className="text-lg font-bold">
                Appearance
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Customize how Agent Market looks.
              </p>

            </div>

            <div className="flex items-center justify-between rounded-xl border border-purple-500/20 bg-purple-500/5 p-4">

              <div className="flex items-center gap-4">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
                  <Moon size={19} />
                </div>

                <div>

                  <p className="text-sm font-semibold">
                    Dark mode
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Agent Market uses dark mode.
                  </p>

                </div>

              </div>

              <span className="rounded-full bg-purple-500/10 px-3 py-1 text-xs font-medium text-purple-300">
                Active
              </span>

            </div>

          </section>

          {/* Save */}
          <div className="mt-6 flex justify-end">

            <button
              type="submit"
              disabled={loading}
              className="
                flex items-center gap-2
                rounded-xl
                bg-gradient-to-r
                from-purple-600
                to-blue-600
                px-6 py-3
                text-sm font-semibold
                shadow-lg
                shadow-purple-900/20
                transition
                hover:from-purple-500
                hover:to-blue-500
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >

              <Save size={17} />

              {loading
                ? 'Saving...'
                : 'Save Changes'}

            </button>

          </div>

        </form>

        {/* Danger zone */}
        <section className="mt-10 rounded-2xl border border-red-500/20 bg-red-500/[0.03] p-6">

          <h2 className="text-lg font-bold text-red-400">
            Account
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Sign out of your Agent Market account.
          </p>

          <button
            onClick={handleLogout}
            className="
              mt-5 flex items-center gap-2
              rounded-xl
              border border-red-500/20
              bg-red-500/10
              px-5 py-3
              text-sm font-semibold
              text-red-400
              transition
              hover:bg-red-500/20
            "
          >
            <LogOut size={17} />
            Logout
          </button>

        </section>

      </main>

    </div>
  )
}


/* ================================= */
/* TOGGLE SETTING                    */
/* ================================= */

function ToggleSetting({
  icon: Icon,
  title,
  description,
  enabled,
  onChange,
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-white/5 bg-white/[0.02] p-4">

      <div className="flex items-center gap-4">

        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
          <Icon size={18} />
        </div>

        <div>

          <p className="text-sm font-semibold">
            {title}
          </p>

          <p className="mt-1 text-xs text-slate-500">
            {description}
          </p>

        </div>

      </div>

      <button
        type="button"
        onClick={onChange}
        className={`
          relative h-6 w-11 shrink-0 rounded-full
          transition
          ${enabled
            ? 'bg-purple-600'
            : 'bg-slate-700'
          }
        `}
        aria-label={`Toggle ${title}`}
      >

        <span
          className={`
            absolute top-1 h-4 w-4 rounded-full
            bg-white transition
            ${enabled
              ? 'left-6'
              : 'left-1'
            }
          `}
        />

      </button>

    </div>
  )
}