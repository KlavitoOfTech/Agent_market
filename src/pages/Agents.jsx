import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Bot,
  Search,
  ArrowUpRight,
  Sparkles,
  TrendingUp,
  ChevronRight,
} from 'lucide-react'
import { supabase } from '../lib/supabase'
import AgentCard from '../components/agents/AgentCard'
import AgentGrid from '../components/agents/AgentGrid'

export default function Agents() {
  const [search, setSearch] = useState('')
  const [trendingAgents, setTrendingAgents] = useState([])
  const [loadingTrending, setLoadingTrending] = useState(true)

  useEffect(() => {
    fetchTrendingAgents()
  }, [])

  const fetchTrendingAgents = async () => {
    setLoadingTrending(true)

    const { data, error } = await supabase
      .from('agents')
      .select(`
        *,
        categories (
          id,
          name
        )
      `)
      .order('rating', { ascending: false })
      .limit(4)

    if (error) {
      console.error('Error fetching trending agents:', error)
      setLoadingTrending(false)
      return
    }

    setTrendingAgents(data || [])
    setLoadingTrending(false)
  }

  return (
    <div className="min-h-screen bg-[#070b14] text-white">

      {/* Navbar */}
      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#070b14]/90 backdrop-blur-xl">

        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">

          {/* Logo */}
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

          {/* Right */}
          <Link
            to="/dashboard"
            className="hidden items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:border-purple-500/30 hover:bg-purple-500/10 hover:text-white sm:flex"
          >
            Dashboard
            <ArrowUpRight size={16} />
          </Link>

        </div>

      </header>

      {/* Main */}
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

        {/* Hero */}
        <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#111827] via-[#0d1424] to-[#090d18] p-6 sm:p-10">

          {/* Glow */}
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-purple-600/20 blur-3xl" />

          <div className="absolute -bottom-20 left-1/3 h-56 w-56 rounded-full bg-blue-500/10 blur-3xl" />

          <div className="relative">

            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1.5 text-xs font-medium text-purple-300">
              <Sparkles size={14} />
              AI Agent Marketplace
            </div>

            <h1 className="max-w-3xl text-3xl font-bold tracking-tight sm:text-5xl">
              Discover AI Agents
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
              Find the best AI tools for coding, writing, research,
              design, productivity, and more.
            </p>

            {/* Search */}
            <div className="relative mt-7 max-w-2xl">

              <Search
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
              />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search agents..."
                className="
                  w-full rounded-2xl
                  border border-white/10
                  bg-[#0a101c]/80
                  py-4 pl-12 pr-4
                  text-sm text-white
                  outline-none
                  placeholder:text-slate-600
                  transition
                  focus:border-purple-500/50
                  focus:ring-2
                  focus:ring-purple-500/10
                "
              />

            </div>

          </div>

        </section>

        {/* Trending */}
        <section className="mt-12">

          <div className="mb-5 flex items-center justify-between">

            <div>

              <div className="flex items-center gap-2">
                <TrendingUp
                  size={20}
                  className="text-purple-400"
                />

                <h2 className="text-xl font-bold sm:text-2xl">
                  Trending Agents
                </h2>
              </div>

              <p className="mt-1 text-sm text-slate-500">
                Popular AI tools people are exploring right now.
              </p>

            </div>

          </div>

          {loadingTrending ? (

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="h-72 animate-pulse rounded-2xl border border-white/10 bg-[#0d1421]"
                />
              ))}

            </div>

          ) : (

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

              {trendingAgents.map((agent) => (
                <AgentCard
                  key={agent.id}
                  agent={agent}
                />
              ))}

            </div>

          )}

        </section>

        {/* All Agents */}
        <section className="mt-14">

          <div className="mb-6">

            <h2 className="text-xl font-bold sm:text-2xl">
              All Agents
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Explore AI agents across different categories.
            </p>

          </div>

          <AgentGrid />

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