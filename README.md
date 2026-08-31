# 🤖 Agent Market

> **Discover what’s next in AI.**

Agent Market is an AI discovery platform that helps users find, explore, compare, save, and keep up with AI agents, tools, trends, and news — without having to search across the internet every time they need an AI solution.

## 🚀 Overview

The AI ecosystem is growing rapidly, with new tools and agents launching constantly.

Finding the right AI tool can require searching through multiple platforms, comparing different products, and trying to determine which ones are actually gaining traction.

**Agent Market brings AI discovery into one place.**

Instead of asking:

> *"What AI tools exist?"*

Agent Market aims to answer:

> **"What's happening in AI right now, and which tools should I pay attention to?"**

## ✨ Features

### 🔎 AI Agent Discovery

Browse AI agents across categories such as:

* Coding
* Design
* Research
* Marketing
* Education
* Productivity
* Video
* Writing

### 🔥 Trending Agents

Discover agents gaining attention based on signals such as popularity, activity, saves, and recency.

### 🧭 AI Trends

Explore emerging trends across the AI ecosystem and understand which categories are gaining momentum.

### 📰 AI News

Keep up with important AI releases, developments, and industry updates.

### ❤️ Saved Agents

Save useful AI agents to your personal collection and revisit them later.

### 📁 Collections

Organize saved AI agents into personalized collections.

### 🎯 Personalized Discovery

Users can select their interests during onboarding so Agent Market can provide more relevant recommendations.

### 🔍 Search & Filtering

Find agents using:

* Search
* Category
* Pricing
* Rating
* Popularity
* Newest releases

### 👤 Profile & Settings

Users can manage their profile, preferences, and notification settings.

## 💡 Why Agent Market?

AI discovery is becoming a problem of its own.

Chatbots and search engines are useful for researching AI tools, but Agent Market is designed specifically around **AI discovery**.

The long-term vision is to become a discovery layer for the AI ecosystem:

```text
Discover
    ↓
Compare
    ↓
Track
    ↓
Save
    ↓
Personalize
```

Instead of manually searching across multiple platforms, users can come to one place to discover what's new, what's popular, and what's gaining momentum.

## 🛠️ Tech Stack

### Frontend

* React
* Vite
* Tailwind CSS
* React Router
* Lucide React

### Backend / Data

* Supabase
* PostgreSQL
* Supabase Auth
* Row Level Security

### Deployment

* Vercel

## 🏗️ Architecture

```text
                    Agent Market
                         │
                  React + Vite
                         │
                     Vercel
                         │
                      Supabase
              ┌──────────┼──────────┐
              │          │          │
             Auth     Database    Storage
              │          │
              │     ┌────┴──────────────┐
              │     │                   │
              │   Agents             Trends
              │   Categories         News
              │   Saved Agents       Profiles
              │   Collections
              │
              └───────────────┘
```

## 📂 Project Structure

```text
src/
├── components/
│   ├── agents/
│   │   ├── AgentCard.jsx
│   │   ├── AgentGrid.jsx
│   │   └── CategoryFilter.jsx
│   │
│   └── ...
│
├── context/
│   └── AuthContext.jsx
│
├── lib/
│   └── supabase.js
│
├── pages/
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── Signup.jsx
│   ├── Dashboard.jsx
│   ├── Agents.jsx
│   ├── AgentDetails.jsx
│   ├── SavedAgents.jsx
│   ├── Onboarding.jsx
│   ├── Profile.jsx
│   └── Settings.jsx
│
├── App.jsx
└── main.jsx
```

## ⚙️ Getting Started

### Prerequisites

Make sure you have installed:

* Node.js
* npm
* A Supabase project

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/agent-market.git
cd agent-market
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_publishable_key
```

**Never commit your `.env` file or Supabase service-role/secret key to GitHub.**

### 4. Start the development server

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:5173
```

### 5. Build for production

```bash
npm run build
```

## 🔐 Authentication

Agent Market uses Supabase Authentication.

The authentication flow supports:

```text
Sign Up
   ↓
Onboarding
   ↓
Select Interests
   ↓
Dashboard
```

Returning users can:

```text
Login
   ↓
Check onboarding status
   ↓
Dashboard
```

## 🗄️ Database

The application currently uses Supabase/PostgreSQL for storing:

```text
profiles
agents
categories
saved_agents
collections
trends
news
```

Agent information includes fields such as:

```text
id
name
description
slug
category_id
rating
users_count
pricing
logo_url
website_url
created_at
```

## 🔮 Roadmap

Agent Market is currently an MVP. Future improvements include:

* [ ] Automated AI agent discovery
* [ ] Automated AI news ingestion
* [ ] Real-time trend detection
* [ ] Advanced trend scoring
* [ ] AI agent comparison
* [ ] Personalized recommendations
* [ ] Agent reviews and ratings
* [ ] Agent verification
* [ ] AI company profiles
* [ ] Developer submissions
* [ ] Analytics for AI builders
* [ ] Featured/paid listings
* [ ] Improved collections
* [ ] Community features

### Long-term vision

The goal is to move from manually curated AI discovery toward an intelligent system that continuously monitors the AI ecosystem.

```text
Internet
   ↓
AI Tools + News + Activity
   ↓
Agent Market
   ↓
Trend Detection
   ↓
Ranking
   ↓
Personalization
   ↓
Better AI Discovery
```

## 🤝 Contributing

Contributions, suggestions, and feedback are welcome.

To contribute:

```bash
git checkout -b feature/your-feature
```

Make your changes, commit them, and push your branch:

```bash
git add .
git commit -m "feat: add your feature"
git push origin feature/your-feature
```

Then open a Pull Request.

## 📌 Project Status

**Status:** MVP / Active Development

Agent Market is currently being developed as an AI discovery platform, with the core marketplace, authentication, personalization, trends, news, and saved-agent functionality being built incrementally.

## 👨‍💻 Author

**Ejibe Claver**

Built with curiosity, code, and a belief that discovering AI tools shouldn't be harder than using them.

---

### ⭐ Support the Project

If you find Agent Market interesting, consider starring the repository and following the project's development.

> **Agent Market — Discover what’s next in AI.**
