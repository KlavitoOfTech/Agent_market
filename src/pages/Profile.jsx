import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  User,
  Mail,
  Calendar,
  Bookmark,
  FolderHeart,
  Pencil,
  Check,
  X,
  Sparkles,
} from 'lucide-react'

import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'

export default function Profile() {
  const { user } = useAuth()

  const [profile, setProfile] = useState(null)
  const [savedCount, setSavedCount] = useState(0)
  const [collectionCount, setCollectionCount] = useState(0)

  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)

  const [fullName, setFullName] = useState('')
  const [username, setUsername] = useState('')

  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  /*
  |--------------------------------------------------------------------------
  | Fetch profile
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    if (user) {
      fetchProfile()
    }
  }, [user])

  const fetchProfile = async () => {
    setLoading(true)
    setError('')

    try {
      /*
       * Get profile information.
       *
       * This assumes you have a profiles table with:
       *
       * id
       * username
       * full_name
       */

      const { data: profileData, error: profileError } =
        await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .maybeSingle()

      if (profileError) {
        console.error('Profile error:', profileError)
      }

      setProfile(profileData)

      setFullName(
        profileData?.full_name ||
        user.user_metadata?.full_name ||
        ''
      )

      setUsername(
        profileData?.username ||
        user.user_metadata?.username ||
        ''
      )

      /*
       * Get saved agents count
       */

      const { count: savedAgentsCount, error: savedError } =
        await supabase
          .from('saved_agents')
          .select('*', {
            count: 'exact',
            head: true,
          })
          .eq('user_id', user.id)

      if (savedError) {
        console.error('Saved agents error:', savedError)
      }

      setSavedCount(savedAgentsCount || 0)

      /*
       * Get collections count
       */

      const { count: collectionsCount, error: collectionsError } =
        await supabase
          .from('collections')
          .select('*', {
            count: 'exact',
            head: true,
          })
          .eq('user_id', user.id)

      if (collectionsError) {
        console.error('Collections error:', collectionsError)
      }

      setCollectionCount(collectionsCount || 0)

    } catch (err) {
      console.error('Profile loading error:', err)
      setError('Unable to load your profile.')
    }

    setLoading(false)
  }

  /*
  |--------------------------------------------------------------------------
  | Save profile
  |--------------------------------------------------------------------------
  */

  const handleSave = async () => {
    if (!user) return

    setSaving(true)
    setMessage('')
    setError('')

    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          full_name: fullName,
          username: username,
          updated_at: new Date().toISOString(),
        })

      if (error) {
        console.error('Update profile error:', error)
        setError(error.message)
        setSaving(false)
        return
      }

      /*
       * Also update Supabase Auth metadata.
       */

      const { error: authError } =
        await supabase.auth.updateUser({
          data: {
            full_name: fullName,
            username: username,
          },
        })

      if (authError) {
        console.error('Auth metadata error:', authError)
      }

      setMessage('Profile updated successfully.')
      setEditing(false)

      await fetchProfile()

    } catch (err) {
      console.error(err)
      setError('Something went wrong while updating your profile.')
    }

    setSaving(false)
  }

  /*
  |--------------------------------------------------------------------------
  | Cancel editing
  |--------------------------------------------------------------------------
  */

  const handleCancel = () => {
    setFullName(
      profile?.full_name ||
      user?.user_metadata?.full_name ||
      ''
    )

    setUsername(
      profile?.username ||
      user?.user_metadata?.username ||
      ''
    )

    setEditing(false)
    setMessage('')
    setError('')
  }

  /*
  |--------------------------------------------------------------------------
  | Display information
  |--------------------------------------------------------------------------
  */

  const displayName =
    fullName ||
    username ||
    user?.user_metadata?.full_name ||
    user?.email?.split('@')[0] ||
    'User'

  const firstLetter =
    displayName.charAt(0).toUpperCase()

  const memberSince = user?.created_at
    ? new Date(user.created_at).toLocaleDateString(
        'en-US',
        {
          month: 'long',
          year: 'numeric',
        }
      )
    : 'Recently'

  /*
  |--------------------------------------------------------------------------
  | Loading
  |--------------------------------------------------------------------------
  */

  if (loading) {
    return (
      <div className="min-h-screen bg-[#070b14] text-white">

        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">

          <div className="h-8 w-40 animate-pulse rounded-lg bg-white/5" />

          <div className="mt-8 h-64 animate-pulse rounded-3xl border border-white/10 bg-[#0d1421]" />

          <div className="mt-6 grid gap-4 sm:grid-cols-3">

            <div className="h-28 animate-pulse rounded-2xl bg-[#0d1421]" />
            <div className="h-28 animate-pulse rounded-2xl bg-[#0d1421]" />
            <div className="h-28 animate-pulse rounded-2xl bg-[#0d1421]" />

          </div>

        </div>

      </div>
    )
  }

  /*
  |--------------------------------------------------------------------------
  | Profile page
  |--------------------------------------------------------------------------
  */

  return (
    <div className="min-h-screen bg-[#070b14] text-white">

      {/* Background effects */}

      <div className="pointer-events-none fixed inset-0 overflow-hidden">

        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-purple-600/10 blur-3xl" />

        <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl" />

      </div>

      <main className="relative mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">

        {/* Header */}

        <div className="flex items-center justify-between">

          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
          >
            <ArrowLeft size={17} />
            Back to Dashboard
          </Link>

        </div>

        {/* Profile hero */}

        <section className="relative mt-8 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#111827] via-[#0d1424] to-[#090d18] p-6 sm:p-8">

          {/* Glow */}

          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-purple-600/20 blur-3xl" />

          <div className="absolute bottom-0 left-1/3 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl" />

          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

            {/* User */}

            <div className="flex items-center gap-5">

              {/* Avatar */}

              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl bg-gradient-to-br from-purple-500 to-blue-500 text-2xl font-bold shadow-xl shadow-purple-900/30">

                {firstLetter}

              </div>

              <div>

                <div className="flex items-center gap-2">

                  <h1 className="text-2xl font-bold sm:text-3xl">
                    {displayName}
                  </h1>

                  <Sparkles
                    size={18}
                    className="text-purple-400"
                  />

                </div>

                <p className="mt-1 text-sm text-slate-500">
                  {user?.email}
                </p>

                <p className="mt-2 text-xs text-slate-600">
                  Member since {memberSince}
                </p>

              </div>

            </div>

            {/* Edit button */}

            {!editing && (
              <button
                type="button"
                onClick={() => {
                  setEditing(true)
                  setMessage('')
                  setError('')
                }}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white"
              >
                <Pencil size={16} />
                Edit Profile
              </button>
            )}

          </div>

        </section>

        {/* Messages */}

        {message && (
          <div className="mt-5 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-400">
            {message}
          </div>
        )}

        {error && (
          <div className="mt-5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        )}

        {/* Stats */}

        <section className="mt-6 grid gap-4 sm:grid-cols-3">

          {/* Saved */}

          <Link
            to="/saved"
            className="group rounded-2xl border border-white/10 bg-[#0d1421] p-5 transition hover:-translate-y-1 hover:border-purple-500/30"
          >

            <div className="flex items-center justify-between">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
                <Bookmark size={21} />
              </div>

              <span className="text-2xl font-bold">
                {savedCount}
              </span>

            </div>

            <p className="mt-4 text-sm font-medium">
              Saved Agents
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Agents you've saved
            </p>

          </Link>

          {/* Collections */}

          <Link
            to="/collections"
            className="group rounded-2xl border border-white/10 bg-[#0d1421] p-5 transition hover:-translate-y-1 hover:border-blue-500/30"
          >

            <div className="flex items-center justify-between">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                <FolderHeart size={21} />
              </div>

              <span className="text-2xl font-bold">
                {collectionCount}
              </span>

            </div>

            <p className="mt-4 text-sm font-medium">
              Collections
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Your AI collections
            </p>

          </Link>

          {/* Member */}

          <div className="rounded-2xl border border-white/10 bg-[#0d1421] p-5">

            <div className="flex items-center justify-between">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                <Calendar size={21} />
              </div>

              <span className="text-sm font-semibold text-emerald-400">
                Active
              </span>

            </div>

            <p className="mt-4 text-sm font-medium">
              Account Status
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Your Agent Market account
            </p>

          </div>

        </section>

        {/* Profile information */}

        <section className="mt-8 rounded-2xl border border-white/10 bg-[#0d1421] p-6 sm:p-8">

          <div className="flex items-center justify-between">

            <div>

              <h2 className="text-xl font-bold">
                Profile Information
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Manage the information associated with your account.
              </p>

            </div>

            {!editing && (
              <User
                size={21}
                className="text-purple-400"
              />
            )}

          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">

            {/* Full name */}

            <div>

              <label className="mb-2 block text-sm font-medium text-slate-300">
                Full name
              </label>

              {editing ? (
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Your full name"
                  className="w-full rounded-xl border border-white/10 bg-[#101827] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/10"
                />
              ) : (
                <div className="rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3 text-sm text-slate-300">
                  {fullName || 'Not set'}
                </div>
              )}

            </div>

            {/* Username */}

            <div>

              <label className="mb-2 block text-sm font-medium text-slate-300">
                Username
              </label>

              {editing ? (
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Your username"
                  className="w-full rounded-xl border border-white/10 bg-[#101827] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/10"
                />
              ) : (
                <div className="rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3 text-sm text-slate-300">
                  {username || 'Not set'}
                </div>
              )}

            </div>

            {/* Email */}

            <div>

              <label className="mb-2 block text-sm font-medium text-slate-300">
                Email address
              </label>

              <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3">

                <Mail
                  size={17}
                  className="text-slate-500"
                />

                <span className="truncate text-sm text-slate-300">
                  {user?.email}
                </span>

              </div>

              <p className="mt-2 text-xs text-slate-600">
                Email is managed by your authentication provider.
              </p>

            </div>

            {/* Account ID */}

            <div>

              <label className="mb-2 block text-sm font-medium text-slate-300">
                Account ID
              </label>

              <div className="truncate rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3 text-xs text-slate-500">
                {user?.id}
              </div>

            </div>

          </div>

          {/* Edit actions */}

          {editing && (
            <div className="mt-8 flex flex-wrap justify-end gap-3 border-t border-white/10 pt-6">

              <button
                type="button"
                onClick={handleCancel}
                disabled={saving}
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white disabled:opacity-50"
              >
                <X size={16} />
                Cancel
              </button>

              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 px-5 py-3 text-sm font-semibold transition hover:from-purple-500 hover:to-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
              >

                {saving ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Check size={16} />
                    Save Changes
                  </>
                )}

              </button>

            </div>
          )}

        </section>

        {/* Interests */}

        <section className="mt-8 rounded-2xl border border-white/10 bg-[#0d1421] p-6 sm:p-8">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
              <Sparkles size={19} />
            </div>

            <div>

              <h2 className="font-bold">
                Your AI Interests
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Used to personalize your Agent Market experience.
              </p>

            </div>

          </div>

          <div className="mt-6 flex flex-wrap gap-2">

            {profile?.interests?.length > 0 ? (

              profile.interests.map((interest) => (
                <span
                  key={interest}
                  className="rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1.5 text-xs font-medium text-purple-300"
                >
                  {interest}
                </span>
              ))

            ) : (

              <p className="text-sm text-slate-500">
                No interests selected yet.
              </p>

            )}

          </div>

          <Link
            to="/onboarding"
            className="mt-6 inline-flex text-sm font-medium text-purple-400 transition hover:text-purple-300"
          >
            Update interests →
          </Link>

        </section>

        {/* Footer */}

        <footer className="mt-10 border-t border-white/10 py-8 text-center text-xs text-slate-600">

          © {new Date().getFullYear()} Agent Market

        </footer>

      </main>

    </div>
  )
}