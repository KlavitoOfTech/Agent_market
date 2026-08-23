import { useEffect, useState } from 'react'
import {
  TrendingUp,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react'
import { supabase } from '../../lib/supabase'

export default function AITrends() {
  const [trends, setTrends] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchTrends()
  }, [])

    const fetchTrends = async () => {
        setLoading(true)
        setError('')

        const { data, error } = await supabase
            .from('trends')
            .select(`
            *,
            categories (
                id,
                name
            )
            `)
            .order('published_at', { ascending: false })
            .limit(4)

        console.log('AI Trends data:', data)
        console.log('AI Trends error:', error)

        if (error) {
            console.error('Full Supabase error:', error)

            setError(error.message)
            setTrends([])
            setLoading(false)
            return
        }

        setTrends(data || [])
        setLoading(false)
    }

  return (
    <section className="mt-10">

      {/* Header */}
      <div className="mb-5 flex items-center justify-between">

        <div>
          <div className="flex items-center gap-2">

            <Sparkles
              size={20}
              className="text-purple-400"
            />

            <h2 className="text-xl font-bold sm:text-2xl">
              AI Trends
            </h2>

          </div>

          <p className="mt-1 text-sm text-slate-500">
            Topics and technologies gaining momentum in AI.
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
              className="h-40 animate-pulse rounded-2xl border border-white/10 bg-[#0d1421]"
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

      {/* Trends */}
      {!loading && !error && trends.length > 0 && (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

          {trends.map((trend) => (
            <TrendCard
              key={trend.id}
              trend={trend}
            />
          ))}

        </div>
      )}

      {/* Empty */}
      {!loading && !error && trends.length === 0 && (
        <div className="rounded-2xl border border-white/10 bg-[#0d1421] p-8 text-center">
          <p className="text-sm text-slate-500">
            No AI trends found.
          </p>
        </div>
      )}

    </section>
  )
}


/* ================================= */
/* TREND CARD                        */
/* ================================= */

function TrendCard({ trend }) {
  return (
    <div className="group rounded-2xl border border-white/10 bg-[#0d1421] p-5 transition hover:-translate-y-1 hover:border-purple-500/30">

      <div className="flex items-start justify-between">

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
          <TrendingUp size={19} />
        </div>

        {trend.categories?.name && (
          <span className="rounded-full bg-purple-500/10 px-2.5 py-1 text-[10px] font-medium text-purple-300">
            {trend.categories.name}
          </span>
        )}

      </div>

      <h3 className="mt-5 font-semibold group-hover:text-purple-300">
        {trend.title}
      </h3>

      <p className="mt-2 line-clamp-3 text-xs leading-5 text-slate-500">
        {trend.description}
      </p>

      <div className="mt-5 flex items-center justify-between">

        <span className="text-xs text-slate-600">
          {trend.published_at
            ? new Date(trend.published_at).toLocaleDateString()
            : 'Recently added'}
        </span>

        {trend.source_url && (
          <a
            href={trend.source_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs font-medium text-purple-400 transition hover:text-purple-300"
          >
            Read more
            <ArrowUpRight size={13} />
          </a>
        )}

      </div>

    </div>
  )
}