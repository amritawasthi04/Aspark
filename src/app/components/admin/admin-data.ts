import { AdminStats, ActivityLog, RecentEvent, ChartDataPoint, DomainDistribution, NavItem } from './types'

export const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', href: '/admin', icon: 'LayoutDashboard' },
  { label: 'Events', href: '/admin/events', icon: 'Calendar', badge: 3 },
  { label: 'Domains', href: '/admin/domains', icon: 'Layers' },
  { label: 'Team', href: '/admin/team', icon: 'Users', badge: 2 },
  { label: 'Achievements', href: '/admin/achievements', icon: 'Trophy' },
  { label: 'Gallery', href: '/admin/gallery', icon: 'Image' },
  { label: 'Settings', href: '/admin/settings', icon: 'Settings' },
]

export const MOCK_STATS: AdminStats = {
  totalEvents: 24,
  totalDomains: 8,
  totalMembers: 32,
  totalAchievements: 16,
  totalGalleryItems: 84,
  publishedEvents: 18,
  upcomingEvents: 6,
  activeMembers: 28,
}

export const MOCK_ACTIVITY: ActivityLog[] = [
  { id: '1', action: 'created', entity: 'event', entityName: 'AI Workshop 2026', timestamp: '2026-04-20T14:30:00Z', adminEmail: 'admin@aspark.com' },
  { id: '2', action: 'updated', entity: 'member', entityName: 'Arjun Mehta', timestamp: '2026-04-20T13:15:00Z', adminEmail: 'admin@aspark.com' },
  { id: '3', action: 'published', entity: 'event', entityName: 'Hackathon Spring 2026', timestamp: '2026-04-20T11:00:00Z', adminEmail: 'admin@aspark.com' },
  { id: '4', action: 'created', entity: 'achievement', entityName: 'National Robotics Winner', timestamp: '2026-04-19T18:45:00Z', adminEmail: 'admin@aspark.com' },
  { id: '5', action: 'deleted', entity: 'gallery', entityName: 'Old Workshop Photos', timestamp: '2026-04-19T16:20:00Z', adminEmail: 'admin@aspark.com' },
  { id: '6', action: 'updated', entity: 'domain', entityName: 'Cybersecurity', timestamp: '2026-04-19T14:00:00Z', adminEmail: 'admin@aspark.com' },
  { id: '7', action: 'created', entity: 'member', entityName: 'Priya Sharma', timestamp: '2026-04-19T10:30:00Z', adminEmail: 'admin@aspark.com' },
  { id: '8', action: 'published', entity: 'achievement', entityName: 'IEEE Paper Published', timestamp: '2026-04-18T20:00:00Z', adminEmail: 'admin@aspark.com' },
  { id: '9', action: 'updated', entity: 'event', entityName: 'Web Dev Bootcamp', timestamp: '2026-04-18T15:30:00Z', adminEmail: 'admin@aspark.com' },
  { id: '10', action: 'created', entity: 'gallery', entityName: 'TechFest 2026 Gallery', timestamp: '2026-04-18T09:00:00Z', adminEmail: 'admin@aspark.com' },
]

export const MOCK_RECENT_EVENTS: RecentEvent[] = [
  { id: '1', title: 'AI Workshop 2026', date: '2026-05-10', category: 'Workshop', status: 'upcoming' },
  { id: '2', title: 'Hackathon Spring', date: '2026-04-28', category: 'Hackathon', status: 'upcoming' },
  { id: '3', title: 'Cybersecurity Seminar', date: '2026-04-15', category: 'Seminar', status: 'past' },
  { id: '4', title: 'Web Dev Bootcamp', date: '2026-04-05', category: 'Workshop', status: 'past' },
  { id: '5', title: 'Code Golf Competition', date: '2026-03-22', category: 'Competition', status: 'past' },
]

export const ACTIVITY_CHART_DATA: ChartDataPoint[] = [
  { month: 'Nov', value: 3 },
  { month: 'Dec', value: 5 },
  { month: 'Jan', value: 4 },
  { month: 'Feb', value: 7 },
  { month: 'Mar', value: 6 },
  { month: 'Apr', value: 8 },
]

export const DOMAIN_DISTRIBUTION: DomainDistribution[] = [
  { name: 'AI/ML', value: 12, color: '#4F6EF7' },
  { name: 'Web Dev', value: 8, color: '#22c55e' },
  { name: 'Cybersecurity', value: 6, color: '#EF9F27' },
  { name: 'IoT', value: 4, color: '#E24B4A' },
  { name: 'Design', value: 5, color: '#a855f7' },
  { name: 'Robotics', value: 3, color: '#06b6d4' },
]

export const GROWTH_CHART_DATA: ChartDataPoint[] = [
  { month: 'May', value: 12 },
  { month: 'Jun', value: 15 },
  { month: 'Jul', value: 14 },
  { month: 'Aug', value: 18 },
  { month: 'Sep', value: 20 },
  { month: 'Oct', value: 22 },
  { month: 'Nov', value: 21 },
  { month: 'Dec', value: 25 },
  { month: 'Jan', value: 24 },
  { month: 'Feb', value: 28 },
  { month: 'Mar', value: 30 },
  { month: 'Apr', value: 32 },
]

export const QUICK_ACTIONS = [
  { label: 'Add Event', href: '/admin/events/new', icon: 'CalendarPlus' },
  { label: 'Add Domain', href: '/admin/domains/new', icon: 'LayersIcon' },
  { label: 'Add Member', href: '/admin/team/new', icon: 'UserPlus' },
  { label: 'Add Achievement', href: '/admin/achievements/new', icon: 'Award' },
  { label: 'Upload Gallery', href: '/admin/gallery/new', icon: 'Upload' },
  { label: 'Settings', href: '/admin/settings', icon: 'Settings' },
]

export const HEALTH_ISSUES = [
  { status: 'error' as const, text: '75 empty communities (isolation)' },
  { status: 'error' as const, text: '7 pages disconnected from nav' },
  { status: 'success' as const, text: 'tailwind.config.ts — added' },
  { status: 'success' as const, text: 'breakpoints.ts — added' },
  { status: 'success' as const, text: 'navigation.ts — added' },
  { status: 'success' as const, text: 'useMediaQuery.ts — added' },
]
