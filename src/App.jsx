import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import './index.css';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AuthProvider } from './context/AuthContext.jsx'
import Agents from './pages/Agents'
import AgentDetails from './pages/AgentDetails'
import SavedAgents from './pages/SavedAgents'
import Onboarding from './pages/Onboarding'
import Trending from './pages/Trending'
import Categories from './pages/Categories'
import AITrends from './pages/AITrends'
import News from './pages/News'
import Collections from './pages/Collections'
import Profile from './pages/Profile'
import Settings from './pages/Settings'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/agents" element={<Agents />} />
        <Route
          path="/agents/:id"
          element={<AgentDetails />}
        />
        <Route
          path="/saved"
          element={<SavedAgents />}
        />
        <Route
          path="/onboarding"
          element={<Onboarding />}
        />
        <Route
          path="/trending"
          element={<Trending />}
        />
        <Route
          path="/categories"
          element={<Categories />}
        />
        <Route
          path="/ai-trends"
          element={<AITrends />}
        />
        <Route
          path="/news"
          element={<News />}
        />
        <Route
          path="/collections"
          element={<Collections />}
        />
        <Route
          path="/profile"
          element={<Profile />}
        />

        <Route
          path="/settings"
          element={<Settings />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App