import { Link } from 'react-router-dom'
import {
  Bot,
  TrendingUp,
  Users,
  Grid2X2,
  Search,
  Bell,
  Home as HomeIcon,
  Compass,
  Layers,
  Newspaper,
  Bookmark,
  Heart,
  User,
  Settings,
  ChevronRight,
  Star,
  ArrowUpRight,
  Menu,
  X,
  Sparkles,
  Rocket,
  Code2,
  Palette,
  Briefcase,
  Brain,
} from 'lucide-react'
import { useState } from 'react'

const trendingAgents = [
  {
    name: 'CodeGPT',
    description: 'AI Coding Agent',
    rating: '4.8',
    users: '10.2K',
    price: 'Free · Freemium',
    icon: Code2,
    iconBg: 'bg-emerald-500/20',
    iconColor: 'text-emerald-400',
  },
  {
    name: 'VideoMind',
    description: 'AI Video Editor',
    rating: '4.7',
    users: '8.7K',
    price: 'Freemium · $9/mo',
    icon: Sparkles,
    iconBg: 'bg-purple-500/20',
    iconColor: 'text-purple-400',
  },
  {
    name: 'ResearchAI',
    description: 'AI Research Assistant',
    rating: '4.9',
    users: '6.3K',
    price: 'Freemium · $12/mo',
    icon: Brain,
    iconBg: 'bg-emerald-500/20',
    iconColor: 'text-emerald-400',
  },
  {
    name: 'PromptHub',
    description: 'AI Prompt Manager',
    rating: '4.6',
    users: '5.1K',
    price: 'Free',
    icon: Sparkles,
    iconBg: 'bg-red-500/20',
    iconColor: 'text-red-400',
  },
]

const trends = [
  {
    title: 'Claude 3.5 Launch',
    growth: '+156%',
    label: 'Trending Now',
    icon: Sparkles,
  },
  {
    title: 'AI Agents in Browsers',
    growth: '+112%',
    label: 'Rising Trend',
    icon: Compass,
  },
  {
    title: 'Open Source Models',
    growth: '+89%',
    label: 'Hot Topic',
    icon: Code2,
  },
  {
    title: 'AI Video Generation',
    growth: '+78%',
    label: 'Growing Fast',
    icon: Palette,
  },
]

