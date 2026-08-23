import { useEffect, useState } from 'react'
import {
  TrendingUp,
  ArrowUpRight,
  Layers,
} from 'lucide-react'
import { supabase } from '../../lib/supabase'

export default function RisingCategories() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchRisingCategories()
  }, [])

  const fetchRisingCategories = async () => {
    setLoading(true)
    setError('')

    const { data, error } = await supabase
      .from('agents')
      .select(`
        trend_score,
        categories (
          id,
          name
        )
      `)

    console.log('Rising categories data:', data)
    console.log('Rising categories error:', error)

    if (error) {
      console.error('Error fetching rising categories:', error)

      setError(error.message)
      setCategories([])
      setLoading(false)
      return
    }

    // Group agents by category
    const categoryMap = {}

    data?.forEach((agent) => {
      const category = agent.categories

      if (!category) return

      if (!categoryMap[category.id]) {
        categoryMap[category.id] = {
          id: category.id,
          name: category.name,
          score: 0,
          agentCount: 0,
        }
      }

      categoryMap[category.id].score += agent.trend_score || 0
      categoryMap[category.id].agentCount += 1
    })

    const sortedCategories = Object.values(categoryMap)
      .sort((a, b) => b.score - a.score)
      .slice(0, 4)

    setCategories(sortedCategories)
    setLoading(false)
  }

  return (
    <section className="mt-10">

      {/* Header */}
      <div className="mb-5 flex items-center justify-between">

        <div>
          <div className="flex items-center gap-2">

            <TrendingUp
              size={20}
              className="text-emerald-400"
            />

            <h2 className="text-xl font-bold sm:text-2xl">
              Rising Categories
            </h2>

          </div>

          <p className="mt-1 text-sm text-slate-500">
            Categories gaining momentum across Agent Market.
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
              className="h-36 animate-pulse rounded-2xl border border-white/10 bg-[#0d1421]"
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

      {/* Categories */}
      {!loading && !error && categories.length > 0 && (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

          {categories.map((category, index) => (
            <CategoryCard
              key={category.id}
              category={category}
              rank={index + 1}
            />
          ))}

        </div>
      )}

      {/* Empty */}
      {!loading && !error && categories.length === 0 && (
        <div className="rounded-2xl border border-white/10 bg-[#0d1421] p-8 text-center">
          <p className="text-sm text-slate-500">
            No rising categories found.
          </p>
        </div>
      )}

    </section>
  )
}


/* ================================= */
/* CATEGORY CARD                     */
/* ================================= */

function CategoryCard({ category, rank }) {
  return (
    <div className="group rounded-2xl border border-white/10 bg-[#0d1421] p-5 transition hover:-translate-y-1 hover:border-purple-500/30">

      <div className="flex items-start justify-between">

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
          <Layers size={19} />
        </div>

        <span className="text-xs font-semibold text-slate-600">
          #{rank}
        </span>

      </div>

      <h3 className="mt-5 font-semibold group-hover:text-purple-300">
        {category.name}
      </h3>

      <div className="mt-3 flex items-center justify-between">

        <span className="text-xs text-slate-500">
          {category.agentCount}{' '}
          {category.agentCount === 1 ? 'agent' : 'agents'}
        </span>

        <span className="flex items-center gap-1 text-xs font-semibold text-emerald-400">
          <TrendingUp size={13} />
          {category.score} pts
        </span>

      </div>

    </div>
  )
}