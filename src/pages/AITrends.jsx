import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Compass,
  TrendingUp,
  ArrowUpRight,
  ExternalLink,
  Clock,
} from 'lucide-react'
import { supabase } from '../lib/supabase'

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

    if (error) {
      console.error('AI Trends error:', error)
      setError('Unable to load AI trends.')
      setLoading(false)
      return
    }

    setTrends(data || [])
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#070b14] text-white">

      {/* Header */}
      <header className="border-b border-white/10 bg-[#070b14]/90 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-5 py-6 sm:px-8">

          <div className="flex items-center gap-3">

            <Link
              to="/dashboard"
              className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400"
            >
              <Compass size={22} />
            </Link>

            <div>
              <h1 className="text-2xl font-bold sm:text-3xl">
                AI Trends
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Discover what's gaining momentum across AI.
              </p>
            </div>

          </div>

        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-7xl px-5 py-10 sm:px-8">

        {/* Hero */}
        <section className="relative mb-10 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-purple-900/20 via-[#0d1421] to-blue-900/10 p-6 sm:p-8">

          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-purple-600/20 blur-3xl" />

          <div className="relative">

            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1.5 text-xs font-medium text-purple-300">
              <TrendingUp size={14} />
              What's Trending
            </div>

            <h2 className="text-3xl font-bold sm:text-4xl">
              AI Trends
              <span className="block bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                worth watching.
              </span>
            </h2>

            <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-400">
              Keep track of emerging technologies, tools, and ideas
              gaining attention across the AI ecosystem.
            </p>

          </div>

        </section>

        {/* Loading */}
        {loading && (
          <div className="py-20 text-center">

            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-purple-500" />

            <p className="mt-4 text-sm text-slate-500">
              Loading AI trends...
            </p>

          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-5 text-center text-sm text-red-400">
            {error}
          </div>
        )}

        {/* Trends */}
        {!loading && !error && trends.length > 0 && (
          <section>

            <div className="mb-5">
              <h2 className="text-xl font-bold sm:text-2xl">
                Trending Now
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Recently published AI trends.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

              {trends.map((trend) => (
                <article
                  key={trend.id}
                  className="group overflow-hidden rounded-2xl border border-white/10 bg-[#0d1421] transition-all duration-300 hover:-translate-y-1 hover:border-purple-500/30"
                >

                  {/* Image */}
                  {trend.image_url ? (
                    <div className="h-44 overflow-hidden bg-[#101827]">
                      <img
                        src={trend.image_url}
                        alt={trend.title}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    </div>
                  ) : (
                    <div className="flex h-44 items-center justify-center bg-gradient-to-br from-purple-900/30 to-blue-900/20">
                      <TrendingUp
                        size={48}
                        className="text-purple-400/40"
                      />
                    </div>
                  )}

                  <div className="p-5">

                    {/* Category */}
                    {trend.categories?.name && (
                      <span className="rounded-full bg-purple-500/10 px-3 py-1 text-xs font-medium text-purple-300">
                        {trend.categories.name}
                      </span>
                    )}

                    {/* Title */}
                    <h3 className="mt-4 text-lg font-semibold leading-6 transition group-hover:text-purple-300">
                      {trend.title}
                    </h3>

                    {/* Description */}
                    <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-500">
                      {trend.description}
                    </p>

                    {/* Date */}
                    <div className="mt-5 flex items-center gap-2 text-xs text-slate-600">
                      <Clock size={13} />

                      {trend.published_at
                        ? new Date(
                            trend.published_at
                          ).toLocaleDateString()
                        : 'Recently published'}
                    </div>

                    {/* Link */}
                    {trend.source_url && (
                      <a
                        href={trend.source_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-5 flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-semibold text-slate-300 transition hover:border-purple-500/30 hover:bg-purple-500/10 hover:text-purple-300"
                      >
                        Read More
                        <ExternalLink size={15} />
                      </a>
                    )}

                  </div>

                </article>
              ))}

            </div>

          </section>
        )}

        {/* Empty */}
        {!loading && !error && trends.length === 0 && (
          <div className="rounded-2xl border border-white/10 bg-[#0d1421] p-12 text-center">

            <Compass
              size={40}
              className="mx-auto text-slate-600"
            />

            <h3 className="mt-5 text-lg font-semibold">
              No AI trends yet
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Add trends to your Supabase database to see them here.
            </p>

          </div>
        )}

      </main>

    </div>
  )
}