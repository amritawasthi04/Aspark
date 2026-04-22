import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router'
import { NAV_ITEMS } from './admin-data'
import {
  LayoutDashboard, Calendar, Layers, Users, Trophy, Image, Settings,
  ChevronLeft, ChevronRight, LogOut, Zap
} from 'lucide-react'
import { motion } from 'motion/react'

const ICON_MAP: Record<string, React.ElementType> = {
  LayoutDashboard, Calendar, Layers, Users, Trophy, Image, Settings,
}

export function AdminSidebar({ onLogout }: { onLogout: () => void }) {
  const [collapsed, setCollapsed] = useState(() => {
    return localStorage.getItem('admin_sidebar') === 'collapsed'
  })
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    localStorage.setItem('admin_sidebar', collapsed ? 'collapsed' : 'expanded')
  }, [collapsed])

  const isActive = (href: string) => {
    if (href === '/admin') return location.pathname === '/admin'
    return location.pathname.startsWith(href)
  }

  return (
    <motion.aside
      animate={{ width: collapsed ? 72 : 260 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="hidden md:flex flex-col h-screen sticky top-0 border-r border-white/5 bg-[#0a0a1a] z-50"
      aria-expanded={!collapsed}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 h-16 border-b border-white/5">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center flex-shrink-0">
          <Zap size={16} className="text-white" />
        </div>
        {!collapsed && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-white tracking-widest text-sm"
          >
            ASPARK
          </motion.span>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 px-3 flex flex-col gap-1 overflow-y-auto">
        {NAV_ITEMS.map(item => {
          const Icon = ICON_MAP[item.icon] || LayoutDashboard
          const active = isActive(item.href)
          return (
            <button
              key={item.href}
              onClick={() => navigate(item.href)}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all duration-200 relative group
                ${active
                  ? 'bg-cyan-500/10 text-cyan-400 border-l-2 border-cyan-400'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-white/5 border-l-2 border-transparent'
                }`}
            >
              <Icon size={20} className="flex-shrink-0 group-hover:scale-105 transition-transform" />
              {!collapsed && <span className="text-sm">{item.label}</span>}
              {item.badge && !collapsed && (
                <span className="ml-auto bg-cyan-500/20 text-cyan-400 text-xs px-2 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
              {item.badge && collapsed && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-cyan-500 rounded-full text-[10px] text-white flex items-center justify-center">
                  {item.badge}
                </span>
              )}
            </button>
          )
        })}
      </nav>

      {/* Bottom */}
      <div className="px-3 pb-4 flex flex-col gap-2 border-t border-white/5 pt-4">
        <button
          onClick={onLogout}
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all"
        >
          <LogOut size={20} className="flex-shrink-0" />
          {!collapsed && <span className="text-sm">Logout</span>}
        </button>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center justify-center rounded-lg py-2 text-gray-500 hover:text-gray-300 hover:bg-white/5 transition-all"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>
    </motion.aside>
  )
}
