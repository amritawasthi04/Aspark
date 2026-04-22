import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { useNavigate } from 'react-router'
import {
  Calendar, Layers, Users, Trophy, Image, TrendingUp, TrendingDown,
  CalendarPlus, UserPlus, Award, Upload, Settings, ArrowRight,
  Plus, CheckCircle, XCircle, Edit, Trash2, Eye, Activity
} from 'lucide-react'
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Area, AreaChart
} from 'recharts'
import {
  MOCK_STATS, MOCK_ACTIVITY, MOCK_RECENT_EVENTS,
  ACTIVITY_CHART_DATA, DOMAIN_DISTRIBUTION, GROWTH_CHART_DATA,
  QUICK_ACTIONS, HEALTH_ISSUES
} from './admin-data'
import { useToast } from './ToastProvider'

// Animated counter
function AnimatedNumber({ value }: { value: number }) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    let start = 0
    const step = value / 40
    const timer = setInterval(() => {
      start += step
      if (start >= value) { setCount(value); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, 20)
    return () => clearInterval(timer)
  }, [value])
  return <>{count}</>
}

const STAT_CARDS = [
  { key: 'totalEvents', label: 'Events', icon: Calendar, color: '#4F6EF7', trend: { value: 3, direction: 'up' as const }, href: '/admin/events' },
  { key: 'totalDomains', label: 'Domains', icon: Layers, color: '#a855f7', trend: { value: 1, direction: 'up' as const }, href: '/admin/domains' },
  { key: 'totalMembers', label: 'Members', icon: Users, color: '#22c55e', trend: { value: 5, direction: 'up' as const }, href: '/admin/team' },
  { key: 'totalAchievements', label: 'Achievements', icon: Trophy, color: '#EF9F27', trend: { value: 2, direction: 'up' as const }, href: '/admin/achievements' },
  { key: 'totalGalleryItems', label: 'Gallery', icon: Image, color: '#06b6d4', trend: { value: 12, direction: 'up' as const }, href: '/admin/gallery' },
]

const ACTION_ICONS: Record<string, React.ElementType> = {
  CalendarPlus, LayersIcon: Plus, UserPlus, Award, Upload, Settings,
}

const ACTION_COLORS: Record<string, string> = {
  created: '#22c55e',
  updated: '#4F6EF7',
  deleted: '#E24B4A',
  published: '#a855f7',
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-[#1a1a2e] border border-white/10 rounded-lg px-3 py-2 text-xs shadow-xl">
      <p className="text-gray-400">{label}</p>
      <p className="text-cyan-400">{payload[0].value}</p>
    </div>
  )
}

