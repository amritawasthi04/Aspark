export type AdminRole = 'superadmin' | 'editor' | 'viewer'

export interface AdminUser {
  id: string
  email: string
  role: AdminRole
  name: string
  lastLogin: string
}

export interface AdminStats {
  totalEvents: number
  totalDomains: number
  totalMembers: number
  totalAchievements: number
  totalGalleryItems: number
  publishedEvents: number
  upcomingEvents: number
  activeMembers: number
}

export interface ActivityLog {
  id: string
  action: 'created' | 'updated' | 'deleted' | 'published'
  entity: 'event' | 'domain' | 'member' | 'achievement' | 'gallery'
  entityName: string
  timestamp: string
  adminEmail: string
}

export interface NavItem {
  label: string
  href: string
  icon: string
  badge?: number
}

export interface ToastType {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  message: string
  duration?: number
}

export interface RecentEvent {
  id: string
  title: string
  date: string
  category: string
  status: 'upcoming' | 'past'
}

export interface ChartDataPoint {
  month: string
  value: number
}

export interface DomainDistribution {
  name: string
  value: number
  color: string
}
