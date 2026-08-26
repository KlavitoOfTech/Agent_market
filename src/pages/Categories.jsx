import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Layers,
  ArrowRight,
  Code2,
  Palette,
  Search,
  Video,
  Megaphone,
  GraduationCap,
  Briefcase,
  Zap,
} from 'lucide-react'
import { supabase } from '../lib/supabase'

const categoryIcons = {
  Coding: Code2,
  Design: Palette,
  Research: Search,
  Video: Video,
  Marketing: Megaphone,
  Education: GraduationCap,
  Business: Briefcase,
  Productivity: Zap,
}

export default function Categories() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    setLoading(true)
    setError('')

    const { data, error } = await supabase
      .from('categories')
      .select(`
        id,
        name,
        slug
      `)
      .order('name', { ascending: true })

    if (error) {
      console.error('Categories error:', error)
      setError('Unable to load categories.')
      setLoading(false)
      return
    }

    setCategories(data || [])
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#070b14] text-white">

      {/* Header */}
      <header className="border-b border-white/10 bg-[#070b14]/90 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-5 py-6 sm:px-8">

          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
              <Layers size={22} />
            </div>

            <div>
              <h1 className="text-2xl font-bold sm:text-3xl">
                Categories
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Explore AI agents by category.
              </p>
            </div>

          </div>

        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-7xl px-5 py-10 sm:px-8">

        {/* Hero */}
        <section className="relative mb-10 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-purple-900/20 via-[#0d1421] to-blue-900/10 p-6 sm:p-8">

          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-purple-600/20 blur-3xl" />

          <div className="relative">

            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1.5 text-xs font-medium text-purple-300">
              <Layers size={14} />
              Explore AI
            </div>

            <h2 className="text-3xl font-bold sm:text-4xl">
              Find AI tools for
              <span className="block bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                what you're building.
              </span>
            </h2>

            <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-400">
              Browse AI agents based on what you need to accomplish,
              from coding and research to design and productivity.
            </p>

          </div>

        </section>

        {/* Loading */}
        {loading && (
          <div className="py-20 text-center">

            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-purple-500" />

            <p className="mt-4 text-sm text-slate-500">
              Loading categories...
            </p>

          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-5 text-center text-sm text-red-400">
            {error}
          </div>
        )}

        {/* Categories */}
        {!loading && !error && categories.length > 0 && (
          <section>

            <div className="mb-5">
              <h2 className="text-xl font-bold sm:text-2xl">
                Explore Categories
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Choose a category to discover relevant AI agents.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

              {categories.map((category) => {

                const Icon =
                  categoryIcons[category.name] || Layers

                return (
                  <Link
                    key={category.id}
                    to={`/agents?category=${category.id}`}
                    className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0d1421] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-purple-500/30 hover:bg-[#101827]"
                  >

                    {/* Glow */}
                    <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-purple-500/10 blur-2xl transition group-hover:bg-purple-500/20" />

                    <div className="relative">

                      <div className="flex items-start justify-between">

                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400 transition group-hover:bg-purple-500/20">
                          <Icon size={23} />
                        </div>

                        <ArrowRight
                          size={18}
                          className="text-slate-600 transition group-hover:translate-x-1 group-hover:text-purple-400"
                        />

                      </div>

                      <h3 className="mt-6 text-lg font-semibold transition group-hover:text-purple-300">
                        {category.name}
                      </h3>

                      <p className="mt-2 text-sm text-slate-500">
                        Discover {category.name.toLowerCase()} AI agents.
                      </p>

                    </div>

                  </Link>
                )
              })}

            </div>

          </section>
        )}

        {/* Empty */}
        {!loading && !error && categories.length === 0 && (
          <div className="rounded-2xl border border-white/10 bg-[#0d1421] p-10 text-center">

            <Layers
              size={32}
              className="mx-auto text-slate-600"
            />

            <h3 className="mt-4 font-semibold">
              No categories found
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Add categories to Supabase to see them here.
            </p>

          </div>
        )}

      </main>

    </div>
  )
}