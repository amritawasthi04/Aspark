// Shared mock CRUD data store (mutable in-memory)

export interface EventItem {
  id: string; title: string; date: string; time: string; category: string
  location: string; description: string; imageUrl: string; status: 'upcoming' | 'past'
  slug: string; isFeatured: boolean
}

export interface DomainItem {
  id: string; name: string; slug: string; icon: string; shortDescription: string
  fullDescription: string; color: string; techStack: string[]; isActive: boolean; memberCount: number
}

export interface TeamMember {
  id: string; name: string; role: string; department: string; year: string
  bio: string; imageUrl: string; linkedin: string; github: string; instagram: string
  isLead: boolean; isActive: boolean
}

export interface AchievementItem {
  id: string; title: string; description: string; category: string
  date: string; imageUrl: string; link: string; members: string[]; isHighlighted: boolean
}

export interface GalleryItem {
  id: string; imageUrl: string; alt: string; title: string; description: string
  category: string; eventId: string; takenAt: string; isPublished: boolean
}

export const EVENT_CATEGORIES = ['Workshop', 'Hackathon', 'Seminar', 'Competition', 'Social', 'Other']
export const DEPARTMENTS = ['Technical', 'Design', 'Marketing', 'Management', 'Content', 'Operations']
export const ACHIEVEMENT_CATEGORIES = ['competition', 'recognition', 'milestone', 'publication', 'other']
export const GALLERY_CATEGORIES = ['Event', 'Workshop', 'Team', 'Campus', 'Other']
export const YEARS = ['1st Year', '2nd Year', '3rd Year', '4th Year', 'Alumni']
export const DOMAIN_COLORS = ['#4F6EF7', '#22c55e', '#EF9F27', '#E24B4A', '#a855f7', '#06b6d4']

let _events: EventItem[] = [
  { id: 'e1', title: 'AI Workshop 2026', date: '2026-05-10', time: '10:00', category: 'Workshop', location: 'Auditorium A', description: 'Hands-on workshop covering the latest in AI and machine learning techniques.', imageUrl: '', status: 'upcoming', slug: 'ai-workshop-2026', isFeatured: true },
  { id: 'e2', title: 'Hackathon Spring', date: '2026-04-28', time: '09:00', category: 'Hackathon', location: 'Tech Hub', description: '24-hour hackathon with prizes for innovative solutions.', imageUrl: '', status: 'upcoming', slug: 'hackathon-spring', isFeatured: true },
  { id: 'e3', title: 'Cybersecurity Seminar', date: '2026-04-15', time: '14:00', category: 'Seminar', location: 'Room 204', description: 'Expert-led seminar on modern cybersecurity threats and defenses.', imageUrl: '', status: 'past', slug: 'cybersecurity-seminar', isFeatured: false },
  { id: 'e4', title: 'Web Dev Bootcamp', date: '2026-04-05', time: '10:00', category: 'Workshop', location: 'Lab 3', description: 'Full-stack web development bootcamp covering React and Node.js.', imageUrl: '', status: 'past', slug: 'web-dev-bootcamp', isFeatured: false },
  { id: 'e5', title: 'Code Golf Competition', date: '2026-03-22', time: '15:00', category: 'Competition', location: 'Online', description: 'Competitive coding event focusing on shortest solutions.', imageUrl: '', status: 'past', slug: 'code-golf', isFeatured: false },
  { id: 'e6', title: 'Design Thinking Workshop', date: '2026-03-10', time: '11:00', category: 'Workshop', location: 'Design Studio', description: 'Learn design thinking methodology with hands-on exercises.', imageUrl: '', status: 'past', slug: 'design-thinking', isFeatured: false },
  { id: 'e7', title: 'Tech Mixer Social', date: '2026-02-28', time: '18:00', category: 'Social', location: 'Campus Lawn', description: 'Informal social gathering for tech enthusiasts.', imageUrl: '', status: 'past', slug: 'tech-mixer', isFeatured: false },
  { id: 'e8', title: 'IoT Showcase', date: '2026-06-05', time: '10:00', category: 'Competition', location: 'Innovation Center', description: 'Showcase your IoT projects and compete for prizes.', imageUrl: '', status: 'upcoming', slug: 'iot-showcase', isFeatured: true },
]

