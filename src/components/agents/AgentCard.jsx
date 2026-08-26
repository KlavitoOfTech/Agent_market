import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import {
  Bookmark,
  Star,
  Users,
  ArrowUpRight,
} from 'lucide-react'

import { supabase } from '../../lib/supabase'
import { useAuth } from '../../context/AuthContext'


function formatUsers(count) {
  if (!count) return '0'

  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(
      count % 1000000 === 0 ? 0 : 1
    )}M+`
  }

  if (count >= 1000) {
    return `${(count / 1000).toFixed(
      count % 1000 === 0 ? 0 : 1
    )}K+`
  }

  return count
}


export default function AgentCard({ agent }) {

  const { user } = useAuth()

  const [saved, setSaved] = useState(false)
  const [saving, setSaving] = useState(false)


  // Check whether this agent is already saved
  useEffect(() => {

    if (user && agent?.id) {
      checkSaved()
    }

  }, [user, agent?.id])


  const checkSaved = async () => {

    const { data, error } = await supabase
      .from('saved_agents')
      .select('id')
      .eq('user_id', user.id)
      .eq('agent_id', agent.id)
      .maybeSingle()

    if (error) {
      console.error('Check saved agent error:', error)
      return
    }

    setSaved(!!data)
  }


  // Save / unsave agent
  const toggleSave = async () => {

    if (!user) {
      console.log('User must be logged in to save an agent')
      return
    }

    setSaving(true)

    if (saved) {

      const { error } = await supabase
        .from('saved_agents')
        .delete()
        .eq('user_id', user.id)
        .eq('agent_id', agent.id)

      if (error) {
        console.error('Remove saved agent error:', error)
      } else {
        setSaved(false)
      }

    } else {

      const { error } = await supabase
        .from('saved_agents')
        .insert({
          user_id: user.id,
          agent_id: agent.id,
        })

      if (error) {
        console.error('Save agent error:', error)
      } else {
        setSaved(true)
      }
    }

    setSaving(false)
  }


  return (
    <div className="group relative flex flex-col rounded-2xl border border-white/10 bg-[#0d1421] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-purple-500/30">

      {/* Top section */}
      <div className="flex items-start justify-between">

        {/* Logo */}
        <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl bg-purple-500/10">

          {agent.logo_url ? (
            <img
              src={agent.logo_url}
              alt={`${agent.name} logo`}
              className="h-8 w-8 object-contain"
            />
          ) : (
            <span className="text-lg font-bold text-purple-400">
              {agent.name?.charAt(0).toUpperCase()}
            </span>
          )}

        </div>


        {/* Save button */}
        <button
          type="button"
          onClick={toggleSave}
          disabled={saving}
          aria-label={
            saved
              ? `Remove ${agent.name} from saved agents`
              : `Save ${agent.name}`
          }
          className={`rounded-lg p-2 transition ${
            saved
              ? 'bg-purple-500/10 text-purple-400'
              : 'text-slate-500 hover:bg-white/5 hover:text-purple-400'
          } ${
            saving
              ? 'cursor-not-allowed opacity-50'
              : ''
          }`}
        >

          <Bookmark
            size={17}
            fill={saved ? 'currentColor' : 'none'}
          />

        </button>

      </div>


      {/* Agent information */}
      <div className="mt-5">

        <h3 className="font-semibold text-white transition group-hover:text-purple-300">
          {agent.name}
        </h3>

        <p className="mt-2 min-h-[40px] text-sm leading-5 text-slate-500">
          {agent.description}
        </p>

      </div>


      {/* Category */}
      <div className="mt-4">

        <span className="rounded-full bg-purple-500/10 px-3 py-1 text-xs font-medium text-purple-300">
          {agent.categories?.name || 'Uncategorized'}
        </span>

      </div>


      {/* Rating + users */}
      <div className="mt-5 flex items-center gap-5 text-xs">

        <span className="flex items-center gap-1 text-yellow-400">

          <Star
            size={13}
            fill="currentColor"
          />

          {agent.rating ?? 'N/A'}

        </span>


        <span className="flex items-center gap-1 text-slate-500">

          <Users size={13} />

          {formatUsers(agent.users_count)}

        </span>

      </div>


      {/* Pricing */}
      <p className="mt-4 text-sm font-medium text-slate-300">
        {agent.pricing || 'Pricing unavailable'}
      </p>


      {/* View Agent */}
      <Link
        to={`/agents/${agent.id}`}
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:from-purple-500 hover:to-blue-500"
      >

        View Agent

        <ArrowUpRight size={16} />

      </Link>

    </div>
  )
}