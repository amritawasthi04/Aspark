import { useState } from 'react'
import { motion } from 'motion/react'
import { Plus, ArrowLeft } from 'lucide-react'
import { DataTable, TableColumn } from './DataTable'
import { ConfirmDialog } from './ConfirmDialog'
import { FormField, inputCls, selectCls, textareaCls } from './FormField'
import { useToast } from './ToastProvider'

interface Event {
  id: string; title: string; date: string; time: string; category: string
  location: string; description: string; imageUrl: string; status: 'upcoming' | 'past'
  slug: string; isFeatured: boolean
}

const CATEGORIES = ['Workshop', 'Hackathon', 'Seminar', 'Competition', 'Social', 'Other']

const INITIAL_EVENTS: Event[] = [
  { id: '1', title: 'AI Workshop 2026', date: '2026-05-10', time: '10:00', category: 'Workshop', location: 'Lab A-301', description: 'Deep dive into neural networks and transformers.', imageUrl: '', status: 'upcoming', slug: 'ai-workshop-2026', isFeatured: true },
  { id: '2', title: 'Hackathon Spring', date: '2026-04-28', time: '09:00', category: 'Hackathon', location: 'Main Hall', description: '24-hour coding marathon with industry mentors.', imageUrl: '', status: 'upcoming', slug: 'hackathon-spring', isFeatured: true },
  { id: '3', title: 'Cybersecurity Seminar', date: '2026-04-15', time: '14:00', category: 'Seminar', location: 'Auditorium', description: 'Learn about modern threat vectors and defense strategies.', imageUrl: '', status: 'past', slug: 'cybersecurity-seminar', isFeatured: false },
  { id: '4', title: 'Web Dev Bootcamp', date: '2026-04-05', time: '10:00', category: 'Workshop', location: 'Lab B-102', description: 'Full-stack web development with React and Node.', imageUrl: '', status: 'past', slug: 'web-dev-bootcamp', isFeatured: false },
  { id: '5', title: 'Code Golf Competition', date: '2026-03-22', time: '15:00', category: 'Competition', location: 'Online', description: 'Solve problems with the fewest characters possible.', imageUrl: '', status: 'past', slug: 'code-golf', isFeatured: false },
  { id: '6', title: 'Design Thinking Workshop', date: '2026-03-10', time: '11:00', category: 'Workshop', location: 'Lab C-205', description: 'Human-centered design methodologies.', imageUrl: '', status: 'past', slug: 'design-thinking', isFeatured: false },
  { id: '7', title: 'Cloud Computing Seminar', date: '2026-02-20', time: '14:00', category: 'Seminar', location: 'Auditorium', description: 'AWS, GCP, and Azure fundamentals.', imageUrl: '', status: 'past', slug: 'cloud-computing', isFeatured: false },
  { id: '8', title: 'Social Mixer Night', date: '2026-02-14', time: '18:00', category: 'Social', location: 'Cafeteria', description: 'Get to know fellow club members.', imageUrl: '', status: 'past', slug: 'social-mixer', isFeatured: false },
]

const EMPTY_EVENT: Omit<Event, 'id'> = { title: '', date: '', time: '', category: 'Workshop', location: '', description: '', imageUrl: '', status: 'upcoming', slug: '', isFeatured: false }

