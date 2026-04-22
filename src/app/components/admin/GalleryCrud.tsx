import { useState } from 'react'
import { motion } from 'motion/react'
import { Plus, Pencil, Trash2, Eye, EyeOff, CheckSquare, Square, Trash } from 'lucide-react'
import { FormModal, FormField, FormInput, FormTextarea, FormSelect, FormToggle } from './FormModal'
import { ConfirmDialog } from './ConfirmDialog'
import { useToast } from './ToastProvider'
import { GalleryItem, galleryStore, GALLERY_CATEGORIES, eventsStore } from './crud-data'
import { ImageWithFallback } from '../figma/ImageWithFallback'

const empty = (): Omit<GalleryItem, 'id'> => ({
  imageUrl: '', alt: '', title: '', description: '', category: '', eventId: '', takenAt: '', isPublished: true,
})

export function GalleryCrud() {
  const toast = useToast()
  const [data, setData] = useState(galleryStore.getAll)
  const [form, setForm] = useState<Omit<GalleryItem, 'id'>>(empty())
  const [editId, setEditId] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<GalleryItem | null>(null)
  const [catFilter, setCatFilter] = useState('')
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [showBulkDelete, setShowBulkDelete] = useState(false)

  const refresh = () => setData(galleryStore.getAll())
  const filtered = catFilter ? data.filter(g => g.category === catFilter) : data
  const events = eventsStore.getAll()

  const openNew = () => { setForm(empty()); setEditId(null); setShowForm(true) }
  const openEdit = (item: GalleryItem) => { const { id, ...rest } = item; setForm(rest); setEditId(id); setShowForm(true) }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.imageUrl || !form.alt || !form.title) { toast.error('Fill required fields'); return }
    if (editId) { galleryStore.update(editId, form); toast.success('Image updated') }
    else { galleryStore.add(form); toast.success('Image uploaded') }
    setShowForm(false); refresh()
  }

  const toggleSelect = (id: string) => {
    setSelected(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const bulkDelete = () => {
    selected.forEach(id => galleryStore.remove(id))
    toast.success(`${selected.size} items deleted`)
    setSelected(new Set())
    setShowBulkDelete(false)
    refresh()
  }

  const togglePublish = (item: GalleryItem) => {
    galleryStore.update(item.id, { isPublished: !item.isPublished })
    toast.success(item.isPublished ? 'Unpublished' : 'Published')
    refresh()
  }

  return (
    <div className="p-4 md:p-6 pb-24 md:pb-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-white text-2xl">Gallery</h1>
          <p className="text-gray-500 text-sm mt-1">{data.length} images</p>
        </div>
        <div className="flex items-center gap-2">
          {selected.size > 0 && (
            <button onClick={() => setShowBulkDelete(true)} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/10 text-red-400 text-sm hover:bg-red-500/20 transition-all">
              <Trash size={16} /> Delete {selected.size}
            </button>
          )}
          <button onClick={openNew} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm hover:from-cyan-400 hover:to-blue-500 transition-all">
            <Plus size={16} /> Upload
          </button>
        </div>
      </div>

      <div className="flex gap-3 mb-4">
        <select value={catFilter} onChange={e => setCatFilter(e.target.value)} className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-gray-300 focus:border-cyan-400/50 focus:outline-none appearance-none">
          <option value="" className="bg-[#0f0f23]">All Categories</option>
          {GALLERY_CATEGORIES.map(c => <option key={c} value={c} className="bg-[#0f0f23]">{c}</option>)}
        </select>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            className="relative rounded-xl overflow-hidden border border-white/5 group cursor-pointer bg-[#12122a]"
          >
            <div className="aspect-[4/3] relative">
              <ImageWithFallback src={item.imageUrl} alt={item.alt} className="w-full h-full object-cover" />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                <p className="text-white text-sm">{item.title}</p>
              </div>
              {/* Checkbox */}
              <button onClick={() => toggleSelect(item.id)} className="absolute top-2 left-2 z-10">
                {selected.has(item.id) ? <CheckSquare size={18} className="text-cyan-400" /> : <Square size={18} className="text-white/40 opacity-0 group-hover:opacity-100 transition-opacity" />}
              </button>
              {/* Actions */}
              <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                <button onClick={() => openEdit(item)} className="p-1.5 rounded-lg bg-black/50 text-white hover:bg-cyan-400/20 transition-all"><Pencil size={12} /></button>
                <button onClick={() => setDeleteTarget(item)} className="p-1.5 rounded-lg bg-black/50 text-white hover:bg-red-400/20 transition-all"><Trash2 size={12} /></button>
                <button onClick={() => togglePublish(item)} className="p-1.5 rounded-lg bg-black/50 text-white hover:bg-amber-400/20 transition-all">
                  {item.isPublished ? <Eye size={12} /> : <EyeOff size={12} />}
                </button>
              </div>
              {/* Status */}
              {!item.isPublished && (
                <span className="absolute bottom-2 right-2 text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400">Draft</span>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-gray-500 text-sm">No gallery items found</div>
      )}

      <FormModal isOpen={showForm} title={editId ? 'Edit Image' : 'Upload Image'} onClose={() => setShowForm(false)} onSubmit={handleSubmit}>
        <FormField label="Image URL *"><FormInput value={form.imageUrl} onChange={v => setForm(f => ({ ...f, imageUrl: v }))} placeholder="https://images.unsplash.com/..." /></FormField>
        {form.imageUrl && (
          <div className="rounded-lg overflow-hidden border border-white/10 aspect-video">
            <ImageWithFallback src={form.imageUrl} alt="Preview" className="w-full h-full object-cover" />
          </div>
        )}
        <FormField label="Alt Text *"><FormInput value={form.alt} onChange={v => setForm(f => ({ ...f, alt: v }))} placeholder="Describe the image..." /></FormField>
        <FormField label="Title *"><FormInput value={form.title} onChange={v => setForm(f => ({ ...f, title: v }))} placeholder="Image title" /></FormField>
        <FormField label="Description"><FormTextarea value={form.description} onChange={v => setForm(f => ({ ...f, description: v }))} placeholder="Optional description..." /></FormField>
        <div className="grid grid-cols-2 gap-3">
          <FormField label="Category *"><FormSelect value={form.category} onChange={v => setForm(f => ({ ...f, category: v }))} options={GALLERY_CATEGORIES} placeholder="Select..." /></FormField>
          <FormField label="Event"><FormSelect value={form.eventId} onChange={v => setForm(f => ({ ...f, eventId: v }))} options={events.map(e => e.id)} placeholder="None" /></FormField>
        </div>
        <FormField label="Date Taken"><FormInput value={form.takenAt} onChange={v => setForm(f => ({ ...f, takenAt: v }))} type="date" /></FormField>
        <FormToggle checked={form.isPublished} onChange={v => setForm(f => ({ ...f, isPublished: v }))} label="Published" />
      </FormModal>

      <ConfirmDialog isOpen={!!deleteTarget} title="Delete Image" message={`Delete "${deleteTarget?.title}"?`} confirmLabel="Delete" isDangerous onConfirm={() => { if (deleteTarget) { galleryStore.remove(deleteTarget.id); toast.success('Image deleted'); setDeleteTarget(null); refresh() } }} onCancel={() => setDeleteTarget(null)} />
      <ConfirmDialog isOpen={showBulkDelete} title="Bulk Delete" message={`Delete ${selected.size} selected images? This cannot be undone.`} confirmLabel="Delete All" isDangerous onConfirm={bulkDelete} onCancel={() => setShowBulkDelete(false)} />
    </div>
  )
}