const sidebarItems = [
  { label: 'Home', icon: HomeIcon, active: true },
  { label: 'Trending', icon: TrendingUp },
  { label: 'Agents', icon: Bot },
  { label: 'Categories', icon: Layers },
  { label: 'AI Trends', icon: Compass },
  { label: 'News', icon: Newspaper },
  { label: 'Saved', icon: Bookmark },
  { label: 'Collections', icon: Heart },
  { label: 'Community', icon: Users },
  { label: 'Profile', icon: User },
  { label: 'Settings', icon: Settings },
]

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#070b14] text-white">

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed left-0 top-0 z-50 h-screen w-64
          border-r border-white/10
          bg-[#0a0f1b]
          transition-transform duration-300
          lg:translate-x-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >

        {/* Logo */}
        <div className="flex h-20 items-center justify-between border-b border-white/10 px-6">

          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-blue-500">
              <Bot size={21} />
            </div>

            <span className="text-lg font-bold">
              Agent Market
            </span>
          </Link>

          <button
            onClick={() => setSidebarOpen(false)}
            className="rounded-lg p-2 text-slate-400 hover:bg-white/5 hover:text-white lg:hidden"
          >
            <X size={20} />
          </button>

        </div>

        {/* Sidebar navigation */}
        <nav className="px-3 py-5">

          {sidebarItems.map((item) => {
            const Icon = item.icon

            return (
              <Link
                key={item.label}
                to="#"
                className={`
                  mb-1 flex items-center gap-3 rounded-xl px-4 py-3
                  text-sm transition
                  ${
                    item.active
                      ? 'bg-gradient-to-r from-purple-600/40 to-purple-500/10 text-white'
                      : 'text-slate-400 hover:bg-white/5 hover:text-white'
                  }
                `}
              >
                <Icon size={18} />

                <span>{item.label}</span>

              </Link>
            )
          })}

        </nav>

      </aside>

      {/* Main */}
      <div className="lg:pl-64">

        {/* Top navbar */}
        <header className="sticky top-0 z-30 border-b border-white/10 bg-[#070b14]/90 backdrop-blur-xl">

          <div className="flex h-20 items-center gap-4 px-4 sm:px-6 lg:px-8">

            {/* Mobile menu */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="rounded-lg p-2 text-slate-400 hover:bg-white/5 hover:text-white lg:hidden"
            >
              <Menu size={22} />
            </button>

            {/* Search */}
            <div className="relative max-w-xl flex-1">

              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
              />

              <input
                type="text"
                placeholder="Search AI agents, tools, trends..."
                className="
                  w-full rounded-xl border border-white/10
                  bg-[#101624] py-3 pl-11 pr-4
                  text-sm text-white
                  outline-none
                  placeholder:text-slate-500
                  focus:border-purple-500/50
                "
              />

            </div>

            {/* Right side */}
            <div className="ml-auto flex items-center gap-3">

              <button className="relative rounded-xl p-2.5 text-slate-400 hover:bg-white/5 hover:text-white">
                <Bell size={20} />

                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-purple-500" />
              </button>

              <button className="flex items-center gap-2 rounded-xl p-1.5 hover:bg-white/5">

                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-blue-500 text-sm font-bold">
                  C
                </div>

              </button>

            </div>

          </div>

        </header>

        {/* Dashboard content */}
        <main className="mx-auto max-w-[1600px] px-4 py-8 sm:px-6 lg:px-8">

          {/* Hero */}
          <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#111827] via-[#0d1424] to-[#090d18] p-6 sm:p-8 lg:p-10">

            {/* Background glow */}
            <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-purple-600/20 blur-3xl" />

            <div className="absolute bottom-0 right-1/4 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl" />

            <div className="relative flex flex-col justify-between gap-8 lg:flex-row lg:items-center">

              <div className="max-w-2xl">

                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1.5 text-xs font-medium text-purple-300">
                  <Sparkles size={14} />
                  AI Discovery Platform
                </div>

                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                  Discover the Best
                  <span className="block bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                    AI Agents
                  </span>
                </h1>

                <p className="mt-4 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
                  Stay ahead with the latest AI agents, tools, trends,
                  innovations, and opportunities — all in one place.
                </p>

                <div className="mt-7 flex flex-wrap gap-3">

                  <Link
                    to="/agents"
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 px-5 py-3 text-sm font-semibold shadow-lg shadow-purple-900/20 transition hover:scale-[1.02] hover:from-purple-500 hover:to-blue-500"
                  >
                    Explore Agents
                    <ArrowUpRight size={17} />
                  </Link>

                  <Link
                    to="/trends"
                    className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/10"
                  >
                    View Trends
                    <TrendingUp size={17} />
                  </Link>

                </div>

              </div>

              {/* Robot visual */}
              <div className="hidden h-56 w-56 shrink-0 items-center justify-center lg:flex">

                <div className="relative">

                  <div className="absolute inset-0 rounded-full bg-purple-500/20 blur-3xl" />

                  <div className="relative flex h-44 w-44 items-center justify-center rounded-[3rem] border border-purple-400/20 bg-gradient-to-br from-purple-500/20 to-blue-500/10 shadow-2xl shadow-purple-900/30">

                    <Bot
                      size={100}
                      strokeWidth={1}
                      className="text-purple-300"
                    />

                  </div>

                </div>

              </div>

            </div>

          </section>

          {/* Stats */}
          <section className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">

            <StatCard
              icon={Bot}
              value="12.4K+"
              label="AI Agents"
              iconBg="bg-emerald-500/10"
              iconColor="text-emerald-400"
            />

            <StatCard
              icon={Rocket}
              value="342"
              label="New This Week"
              iconBg="bg-purple-500/10"
              iconColor="text-purple-400"
            />

            <StatCard
              icon={Users}
              value="2.6M+"
              label="Active Users"
              iconBg="bg-yellow-500/10"
              iconColor="text-yellow-400"
            />

            <StatCard
              icon={Grid2X2}
              value="98"
              label="Categories"
              iconBg="bg-blue-500/10"
              iconColor="text-blue-400"
            />

          </section>

          {/* Trending Agents */}
          <section className="mt-10">

            <SectionHeader
              title="Trending Agents"
              linkText="View all"
              href="/agents"
            />

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

              {trendingAgents.map((agent) => (
                <AgentCard
                  key={agent.name}
                  agent={agent}
                />
              ))}

            </div>

          </section>

          {/* AI Trends */}
          <section className="mt-10">

            <SectionHeader
              title="AI Trends This Week"
              linkText="View all"
              href="/trends"
            />

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

              {trends.map((trend) => {
                const Icon = trend.icon

                return (
                  <div
                    key={trend.title}
                    className="group rounded-2xl border border-white/10 bg-[#0d1421] p-5 transition hover:-translate-y-1 hover:border-purple-500/30"
                  >

                    <div className="flex items-start justify-between">

                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
                        <Icon size={20} />
                      </div>

                      <div className="flex items-center gap-1 text-sm font-semibold text-emerald-400">
                        <ArrowUpRight size={15} />
                        {trend.growth}
                      </div>

                    </div>

                    <h3 className="mt-5 font-semibold">
                      {trend.title}
                    </h3>

                    <p className="mt-1 text-xs text-slate-500">
                      {trend.label}
                    </p>

                    {/* Fake chart */}
                    <div className="mt-5 flex h-10 items-end gap-1">

                      {[25, 40, 30, 55, 45, 70, 85].map(
                        (height, index) => (
                          <div
                            key={index}
                            className="flex-1 rounded-sm bg-gradient-to-t from-purple-600/20 to-purple-400/70"
                            style={{
                              height: `${height}%`,
                            }}
                          />
                        )
                      )}

                    </div>

                  </div>
                )
              })}

            </div>

          </section>

          {/* New Releases */}
          <section className="mt-10">

            <SectionHeader
              title="New Releases"
              linkText="View all"
              href="/agents"
            />

            <div className="grid gap-4 lg:grid-cols-2">

              <ReleaseCard
                icon={Sparkles}
                title="Agent Studio"
                description="Build custom AI agents"
                rating="4.7"
                tag="NEW"
                tagColor="bg-emerald-500"
              />

              <ReleaseCard
                icon={Brain}
                title="Research Copilot"
                description="AI-powered research assistant"
                rating="4.8"
                tag="NEW"
                tagColor="bg-purple-500"
              />

            </div>

          </section>

          {/* CTA */}
          <section className="relative mt-10 overflow-hidden rounded-3xl border border-purple-500/20 bg-gradient-to-r from-purple-900/30 via-[#111827] to-blue-900/20 p-8">

            <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-purple-600/10 to-transparent" />

            <div className="relative flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">

              <div>

                <div className="flex items-center gap-2 text-purple-400">
                  <Bot size={20} />
                  <span className="text-sm font-medium">
                    AI Agent Marketplace
                  </span>
                </div>

                <h2 className="mt-2 text-2xl font-bold">
                  Have an AI agent?
                </h2>

                <p className="mt-2 text-sm text-slate-400">
                  List your AI agent and get discovered by millions of users.
                </p>

              </div>

              <Link
                to="/signup"
                className="shrink-0 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-3 text-sm font-semibold transition hover:scale-[1.02]"
              >
                Get Started
              </Link>

            </div>

          </section>

          {/* Footer */}
          <footer className="mt-12 border-t border-white/10 py-8">

            <div className="flex flex-col justify-between gap-4 text-sm text-slate-500 sm:flex-row">

              <p>
                © {new Date().getFullYear()} Agent Market
              </p>

              <div className="flex gap-5">
                <Link
                  to="#"
                  className="hover:text-white"
                >
                  About
                </Link>

                <Link
                  to="#"
                  className="hover:text-white"
                >
                  Privacy
                </Link>

                <Link
                  to="#"
                  className="hover:text-white"
                >
                  Terms
                </Link>
              </div>

            </div>

          </footer>

        </main>

      </div>

    </div>
  )
}


/* ----------------------------- */
/* Components                    */
/* ----------------------------- */

function StatCard({
  icon: Icon,
  value,
  label,
  iconBg,
  iconColor,
}) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-[#0d1421] p-5">

      <div
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${iconBg} ${iconColor}`}
      >
        <Icon size={23} />
      </div>

      <div>
        <p className="text-xl font-bold sm:text-2xl">
          {value}
        </p>

        <p className="mt-0.5 text-xs text-slate-500 sm:text-sm">
          {label}
        </p>
      </div>

    </div>
  )
}


function SectionHeader({
  title,
  linkText,
  href,
}) {
  return (
    <div className="mb-5 flex items-center justify-between">

      <h2 className="text-xl font-bold sm:text-2xl">
        {title}
      </h2>

      <Link
        to={href}
        className="flex items-center gap-1 text-sm font-medium text-purple-400 transition hover:text-purple-300"
      >
        {linkText}
        <ChevronRight size={16} />
      </Link>

    </div>
  )
}


function AgentCard({ agent }) {
  const Icon = agent.icon

  return (
    <Link
      to="#"
      className="group rounded-2xl border border-white/10 bg-[#0d1421] p-5 transition duration-300 hover:-translate-y-1 hover:border-purple-500/30 hover:bg-[#101827]"
    >

      <div className="flex items-start justify-between">

        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${agent.iconBg} ${agent.iconColor}`}
        >
          <Icon size={21} />
        </div>

        <button
          onClick={(e) => e.preventDefault()}
          className="rounded-lg p-2 text-slate-600 transition hover:bg-white/5 hover:text-white"
        >
          <Bookmark size={17} />
        </button>

      </div>

      <h3 className="mt-5 font-semibold group-hover:text-purple-300">
        {agent.name}
      </h3>

      <p className="mt-1 text-xs text-slate-500">
        {agent.description}
      </p>

      <div className="mt-4 flex items-center gap-4 text-xs">

        <span className="flex items-center gap-1 text-yellow-400">
          <Star
            size={13}
            fill="currentColor"
          />
          {agent.rating}
        </span>

        <span className="flex items-center gap-1 text-slate-500">
          <Users size={13} />
          {agent.users}
        </span>

      </div>

      <div className="mt-4 border-t border-white/5 pt-3 text-xs text-slate-500">
        {agent.price}
      </div>

    </Link>
  )
}


function ReleaseCard({
  icon: Icon,
  title,
  description,
  rating,
  tag,
  tagColor,
}) {
  return (
    <Link
      to="#"
      className="group flex items-center gap-5 rounded-2xl border border-white/10 bg-[#0d1421] p-5 transition hover:border-purple-500/30"
    >

      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-purple-500/10 text-purple-400">
        <Icon size={26} />
      </div>

      <div className="min-w-0 flex-1">

        <div className="flex items-center gap-2">

          <h3 className="font-semibold group-hover:text-purple-300">
            {title}
          </h3>

          <span
            className={`rounded-full ${tagColor} px-2 py-0.5 text-[10px] font-bold text-white`}
          >
            {tag}
          </span>

        </div>

        <p className="mt-1 text-sm text-slate-500">
          {description}
        </p>

        <div className="mt-2 flex items-center gap-1 text-xs text-yellow-400">
          <Star
            size={12}
            fill="currentColor"
          />
          {rating}
        </div>

      </div>

      <ChevronRight
        size={20}
        className="text-slate-600 transition group-hover:text-purple-400"
      />

    </Link>
  )
}