export function AdminEventsPage() {
  const [events, setEvents] = useState<Event[]>(INITIAL_EVENTS)
  const [view, setView] = useState<'list' | 'form'>('list')
  const [editing, setEditing] = useState<Event | null>(null)
  const [form, setForm] = useState(EMPTY_EVENT)
  const [deleteTarget, setDeleteTarget] = useState<Event | null>(null)
  const [filterCat, setFilterCat] = useState('')
  const toast = useToast()

  const columns: TableColumn<Event>[] = [
    { key: 'title', label: 'Title' },
    { key: 'date', label: 'Date' },
    { key: 'category', label: 'Category', render: (v) => <span className="px-2 py-0.5 rounded-full bg-white/5 text-xs text-gray-400">{v}</span> },
    { key: 'location', label: 'Location' },
    { key: 'status', label: 'Status', render: (v) => (
      <span className={`px-2 py-0.5 rounded-full text-xs ${v === 'upcoming' ? 'bg-cyan-400/10 text-cyan-400' : 'bg-gray-500/10 text-gray-500'}`}>{v}</span>
    )},
  ]

  const filteredEvents = filterCat ? events.filter(e => e.category === filterCat) : events

  const openNew = () => { setEditing(null); setForm(EMPTY_EVENT); setView('form') }
  const openEdit = (ev: Event) => { setEditing(ev); setForm({ ...ev }); setView('form') }

  const handleSave = () => {
    if (!form.title || !form.date || !form.category) { toast.error('Please fill required fields'); return }
    const slug = form.slug || form.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    if (editing) {
      setEvents(prev => prev.map(e => e.id === editing.id ? { ...form, id: editing.id, slug } : e))
      toast.success(`"${form.title}" updated`)
    } else {
      setEvents(prev => [...prev, { ...form, id: crypto.randomUUID(), slug }])
      toast.success(`"${form.title}" created`)
    }
    setView('list')
  }

  const handleDelete = () => {
    if (!deleteTarget) return
    setEvents(prev => prev.filter(e => e.id !== deleteTarget.id))
    toast.success(`"${deleteTarget.title}" deleted`)
    setDeleteTarget(null)
  }

  if (view === 'form') {
    return (
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="p-4 md:p-6 pb-24 md:pb-6">
        <button onClick={() => setView('list')} className="flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-6 transition-colors">
          <ArrowLeft size={16} /> Back to Events
        </button>
        <h2 className="text-white text-xl mb-6">{editing ? 'Edit Event' : 'New Event'}</h2>
        <div className="bg-[#12122a] border border-white/5 rounded-xl p-6 max-w-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Title" required>
              <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className={inputCls} placeholder="Event title" />
            </FormField>
            <FormField label="Category" required>
              <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className={selectCls}>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </FormField>
            <FormField label="Date" required>
              <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} className={inputCls} />
            </FormField>
            <FormField label="Time">
              <input type="time" value={form.time} onChange={e => setForm({ ...form, time: e.target.value })} className={inputCls} />
            </FormField>
            <FormField label="Location">
              <input value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} className={inputCls} placeholder="Location" />
            </FormField>
            <FormField label="Slug">
              <input value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} className={inputCls} placeholder="auto-generated" />
            </FormField>
            <div className="md:col-span-2">
              <FormField label="Description" required charCount={{ current: form.description.length, max: 500 }}>
                <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value.slice(0, 500) })} rows={4} className={textareaCls} placeholder="Describe the event..." />
              </FormField>
            </div>
            <FormField label="Image URL">
              <input value={form.imageUrl} onChange={e => setForm({ ...form, imageUrl: e.target.value })} className={inputCls} placeholder="https://..." />
            </FormField>
            <FormField label="Status">
              <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value as 'upcoming' | 'past' })} className={selectCls}>
                <option value="upcoming">Upcoming</option>
                <option value="past">Past</option>
              </select>
            </FormField>
            <div className="md:col-span-2 flex items-center gap-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.isFeatured} onChange={e => setForm({ ...form, isFeatured: e.target.checked })} className="w-4 h-4 rounded bg-white/5 border-white/10 accent-cyan-400" />
                <span className="text-sm text-gray-300">Featured on homepage</span>
              </label>
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-white/5">
            <button onClick={() => setView('list')} className="px-4 py-2 rounded-lg text-sm text-gray-400 hover:bg-white/5 transition-all">Cancel</button>
            <button onClick={handleSave} className="px-6 py-2 rounded-lg text-sm bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-400 hover:to-blue-500 transition-all">
              {editing ? 'Update' : 'Create'} Event
            </button>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="p-4 md:p-6 pb-24 md:pb-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-white text-xl">Events</h2>
        <button onClick={openNew} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm hover:from-cyan-400 hover:to-blue-500 transition-all">
          <Plus size={16} /> Add Event
        </button>
      </div>
      <DataTable
        data={filteredEvents}
        columns={columns}
        searchPlaceholder="Search events..."
        onEdit={openEdit}
        onDelete={setDeleteTarget}
        filterElement={
          <select value={filterCat} onChange={e => setFilterCat(e.target.value)} className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-gray-300 focus:outline-none [&>option]:bg-[#12122a]">
            <option value="">All Categories</option>
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        }
      />
      <ConfirmDialog
        isOpen={!!deleteTarget}
        title="Delete Event"
        message={`Are you sure you want to delete "${deleteTarget?.title}"? This cannot be undone.`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </motion.div>
  )
}
