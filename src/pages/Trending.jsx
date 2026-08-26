import { useEffect, useState } from 'react'
import { TrendingUp, ArrowUpRight, Flame } from 'lucide-react'
import { supabase } from '../lib/supabase'
import AgentCard from '../components/agents/AgentCard'

export default function Trending() {
  const [agents, setAgents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchTrendingAgents()
  }, [])

  const fetchTrendingAgents = async () => {
    setLoading(true)
    setError('')

    const { data, error } = await supabase
      .from('agents')
      .select(`
        *,
        categories (
          id,
          name
        )
      `)
      .order('trend_score', { ascending: false })
      .limit(20)

    if (error) {
      console.error('Trending agents error:', error)
      setError('Unable to load trending agents.')
      setLoading(false)
      return
    }

    setAgents(data || [])
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#070b14] text-white">

      {/* Header */}
      <header className="border-b border-white/10 bg-[#070b14]/90">
        <div className="mx-auto max-w-7xl px-5 py-6 sm:px-8">

          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500/10 text-orange-400">
              <Flame size={22} />
            </div>

            <div>
              <h1 className="text-2xl font-bold sm:text-3xl">
                Trending AI Agents
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Discover the AI agents gaining momentum right now.
              </p>
            </div>
          </div>

        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-7xl px-5 py-10 sm:px-8">

        {/* Intro */}
        <section className="relative mb-10 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-purple-900/20 via-[#0d1421] to-blue-900/10 p-6 sm:p-8">

          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-purple-600/20 blur-3xl" />

          <div className="relative flex flex-col justify-between gap-6 md:flex-row md:items-center">

            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/10 px-3 py-1.5 text-xs font-medium text-orange-300">
                <TrendingUp size={14} />
                What's hot
              </div>

              <h2 className="text-2xl font-bold sm:text-3xl">
                AI agents gaining momentum
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
                Explore agents currently receiving the most attention
                across Agent Market.
              </p>
            </div>

            <div className="hidden h-20 w-20 items-center justify-center rounded-2xl border border-purple-500/20 bg-purple-500/10 md:flex">
              <TrendingUp
                size={38}
                className="text-purple-400"
              />
            </div>

          </div>

        </section>

        {/* Loading */}
        {loading && (
          <div className="py-20 text-center">

            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-purple-500" />

            <p className="mt-4 text-sm text-slate-500">
              Loading trending agents...
            </p>

          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-5 text-center text-sm text-red-400">
            {error}
          </div>
        )}

        {/* Empty */}
        {!loading && !error && agents.length === 0 && (
          <div className="rounded-2xl border border-white/10 bg-[#0d1421] p-10 text-center">

            <Flame
              size={32}
              className="mx-auto text-slate-600"
            />

            <h3 className="mt-4 font-semibold">
              No trending agents yet
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Add agents and trend scores to start building
              the trending section.
            </p>

          </div>
        )}

        {/* Agents */}
        {!loading && !error && agents.length > 0 && (
          <section>

            <div className="mb-5 flex items-center justify-between">

              <div>
                <h2 className="text-xl font-bold">
                  🔥 Trending Now
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Ranked by trend score
                </p>
              </div>

              <span className="hidden items-center gap-1 text-sm text-purple-400 sm:flex">
                Trending
                <ArrowUpRight size={16} />
              </span>

            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

              {agents.map((agent) => (
                <AgentCard
                  key={agent.id}
                  agent={agent}
                />
              ))}

            </div>

          </section>
        )}

      </main>

    </div>
  )
}