let _domains: DomainItem[] = [
  { id: 'd1', name: 'AI / Machine Learning', slug: 'ai-ml', icon: '🤖', shortDescription: 'Exploring artificial intelligence and ML.', fullDescription: '', color: '#4F6EF7', techStack: ['Python', 'TensorFlow', 'PyTorch'], isActive: true, memberCount: 12 },
  { id: 'd2', name: 'Web Development', slug: 'web-dev', icon: '🌐', shortDescription: 'Building modern web applications.', fullDescription: '', color: '#22c55e', techStack: ['React', 'Next.js', 'TypeScript'], isActive: true, memberCount: 8 },
  { id: 'd3', name: 'Cybersecurity', slug: 'cybersecurity', icon: '🔒', shortDescription: 'Defending digital infrastructure.', fullDescription: '', color: '#EF9F27', techStack: ['Kali', 'Wireshark', 'Burp Suite'], isActive: true, memberCount: 6 },
  { id: 'd4', name: 'IoT & Robotics', slug: 'iot-robotics', icon: '🤖', shortDescription: 'Connected devices and autonomous systems.', fullDescription: '', color: '#E24B4A', techStack: ['Arduino', 'RaspberryPi', 'ROS'], isActive: true, memberCount: 4 },
  { id: 'd5', name: 'UI/UX Design', slug: 'design', icon: '🎨', shortDescription: 'Crafting beautiful user experiences.', fullDescription: '', color: '#a855f7', techStack: ['Figma', 'Adobe XD', 'Framer'], isActive: true, memberCount: 5 },
  { id: 'd6', name: 'Cloud & DevOps', slug: 'cloud-devops', icon: '☁️', shortDescription: 'Infrastructure and deployment pipelines.', fullDescription: '', color: '#06b6d4', techStack: ['AWS', 'Docker', 'Kubernetes'], isActive: false, memberCount: 3 },
]

let _team: TeamMember[] = [
  { id: 't1', name: 'Arjun Mehta', role: 'President', department: 'Management', year: '4th Year', bio: 'Leading ASPARK with vision and passion.', imageUrl: '', linkedin: '', github: '', instagram: '', isLead: true, isActive: true },
  { id: 't2', name: 'Priya Sharma', role: 'Vice President', department: 'Management', year: '3rd Year', bio: 'Coordinating operations across all domains.', imageUrl: '', linkedin: '', github: '', instagram: '', isLead: true, isActive: true },
  { id: 't3', name: 'Rohan Gupta', role: 'Technical Lead', department: 'Technical', year: '3rd Year', bio: 'Full-stack developer and open source contributor.', imageUrl: '', linkedin: '', github: '', instagram: '', isLead: true, isActive: true },
  { id: 't4', name: 'Ananya Patel', role: 'Design Lead', department: 'Design', year: '3rd Year', bio: 'Creating intuitive and beautiful interfaces.', imageUrl: '', linkedin: '', github: '', instagram: '', isLead: true, isActive: true },
  { id: 't5', name: 'Karan Singh', role: 'Marketing Head', department: 'Marketing', year: '2nd Year', bio: 'Growing the ASPARK brand and community.', imageUrl: '', linkedin: '', github: '', instagram: '', isLead: true, isActive: true },
  { id: 't6', name: 'Sneha Reddy', role: 'Content Writer', department: 'Content', year: '2nd Year', bio: 'Crafting compelling stories about tech.', imageUrl: '', linkedin: '', github: '', instagram: '', isLead: false, isActive: true },
  { id: 't7', name: 'Vikram Joshi', role: 'ML Engineer', department: 'Technical', year: '3rd Year', bio: 'Specializing in deep learning and NLP.', imageUrl: '', linkedin: '', github: '', instagram: '', isLead: false, isActive: true },
  { id: 't8', name: 'Meera Nair', role: 'Operations Coordinator', department: 'Operations', year: '2nd Year', bio: 'Keeping events and logistics running smoothly.', imageUrl: '', linkedin: '', github: '', instagram: '', isLead: false, isActive: true },
  { id: 't9', name: 'Aditya Rao', role: 'Cloud Architect', department: 'Technical', year: '4th Year', bio: 'Building scalable infrastructure.', imageUrl: '', linkedin: '', github: '', instagram: '', isLead: false, isActive: false },
]

