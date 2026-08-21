import AgentCard from './AgentCard'

export default function AgentGrid({ agents = [] }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {agents.map((agent) => (
        <AgentCard
          key={agent.id}
          agent={agent}
        />
      ))}
    </div>
  )
}