import { useState } from 'react'
import { motion } from 'motion/react'
import { Plus } from 'lucide-react'
import { DataTable, Column } from './DataTable'
import { FormModal, FormField, FormInput, FormTextarea, FormSelect, FormToggle } from './FormModal'
import { ConfirmDialog } from './ConfirmDialog'
import { useToast } from './ToastProvider'
import { EventItem, eventsStore, EVENT_CATEGORIES } from './crud-data'

const emptyEvent = (): Omit<EventItem, 'id'> => ({
  title: '', date: '', time: '', category: '', location: '', description: '',
  imageUrl: '', status: 'upcoming', slug: '', isFeatured: false,
})

const columns: Column<EventItem>[] = [
  { key: 'title', label: 'Title' },
  { key: 'date', label: 'Date' },
  { key: 'category', label: 'Category', render: (v) => (
    <span className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-gray-400">{v}</span>
  )},
  { key: 'location', label: 'Location' },
  { key: 'status', label: 'Status', render: (v) => (
    <span className={`text-xs px-2 py-0.5 rounded-full ${v === 'upcoming' ? 'bg-cyan-400/10 text-cyan-400' : 'bg-gray-500/10 text-gray-500'}`}>{v}</span>
  )},
]

export function EventsCrud() {
  const toast = useToast()
  const [data, setData] = useState(eventsStore.getAll)
  const [form, setForm] = useState<Omit<EventItem, 'id'>>(emptyEvent())
  const [editId, setEditId] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<EventItem | null>(null)
  const [categoryFilter, setCategoryFilter] = useState('')

  const refresh = () => setData(eventsStore.getAll())

  const filtered = categoryFilter ? data.filter(e => e.category === categoryFilter) : data

  const openNew = () => { setForm(emptyEvent()); setEditId(null); setShowForm(true) }
  const openEdit = (row: EventItem) => {
    const { id, ...rest } = row
    setForm(rest); setEditId(id); setShowForm(true)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.title || !form.date || !form.category) { toast.error('Please fill required fields'); return }
    const slug = form.slug || form.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
    if (editId) {
      eventsStore.update(editId, { ...form, slug })
      toast.success('Event updated successfully')
    } else {
      eventsStore.add({ ...form, slug })
      toast.success('Event created successfully')
    }
    setShowForm(false); refresh()
  }

  const handleDelete = () => {
    if (!deleteTarget) return
    eventsStore.remove(deleteTarget.id)
    toast.success(`"${deleteTarget.title}" deleted`)
    setDeleteTarget(null); refresh()
  }

  return (
    <div className="p-4 md:p-6 pb-24 md:pb-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-white text-2xl">Events</h1>
          <p className="text-gray-500 text-sm mt-1">{data.length} total events</p>
        </div>
        <button onClick={openNew} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm hover:from-cyan-400 hover:to-blue-500 transition-all">
          <Plus size={16} /> Add Event
        </button>
      </div>

      <DataTable
        data={filtered}
        columns={columns}
        searchPlaceholder="Search events..."
        onEdit={openEdit}
        onDelete={(row) => setDeleteTarget(row)}
        filterElement={
          <select
            value={categoryFilter}
            onChange={e => setCategoryFilter(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-gray-300 focus:border-cyan-400/50 focus:outline-none appearance-none"
          >
            <option value="" className="bg-[#0f0f23]">All Categories</option>
            {EVENT_CATEGORIES.map(c => <option key={c} value={c} className="bg-[#0f0f23]">{c}</option>)}
          </select>
        }
      />

      <FormModal isOpen={showForm} title={editId ? 'Edit Event' : 'New Event'} onClose={() => setShowForm(false)} onSubmit={handleSubmit}>
        <FormField label="Title *"><FormInput value={form.title} onChange={v => setForm(f => ({ ...f, title: v }))} placeholder="Event title" /></FormField>
        <div className="grid grid-cols-2 gap-3">
          <FormField label="Date *"><FormInput value={form.date} onChange={v => setForm(f => ({ ...f, date: v }))} type="date" /></FormField>
          <FormField label="Time"><FormInput value={form.time} onChange={v => setForm(f => ({ ...f, time: v }))} type="time" /></FormField>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <FormField label="Category *"><FormSelect value={form.category} onChange={v => setForm(f => ({ ...f, category: v }))} options={EVENT_CATEGORIES} placeholder="Select..." /></FormField>
          <FormField label="Location"><FormInput value={form.location} onChange={v => setForm(f => ({ ...f, location: v }))} placeholder="Venue" /></FormField>
        </div>
        <FormField label="Description"><FormTextarea value={form.description} onChange={v => setForm(f => ({ ...f, description: v }))} maxLength={500} placeholder="Event description..." /></FormField>
        <FormField label="Slug"><FormInput value={form.slug} onChange={v => setForm(f => ({ ...f, slug: v }))} placeholder="auto-generated-slug" /></FormField>
        <FormField label="Image URL"><FormInput value={form.imageUrl} onChange={v => setForm(f => ({ ...f, imageUrl: v }))} placeholder="https://..." /></FormField>
        <div className="flex gap-6">
          <FormToggle checked={form.status === 'upcoming'} onChange={v => setForm(f => ({ ...f, status: v ? 'upcoming' : 'past' }))} label="Upcoming" />
          <FormToggle checked={form.isFeatured} onChange={v => setForm(f => ({ ...f, isFeatured: v }))} label="Featured" />
        </div>
      </FormModal>

      <ConfirmDialog
        isOpen={!!deleteTarget}
        title="Delete Event"
        message={`Are you sure you want to delete "${deleteTarget?.title}"? This action cannot be undone.`}
        confirmLabel="Delete"
        isDangerous
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  )
}
