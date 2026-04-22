import { useState } from 'react'
import { Plus, Star } from 'lucide-react'
import { DataTable, Column } from './DataTable'
import { FormModal, FormField, FormInput, FormTextarea, FormSelect, FormToggle } from './FormModal'
import { ConfirmDialog } from './ConfirmDialog'
import { useToast } from './ToastProvider'
import { AchievementItem, achievementsStore, ACHIEVEMENT_CATEGORIES } from './crud-data'

const empty = (): Omit<AchievementItem, 'id'> => ({
  title: '', description: '', category: '', date: '', imageUrl: '', link: '', members: [], isHighlighted: false,
})

const columns: Column<AchievementItem>[] = [
  { key: 'title', label: 'Title' },
  { key: 'category', label: 'Category', render: (v) => <span className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-gray-400 capitalize">{v}</span> },
  { key: 'date', label: 'Date' },
  { key: 'members', label: 'Members', render: (v) => <span className="text-gray-500 text-xs">{Array.isArray(v) ? v.length : 0} members</span> },
  { key: 'isHighlighted', label: 'Highlighted', render: (v, row) => (
    <button
      onClick={(e) => { e.stopPropagation() }}
      className="p-1"
    >
      <Star size={14} className={v ? 'text-amber-400 fill-amber-400' : 'text-gray-600'} />
    </button>
  )},
]

export function AchievementsCrud() {
  const toast = useToast()
  const [data, setData] = useState(achievementsStore.getAll)
  const [form, setForm] = useState<Omit<AchievementItem, 'id'>>(empty())
  const [editId, setEditId] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<AchievementItem | null>(null)
  const [catFilter, setCatFilter] = useState('')
  const [memberInput, setMemberInput] = useState('')

  const refresh = () => setData(achievementsStore.getAll())
  const filtered = catFilter ? data.filter(a => a.category === catFilter) : data

  const openNew = () => { setForm(empty()); setEditId(null); setMemberInput(''); setShowForm(true) }
  const openEdit = (row: AchievementItem) => { const { id, ...rest } = row; setForm({ ...rest, members: [...rest.members] }); setEditId(id); setMemberInput(''); setShowForm(true) }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.title || !form.category || !form.date) { toast.error('Fill required fields'); return }
    if (editId) { achievementsStore.update(editId, form); toast.success('Achievement updated') }
    else { achievementsStore.add(form); toast.success('Achievement created') }
    setShowForm(false); refresh()
  }

  const toggleHighlight = (item: AchievementItem) => {
    achievementsStore.update(item.id, { isHighlighted: !item.isHighlighted })
    toast.success(item.isHighlighted ? 'Removed from highlights' : 'Added to highlights')
    refresh()
  }

  // Override column render for inline toggle
  const columnsWithToggle: Column<AchievementItem>[] = columns.map(col =>
    col.key === 'isHighlighted' ? {
      ...col, render: (v: any, row: AchievementItem) => (
        <button onClick={(e) => { e.stopPropagation(); toggleHighlight(row) }} className="p-1">
          <Star size={14} className={v ? 'text-amber-400 fill-amber-400' : 'text-gray-600 hover:text-amber-400'} />
        </button>
      )
    } : col
  )

  return (
    <div className="p-4 md:p-6 pb-24 md:pb-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-white text-2xl">Achievements</h1>
          <p className="text-gray-500 text-sm mt-1">{data.length} achievements</p>
        </div>
        <button onClick={openNew} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm hover:from-cyan-400 hover:to-blue-500 transition-all">
          <Plus size={16} /> Add Achievement
        </button>
      </div>

      <DataTable
        data={filtered}
        columns={columnsWithToggle}
        searchPlaceholder="Search achievements..."
        onEdit={openEdit}
        onDelete={(row) => setDeleteTarget(row)}
        filterElement={
          <select value={catFilter} onChange={e => setCatFilter(e.target.value)} className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-gray-300 focus:border-cyan-400/50 focus:outline-none appearance-none">
            <option value="" className="bg-[#0f0f23]">All Categories</option>
            {ACHIEVEMENT_CATEGORIES.map(c => <option key={c} value={c} className="bg-[#0f0f23] capitalize">{c}</option>)}
          </select>
        }
      />

      <FormModal isOpen={showForm} title={editId ? 'Edit Achievement' : 'New Achievement'} onClose={() => setShowForm(false)} onSubmit={handleSubmit}>
        <FormField label="Title *"><FormInput value={form.title} onChange={v => setForm(f => ({ ...f, title: v }))} placeholder="Achievement title" /></FormField>
        <FormField label="Description *"><FormTextarea value={form.description} onChange={v => setForm(f => ({ ...f, description: v }))} maxLength={500} placeholder="Describe the achievement..." /></FormField>
        <div className="grid grid-cols-2 gap-3">
          <FormField label="Category *"><FormSelect value={form.category} onChange={v => setForm(f => ({ ...f, category: v }))} options={ACHIEVEMENT_CATEGORIES} placeholder="Select..." /></FormField>
          <FormField label="Date *"><FormInput value={form.date} onChange={v => setForm(f => ({ ...f, date: v }))} type="date" /></FormField>
        </div>
        <FormField label="Image URL"><FormInput value={form.imageUrl} onChange={v => setForm(f => ({ ...f, imageUrl: v }))} placeholder="https://..." /></FormField>
        <FormField label="Link"><FormInput value={form.link} onChange={v => setForm(f => ({ ...f, link: v }))} placeholder="https://..." /></FormField>
        <FormField label="Members">
          <div className="flex gap-2">
            <input value={memberInput} onChange={e => setMemberInput(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); if (memberInput.trim()) { setForm(f => ({ ...f, members: [...f.members, memberInput.trim()] })); setMemberInput('') } } }} placeholder="Add member name..." className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-gray-600 focus:border-cyan-400/50 focus:outline-none" />
            <button type="button" onClick={() => { if (memberInput.trim()) { setForm(f => ({ ...f, members: [...f.members, memberInput.trim()] })); setMemberInput('') } }} className="px-3 py-2 rounded-lg bg-white/5 text-gray-400 hover:text-white text-sm">Add</button>
          </div>
          <div className="flex flex-wrap gap-1 mt-2">
            {form.members.map((m, i) => (
              <span key={`${m}-${i}`} className="text-xs px-2 py-0.5 rounded-full bg-cyan-400/10 text-cyan-400 flex items-center gap-1">
                {m}<button type="button" onClick={() => setForm(f => ({ ...f, members: f.members.filter((_, idx) => idx !== i) }))} className="hover:text-white">&times;</button>
              </span>
            ))}
          </div>
        </FormField>
        <FormToggle checked={form.isHighlighted} onChange={v => setForm(f => ({ ...f, isHighlighted: v }))} label="Highlighted (shows on home)" />
      </FormModal>

      <ConfirmDialog isOpen={!!deleteTarget} title="Delete Achievement" message={`Delete "${deleteTarget?.title}"?`} confirmLabel="Delete" isDangerous onConfirm={() => { if (deleteTarget) { achievementsStore.remove(deleteTarget.id); toast.success('Achievement deleted'); setDeleteTarget(null); refresh() } }} onCancel={() => setDeleteTarget(null)} />
    </div>
  )
}
