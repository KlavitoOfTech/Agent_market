import { useEffect, useState } from 'react'
import { Trophy, ArrowUpRight } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import AgentCard from '../agents/AgentCard'

export default function MostPopular() {
  const [agents, setAgents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchPopularAgents()
  }, [])

  const fetchPopularAgents = async () => {
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
      .order('users_count', { ascending: false })
      .limit(4)

    if (error) {
      console.error('Error fetching popular agents:', error)
      setError('Unable to load popular agents.')
      setAgents([])
      setLoading(false)
      return
    }

    setAgents(data || [])
    setLoading(false)
  }

  return (
    <section className="mt-10">

      {/* Header */}
      <div className="mb-5 flex items-center justify-between">

        <div>
          <div className="flex items-center gap-2">
            <Trophy
              size={20}
              className="text-yellow-400"
            />

            <h2 className="text-xl font-bold sm:text-2xl">
              Most Popular
            </h2>
          </div>

          <p className="mt-1 text-sm text-slate-500">
            The AI agents with the largest user base.
          </p>
        </div>

        <button className="hidden items-center gap-1 text-sm font-medium text-purple-400 transition hover:text-purple-300 sm:flex">
          View all
          <ArrowUpRight size={15} />
        </button>

      </div>

      {/* Loading */}
      {loading && (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
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
        <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-6 text-sm text-red-400">
          {error}
        </div>
      )}

      {/* Agents */}
      {!loading && !error && agents.length > 0 && (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {agents.map((agent) => (
            <AgentCard
              key={agent.id}
              agent={agent}
            />
          ))}
        </div>
      )}

      {/* Empty */}
      {!loading && !error && agents.length === 0 && (
        <div className="rounded-2xl border border-white/10 bg-[#0d1421] p-8 text-center">
          <p className="text-sm text-slate-500">
            No popular agents found.
          </p>
        </div>
      )}

    </section>
  )
}