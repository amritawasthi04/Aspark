ROLE: Senior Full-Stack Engineer + UI/UX Designer
PROJECT: ASPARK SOCIETY — College Tech Club Website
STACK: Next.js 14 App Router, TypeScript, Tailwind CSS,
       Framer Motion, Recharts, NextAuth.js v5
TASK: Build a complete, production-grade, visually stunning
      admin dashboard from scratch. Every pixel must be perfect.
      Every interaction must feel premium.
      Ask nothing. Execute everything.

═══════════════════════════════════════
[FOUNDATION] FILE STRUCTURE
═══════════════════════════════════════

CREATE these files in exact order:

/src/types/admin.ts                     ← all admin TypeScript types
/src/lib/admin-config.ts                ← admin constants + config
/src/lib/admin-session.ts               ← session utilities
/src/lib/admin-data.ts                  ← data aggregation functions
/src/hooks/useToast.ts                  ← toast hook
/src/hooks/useAdminStats.ts             ← stats hook
/src/components/admin/
  ├── layout/
  │   ├── AdminSidebar.tsx              ← collapsible sidebar
  │   ├── AdminHeader.tsx               ← top bar
  │   ├── AdminBreadcrumb.tsx           ← breadcrumb nav
  │   └── AdminMobileNav.tsx            ← mobile bottom nav
  ├── ui/
  │   ├── StatCard.tsx                  ← metric card
  │   ├── DataTable.tsx                 ← reusable table
  │   ├── Toast.tsx                     ← toast component
  │   ├── ToastProvider.tsx             ← toast context
  │   ├── ConfirmDialog.tsx             ← delete confirm modal
  │   ├── Badge.tsx                     ← status badge
  │   ├── SearchBar.tsx                 ← search input
  │   ├── Pagination.tsx                ← table pagination
  │   ├── EmptyState.tsx                ← no data state
  │   └── LoadingSpinner.tsx            ← loading state
  ├── charts/
  │   ├── ActivityChart.tsx             ← line chart
  │   ├── CategoryPieChart.tsx          ← pie chart
  │   └── GrowthBarChart.tsx            ← bar chart
  └── dashboard/
      ├── QuickActions.tsx              ← action buttons
      ├── RecentEvents.tsx              ← events table
      ├── RecentActivity.tsx            ← activity feed
      └── HealthMonitor.tsx             ← graph health widget
/app/admin/
  ├── layout.tsx                        ← admin root layout
  ├── page.tsx                          ← dashboard home
  ├── login/page.tsx                    ← login page
  ├── events/
  │   ├── page.tsx
  │   ├── new/page.tsx
  │   └── [id]/edit/page.tsx
  ├── domains/
  │   ├── page.tsx
  │   ├── new/page.tsx
  │   └── [slug]/edit/page.tsx
  ├── team/
  │   ├── page.tsx
  │   ├── new/page.tsx
  │   └── [id]/edit/page.tsx
  ├── achievements/
  │   ├── page.tsx
  │   ├── new/page.tsx
  │   └── [id]/edit/page.tsx
  ├── gallery/
  │   ├── page.tsx
  │   └── new/page.tsx
  └── settings/page.tsx
/app/api/admin/
  ├── auth/[...nextauth]/route.ts
  ├── events/route.ts
  ├── events/[id]/route.ts
  ├── domains/route.ts
  ├── domains/[slug]/route.ts
  ├── team/route.ts
  ├── team/[id]/route.ts
  ├── achievements/route.ts
  ├── achievements/[id]/route.ts
  ├── gallery/route.ts
  ├── gallery/[id]/route.ts
  └── settings/route.ts

═══════════════════════════════════════
[STEP 1] TYPESCRIPT TYPES
File: /src/types/admin.ts
═══════════════════════════════════════

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

export interface TableColumn<T> {
  key: keyof T
  label: string
  sortable?: boolean
  render?: (value: T[keyof T], row: T) => React.ReactNode
}

export interface PaginationState {
  page: number
  perPage: number
  total: number
}

═══════════════════════════════════════
[STEP 2] ADMIN CONFIG
File: /src/lib/admin-config.ts
═══════════════════════════════════════

