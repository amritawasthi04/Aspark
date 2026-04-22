import { useState } from 'react'
import { motion } from 'motion/react'
import { Plus, ArrowLeft, Pencil, Trash2, Eye, EyeOff, CheckSquare, Square, Trash } from 'lucide-react'
import { ConfirmDialog } from './ConfirmDialog'
import { FormField, inputCls, selectCls, textareaCls } from './FormField'
import { useToast } from './ToastProvider'

interface GalleryItem {
  id: string; imageUrl: string; alt: string; title: string; description: string
  category: string; eventId: string; takenAt: string; isPublished: boolean
}

const CATEGORIES = ['Event', 'Workshop', 'Social', 'Competition', 'Campus', 'Other']

const PLACEHOLDER_IMAGES = [
  'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=300&fit=crop',
]

const INITIAL: GalleryItem[] = [
  { id: '1', imageUrl: PLACEHOLDER_IMAGES[0], alt: 'Coding session', title: 'Hackathon 2026', description: 'Teams competing during the spring hackathon.', category: 'Competition', eventId: '2', takenAt: '2026-04-28', isPublished: true },
  { id: '2', imageUrl: PLACEHOLDER_IMAGES[1], alt: 'Workshop', title: 'AI Workshop Session', description: 'Participants learning about neural networks.', category: 'Workshop', eventId: '1', takenAt: '2026-05-10', isPublished: true },
  { id: '3', imageUrl: PLACEHOLDER_IMAGES[2], alt: 'Office space', title: 'Lab Setup', description: 'Our new dedicated lab space.', category: 'Campus', eventId: '', takenAt: '2026-03-01', isPublished: true },
  { id: '4', imageUrl: PLACEHOLDER_IMAGES[3], alt: 'Team photo', title: 'Team Meetup', description: 'Monthly team gathering.', category: 'Social', eventId: '', takenAt: '2026-02-15', isPublished: true },
  { id: '5', imageUrl: PLACEHOLDER_IMAGES[4], alt: 'Conference', title: 'Seminar Day', description: 'Cybersecurity seminar attendees.', category: 'Event', eventId: '3', takenAt: '2026-04-15', isPublished: false },
  { id: '6', imageUrl: PLACEHOLDER_IMAGES[5], alt: 'Meeting', title: 'Board Meeting', description: 'Executive board planning session.', category: 'Other', eventId: '', takenAt: '2026-01-20', isPublished: false },
]

const EMPTY: Omit<GalleryItem, 'id'> = { imageUrl: '', alt: '', title: '', description: '', category: 'Event', eventId: '', takenAt: '', isPublished: true }

