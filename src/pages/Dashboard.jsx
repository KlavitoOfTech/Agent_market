import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Bot,
  Home,
  TrendingUp,
  Layers,
  Compass,
  Newspaper,
  Bookmark,
  Heart,
  Users,
  User,
  Settings,
  Bell,
  Search,
  Menu,
  X,
  LogOut,
  Sparkles,
  ArrowUpRight,
  Star,
  Clock3,
  ChevronRight,
  Plus,
  BarChart3,
  Zap,
  Grid2X2,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const sidebarItems = [
  { label: 'Home', icon: Home, path: '/' },
  { label: 'Trending', icon: TrendingUp, path: '#' },
  { label: 'Agents', icon: Bot, path: '#' },
  { label: 'Categories', icon: Layers, path: '#' },
  { label: 'AI Trends', icon: Compass, path: '#' },
  { label: 'News', icon: Newspaper, path: '#' },
  { label: 'Saved', icon: Bookmark, path: '#' },
  { label: 'Collections', icon: Heart, path: '#' },
  { label: 'Community', icon: Users, path: '#' },
  { label: 'Profile', icon: User, path: '#' },
  { label: 'Settings', icon: Settings, path: '#' },
]

const recommendedAgents = [
  {
    name: 'CodeGPT',
    description: 'AI Coding Agent',
    rating: '4.8',
    users: '10.2K',
    category: 'Coding',
    icon: '💻',
  },
  {
    name: 'ResearchAI',
    description: 'AI Research Assistant',
    rating: '4.9',
    users: '6.3K',
    category: 'Research',
    icon: '🧠',
  },
  {
    name: 'VideoMind',
    description: 'AI Video Editor',
    rating: '4.7',
    users: '8.7K',
    category: 'Video',
    icon: '🎬',
  },
]

const trends = [
  {
    title: 'AI Agents in Browsers',
    growth: '+112%',
    status: 'Rising Trend',
  },
  {
    title: 'Open Source Models',
    growth: '+89%',
    status: 'Hot Topic',
  },
  {
    title: 'AI Video Generation',
    growth: '+78%',
    status: 'Growing Fast',
  },
]

