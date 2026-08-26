import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Heart,
  Plus,
  ArrowRight,
  Folder,
  X,
} from 'lucide-react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'

export default function Collections() {
  const { user } = useAuth()

  const [collections, setCollections] = useState([])
  const [loading, setLoading] = useState(true)

  const [showCreate, setShowCreate] = useState(false)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [creating, setCreating] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (user) {
      fetchCollections()
    }
  }, [user])

  const fetchCollections = async () => {
    setLoading(true)

    const { data, error } = await supabase
      .from('collections')
      .select(`
        id,
        name,
        description,
        created_at,
        collection_agents (
          id
        )
      `)
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Collections error:', error)
      setError('Unable to load collections.')
      setLoading(false)
      return
    }

    setCollections(data || [])
    setLoading(false)
  }

  const createCollection = async (e) => {
    e.preventDefault()

    if (!name.trim()) return

    setCreating(true)
    setError('')

    const { data, error } = await supabase
      .from('collections')
      .insert({
        user_id: user.id,
        name: name.trim(),
        description: description.trim() || null,
      })
      .select()
      .single()

    if (error) {
      console.error('Create collection error:', error)
      setError(error.message)
      setCreating(false)
      return
    }

    setCollections((current) => [
      {
        ...data,
        collection_agents: [],
      },
      ...current,
    ])

    setName('')
    setDescription('')
    setShowCreate(false)
    setCreating(false)
  }

  return (
    <div className="min-h-screen bg-[#070b14] text-white">

      {/* Header */}
      <header className="border-b border-white/10 bg-[#070b14]/90 backdrop-blur-xl">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-6 sm:px-8">

          <div className="flex items-center gap-3">

            <Link
              to="/dashboard"
              className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400"
            >
              <Heart size={21} />
            </Link>

            <div>
              <h1 className="text-2xl font-bold sm:text-3xl">
                Collections
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Organize your favorite AI agents.
              </p>
            </div>

          </div>

          <button
            onClick={() => setShowCreate(true)}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 px-4 py-3 text-sm font-semibold transition hover:from-purple-500 hover:to-blue-500"
          >
            <Plus size={17} />
            <span className="hidden sm:inline">
              New Collection
            </span>
          </button>

        </div>

      </header>

      {/* Main */}
      <main className="mx-auto max-w-7xl px-5 py-10 sm:px-8">

        {/* Hero */}
        <section className="relative mb-10 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-purple-900/20 via-[#0d1421] to-blue-900/10 p-6 sm:p-8">

          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-purple-600/20 blur-3xl" />

          <div className="relative">

            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1.5 text-xs font-medium text-purple-300">
              <Heart size={14} />
              Your AI Library
            </div>

            <h2 className="text-3xl font-bold sm:text-4xl">
              Organize your
              <span className="block bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                AI discoveries.
              </span>
            </h2>

            <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-400">
              Create collections to group the AI agents you want
              to use, research, or explore later.
            </p>

          </div>

        </section>

        {/* Error */}
        {error && (
          <div className="mb-6 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400">
            {error}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="py-20 text-center">

            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-purple-500" />

            <p className="mt-4 text-sm text-slate-500">
              Loading collections...
            </p>

          </div>
        )}

        {/* Collections */}
        {!loading && collections.length > 0 && (

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            {collections.map((collection) => (

              <Link
                key={collection.id}
                to={`/collections/${collection.id}`}
                className="group rounded-2xl border border-white/10 bg-[#0d1421] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-purple-500/30"
              >

                <div className="flex items-start justify-between">

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
                    <Folder size={23} />
                  </div>

                  <ArrowRight
                    size={18}
                    className="text-slate-600 transition group-hover:translate-x-1 group-hover:text-purple-400"
                  />

                </div>

                <h3 className="mt-6 font-semibold transition group-hover:text-purple-300">
                  {collection.name}
                </h3>

                <p className="mt-2 line-clamp-2 text-sm text-slate-500">
                  {collection.description ||
                    'A collection of your favorite AI agents.'}
                </p>

                <div className="mt-5 text-xs text-slate-600">
                  {collection.collection_agents?.length || 0}{' '}
                  {collection.collection_agents?.length === 1
                    ? 'agent'
                    : 'agents'}
                </div>

              </Link>

            ))}

          </div>
        )}

        {/* Empty */}
        {!loading && collections.length === 0 && (

          <div className="rounded-2xl border border-white/10 bg-[#0d1421] p-12 text-center">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-500/10 text-purple-400">
              <Folder size={26} />
            </div>

            <h3 className="mt-5 text-lg font-semibold">
              No collections yet
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              Create your first collection to organize the AI
              agents you're interested in.
            </p>

            <button
              onClick={() => setShowCreate(true)}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 px-5 py-3 text-sm font-semibold"
            >
              <Plus size={17} />
              Create Collection
            </button>

          </div>
        )}

      </main>

      {/* Create Modal */}
      {showCreate && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">

          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0d1421] p-6 shadow-2xl">

            <div className="flex items-center justify-between">

              <div>
                <h2 className="text-xl font-bold">
                  New Collection
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Organize your AI agents.
                </p>
              </div>

              <button
                onClick={() => setShowCreate(false)}
                className="rounded-lg p-2 text-slate-500 hover:bg-white/5 hover:text-white"
              >
                <X size={19} />
              </button>

            </div>

            <form
              onSubmit={createCollection}
              className="mt-6 space-y-5"
            >

              <div>

                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Collection name
                </label>

                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Coding Tools"
                  className="w-full rounded-xl border border-white/10 bg-[#101827] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-purple-500/50"
                  required
                />

              </div>

              <div>

                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Description
                </label>

                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="What is this collection for?"
                  rows={3}
                  className="w-full resize-none rounded-xl border border-white/10 bg-[#101827] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-purple-500/50"
                />

              </div>

              <button
                type="submit"
                disabled={creating}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 py-3 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-50"
              >
                {creating ? 'Creating...' : 'Create Collection'}
              </button>

            </form>

          </div>

        </div>

      )}

    </div>
  )
}