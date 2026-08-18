import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowUpRight,
  Bot,
  Star,
  Users,
  ExternalLink,
  Sparkles,
} from 'lucide-react'
import { supabase } from '../lib/supabase'

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

export default function AgentDetails() {
  const { id } = useParams()

  const [agent, setAgent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchAgent()
  }, [id])

  const fetchAgent = async () => {
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
      .eq('id', id)
      .single()

    if (error) {
      console.error('Error fetching agent:', error)
      setError(error.message)
      setLoading(false)
      return
    }

    setAgent(data)
    setLoading(false)
  }

  /* Loading */
  if (loading) {
    return (
      <div className="min-h-screen bg-[#070b14] px-4 py-10 text-white sm:px-6 lg:px-8">

        <div className="mx-auto max-w-5xl">

          <div className="h-6 w-32 animate-pulse rounded bg-white/5" />

          <div className="mt-10 h-[500px] animate-pulse rounded-3xl border border-white/10 bg-[#0d1421]" />

        </div>

      </div>
    )
  }

  /* Error */
  if (error || !agent) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#070b14] px-4 text-white">

        <div className="text-center">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/10 text-red-400">
            <Bot size={30} />
          </div>

          <h1 className="mt-5 text-xl font-bold">
            Agent not found
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            We couldn't find the agent you're looking for.
          </p>

          <Link
            to="/agents"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 px-5 py-3 text-sm font-semibold"
          >
            <ArrowLeft size={16} />
            Back to Agents
          </Link>

        </div>

      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#070b14] text-white">

      {/* Header */}
      <header className="border-b border-white/10 bg-[#070b14]/90 backdrop-blur-xl">

        <div className="mx-auto flex h-20 max-w-5xl items-center px-4 sm:px-6 lg:px-8">

          <Link
            to="/agents"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition hover:text-white"
          >
            <ArrowLeft size={17} />
            Back to Agents
          </Link>

        </div>

      </header>

      {/* Main */}
      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">

        {/* Agent Hero */}
        <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#111827] via-[#0d1424] to-[#090d18] p-6 sm:p-10">

          {/* Background glow */}
          <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-purple-600/20 blur-3xl" />

          <div className="absolute -bottom-24 left-1/3 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />

          <div className="relative">

            <div className="flex flex-col gap-7 sm:flex-row sm:items-start">

              {/* Logo */}
              <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-purple-500/20 bg-purple-500/10">

                {agent.logo_url ? (
                  <img
                    src={agent.logo_url}
                    alt={`${agent.name} logo`}
                    className="h-16 w-16 object-contain"
                  />
                ) : (
                  <Bot
                    size={45}
                    className="text-purple-400"
                  />
                )}

              </div>

              {/* Information */}
              <div className="flex-1">

                <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1 text-xs font-medium text-purple-300">
                  <Sparkles size={13} />
                  AI Agent
                </div>

                <h1 className="mt-4 text-3xl font-bold sm:text-4xl">
                  {agent.name}
                </h1>

                <p className="mt-2 text-sm text-slate-400">
                  {agent.description}
                </p>

                {/* Stats */}
                <div className="mt-5 flex flex-wrap gap-4">

                  <span className="flex items-center gap-1.5 text-sm text-yellow-400">
                    <Star
                      size={16}
                      fill="currentColor"
                    />
                    {agent.rating}
                  </span>

                  <span className="flex items-center gap-1.5 text-sm text-slate-400">
                    <Users size={16} />
                    {formatUsers(agent.users_count)} users
                  </span>

                  <span className="rounded-full bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-300">
                    {agent.pricing}
                  </span>

                </div>

              </div>

            </div>

            {/* Category */}
            <div className="mt-8 flex flex-wrap gap-2">

              {agent.categories?.name && (
                <span className="rounded-full border border-purple-500/20 bg-purple-500/10 px-4 py-2 text-xs font-medium text-purple-300">
                  {agent.categories.name}
                </span>
              )}

            </div>

          </div>

        </section>

        {/* About */}
        <section className="mt-8 rounded-2xl border border-white/10 bg-[#0d1421] p-6 sm:p-8">

          <h2 className="text-xl font-bold">
            About
          </h2>

          <div className="mt-4 h-px bg-white/10" />

          <p className="mt-5 text-sm leading-7 text-slate-400">
            {agent.description}
          </p>

        </section>

        {/* Pricing */}
        <section className="mt-8 rounded-2xl border border-white/10 bg-[#0d1421] p-6 sm:p-8">

          <h2 className="text-xl font-bold">
            Pricing
          </h2>

          <div className="mt-4 h-px bg-white/10" />

          <div className="mt-6 grid gap-4 sm:grid-cols-3">

            <PricingCard
              title="Free"
              description="Get started with the basic features."
              active={agent.pricing?.toLowerCase().includes('free')}
            />

            <PricingCard
              title="Pro"
              description="More powerful features for individuals."
            />

            <PricingCard
              title="Team"
              description="Tools and features for teams."
            />

          </div>

        </section>

        {/* Visit Agent */}
        <section className="mt-8">

          {agent.website_url ? (
            <a
              href={agent.website_url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-4 text-sm font-semibold shadow-lg shadow-purple-900/20 transition hover:from-purple-500 hover:to-blue-500"
            >
              Visit {agent.name}

              <ArrowUpRight
                size={18}
                className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </a>
          ) : (
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-center text-sm text-slate-500">
              Website unavailable
            </div>
          )}

        </section>

      </main>

    </div>
  )
}


/* ================================= */
/* PRICING CARD                      */
/* ================================= */

function PricingCard({
  title,
  description,
  active = false,
}) {
  return (
    <div
      className={`rounded-xl border p-5 ${
        active
          ? 'border-purple-500/30 bg-purple-500/10'
          : 'border-white/10 bg-white/[0.02]'
      }`}
    >

      <h3 className="font-semibold">
        {title}
      </h3>

      <p className="mt-2 text-xs leading-5 text-slate-500">
        {description}
      </p>

      {active && (
        <span className="mt-4 inline-block rounded-full bg-purple-500/10 px-2.5 py-1 text-[10px] font-medium text-purple-300">
          Available
        </span>
      )}

    </div>
  )
}