let _achievements: AchievementItem[] = [
  { id: 'a1', title: 'National Robotics Championship Winner', description: 'First place at the National Robotics Championship 2026.', category: 'competition', date: '2026-03-15', imageUrl: '', link: '', members: ['Arjun Mehta', 'Vikram Joshi'], isHighlighted: true },
  { id: 'a2', title: 'IEEE Paper Published', description: 'Research paper on NLP accepted at IEEE conference.', category: 'publication', date: '2026-02-20', imageUrl: '', link: '', members: ['Rohan Gupta'], isHighlighted: true },
  { id: 'a3', title: '500+ Members Milestone', description: 'ASPARK crossed 500 active members across all domains.', category: 'milestone', date: '2026-01-10', imageUrl: '', link: '', members: [], isHighlighted: true },
  { id: 'a4', title: 'Best Tech Club Award', description: 'Recognized as the best tech club by the university.', category: 'recognition', date: '2025-12-05', imageUrl: '', link: '', members: [], isHighlighted: false },
  { id: 'a5', title: 'Google DSC Partnership', description: 'Official partnership with Google Developer Student Clubs.', category: 'recognition', date: '2025-11-15', imageUrl: '', link: '', members: ['Priya Sharma'], isHighlighted: false },
  { id: 'a6', title: 'HackMIT Finalists', description: 'Team reached finals at HackMIT international hackathon.', category: 'competition', date: '2025-10-20', imageUrl: '', link: '', members: ['Rohan Gupta', 'Ananya Patel', 'Karan Singh'], isHighlighted: false },
]

let _gallery: GalleryItem[] = [
  { id: 'g1', imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400', alt: 'Workshop session', title: 'AI Workshop Day 1', description: '', category: 'Workshop', eventId: 'e1', takenAt: '2026-03-10', isPublished: true },
  { id: 'g2', imageUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400', alt: 'Hackathon teams', title: 'Hackathon 2026', description: '', category: 'Event', eventId: 'e2', takenAt: '2026-02-28', isPublished: true },
  { id: 'g3', imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400', alt: 'Team meeting', title: 'Core Team Meeting', description: '', category: 'Team', eventId: '', takenAt: '2026-03-05', isPublished: true },
  { id: 'g4', imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400', alt: 'Seminar audience', title: 'Cybersecurity Seminar', description: '', category: 'Event', eventId: 'e3', takenAt: '2026-04-15', isPublished: true },
  { id: 'g5', imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400', alt: 'Team collaboration', title: 'Design Sprint', description: '', category: 'Workshop', eventId: '', takenAt: '2026-01-20', isPublished: false },
  { id: 'g6', imageUrl: 'https://images.unsplash.com/photo-1560472355-536de3962603?w=400', alt: 'Campus event', title: 'TechFest Showcase', description: '', category: 'Campus', eventId: '', takenAt: '2026-02-10', isPublished: true },
]

// CRUD helpers
let _counter = 100
const newId = (prefix: string) => `${prefix}${++_counter}`

export const eventsStore = {
  getAll: () => [..._events],
  add: (item: Omit<EventItem, 'id'>) => { const n = { ...item, id: newId('e') } as EventItem; _events = [n, ..._events]; return n },
  update: (id: string, data: Partial<EventItem>) => { _events = _events.map(e => e.id === id ? { ...e, ...data } : e) },
  remove: (id: string) => { _events = _events.filter(e => e.id !== id) },
}

export const domainsStore = {
  getAll: () => [..._domains],
  add: (item: Omit<DomainItem, 'id'>) => { const n = { ...item, id: newId('d') } as DomainItem; _domains = [n, ..._domains]; return n },
  update: (id: string, data: Partial<DomainItem>) => { _domains = _domains.map(d => d.id === id ? { ...d, ...data } : d) },
  remove: (id: string) => { _domains = _domains.filter(d => d.id !== id) },
}

export const teamStore = {
  getAll: () => [..._team],
  add: (item: Omit<TeamMember, 'id'>) => { const n = { ...item, id: newId('t') } as TeamMember; _team = [n, ..._team]; return n },
  update: (id: string, data: Partial<TeamMember>) => { _team = _team.map(t => t.id === id ? { ...t, ...data } : t) },
  remove: (id: string) => { _team = _team.filter(t => t.id !== id) },
}

export const achievementsStore = {
  getAll: () => [..._achievements],
  add: (item: Omit<AchievementItem, 'id'>) => { const n = { ...item, id: newId('a') } as AchievementItem; _achievements = [n, ..._achievements]; return n },
  update: (id: string, data: Partial<AchievementItem>) => { _achievements = _achievements.map(a => a.id === id ? { ...a, ...data } : a) },
  remove: (id: string) => { _achievements = _achievements.filter(a => a.id !== id) },
}

export const galleryStore = {
  getAll: () => [..._gallery],
  add: (item: Omit<GalleryItem, 'id'>) => { const n = { ...item, id: newId('g') } as GalleryItem; _gallery = [n, ..._gallery]; return n },
  update: (id: string, data: Partial<GalleryItem>) => { _gallery = _gallery.map(g => g.id === id ? { ...g, ...data } : g) },
  remove: (id: string) => { _gallery = _gallery.filter(g => g.id !== id) },
}