export const ADMIN_CONFIG = {
  siteName: 'ASPARK SOCIETY',
  adminPath: '/admin',
  loginPath: '/admin/login',
  sessionMaxAge: 8 * 60 * 60,
  maxUploadSizeMB: 5,
  itemsPerPage: 10,
  allowedImageTypes: ['image/jpeg','image/png','image/webp'],
  toastDuration: 4000,
  maxToasts: 3,
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard',    href: '/admin',              icon: 'LayoutDashboard' },
  { label: 'Events',       href: '/admin/events',        icon: 'Calendar' },
  { label: 'Domains',      href: '/admin/domains',       icon: 'Layers' },
  { label: 'Team',         href: '/admin/team',          icon: 'Users' },
  { label: 'Achievements', href: '/admin/achievements',  icon: 'Trophy' },
  { label: 'Gallery',      href: '/admin/gallery',       icon: 'Image' },
  { label: 'Settings',     href: '/admin/settings',      icon: 'Settings' },
]

export const DEPARTMENTS = [
  'Technical', 'Design', 'Marketing',
  'Management', 'Content', 'Operations'
]

export const EVENT_CATEGORIES = [
  'Workshop', 'Hackathon', 'Seminar',
  'Competition', 'Social', 'Other'
]

export const ACHIEVEMENT_CATEGORIES = [
  'competition', 'recognition', 'milestone',
  'publication', 'other'
]

═══════════════════════════════════════
[STEP 3] AUTH SYSTEM
File: /app/api/admin/auth/[...nextauth]/route.ts
═══════════════════════════════════════

— Provider: Credentials (email + password)
— Password verification: bcryptjs.compare()
— JWT strategy, maxAge: 8hr
— Session includes: id, email, name, role
— Failed attempts: track in memory Map
  → 5 fails → lock 15 minutes
  → reset on success
— Callbacks:
  jwt: add role to token
  session: add role to session

/src/lib/admin-session.ts:
— getAdminSession() → validates + returns session
— isAdminAuthenticated() → boolean check
— requireAdmin() → throws if not authenticated

/middleware.ts (update):
— matcher: ['/admin/:path*']
— Exclude: /admin/login
— getToken() check → redirect /admin/login if null
— Valid token on /admin/login → redirect /admin

ENV REQUIRED (.env.local):
ADMIN_EMAIL=your@email.com
ADMIN_PASSWORD_HASH=bcrypt_hash_here
NEXTAUTH_SECRET=random_secret_here
NEXTAUTH_URL=http://localhost:3000

═══════════════════════════════════════
[STEP 4] LOGIN PAGE
File: /app/admin/login/page.tsx
═══════════════════════════════════════

