import { useState } from 'react'
import { Search, Bell, Menu, LogOut, Settings, User } from 'lucide-react'
import { useNavigate } from 'react-router'

interface AdminHeaderProps {
  title: string
  onMenuToggle?: () => void
  onLogout: () => void
}

export function AdminHeader({ title, onMenuToggle, onLogout }: AdminHeaderProps) {
  const [showDropdown, setShowDropdown] = useState(false)
  const navigate = useNavigate()

  return (
    <header className="sticky top-0 z-40 h-16 flex items-center justify-between px-4 md:px-6 border-b border-white/5 bg-[#0a0a1a]/80 backdrop-blur-md">
      <div className="flex items-center gap-3">
        <button onClick={onMenuToggle} className="md:hidden text-gray-400 hover:text-white transition-colors" aria-label="Toggle menu">
          <Menu size={22} />
        </button>
        <h1 className="text-white text-lg">{title}</h1>
      </div>

      <div className="flex items-center gap-2">
        <button className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all" aria-label="Search">
          <Search size={18} />
        </button>
        <button className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all relative" aria-label="Notifications">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-cyan-400 rounded-full" />
        </button>

        <div className="relative ml-2">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white text-xs"
          >
            AD
          </button>
          {showDropdown && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowDropdown(false)} />
              <div className="absolute right-0 top-10 w-48 bg-[#12122a] border border-white/10 rounded-xl shadow-xl z-50 py-1">
                <button onClick={() => { setShowDropdown(false); navigate('/admin/settings') }} className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-gray-300 hover:bg-white/5 transition-colors">
                  <User size={15} /> Profile
                </button>
                <button onClick={() => { setShowDropdown(false); navigate('/admin/settings') }} className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-gray-300 hover:bg-white/5 transition-colors">
                  <Settings size={15} /> Settings
                </button>
                <div className="border-t border-white/5 my-1" />
                <button onClick={onLogout} className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 transition-colors">
                  <LogOut size={15} /> Sign Out
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
