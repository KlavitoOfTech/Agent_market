import { useEffect, useState } from 'react'
import { Bookmark } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'
import AgentCard from '../components/agents/AgentCard'

export default function SavedAgents() {
  const { user } = useAuth()

  const [agents, setAgents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      fetchSavedAgents()
    }
  }, [user])

  const fetchSavedAgents = async () => {
    setLoading(true)

    const { data, error } = await supabase
      .from('saved_agents')
      .select(`
        agent_id,
        agents (
          *,
          categories (
            id,
            name
          )
        )
      `)
      .eq('user_id', user.id)
      .order('created_at', {
        ascending: false,
      })

    if (error) {
      console.error('Saved agents error:', error)
      setAgents([])
    } else {
      setAgents(
        data
          ?.map((item) => item.agents)
          .filter(Boolean) || []
      )
    }

    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-[#070b14] px-4 py-8 text-white sm:px-6 lg:px-8">

      <div className="mx-auto max-w-7xl">

        <div className="mb-8">

          <div className="mb-3 flex items-center gap-2 text-purple-400">
            <Bookmark size={20} />

            <span className="text-sm font-medium">
              Your Collection
            </span>
          </div>

          <h1 className="text-3xl font-bold sm:text-4xl">
            My Saved Agents
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            AI agents you've saved for later.
          </p>

        </div>

        {loading ? (
          <p className="text-slate-500">
            Loading saved agents...
          </p>
        ) : agents.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-[#0d1421] p-10 text-center">

            <Bookmark
              size={40}
              className="mx-auto text-slate-600"
            />

            <h2 className="mt-4 text-lg font-semibold">
              No saved agents yet
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Save AI agents you want to explore later.
            </p>

          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            {agents.map((agent) => (
              <AgentCard
                key={agent.id}
                agent={agent}
              />
            ))}

          </div>
        )}

      </div>

    </main>
  )
}