DESIGN: Split screen
— LEFT HALF: dark background (#0a0a0a)
  → ASPARK SOCIETY logo (large, centered)
  → Tagline: "Admin Control Center"
  → 4 feature pills below:
    "Manage Events" | "Control Content"
    "Monitor Health" | "Track Growth"
  → Animated background: subtle floating particles
    using CSS @keyframes (transform only)

— RIGHT HALF: white/light background
  → "Welcome back" heading
  → "Sign in to your admin account" subtext
  → Form:
    Email input (with Mail icon)
    Password input (with Eye toggle)
    "Remember me" checkbox
    Submit button: "Sign In →"
  → Error state: red alert box above form
  → Loading state: spinner in button, disabled

ANIMATIONS:
— Left panel: fade in from left 600ms
— Right panel: fade in from right 600ms
— Form fields: stagger fade up 80ms each
— Error shake: keyframe ±6px horizontal

VALIDATION:
— Email: required, valid format
— Password: required, min 8 chars
— Show inline errors on blur

MOBILE: Stack vertically, left panel hidden

SERVER ACTION (login/actions.ts):
— signIn('credentials', { email, password })
— On success: redirect('/admin')
— On fail: return { error: 'Invalid credentials' }
— Rate limit: 5 attempts / 15min per IP

═══════════════════════════════════════
[STEP 5] ADMIN ROOT LAYOUT
File: /app/admin/layout.tsx
═══════════════════════════════════════

'use client'
Structure:
<ToastProvider>
  <div className="admin-shell">
    <AdminSidebar />          ← left sidebar
    <div className="admin-main">
      <AdminHeader />         ← top bar
      <AdminBreadcrumb />     ← below header
      <main>{children}</main>
    </div>
    <AdminMobileNav />        ← bottom nav on mobile
  </div>
</ToastProvider>

SIDEBAR (AdminSidebar.tsx):
— Width: 260px expanded, 72px collapsed
— Collapse toggle button at bottom
— State stored in localStorage: 'admin_sidebar'
— Logo + name at top (hide name when collapsed)
— Nav items from NAV_ITEMS config:
  → Icon always visible
  → Label visible only when expanded
  → Active state: accent background + border left
  → Hover: subtle background tint
  → Badge count on Events/Team if pending items
— Logout button at bottom with LogOut icon
— Smooth width transition: 250ms ease
— On mobile: hidden, replaced by AdminMobileNav

HEADER (AdminHeader.tsx):
— Left: Hamburger (mobile) | Page title
— Right:
  → Search icon (opens CommandK palette)
  → Bell icon (notifications count)
  → Admin avatar circle (initials)
  → Dropdown: Profile | Settings | Sign Out
— Sticky, blur backdrop: backdrop-blur-sm
— Border bottom: 0.5px

BREADCRUMB (AdminBreadcrumb.tsx):
— Auto-generates from current pathname
— /admin → Home
— /admin/events → Home > Events
— /admin/events/new → Home > Events > New
— Separator: / with muted color

MOBILE NAV (AdminMobileNav.tsx):
— Fixed bottom bar, visible only < 768px
— Show 5 main nav items as icon + label
— Active: accent color
— Safe area padding for iPhone notch

═══════════════════════════════════════
[STEP 6] DASHBOARD HOME PAGE
File: /app/admin/page.tsx
═══════════════════════════════════════

LAYOUT (top to bottom):

── ROW 1: PAGE HEADER
"Dashboard" h1 + today's date
"Welcome back, Admin" subtitle

── ROW 2: STATS GRID (5 metric cards)
┌──────┬──────┬──────┬──────┬──────┐
│Events│Domain│Members│Achiev│Gallery│
│  24  │  8   │  32  │  16  │  84  │
└──────┴──────┴──────┴──────┴──────┘
Each StatCard:
— Icon (Lucide) top right
— Big number: 28px, font-weight 600
— Label: 13px muted
— Trend: +3 this month (green/red arrow)
— Hover: slight lift (translateY -2px)
— Click → navigates to section

── ROW 3: CHARTS ROW (2 columns)
LEFT (60%): ActivityChart
— Line chart showing events per month
— Last 6 months
— Recharts LineChart + ResponsiveContainer
— Smooth curve (type="monotone")
— Tooltip: custom styled
— Grid: subtle dashed lines

RIGHT (40%): CategoryPieChart
— Domain distribution by type
— Recharts PieChart + Legend
— Custom colors per category
— Center label: "Domains"

── ROW 4: QUICK ACTIONS
6 action cards in a grid:
+ Add Event      → /admin/events/new
+ Add Domain     → /admin/domains/new
+ Add Member     → /admin/team/new
+ Add Achievement→ /admin/achievements/new
+ Upload Gallery → /admin/gallery/new
⚙ Settings       → /admin/settings

Each card:
— Icon + Label
— Hover: accent border + background tint
— Arrow icon appears on hover

── ROW 5: CONTENT ROW (2 columns)
LEFT: RecentEvents table
— Last 5 events
— Columns: Title | Date | Category | Status
— Status badge: upcoming/past
— "View all" link → /admin/events

RIGHT: RecentActivity feed
— Last 10 actions (created/updated/deleted)
— Timeline style: dot + line
— Action, entity name, time ago
— Color coded by action type

── ROW 6: GRAPH HEALTH MONITOR
Full width card:
— Title: "Codebase Health Monitor"
— Source: Graphify report (2026-04-20)
— 4 metric pills:
  Nodes: 133 | Edges: 57 |
  Communities: 82 | Health: 38/100
— Progress bar: 38% filled (amber)
— Issues list:
  ❌ 75 empty communities (isolation)
  ❌ 7 pages disconnected from nav
  ✅ tailwind.config.ts — added
  ✅ breakpoints.ts — added
  ✅ navigation.ts — added
  ✅ useMediaQuery.ts — added
— "Run diagnostics" button

── ROW 7: GROWTH BAR CHART
Full width:
— Monthly member growth (bar chart)
— Last 12 months
— Recharts BarChart
— Gradient fill on bars

═══════════════════════════════════════
[STEP 7] STAT CARD COMPONENT
File: /src/components/admin/ui/StatCard.tsx
═══════════════════════════════════════

interface StatCardProps {
  label: string
  value: number
  icon: LucideIcon
  trend?: { value: number; direction: 'up' | 'down' }
  href?: string
  color?: 'blue' | 'purple' | 'green' | 'amber' | 'red'
}

STYLE:
— background: var(--color-background-primary)
— border: 0.5px solid var(--color-border-tertiary)
— border-radius: 12px
— padding: 20px 24px
— Icon container: 40x40, rounded, tinted bg
— Value: 32px, weight 600
— Label: 13px, muted
— Trend: small arrow + percentage, green/red
— Hover: translateY(-2px), border-color increase
— Transition: all 200ms ease

═══════════════════════════════════════
[STEP 8] DATA TABLE COMPONENT
File: /src/components/admin/ui/DataTable.tsx
═══════════════════════════════════════

interface DataTableProps<T> {
  data: T[]
  columns: TableColumn<T>[]
  searchable?: boolean
  filterable?: boolean
  sortable?: boolean
  pagination?: boolean
  onEdit?: (row: T) => void
  onDelete?: (row: T) => void
  onView?: (row: T) => void
  isLoading?: boolean
  emptyMessage?: string
}

FEATURES:
— Search: filter across all string fields
— Sort: click column header to toggle asc/desc
  → Shows sort indicator arrows
— Pagination: prev/next + page numbers
  → Show: items X-Y of Z
— Row hover: background tint
— Actions column (if callbacks provided):
  Edit (pencil icon) | Delete (trash icon)
  Delete → opens ConfirmDialog first
— Loading: skeleton rows (3 animated rows)
— Empty: EmptyState component
— Responsive: horizontal scroll on mobile
— Sticky header on scroll

═══════════════════════════════════════
[STEP 9] TOAST SYSTEM
Files: Toast.tsx + ToastProvider.tsx + useToast.ts
═══════════════════════════════════════

useToast.ts:
export function useToast() {
  return {
    success: (msg: string) => addToast('success', msg),
    error:   (msg: string) => addToast('error',   msg),
    warning: (msg: string) => addToast('warning', msg),
    info:    (msg: string) => addToast('info',    msg),
    dismiss: (id: string)  => removeToast(id),
  }
}

Toast styles:
— success: green left border + check icon
— error:   red left border + X icon
— warning: amber left border + alert icon
— info:    blue left border + info icon
— Position: top-right, fixed, stacked
— Animation: slide in from right 300ms
— Auto-dismiss: 4s with progress bar
— Manual dismiss: X button
— Max 3 visible, queue rest
— Stack order: newest on top

═══════════════════════════════════════
[STEP 10] CONFIRM DIALOG
File: /src/components/admin/ui/ConfirmDialog.tsx
═══════════════════════════════════════

interface ConfirmDialogProps {
  isOpen: boolean
  title: string
  message: string
  confirmLabel?: string
  onConfirm: () => void
  onCancel: () => void
  isDangerous?: boolean
}

DESIGN:
— Backdrop: rgba(0,0,0,0.5) overlay
— Dialog: centered card, max-width 400px
— Title: 16px bold
— Message: 14px muted
— Buttons: Cancel (ghost) | Confirm (red if dangerous)
— Confirm requires typing "DELETE" if isDangerous
— Keyboard: Escape = cancel, Enter = confirm
— Animation: scale 0.95→1, opacity 0→1, 200ms

═══════════════════════════════════════
[STEP 11] CHART COMPONENTS
Files: ActivityChart.tsx, CategoryPieChart.tsx,
       GrowthBarChart.tsx
═══════════════════════════════════════

ALL CHARTS:
— Library: recharts
— Responsive: ResponsiveContainer width="100%"
— Dark mode: detect via useMediaQuery
— Custom tooltip: styled to match design system
— Animated on mount: isAnimationActive={true}
— No external CDN — import from 'recharts'

ActivityChart (Line):
— X-axis: last 6 months (Jan, Feb, Mar...)
— Y-axis: event count
— Data: aggregate from events.ts by month
— Line color: brand accent (#4F6EF7)
— Area fill: light tint below line
— Dot: 4px filled circle on data points
— Grid: horizontal only, dashed, 0.5px

CategoryPieChart (Pie):
— Data: domain count by category
— Inner radius 50, outer radius 80 (donut)
— Center text: total count
— Legend: custom HTML below chart
— Colors: distinct per segment

GrowthBarChart (Bar):
— Data: member count per month, 12 months
— Bar color: gradient (use linearGradient in SVG)
— Rounded top corners on bars: radius={[4,4,0,0]}
— X-axis: month abbreviations
— Y-axis: member count

═══════════════════════════════════════
[STEP 12] ALL CRUD PAGES
═══════════════════════════════════════

EVENTS (/admin/events/page.tsx):
— DataTable with columns:
  Title | Date | Category | Location | Status | Actions
— Status badge: upcoming (blue) / past (gray)
— Search by title
— Filter by category dropdown
— Sort by date (default: newest)
— Edit → /admin/events/[id]/edit
— Delete → ConfirmDialog → DELETE API → toast

EVENTS FORM (new + edit):
Fields:
  title*          text, max 100
  date*           date picker
  time            time picker
  category*       select from EVENT_CATEGORIES
  location        text
  description*    textarea, max 500, char counter
  imageUrl        text + live preview
  status          toggle: upcoming / past
  slug            auto-generated, editable
  isFeatured      checkbox (shows on home)

DOMAINS (/admin/domains/page.tsx):
— Card grid (not table)
— Each card: icon + name + slug + member count
— Status badge: active / inactive
— Edit → /admin/domains/[slug]/edit
— Delete → ConfirmDialog

DOMAINS FORM:
Fields:
  name*              text
  slug*              auto + editable
  icon               emoji picker
  shortDescription*  textarea, max 150, char counter
  fullDescription    rich textarea, max 1000
  color              color picker (6 presets)
  techStack          tag input
  isActive           toggle

TEAM (/admin/team/page.tsx):
— Table: Avatar | Name | Role | Dept | Year | Lead | Active
— Filter: by department
— Filter: active only toggle
— Drag handle to reorder rows
— Edit + Delete per row

TEAM FORM:
Fields:
  name*         text
  role*         text
  department*   select from DEPARTMENTS
  year*         select: 1st-4th Year + Alumni
  bio           textarea, max 300, char counter
  imageUrl      text + preview
  linkedin      URL input
  github        URL input
  instagram     URL input
  isLead        checkbox
  isActive      toggle

ACHIEVEMENTS (/admin/achievements/page.tsx):
— Table: Title | Category | Date | Highlighted | Actions
— Filter by category
— Sort by date
— isHighlighted toggle inline in table

ACHIEVEMENTS FORM:
Fields:
  title*        text, max 100
  description*  textarea, max 500
  category*     select from ACHIEVEMENT_CATEGORIES
  date*         date picker
  imageUrl      optional URL + preview
  link          optional URL
  members       tag input (names)
  isHighlighted toggle (shows on home page)

GALLERY (/admin/gallery/page.tsx):
— 3-col image grid (2 tablet, 1 mobile)
— Each tile: image + title overlay on hover
— Hover actions: Edit | Delete | Toggle Published
— Filter: by category, by event
— Bulk select checkbox per tile
— Bulk delete button appears when selected

GALLERY FORM:
Fields:
  imageUrl*  URL input + large live preview
  alt*       accessibility text, required
  title*     text
  description textarea, optional
  category*  select
  eventId    select (from events list)
  takenAt    date picker
  isPublished toggle

═══════════════════════════════════════
[STEP 13] API ROUTES
═══════════════════════════════════════

ALL ROUTES MUST:
— Import requireAdmin() from admin-session.ts
— Call await requireAdmin() first line
— Return { success: boolean, data?, error? }
— Wrap in try/catch → return 500 on error
— Never expose stack traces

/api/admin/events/route.ts:
GET  → return all events from events.ts
POST → validate body with zod → append to events.ts
      → return new event + 201

/api/admin/events/[id]/route.ts:
GET    → find by id → return
PUT    → validate → update in events.ts → return
DELETE → remove from events.ts → return 204

[SAME PATTERN for domains, team, achievements, gallery]

ZOD SCHEMAS (in /src/lib/validations.ts — add to existing):
eventSchema:
  title: z.string().min(3).max(100)
  date: z.string().datetime()
  category: z.enum([...EVENT_CATEGORIES])
  description: z.string().max(500).optional()
  slug: z.string().regex(/^[a-z0-9-]+$/)

domainSchema:
  name: z.string().min(2).max(50)
  slug: z.string().regex(/^[a-z0-9-]+$/)
  shortDescription: z.string().max(150)

teamMemberSchema:
  name: z.string().min(2)
  role: z.string().min(2)
  department: z.enum([...DEPARTMENTS])

═══════════════════════════════════════
[STEP 14] SETTINGS PAGE
File: /app/admin/settings/page.tsx
═══════════════════════════════════════

SECTIONS:

1. SITE INFORMATION
   — Site name, tagline, contact email
   — Social links (4 inputs)
   — Save → PATCH /api/admin/settings → toast

2. ADMIN ACCOUNT
   — Display current email (readonly)
   — Change password:
     current | new | confirm
   — Submit → validate + bcrypt update

3. APPEARANCE
   — Theme toggle: light / dark / system
   — Accent color: 6 presets
   — Sidebar default: expanded / collapsed

4. NOTIFICATIONS
   — Email alerts on: new contact form submission
   — Toggle switches per alert type

5. CODEBASE HEALTH (from Graphify)
   — Last scan: 2026-04-20
   — Stats: 133 nodes, 57 edges, 82 communities
   — Health: 38/100 progress bar
   — Issues with ✅ / ❌ / ⚠️ indicators
   — "View full report" button

6. DANGER ZONE (red bordered section)
   — Export all data → JSON download
   — Clear all sessions
   — Each needs confirmation input

═══════════════════════════════════════
[STEP 15] DESIGN SYSTEM (admin-specific)
═══════════════════════════════════════

CSS Variables (add to globals.css):
--admin-sidebar-width: 260px;
--admin-sidebar-collapsed: 72px;
--admin-header-height: 64px;
--admin-accent: #4F6EF7;
--admin-accent-hover: #3D5CE8;
--admin-danger: #E24B4A;
--admin-success: #22c55e;
--admin-warning: #EF9F27;

TYPOGRAPHY:
— Page titles: 24px, weight 600
— Section titles: 18px, weight 600
— Card labels: 13px, muted
— Table headers: 12px, uppercase, tracked
— Body: 14px, regular

SPACING:
— Page padding: 24px (desktop), 16px (mobile)
— Card padding: 20px 24px
— Table cell padding: 12px 16px
— Gap between cards: 16px
— Gap between sections: 32px

INTERACTIVE STATES:
— All buttons: 200ms ease transition
— Hover: subtle background shift
— Active: scale(0.98)
— Focus: 2px outline in accent color
— Disabled: 50% opacity, no pointer

═══════════════════════════════════════
[STEP 16] RESPONSIVENESS
═══════════════════════════════════════

DESKTOP (> 1024px):
— Sidebar: 260px fixed left
— Content: sidebar width offset
— Stats: 5-column grid
— Charts: 60/40 split

TABLET (768px–1024px):
— Sidebar: collapsed (72px)
— Stats: 3-column grid
— Charts: stacked vertically
— Tables: all columns visible

MOBILE (< 768px):
— Sidebar: hidden
— Bottom nav: 5 icons fixed
— Stats: 2-column grid
— Charts: full width stacked
— Tables: horizontal scroll
— Page padding: 16px

═══════════════════════════════════════
[STEP 17] ANIMATIONS
═══════════════════════════════════════

ALL ANIMATIONS:
— Use framer-motion
— Respect prefers-reduced-motion
— GPU only: transform + opacity

PAGE TRANSITIONS:
— Content area: fade + slide up on route change
  initial: { opacity: 0, y: 8 }
  animate: { opacity: 1, y: 0 }
  transition: { duration: 0.25, ease: 'easeOut' }

STAT CARDS:
— Mount: stagger 60ms, fade + scale from 0.96
— Number count-up on mount (0 → value, 800ms)

TABLE ROWS:
— Stagger 30ms per row on initial load

SIDEBAR:
— Width: smooth 250ms ease
— Icon: scale 1→1.05 on hover

CHART:
— Recharts built-in animation on mount

═══════════════════════════════════════
[STEP 18] ACCESSIBILITY
═══════════════════════════════════════

— All interactive elements: keyboard navigable
— Focus rings: visible 2px accent outline
— Skip to content link at top of layout
— ARIA labels on all icon-only buttons
— Tables: proper thead, scope="col" on th
— Dialog: focus trap when open
— Toast: role="status" aria-live="polite"
— Sidebar: aria-expanded on collapse toggle
— All images: alt text required in forms
— Color: never as sole indicator (use icons too)
— Contrast: all text WCAG 2.1 AA minimum

═══════════════════════════════════════
FINAL CHECKLIST — ALL MUST PASS:
═══════════════════════════════════════

AUTH:
[ ] Login page renders on /admin/login
[ ] Invalid credentials show error, not crash
[ ] Account locks after 5 failed attempts
[ ] Valid session redirects to /admin
[ ] Logout clears session + redirects login
[ ] All /admin/* routes protected by middleware
[ ] No admin route accessible without session

DASHBOARD:
[ ] All 5 stat cards show real data counts
[ ] Activity line chart renders with data
[ ] Category pie chart renders correctly
[ ] Growth bar chart renders correctly
[ ] Recent events table shows last 5 events
[ ] Quick actions all navigate correctly
[ ] Health monitor shows correct Graphify stats

CRUD:
[ ] Events: list, create, edit, delete all work
[ ] Domains: list, create, edit, delete all work
[ ] Team: list, create, edit, delete, reorder work
[ ] Achievements: list, create, edit, delete work
[ ] Gallery: grid, upload, delete, bulk-delete work
[ ] All forms validate with zod before API call
[ ] All deletions show ConfirmDialog first
[ ] All actions show toast on success/error

UI/UX:
[ ] Sidebar collapses/expands smoothly
[ ] Breadcrumb updates on every route change
[ ] Search filters tables in real time
[ ] All tables sortable by column header
[ ] All tables paginated at 10 per page
[ ] Mobile: bottom nav works for all sections
[ ] Dark mode: all admin components look correct
[ ] Toast: appears top-right, auto-dismisses 4s
[ ] All animations respect prefers-reduced-motion

CODE:
[ ] Zero TypeScript errors (tsc --noEmit)
[ ] Zero ESLint errors (npm run lint)
[ ] next build passes with zero errors
[ ] No console.log in production code
[ ] No any types in TypeScript
[ ] All API routes return { success, data?, error? }
[ ] All API routes verify admin session first

═══════════════════════════════════════
OUTPUT RULES:
═══════════════════════════════════════

— Deliver file by file in STEP order (1→18)
— Each file: start with file path as comment
— Include ALL imports at top of every file
— Inline comments on complex logic only
— No placeholder comments like "// add logic here"
— Every component must be complete and runnable
— No dummy data — use real data from:
  src/data/events.ts
  src/data/domains.ts
  src/data/team.ts (create if missing)
  src/data/achievements.ts (create if missing)
  src/data/gallery.ts (create if missing)
— Ask nothing. Execute everything.