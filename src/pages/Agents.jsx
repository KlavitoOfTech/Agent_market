import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Bot,
  Search,
  ArrowUpRight,
  Sparkles,
  TrendingUp,
  SlidersHorizontal,
  X,
} from 'lucide-react'
import { supabase } from '../lib/supabase'
import AgentCard from '../components/agents/AgentCard'
import AgentGrid from '../components/agents/AgentGrid'

export default function Agents() {
  const [agents, setAgents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Filters
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedPricing, setSelectedPricing] = useState('')
  const [sortBy, setSortBy] = useState('popular')

  // Categories
  const [categories, setCategories] = useState([])

  // Trending
  const [trendingAgents, setTrendingAgents] = useState([])

  /*
   * Fetch categories
   */
  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from('categories')
      .select('id, name')
      .order('name', { ascending: true })

    if (error) {
      console.error('Error fetching categories:', error)
      return
    }

    setCategories(data || [])
  }

  /*
   * Fetch agents whenever filters change
   */
  useEffect(() => {
    fetchAgents()
  }, [search, selectedCategory, selectedPricing, sortBy])

  const fetchAgents = async () => {
    setLoading(true)
    setError('')

    let query = supabase
      .from('agents')
      .select(`
        *,
        categories (
          id,
          name
        )
      `)

    /*
     * Search
     *
     * Searches the agent name and description.
     */
    if (search.trim()) {
      const searchTerm = search.trim()

      query = query.or(
        `name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`
      )
    }

    /*
     * Category
     */
    if (selectedCategory) {
      query = query.eq('category_id', selectedCategory)
    }

    /*
     * Pricing
     */
    if (selectedPricing) {
      query = query.eq('pricing', selectedPricing)
    }

    /*
     * Sorting
     */
    if (sortBy === 'popular') {
      query = query.order('users_count', {
        ascending: false,
      })
    }

    if (sortBy === 'rating') {
      query = query.order('rating', {
        ascending: false,
      })
    }

    if (sortBy === 'newest') {
      query = query.order('created_at', {
        ascending: false,
      })
    }

    if (sortBy === 'name') {
      query = query.order('name', {
        ascending: true,
      })
    }

    const { data, error } = await query

    if (error) {
      console.error('Error fetching agents:', error)
      setError(error.message)
      setAgents([])
      setLoading(false)
      return
    }

    setAgents(data || [])
    setLoading(false)
  }

  /*
   * Fetch trending agents
   */
  useEffect(() => {
    fetchTrendingAgents()
  }, [])

  const fetchTrendingAgents = async () => {
    const { data, error } = await supabase
      .from('agents')
      .select(`
        *,
        categories (
          id,
          name
        )
      `)
      .order('users_count', {
        ascending: false,
      })
      .limit(4)

    if (error) {
      console.error(
        'Error fetching trending agents:',
        error
      )
      return
    }

    setTrendingAgents(data || [])
  }

  /*
   * Clear all filters
   */
  const clearFilters = () => {
    setSearch('')
    setSelectedCategory('')
    setSelectedPricing('')
    setSortBy('popular')
  }

  const hasFilters =
    search ||
    selectedCategory ||
    selectedPricing ||
    sortBy !== 'popular'

  return (
    <div className="min-h-screen bg-[#070b14] text-white">

      {/* ================================= */}
      {/* NAVBAR                            */}
      {/* ================================= */}

      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#070b14]/90 backdrop-blur-xl">

        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">

          <Link
            to="/dashboard"
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 shadow-lg shadow-purple-900/20">
              <Bot size={21} />
            </div>

            <span className="text-lg font-bold tracking-tight">
              Agent Market
            </span>
          </Link>

          <Link
            to="/dashboard"
            className="hidden items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:border-purple-500/30 hover:bg-purple-500/10 hover:text-white sm:flex"
          >
            Dashboard
            <ArrowUpRight size={16} />
          </Link>

        </div>

      </header>


      {/* ================================= */}
      {/* MAIN                              */}
      {/* ================================= */}

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">


        {/* ================================= */}
        {/* HERO                              */}
        {/* ================================= */}

        <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#111827] via-[#0d1424] to-[#090d18] p-6 sm:p-10">

          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-purple-600/20 blur-3xl" />

          <div className="absolute -bottom-20 left-1/3 h-56 w-56 rounded-full bg-blue-500/10 blur-3xl" />

          <div className="relative">

            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1.5 text-xs font-medium text-purple-300">
              <Sparkles size={14} />
              AI Agent Marketplace
            </div>

            <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">
              Discover AI Agents
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
              Find the best AI tools for coding, writing,
              research, design, productivity, and more.
            </p>


            {/* Search */}
            <div className="relative mt-7 max-w-3xl">

              <Search
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
              />

              <input
                type="text"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search AI agents..."
                className="
                  w-full rounded-2xl
                  border border-white/10
                  bg-[#0a101c]/80
                  py-4 pl-12 pr-12
                  text-sm text-white
                  outline-none
                  placeholder:text-slate-600
                  transition
                  focus:border-purple-500/50
                  focus:ring-2
                  focus:ring-purple-500/10
                "
              />

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-white"
                >
                  <X size={18} />
                </button>
              )}

            </div>

          </div>

        </section>


        {/* ================================= */}
        {/* FILTERS                           */}
        {/* ================================= */}

        <section className="mt-8">

          <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-slate-300">
            <SlidersHorizontal size={17} />
            Filters
          </div>

          <div className="flex flex-col gap-3 lg:flex-row">

            {/* Category */}
            <select
              value={selectedCategory}
              onChange={(e) =>
                setSelectedCategory(e.target.value)
              }
              className="
                rounded-xl border border-white/10
                bg-[#0d1421]
                px-4 py-3
                text-sm text-slate-300
                outline-none
                focus:border-purple-500/50
              "
            >
              <option value="">
                All Categories
              </option>

              {categories.map((category) => (
                <option
                  key={category.id}
                  value={category.id}
                >
                  {category.name}
                </option>
              ))}
            </select>


            {/* Pricing */}
            <select
              value={selectedPricing}
              onChange={(e) =>
                setSelectedPricing(e.target.value)
              }
              className="
                rounded-xl border border-white/10
                bg-[#0d1421]
                px-4 py-3
                text-sm text-slate-300
                outline-none
                focus:border-purple-500/50
              "
            >
              <option value="">
                All Pricing
              </option>

              <option value="Free">
                Free
              </option>

              <option value="Paid">
                Paid
              </option>

              <option value="Free / Paid">
                Free / Paid
              </option>
            </select>


            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) =>
                setSortBy(e.target.value)
              }
              className="
                rounded-xl border border-white/10
                bg-[#0d1421]
                px-4 py-3
                text-sm text-slate-300
                outline-none
                focus:border-purple-500/50
              "
            >
              <option value="popular">
                Sort: Popular
              </option>

              <option value="rating">
                Sort: Highest Rated
              </option>

              <option value="newest">
                Sort: Newest
              </option>

              <option value="name">
                Sort: A-Z
              </option>
            </select>


            {/* Clear */}
            {hasFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-medium text-slate-400 transition hover:border-red-500/20 hover:bg-red-500/10 hover:text-red-400"
              >
                <X size={16} />
                Clear filters
              </button>
            )}

          </div>

        </section>


        {/* ================================= */}
        {/* TRENDING                          */}
        {/* ================================= */}

        {!hasFilters && (
          <section className="mt-12">

            <div className="mb-5 flex items-center gap-2">

              <TrendingUp
                size={20}
                className="text-purple-400"
              />

              <div>

                <h2 className="text-xl font-bold sm:text-2xl">
                  Trending Agents
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Popular AI tools people are exploring.
                </p>

              </div>

            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

              {trendingAgents.map((agent) => (
                <AgentCard
                  key={agent.id}
                  agent={agent}
                />
              ))}

            </div>

          </section>
        )}


        {/* ================================= */}
        {/* ALL AGENTS                        */}
        {/* ================================= */}

        <section className="mt-14">

          <div className="mb-6">

            <h2 className="text-xl font-bold sm:text-2xl">
              {hasFilters
                ? 'Search Results'
                : 'All Agents'}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {loading
                ? 'Finding AI agents...'
                : `${agents.length} agent${
                    agents.length === 1 ? '' : 's'
                  } found`}
            </p>

          </div>


          {/* Loading */}
          {loading && (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="h-72 animate-pulse rounded-2xl border border-white/10 bg-[#0d1421]"
                />
              ))}

            </div>
          )}


          {/* Error */}
          {!loading && error && (
            <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-8 text-center">

              <p className="text-sm text-red-400">
                {error}
              </p>

              <button
                onClick={fetchAgents}
                className="mt-4 rounded-xl bg-purple-600 px-5 py-2.5 text-sm font-semibold hover:bg-purple-500"
              >
                Try again
              </button>

            </div>
          )}


          {/* Empty */}
          {!loading &&
            !error &&
            agents.length === 0 && (
              <div className="rounded-2xl border border-white/10 bg-[#0d1421] p-12 text-center">

                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-500/10 text-purple-400">
                  <Search size={24} />
                </div>

                <h3 className="mt-5 text-lg font-semibold">
                  No agents found
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  Try a different search or adjust your
                  filters.
                </p>

                <button
                  onClick={clearFilters}
                  className="mt-5 rounded-xl bg-purple-600 px-5 py-2.5 text-sm font-semibold hover:bg-purple-500"
                >
                  Clear filters
                </button>

              </div>
            )}


          {/* Results */}
          {!loading &&
            !error &&
            agents.length > 0 && (
              <AgentGrid agents={agents} />
            )}

        </section>


        {/* Footer */}
        <footer className="mt-16 border-t border-white/10 py-8">

          <div className="flex flex-col justify-between gap-4 text-sm text-slate-500 sm:flex-row">

            <p>
              © {new Date().getFullYear()} Agent Market
            </p>

            <div className="flex gap-5">

              <Link
                to="/dashboard"
                className="transition hover:text-white"
              >
                Dashboard
              </Link>

              <Link
                to="#"
                className="transition hover:text-white"
              >
                Privacy
              </Link>

              <Link
                to="#"
                className="transition hover:text-white"
              >
                Terms
              </Link>

            </div>

          </div>

        </footer>

      </main>

    </div>
  )
}