export function AdminDashboard() {
  const navigate = useNavigate()
  const toast = useToast()

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })

  return (
    <div className="p-4 md:p-6 space-y-6 pb-24 md:pb-6">
      {/* Shared SVG Gradients */}
      <svg width={0} height={0} style={{ position: 'absolute' }}>
        <defs>
          <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4F6EF7" stopOpacity={0.3} />
            <stop offset="100%" stopColor="#4F6EF7" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4F6EF7" stopOpacity={1} />
            <stop offset="100%" stopColor="#4F6EF7" stopOpacity={0.4} />
          </linearGradient>
        </defs>
      </svg>
      {/* Header */}
      <div>
        <h1 className="text-white text-2xl">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">{today}</p>
        <p className="text-gray-400 text-sm mt-0.5">Welcome back, Admin</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {STAT_CARDS.map((card, i) => {
          const value = MOCK_STATS[card.key as keyof typeof MOCK_STATS]
          return (
            <motion.button
              key={card.key}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ y: -2 }}
              onClick={() => navigate(card.href)}
              className="bg-[#12122a] border border-white/5 rounded-xl p-5 text-left hover:border-white/10 transition-all group"
            >
              <div className="flex justify-between items-start mb-3">
                <span className="text-gray-500 text-xs">{card.label}</span>
                <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: `${card.color}15` }}>
                  <card.icon size={18} style={{ color: card.color }} />
                </div>
              </div>
              <div className="text-white text-2xl mb-1"><AnimatedNumber value={value} /></div>
              <div className="flex items-center gap-1 text-xs" style={{ color: card.trend.direction === 'up' ? '#22c55e' : '#E24B4A' }}>
                {card.trend.direction === 'up' ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                +{card.trend.value} this month
              </div>
            </motion.button>
          )
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Activity Chart */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-3 bg-[#12122a] border border-white/5 rounded-xl p-5"
        >
          <h3 className="text-white text-sm mb-4">Events Activity</h3>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={ACTIVITY_CHART_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal vertical={false} />
              <XAxis dataKey="month" tick={{ fill: '#6b7280', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#6b7280', fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="value" stroke="#4F6EF7" fill="url(#areaFill)" strokeWidth={2} dot={{ r: 4, fill: '#4F6EF7', stroke: '#0a0a1a', strokeWidth: 2 }} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Pie Chart */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 bg-[#12122a] border border-white/5 rounded-xl p-5"
        >
          <h3 className="text-white text-sm mb-4">Domain Distribution</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={DOMAIN_DISTRIBUTION} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" isAnimationActive>
                {DOMAIN_DISTRIBUTION.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
            {DOMAIN_DISTRIBUTION.map(d => (
              <div key={d.name} className="flex items-center gap-1.5 text-xs text-gray-400">
                <div className="w-2 h-2 rounded-full" style={{ background: d.color }} />
                {d.name}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
        <h3 className="text-white text-sm mb-3">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {QUICK_ACTIONS.map(action => {
            const Icon = ACTION_ICONS[action.icon] || Plus
            return (
              <button
                key={action.label}
                onClick={() => {
                  toast.info(`Navigating to ${action.label}...`)
                  // navigate(action.href) -- pages not yet built
                }}
                className="bg-[#12122a] border border-white/5 rounded-xl p-4 flex flex-col items-center gap-2 hover:border-cyan-400/30 hover:bg-cyan-400/5 transition-all group"
              >
                <Icon size={20} className="text-gray-400 group-hover:text-cyan-400 transition-colors" />
                <span className="text-xs text-gray-400 group-hover:text-white transition-colors">{action.label}</span>
                <ArrowRight size={12} className="text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            )
          })}
        </div>
      </motion.div>

      {/* Content Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Recent Events */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="bg-[#12122a] border border-white/5 rounded-xl p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-white text-sm">Recent Events</h3>
            <button onClick={() => navigate('/admin/events')} className="text-cyan-400 text-xs hover:underline">View all</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/5">
                  {['Title', 'Date', 'Category', 'Status'].map(h => (
                    <th key={h} className="pb-2 text-[11px] text-gray-500 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {MOCK_RECENT_EVENTS.map((ev, i) => (
                  <motion.tr
                    key={ev.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 + i * 0.03 }}
                    className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="py-2.5 text-sm text-gray-300">{ev.title}</td>
                    <td className="py-2.5 text-sm text-gray-500">{ev.date}</td>
                    <td className="py-2.5"><span className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-gray-400">{ev.category}</span></td>
                    <td className="py-2.5">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${ev.status === 'upcoming' ? 'bg-cyan-400/10 text-cyan-400' : 'bg-gray-500/10 text-gray-500'}`}>
                        {ev.status}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Activity Feed */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="bg-[#12122a] border border-white/5 rounded-xl p-5">
          <h3 className="text-white text-sm mb-4">Recent Activity</h3>
          <div className="space-y-0">
            {MOCK_ACTIVITY.map((log, i) => {
              const color = ACTION_COLORS[log.action]
              const timeAgo = getTimeAgo(log.timestamp)
              return (
                <div key={log.id} className="flex items-start gap-3 py-2.5 border-b border-white/5 last:border-0">
                  <div className="relative flex flex-col items-center">
                    <div className="w-2 h-2 rounded-full mt-1.5" style={{ background: color }} />
                    {i < MOCK_ACTIVITY.length - 1 && <div className="w-px flex-1 bg-white/5 mt-1" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-300">
                      <span style={{ color }} className="capitalize">{log.action}</span>{' '}
                      <span className="text-gray-400">{log.entity}</span>{' '}
                      <span className="text-white">{log.entityName}</span>
                    </p>
                    <p className="text-[11px] text-gray-600 mt-0.5">{timeAgo}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </motion.div>
      </div>

      {/* Health Monitor */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="bg-[#12122a] border border-white/5 rounded-xl p-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="text-white text-sm">Codebase Health Monitor</h3>
            <p className="text-gray-600 text-xs mt-0.5">Source: Graphify report (2026-04-20)</p>
          </div>
          <button
            onClick={() => toast.info('Running diagnostics...')}
            className="px-4 py-1.5 rounded-lg border border-cyan-400/20 text-cyan-400 text-xs hover:bg-cyan-400/10 transition-all self-start"
          >
            Run diagnostics
          </button>
        </div>

        <div className="flex flex-wrap gap-3 mb-4">
          {[
            { label: 'Nodes', value: '133' },
            { label: 'Edges', value: '57' },
            { label: 'Communities', value: '82' },
            { label: 'Health', value: '38/100' },
          ].map(m => (
            <span key={m.label} className="px-3 py-1.5 rounded-lg bg-white/5 text-xs text-gray-300">
              <span className="text-gray-500">{m.label}: </span>{m.value}
            </span>
          ))}
        </div>

        <div className="w-full bg-white/5 rounded-full h-2 mb-4">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '38%' }}
            transition={{ duration: 1, delay: 1 }}
            className="h-2 rounded-full bg-gradient-to-r from-amber-500 to-amber-400"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {HEALTH_ISSUES.map((issue, i) => (
            <div key={i} className="flex items-center gap-2 text-xs">
              {issue.status === 'success' ? (
                <CheckCircle size={14} className="text-green-500 flex-shrink-0" />
              ) : (
                <XCircle size={14} className="text-red-500 flex-shrink-0" />
              )}
              <span className="text-gray-400">{issue.text}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Growth Bar Chart */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="bg-[#12122a] border border-white/5 rounded-xl p-5">
        <h3 className="text-white text-sm mb-4">Monthly Member Growth</h3>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={GROWTH_CHART_DATA}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal vertical={false} />
            <XAxis dataKey="month" tick={{ fill: '#6b7280', fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#6b7280', fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="value" fill="url(#barGrad)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  )
}

function getTimeAgo(timestamp: string) {
  const diff = Date.now() - new Date(timestamp).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  const days = Math.floor(hrs / 24)
  return `${days}d ago`
}