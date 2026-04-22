import { useNavigate, useLocation } from 'react-router'
import { LayoutDashboard, Calendar, Users, Trophy, Settings } from 'lucide-react'

const MOBILE_NAV = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Events', href: '/admin/events', icon: Calendar },
  { label: 'Team', href: '/admin/team', icon: Users },
  { label: 'Achieve', href: '/admin/achievements', icon: Trophy },
  { label: 'Settings', href: '/admin/settings', icon: Settings },
]

export function AdminMobileNav() {
  const navigate = useNavigate()
  const location = useLocation()

  const isActive = (href: string) => {
    if (href === '/admin') return location.pathname === '/admin'
    return location.pathname.startsWith(href)
  }

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0a0a1a] border-t border-white/5 pb-[env(safe-area-inset-bottom)]">
      <div className="flex items-center justify-around py-2">
        {MOBILE_NAV.map(item => {
          const active = isActive(item.href)
          return (
            <button
              key={item.href}
              onClick={() => navigate(item.href)}
              className={`flex flex-col items-center gap-0.5 px-3 py-1 transition-colors ${
                active ? 'text-cyan-400' : 'text-gray-500'
              }`}
            >
              <item.icon size={20} />
              <span className="text-[10px]">{item.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
