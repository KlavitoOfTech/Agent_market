import { Link } from 'react-router-dom'

import {
  Bookmark,
  Star,
  Users,
  ArrowUpRight,
} from 'lucide-react'

function formatUsers(count) {
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
  return (
    <div className="group relative flex flex-col rounded-2xl border border-white/10 bg-[#0d1421] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-purple-500/30">

      <div className="flex items-start justify-between">

        <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl bg-purple-500/10">

          {agent.logo_url ? (
            <img
              src={agent.logo_url}
              alt={`${agent.name} logo`}
              className="h-8 w-8 object-contain"
            />
          ) : (
            <span className="text-lg font-bold text-purple-400">
              {agent.name.charAt(0)}
            </span>
          )}

        </div>

        <button
          type="button"
          className="rounded-lg p-2 text-slate-500 transition hover:bg-white/5 hover:text-purple-400"
        >
          <Bookmark size={17} />
        </button>

      </div>

      <div className="mt-5">

        <h3 className="font-semibold text-white transition group-hover:text-purple-300">
          {agent.name}
        </h3>

        <p className="mt-2 min-h-[40px] text-sm leading-5 text-slate-500">
          {agent.description}
        </p>

      </div>

      <div className="mt-4">

        <span className="rounded-full bg-purple-500/10 px-3 py-1 text-xs font-medium text-purple-300">
          {agent.categories?.name || 'Uncategorized'}
        </span>

      </div>

      <div className="mt-5 flex items-center gap-5 text-xs">

        <span className="flex items-center gap-1 text-yellow-400">
          <Star size={13} fill="currentColor" />
          {agent.rating}
        </span>

        <span className="flex items-center gap-1 text-slate-500">
          <Users size={13} />
          {formatUsers(agent.users_count)}
        </span>

      </div>

      <p className="mt-4 text-sm font-medium text-slate-300">
        {agent.pricing}
      </p>

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