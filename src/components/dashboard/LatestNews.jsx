import { useEffect, useState } from 'react'
import {
  Newspaper,
  ArrowUpRight,
} from 'lucide-react'
import { supabase } from '../../lib/supabase'

export default function LatestNews() {
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchNews()
  }, [])

  const fetchNews = async () => {
    setLoading(true)
    setError('')

    const { data, error } = await supabase
      .from('news')
      .select(`
        *,
        categories (
          id,
          name
        )
      `)
      .order('published_at', { ascending: false })
      .limit(4)

    if (error) {
      console.error('News error:', error)
      setError(error.message)
      setNews([])
      setLoading(false)
      return
    }

    setNews(data || [])
    setLoading(false)
  }

  return (
    <section className="mt-10">

      {/* Header */}
      <div className="mb-5 flex items-center justify-between">

        <div>
          <div className="flex items-center gap-2">
            <Newspaper
              size={20}
              className="text-blue-400"
            />

            <h2 className="text-xl font-bold sm:text-2xl">
              Latest AI News
            </h2>
          </div>

          <p className="mt-1 text-sm text-slate-500">
            Stay updated with what's happening across AI.
          </p>
        </div>

        <button className="hidden items-center gap-1 text-sm font-medium text-purple-400 transition hover:text-purple-300 sm:flex">
          View all
          <ArrowUpRight size={15} />
        </button>

      </div>

      {/* Loading */}
      {loading && (
        <div className="grid gap-5 md:grid-cols-2">

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
        <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-5 text-sm text-red-400">
          Unable to load news.
        </div>
      )}

      {/* News */}
      {!loading && !error && news.length > 0 && (
        <div className="grid gap-5 md:grid-cols-2">

          {news.map((item) => (
            <NewsCard
              key={item.id}
              news={item}
            />
          ))}

        </div>
      )}

      {/* Empty */}
      {!loading && !error && news.length === 0 && (
        <div className="rounded-2xl border border-white/10 bg-[#0d1421] p-8 text-center">
          <p className="text-sm text-slate-500">
            No AI news available.
          </p>
        </div>
      )}

    </section>
  )
}


/* ================================= */
/* NEWS CARD                         */
/* ================================= */

function NewsCard({ news }) {
  return (
    <article className="group rounded-2xl border border-white/10 bg-[#0d1421] p-5 transition hover:-translate-y-1 hover:border-purple-500/30">

      <div className="flex items-start justify-between gap-4">

        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
          <Newspaper size={19} />
        </div>

        {news.categories?.name && (
          <span className="rounded-full bg-purple-500/10 px-2.5 py-1 text-[10px] font-medium text-purple-300">
            {news.categories.name}
          </span>
        )}

      </div>

      <h3 className="mt-5 line-clamp-2 font-semibold leading-6 group-hover:text-purple-300">
        {news.title}
      </h3>

      <p className="mt-2 line-clamp-2 text-xs leading-5 text-slate-500">
        {news.description}
      </p>

      <div className="mt-5 flex items-center justify-between">

        <span className="text-xs text-slate-600">
          {news.published_at
            ? new Date(news.published_at).toLocaleDateString()
            : 'Recently published'}
        </span>

        <a
          href={news.source_url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-xs font-medium text-purple-400 transition hover:text-purple-300"
        >
          Read article
          <ArrowUpRight size={13} />
        </a>

      </div>

    </article>
  )
}