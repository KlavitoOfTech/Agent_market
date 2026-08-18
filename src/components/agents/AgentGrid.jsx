import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { ChevronDown, ChevronUp } from 'lucide-react'
import AgentCard from './AgentCard'
import CategoryFilter from './CategoryFilter'

export default function AgentGrid() {
  const [agents, setAgents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    fetchAgents()
  }, [selectedCategory])

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
      .order('created_at', { ascending: false })

    // Filter by category
    if (selectedCategory !== null) {
      query = query.eq('category_id', selectedCategory)
    }

    const { data, error } = await query

    if (error) {
      console.error('Error fetching agents:', error)
      setError(error.message)
      setLoading(false)
      return
    }

    setAgents(data || [])
    setShowAll(false)
    setLoading(false)
  }

  const visibleAgents = showAll
    ? agents
    : agents.slice(0, 4)

  return (
    <div>

      {/* Category Filter */}
      <div className="mb-6">
        <CategoryFilter
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
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
        <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-6 text-center">
          <p className="text-sm text-red-400">
            {error}
          </p>

          <button
            onClick={fetchAgents}
            className="mt-4 rounded-xl bg-purple-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-purple-500"
          >
            Try again
          </button>
        </div>
      )}

      {/* No agents */}
      {!loading && !error && agents.length === 0 && (
        <div className="rounded-2xl border border-white/10 bg-[#0d1421] p-10 text-center">
          <p className="text-lg font-semibold text-white">
            No agents found
          </p>

          <p className="mt-2 text-sm text-slate-500">
            There are no agents in this category yet.
          </p>
        </div>
      )}

      {/* Agents */}
      {!loading && !error && agents.length > 0 && (
        <>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {visibleAgents.map((agent) => (
              <AgentCard
                key={agent.id}
                agent={agent}
              />
            ))}
          </div>

          {/* View More */}
          {agents.length > 4 && (
            <div className="mt-8 flex justify-center">
              <button
                type="button"
                onClick={() => setShowAll(!showAll)}
                className="group inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-semibold text-slate-300 transition hover:border-purple-500/30 hover:bg-purple-500/10 hover:text-white"
              >
                {showAll ? 'Show less' : 'View more agents'}

                {showAll ? (
                  <ChevronUp size={17} />
                ) : (
                  <ChevronDown size={17} />
                )}
              </button>
            </div>
          )}
        </>
      )}

    </div>
  )
}