export function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>(INITIAL)
  const [view, setView] = useState<'list' | 'form'>('list')
  const [editing, setEditing] = useState<GalleryItem | null>(null)
  const [form, setForm] = useState(EMPTY)
  const [deleteTarget, setDeleteTarget] = useState<GalleryItem | null>(null)
  const [filterCat, setFilterCat] = useState('')
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [bulkDeleteOpen, setBulkDeleteOpen] = useState(false)
  const toast = useToast()

  const filtered = filterCat ? items.filter(i => i.category === filterCat) : items

  const toggleSelect = (id: string) => {
    setSelected(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const openNew = () => { setEditing(null); setForm(EMPTY); setView('form') }
  const openEdit = (item: GalleryItem) => { setEditing(item); setForm({ ...item }); setView('form') }

  const handleSave = () => {
    if (!form.imageUrl || !form.alt || !form.title) { toast.error('Please fill required fields'); return }
    if (editing) {
      setItems(prev => prev.map(i => i.id === editing.id ? { ...form, id: editing.id } : i))
      toast.success(`"${form.title}" updated`)
    } else {
      setItems(prev => [...prev, { ...form, id: crypto.randomUUID() }])
      toast.success(`"${form.title}" uploaded`)
    }
    setView('list')
  }

  const handleDelete = () => {
    if (!deleteTarget) return
    setItems(prev => prev.filter(i => i.id !== deleteTarget.id))
    toast.success(`"${deleteTarget.title}" deleted`)
    setDeleteTarget(null)
  }

  const handleBulkDelete = () => {
    setItems(prev => prev.filter(i => !selected.has(i.id)))
    toast.success(`${selected.size} items deleted`)
    setSelected(new Set())
    setBulkDeleteOpen(false)
  }

  const togglePublish = (id: string) => {
    setItems(prev => prev.map(i => i.id === id ? { ...i, isPublished: !i.isPublished } : i))
  }

  if (view === 'form') {
    return (
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="p-4 md:p-6 pb-24 md:pb-6">
        <button onClick={() => setView('list')} className="flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-6 transition-colors"><ArrowLeft size={16} /> Back</button>
        <h2 className="text-white text-xl mb-6">{editing ? 'Edit Image' : 'Upload Image'}</h2>
        <div className="bg-[#12122a] border border-white/5 rounded-xl p-6 max-w-2xl">
          <div className="space-y-4">
            <FormField label="Image URL" required>
              <input value={form.imageUrl} onChange={e => setForm({ ...form, imageUrl: e.target.value })} className={inputCls} placeholder="https://..." />
            </FormField>
            {form.imageUrl && (
              <div className="rounded-xl overflow-hidden border border-white/5 max-h-64">
                <img src={form.imageUrl} alt="Preview" className="w-full h-full object-cover" onError={(e) => (e.currentTarget.style.display = 'none')} />
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField label="Alt Text" required><input value={form.alt} onChange={e => setForm({ ...form, alt: e.target.value })} className={inputCls} placeholder="Describe the image" /></FormField>
              <FormField label="Title" required><input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className={inputCls} /></FormField>
              <FormField label="Category" required>
                <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className={selectCls}>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </FormField>
              <FormField label="Taken At"><input type="date" value={form.takenAt} onChange={e => setForm({ ...form, takenAt: e.target.value })} className={inputCls} /></FormField>
              <div className="md:col-span-2">
                <FormField label="Description"><textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={3} className={textareaCls} /></FormField>
              </div>
              <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={form.isPublished} onChange={e => setForm({ ...form, isPublished: e.target.checked })} className="w-4 h-4 rounded accent-cyan-400" /><span className="text-sm text-gray-300">Published</span></label>
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-white/5">
            <button onClick={() => setView('list')} className="px-4 py-2 rounded-lg text-sm text-gray-400 hover:bg-white/5 transition-all">Cancel</button>
            <button onClick={handleSave} className="px-6 py-2 rounded-lg text-sm bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-400 hover:to-blue-500 transition-all">{editing ? 'Update' : 'Upload'}</button>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="p-4 md:p-6 pb-24 md:pb-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-white text-xl">Gallery</h2>
        <div className="flex items-center gap-3">
          {selected.size > 0 && (
            <button onClick={() => setBulkDeleteOpen(true)} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/20 text-red-400 text-sm hover:bg-red-500/30 transition-all">
              <Trash size={14} /> Delete {selected.size}
            </button>
          )}
          <button onClick={openNew} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm hover:from-cyan-400 hover:to-blue-500 transition-all"><Plus size={16} /> Upload</button>
        </div>
      </div>
      <div className="flex gap-3 mb-4">
        <select value={filterCat} onChange={e => setFilterCat(e.target.value)} className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-gray-300 focus:outline-none [&>option]:bg-[#12122a]">
          <option value="">All Categories</option>
          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(item => (
          <div key={item.id} className="bg-[#12122a] border border-white/5 rounded-xl overflow-hidden group relative hover:border-white/10 transition-all">
            <div className="relative aspect-[4/3]">
              <img src={item.imageUrl} alt={item.alt} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="text-white text-sm">{item.title}</p>
                  <p className="text-gray-400 text-xs mt-0.5">{item.category}</p>
                </div>
                <div className="absolute top-3 right-3 flex gap-1">
                  <button onClick={() => openEdit(item)} className="p-1.5 rounded-lg bg-black/50 text-white hover:bg-cyan-500/50 transition-all"><Pencil size={13} /></button>
                  <button onClick={() => togglePublish(item.id)} className="p-1.5 rounded-lg bg-black/50 text-white hover:bg-cyan-500/50 transition-all">
                    {item.isPublished ? <Eye size={13} /> : <EyeOff size={13} />}
                  </button>
                  <button onClick={() => setDeleteTarget(item)} className="p-1.5 rounded-lg bg-black/50 text-white hover:bg-red-500/50 transition-all"><Trash2 size={13} /></button>
                </div>
              </div>
              <button onClick={() => toggleSelect(item.id)} className="absolute top-3 left-3 z-10">
                {selected.has(item.id) ? <CheckSquare size={18} className="text-cyan-400" /> : <Square size={18} className="text-white/50 opacity-0 group-hover:opacity-100 transition-opacity" />}
              </button>
              {!item.isPublished && (
                <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-gray-800/80 text-gray-400 text-[10px] group-hover:hidden">Draft</span>
              )}
            </div>
          </div>
        ))}
      </div>
      <ConfirmDialog isOpen={!!deleteTarget} title="Delete Image" message={`Delete "${deleteTarget?.title}"?`} onConfirm={handleDelete} onCancel={() => setDeleteTarget(null)} />
      <ConfirmDialog isOpen={bulkDeleteOpen} title="Bulk Delete" message={`Delete ${selected.size} selected images?`} onConfirm={handleBulkDelete} onCancel={() => setBulkDeleteOpen(false)} />
    </motion.div>
  )
}
