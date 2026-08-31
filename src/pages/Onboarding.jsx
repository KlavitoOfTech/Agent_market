import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Code2,
  Palette,
  Megaphone,
  Search,
  GraduationCap,
  Briefcase,
  Zap,
  ArrowRight,
  Check,
} from 'lucide-react'

import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'


const interests = [
  {
    name: 'Coding',
    icon: Code2,
    description: 'AI coding and development tools',
  },
  {
    name: 'Design',
    icon: Palette,
    description: 'Design and creative AI tools',
  },
  {
    name: 'Marketing',
    icon: Megaphone,
    description: 'Marketing and growth tools',
  },
  {
    name: 'Research',
    icon: Search,
    description: 'Research and knowledge tools',
  },
  {
    name: 'Education',
    icon: GraduationCap,
    description: 'Learning and education tools',
  },
  {
    name: 'Business',
    icon: Briefcase,
    description: 'Business and productivity tools',
  },
  {
    name: 'Productivity',
    icon: Zap,
    description: 'Tools that help you work faster',
  },
]


export default function Onboarding() {

  const { user } = useAuth()
  const navigate = useNavigate()

  const [selected, setSelected] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')


  const toggleInterest = (interest) => {

    setSelected((current) => {

      if (current.includes(interest)) {
        return current.filter(
          (item) => item !== interest
        )
      }

      return [...current, interest]
    })
  }


  const handleContinue = async () => {

    if (!user) {
      navigate('/login')
      return
    }

    if (selected.length === 0) {
      setError('Please select at least one interest.')
      return
    }

    setLoading(true)
    setError('')


    const { error } = await supabase
      .from('profiles')
      .update({
        interests: selected,
        onboarding_completed: true,
      })
      .eq('id', user.id)


    if (error) {

      console.error('Onboarding error:', error)

      setError(
        'Unable to save your preferences. Please try again.'
      )

      setLoading(false)
      return
    }


    navigate('/dashboard')
  }


  return (
    <div className="min-h-screen bg-[#070b14] text-white">

      {/* Background effects */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">

        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-purple-600/10 blur-3xl" />

        <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl" />

      </div>


      {/* Main */}
      <main className="relative z-10 flex min-h-screen items-center justify-center px-4 py-12">

        <div className="w-full max-w-4xl">

          {/* Header */}
          <div className="mb-10 text-center">

            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 shadow-lg shadow-purple-900/20">

              <Zap size={26} />

            </div>


            <h1 className="text-3xl font-bold sm:text-4xl">

              What are you interested in?

            </h1>


            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-400">

              Choose the areas of AI you're most interested in.
              We'll use these preferences to personalize your
              Agent Market experience.

            </p>

          </div>


          {/* Interests */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

            {interests.map((interest) => {

              const Icon = interest.icon

              const isSelected =
                selected.includes(interest.name)


              return (
                <button
                  key={interest.name}
                  type="button"
                  onClick={() =>
                    toggleInterest(interest.name)
                  }
                  className={`
                    group relative rounded-2xl border p-5
                    text-left transition-all duration-200
                    ${
                      isSelected
                        ? 'border-purple-500/60 bg-purple-500/10'
                        : 'border-white/10 bg-[#0d1421] hover:border-purple-500/30 hover:bg-[#101827]'
                    }
                  `}
                >

                  {/* Check */}
                  {isSelected && (
                    <div className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full bg-purple-500 text-white">

                      <Check size={14} />

                    </div>
                  )}


                  {/* Icon */}
                  <div
                    className={`
                      flex h-11 w-11 items-center justify-center
                      rounded-xl transition
                      ${
                        isSelected
                          ? 'bg-purple-500/20 text-purple-300'
                          : 'bg-purple-500/10 text-purple-400 group-hover:bg-purple-500/20'
                      }
                    `}
                  >

                    <Icon size={21} />

                  </div>


                  {/* Text */}
                  <h2 className="mt-5 font-semibold">

                    {interest.name}

                  </h2>


                  <p className="mt-2 text-xs leading-5 text-slate-500">

                    {interest.description}

                  </p>

                </button>
              )

            })}

          </div>


          {/* Error */}
          {error && (
            <div className="mt-5 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-center text-sm text-red-400">

              {error}

            </div>
          )}


          {/* Continue */}
          <div className="mt-8 flex flex-col items-center">

            <button
              type="button"
              onClick={handleContinue}
              disabled={loading}
              className="
                group flex w-full max-w-md
                items-center justify-center gap-2
                rounded-xl
                bg-gradient-to-r from-purple-600 to-blue-600
                px-6 py-3.5
                text-sm font-semibold
                shadow-lg shadow-purple-900/20
                transition
                hover:from-purple-500
                hover:to-blue-500
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >

              {loading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />

                  Saving preferences...
                </>
              ) : (
                <>
                  Continue

                  <ArrowRight
                    size={17}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </>
              )}

            </button>


            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="mt-4 text-xs text-slate-500 transition hover:text-white"
            >
              Skip for now
            </button>

          </div>

        </div>

      </main>

    </div>
  )
}