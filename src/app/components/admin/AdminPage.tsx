import { useState } from 'react'
import { useLocation } from 'react-router'
import { AdminLoginPage } from './AdminLoginPage'
import { AdminLayout } from './AdminLayout'
import { AdminDashboard } from './AdminDashboard'
import { EventsCrud } from './EventsCrud'
import { DomainsCrud } from './DomainsCrud'
import { TeamCrud } from './TeamCrud'
import { AchievementsCrud } from './AchievementsCrud'
import { GalleryCrud } from './GalleryCrud'
import { SettingsPage } from './SettingsPage'

function AdminRouter() {
  const location = useLocation()
  const path = location.pathname

  if (path === '/admin' || path === '/admin/') return <AdminDashboard />
  if (path.startsWith('/admin/events')) return <EventsCrud />
  if (path.startsWith('/admin/domains')) return <DomainsCrud />
  if (path.startsWith('/admin/team')) return <TeamCrud />
  if (path.startsWith('/admin/achievements')) return <AchievementsCrud />
  if (path.startsWith('/admin/gallery')) return <GalleryCrud />
  if (path.startsWith('/admin/settings')) return <SettingsPage />
  return <AdminDashboard />
}

export function AdminPage() {
  const [authenticated, setAuthenticated] = useState(() => {
    return sessionStorage.getItem('admin_auth') === 'true'
  })

  const handleLogin = () => {
    sessionStorage.setItem('admin_auth', 'true')
    setAuthenticated(true)
  }

  const handleLogout = () => {
    sessionStorage.removeItem('admin_auth')
    setAuthenticated(false)
  }

  if (!authenticated) {
    return <AdminLoginPage onLogin={handleLogin} />
  }

  return (
    <AdminLayout onLogout={handleLogout}>
      <AdminRouter />
    </AdminLayout>
  )
}
