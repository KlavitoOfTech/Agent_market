import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function CategoryFilter({ selectedCategory, onCategoryChange }) {
  const [categories, setCategories] = useState([])

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

  return (
    <div className="flex flex-wrap gap-2">
      {/* All */}
      <button
        type="button"
        onClick={() => onCategoryChange(null)}
        className={`rounded-xl border px-4 py-2 text-sm font-medium transition ${
          selectedCategory === null
            ? 'border-purple-500/40 bg-purple-500/15 text-purple-300'
            : 'border-white/10 bg-white/[0.03] text-slate-400 hover:border-purple-500/20 hover:text-white'
        }`}
      >
        All
      </button>

      {/* Categories */}
      {categories.map((category) => (
        <button
          key={category.id}
          type="button"
          onClick={() => onCategoryChange(category.id)}
          className={`rounded-xl border px-4 py-2 text-sm font-medium transition ${
            selectedCategory === category.id
              ? 'border-purple-500/40 bg-purple-500/15 text-purple-300'
              : 'border-white/10 bg-white/[0.03] text-slate-400 hover:border-purple-500/20 hover:text-white'
          }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  )
}