export default function Dashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  const displayName =
    user?.user_metadata?.full_name ||
    user?.user_metadata?.fullName ||
    user?.email?.split('@')[0] ||
    'User'

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

          <Link
            to="/"
            className="flex items-center gap-3"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-blue-600">
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

        {/* Navigation */}
        <nav className="px-3 py-5">

          {sidebarItems.map((item) => {
            const Icon = item.icon

            return (
              <Link
                key={item.label}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`
                  mb-1 flex items-center gap-3 rounded-xl
                  px-4 py-3 text-sm transition
                  ${
                    item.label === 'Home'
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

        {/* Bottom user area */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-white/10 p-4">

          <div className="flex items-center gap-3 rounded-xl bg-white/[0.03] p-3">

            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-blue-500 text-sm font-bold">
              {displayName.charAt(0).toUpperCase()}
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-medium">
                {displayName}
              </p>

              <p className="truncate text-xs text-slate-500">
                {user?.email}
              </p>
            </div>

          </div>

        </div>

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

            {/* Right */}
            <div className="ml-auto flex items-center gap-2 sm:gap-3">

              <button className="relative rounded-xl p-2.5 text-slate-400 transition hover:bg-white/5 hover:text-white">

                <Bell size={20} />

                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-purple-500" />

              </button>

              <button
                onClick={handleLogout}
                className="hidden items-center gap-2 rounded-xl border border-white/10 px-3 py-2 text-sm text-slate-400 transition hover:bg-white/5 hover:text-white sm:flex"
              >
                <LogOut size={16} />
                Logout
              </button>

              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-blue-500 text-sm font-bold">
                {displayName.charAt(0).toUpperCase()}
              </div>

            </div>

          </div>

        </header>

        {/* Dashboard content */}
        <main className="mx-auto max-w-[1600px] px-4 py-8 sm:px-6 lg:px-8">

          {/* Welcome */}
          <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#111827] via-[#0d1424] to-[#090d18] p-6 sm:p-8">

            <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-purple-600/20 blur-3xl" />

            <div className="absolute bottom-0 right-1/4 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl" />

            <div className="relative flex flex-col justify-between gap-8 md:flex-row md:items-center">

              <div>

                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1.5 text-xs font-medium text-purple-300">
                  <Sparkles size={14} />
                  Your AI Dashboard
                </div>

                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Welcome back,
                  <span className="block bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                    {displayName}
                  </span>
                </h1>

                <p className="mt-3 max-w-xl text-sm leading-6 text-slate-400">
                  Discover what's happening in AI, explore new agents,
                  and keep track of the tools that matter to you.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">

                  <Link
                    to="/"
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 px-5 py-3 text-sm font-semibold transition hover:scale-[1.02]"
                  >
                    Explore Agents
                    <ArrowUpRight size={17} />
                  </Link>

                  <button className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-slate-300 transition hover:bg-white/10">
                    <Bookmark size={16} />
                    Saved Agents
                  </button>

                </div>

              </div>

              <div className="hidden md:flex">

                <div className="relative flex h-40 w-40 items-center justify-center rounded-[2.5rem] border border-purple-400/20 bg-gradient-to-br from-purple-500/20 to-blue-500/10 shadow-2xl shadow-purple-900/20">

                  <div className="absolute inset-0 rounded-[2.5rem] bg-purple-500/10 blur-2xl" />

                  <Bot
                    size={82}
                    strokeWidth={1}
                    className="relative text-purple-300"
                  />

                </div>

              </div>

            </div>

          </section>

          {/* Stats */}
          <section className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">

            <StatCard
              icon={Bookmark}
              value="12"
              label="Saved Agents"
              iconColor="text-purple-400"
              iconBg="bg-purple-500/10"
            />

            <StatCard
              icon={Clock3}
              value="24"
              label="Agents Viewed"
              iconColor="text-blue-400"
              iconBg="bg-blue-500/10"
            />

            <StatCard
              icon={TrendingUp}
              value="8"
              label="Trends Following"
              iconColor="text-emerald-400"
              iconBg="bg-emerald-500/10"
            />

            <StatCard
              icon={Grid2X2}
              value="5"
              label="Collections"
              iconColor="text-yellow-400"
              iconBg="bg-yellow-500/10"
            />

          </section>

          {/* Quick actions */}
          <section className="mt-10">

            <SectionHeader title="Quick Actions" />

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

              <QuickAction
                icon={Bot}
                title="Explore Agents"
                description="Find your next AI tool"
              />

              <QuickAction
                icon={TrendingUp}
                title="View Trends"
                description="See what's gaining momentum"
              />

              <QuickAction
                icon={Bookmark}
                title="Saved Agents"
                description="Review your favorites"
              />

              <QuickAction
                icon={Plus}
                title="Create Collection"
                description="Organize your discoveries"
              />

            </div>

          </section>

          {/* Recommended */}
          <section className="mt-10">

            <SectionHeader
              title="Recommended for You"
              linkText="View all"
            />

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">

              {recommendedAgents.map((agent) => (
                <AgentCard
                  key={agent.name}
                  agent={agent}
                />
              ))}

            </div>

          </section>

          {/* Trends */}
          <section className="mt-10">

            <SectionHeader
              title="AI Trends You Should Know"
              linkText="View all"
            />

            <div className="grid gap-4 lg:grid-cols-3">

              {trends.map((trend) => (
                <TrendCard
                  key={trend.title}
                  trend={trend}
                />
              ))}

            </div>

          </section>

          {/* Activity */}
          <section className="mt-10 grid gap-6 lg:grid-cols-2">

            <div className="rounded-2xl border border-white/10 bg-[#0d1421] p-6">

              <div className="flex items-center justify-between">

                <div>
                  <h2 className="text-lg font-bold">
                    Your Activity
                  </h2>

                  <p className="mt-1 text-xs text-slate-500">
                    Your recent Agent Market activity
                  </p>
                </div>

                <BarChart3
                  size={20}
                  className="text-purple-400"
                />

              </div>

              <div className="mt-6 space-y-4">

                <ActivityItem
                  icon={Bookmark}
                  title="Saved CodeGPT"
                  time="2 hours ago"
                />

                <ActivityItem
                  icon={Bot}
                  title="Viewed ResearchAI"
                  time="Yesterday"
                />

                <ActivityItem
                  icon={TrendingUp}
                  title="Followed AI Agents in Browsers"
                  time="2 days ago"
                />

              </div>

            </div>

            {/* Upgrade / CTA */}
            <div className="relative overflow-hidden rounded-2xl border border-purple-500/20 bg-gradient-to-br from-purple-900/20 to-blue-900/10 p-6">

              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-purple-500/20 blur-3xl" />

              <div className="relative">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
                  <Zap size={22} />
                </div>

                <h2 className="mt-5 text-xl font-bold">
                  Get more from Agent Market
                </h2>

                <p className="mt-2 max-w-md text-sm leading-6 text-slate-400">
                  Discover more AI agents, organize your favorites,
                  and stay ahead of the latest AI trends.
                </p>

                <button className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 px-5 py-3 text-sm font-semibold transition hover:scale-[1.02]">
                  Explore More
                  <ArrowUpRight size={16} />
                </button>

              </div>

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
                  to="/"
                  className="transition hover:text-white"
                >
                  Home
                </Link>

                <Link
                  to="#"
                  className="transition hover:text-white"
                >
                  Privacy
                </Link>

                <Link
                  to="#"
                  className="transition hover:text-white"
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


/* ================================= */
/* STAT CARD                         */
/* ================================= */

function StatCard({
  icon: Icon,
  value,
  label,
  iconColor,
  iconBg,
}) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-[#0d1421] p-5">

      <div
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${iconBg} ${iconColor}`}
      >
        <Icon size={22} />
      </div>

      <div>

        <p className="text-xl font-bold sm:text-2xl">
          {value}
        </p>

        <p className="mt-1 text-xs text-slate-500 sm:text-sm">
          {label}
        </p>

      </div>

    </div>
  )
}


/* ================================= */
/* SECTION HEADER                    */
/* ================================= */

function SectionHeader({
  title,
  linkText,
}) {
  return (
    <div className="mb-5 flex items-center justify-between">

      <h2 className="text-xl font-bold sm:text-2xl">
        {title}
      </h2>

      {linkText && (
        <button className="flex items-center gap-1 text-sm font-medium text-purple-400 transition hover:text-purple-300">
          {linkText}
          <ChevronRight size={16} />
        </button>
      )}

    </div>
  )
}


/* ================================= */
/* QUICK ACTION                      */
/* ================================= */

function QuickAction({
  icon: Icon,
  title,
  description,
}) {
  return (
    <button className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-[#0d1421] p-5 text-left transition hover:-translate-y-1 hover:border-purple-500/30 hover:bg-[#101827]">

      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400 transition group-hover:bg-purple-500/20">
        <Icon size={21} />
      </div>

      <div className="min-w-0">

        <h3 className="font-semibold group-hover:text-purple-300">
          {title}
        </h3>

        <p className="mt-1 text-xs text-slate-500">
          {description}
        </p>

      </div>

    </button>
  )
}


/* ================================= */
/* AGENT CARD                        */
/* ================================= */

function AgentCard({ agent }) {
  return (
    <div className="group rounded-2xl border border-white/10 bg-[#0d1421] p-5 transition hover:-translate-y-1 hover:border-purple-500/30">

      <div className="flex items-start justify-between">

        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10 text-2xl">
          {agent.icon}
        </div>

        <button className="rounded-lg p-2 text-slate-600 transition hover:bg-white/5 hover:text-white">
          <Bookmark size={17} />
        </button>

      </div>

      <div className="mt-5">

        <div className="flex items-center justify-between">

          <h3 className="font-semibold group-hover:text-purple-300">
            {agent.name}
          </h3>

          <span className="rounded-full bg-white/5 px-2 py-1 text-[10px] text-slate-500">
            {agent.category}
          </span>

        </div>

        <p className="mt-1 text-xs text-slate-500">
          {agent.description}
        </p>

      </div>

      <div className="mt-5 flex items-center gap-4 text-xs">

        <span className="flex items-center gap-1 text-yellow-400">
          <Star size={13} fill="currentColor" />
          {agent.rating}
        </span>

        <span className="text-slate-500">
          {agent.users} users
        </span>

      </div>

    </div>
  )
}


/* ================================= */
/* TREND CARD                        */
/* ================================= */

function TrendCard({ trend }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#0d1421] p-5 transition hover:border-purple-500/30">

      <div className="flex items-start justify-between">

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
          <TrendingUp size={20} />
        </div>

        <span className="flex items-center gap-1 text-sm font-semibold text-emerald-400">
          <ArrowUpRight size={15} />
          {trend.growth}
        </span>

      </div>

      <h3 className="mt-5 font-semibold">
        {trend.title}
      </h3>

      <p className="mt-1 text-xs text-slate-500">
        {trend.status}
      </p>

      <div className="mt-5 flex h-8 items-end gap-1">

        {[30, 45, 35, 60, 48, 75, 90].map(
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
}


/* ================================= */
/* ACTIVITY ITEM                     */
/* ================================= */

function ActivityItem({
  icon: Icon,
  title,
  time,
}) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-white/5 bg-white/[0.02] p-3">

      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400">
        <Icon size={17} />
      </div>

      <div className="min-w-0 flex-1">

        <p className="truncate text-sm font-medium">
          {title}
        </p>

        <p className="mt-1 text-xs text-slate-600">
          {time}
        </p>

      </div>

    </div>
  )
}