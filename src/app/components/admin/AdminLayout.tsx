import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router'
import { AdminSidebar } from './AdminSidebar'
import { AdminHeader } from './AdminHeader'
import { AdminBreadcrumb } from './AdminBreadcrumb'
import { AdminMobileNav } from './AdminMobileNav'
import { ToastProvider } from './ToastProvider'

interface AdminLayoutProps {
  children: React.ReactNode
  onLogout: () => void
}

const PAGE_TITLES: Record<string, string> = {
  '/admin': 'Dashboard',
  '/admin/events': 'Events',
  '/admin/events/new': 'New Event',
  '/admin/domains': 'Domains',
  '/admin/domains/new': 'New Domain',
  '/admin/team': 'Team',
  '/admin/team/new': 'New Member',
  '/admin/achievements': 'Achievements',
  '/admin/achievements/new': 'New Achievement',
  '/admin/gallery': 'Gallery',
  '/admin/gallery/new': 'Upload',
  '/admin/settings': 'Settings',
}

export function AdminLayout({ children, onLogout }: AdminLayoutProps) {
  const location = useLocation()
  const title = PAGE_TITLES[location.pathname] || (() => {
    if (location.pathname.startsWith('/admin/events')) return 'Events'
    if (location.pathname.startsWith('/admin/domains')) return 'Domains'
    if (location.pathname.startsWith('/admin/team')) return 'Team'
    if (location.pathname.startsWith('/admin/achievements')) return 'Achievements'
    if (location.pathname.startsWith('/admin/gallery')) return 'Gallery'
    if (location.pathname.startsWith('/admin/settings')) return 'Settings'
    return 'Admin'
  })()

  return (
    <ToastProvider>
      <div className="flex min-h-screen bg-[#0a0a14]">
        <AdminSidebar onLogout={onLogout} />
        <div className="flex-1 flex flex-col min-w-0">
          <AdminHeader title={title} onLogout={onLogout} />
          <AdminBreadcrumb />
          <main className="flex-1">{children}</main>
        </div>
        <AdminMobileNav />
      </div>
    </ToastProvider>
  )
}
