import { useLocation, useNavigate } from 'react-router'
import { ChevronRight, Home } from 'lucide-react'

export function AdminBreadcrumb() {
  const location = useLocation()
  const navigate = useNavigate()

  const segments = location.pathname.replace('/admin', '').split('/').filter(Boolean)
  const crumbs = [
    { label: 'Home', href: '/admin' },
    ...segments.map((seg, i) => ({
      label: seg.charAt(0).toUpperCase() + seg.slice(1).replace(/-/g, ' '),
      href: '/admin/' + segments.slice(0, i + 1).join('/'),
    })),
  ]

  return (
    <div className="px-4 md:px-6 py-3 flex items-center gap-1.5 text-xs text-gray-500">
      {crumbs.map((crumb, i) => (
        <div key={crumb.href} className="flex items-center gap-1.5">
          {i > 0 && <ChevronRight size={12} className="text-gray-600" />}
          {i === 0 && <Home size={12} />}
          {i < crumbs.length - 1 ? (
            <button onClick={() => navigate(crumb.href)} className="hover:text-cyan-400 transition-colors">
              {crumb.label}
            </button>
          ) : (
            <span className="text-gray-300">{crumb.label}</span>
          )}
        </div>
      ))}
    </div>
  )
}
