import { useState } from 'react'
import { motion } from 'motion/react'
import { Plus, ArrowLeft, Star, X } from 'lucide-react'
import { DataTable, TableColumn } from './DataTable'
import { ConfirmDialog } from './ConfirmDialog'
import { FormField, inputCls, selectCls, textareaCls } from './FormField'
import { useToast } from './ToastProvider'

interface Achievement {
  id: string; title: string; description: string; category: string; date: string
  imageUrl: string; link: string; members: string[]; isHighlighted: boolean
}

const CATEGORIES = ['competition', 'recognition', 'milestone', 'publication', 'other']

const INITIAL: Achievement[] = [
  { id: '1', title: 'National Robotics Winner', description: 'First place in the National Robotics Championship 2026.', category: 'competition', date: '2026-03-15', imageUrl: '', link: '', members: ['Vikram Singh', 'Karan Joshi'], isHighlighted: true },
  { id: '2', title: 'IEEE Paper Published', description: 'Research paper on federated learning published in IEEE.', category: 'publication', date: '2026-02-20', imageUrl: '', link: 'https://ieee.org', members: ['Priya Sharma'], isHighlighted: true },
  { id: '3', title: '500 Members Milestone', description: 'ASPARK reached 500 total members across all years.', category: 'milestone', date: '2026-01-10', imageUrl: '', link: '', members: [], isHighlighted: false },
  { id: '4', title: 'Best Tech Club Award', description: 'Recognized as the best tech club on campus.', category: 'recognition', date: '2025-12-05', imageUrl: '', link: '', members: ['Arjun Mehta'], isHighlighted: true },
  { id: '5', title: 'Hackathon Runners-Up', description: 'Second place in Inter-College Hackathon.', category: 'competition', date: '2025-11-18', imageUrl: '', link: '', members: ['Rohan Gupta', 'Sneha Reddy'], isHighlighted: false },
  { id: '6', title: 'Open Source Contribution', description: 'Contributed to React core repository.', category: 'other', date: '2025-10-01', imageUrl: '', link: 'https://github.com', members: ['Karan Joshi'], isHighlighted: false },
]

const EMPTY: Omit<Achievement, 'id'> = { title: '', description: '', category: 'competition', date: '', imageUrl: '', link: '', members: [], isHighlighted: false }

export function AdminAchievementsPage() {
  const [items, setItems] = useState<Achievement[]>(INITIAL)
  const [view, setView] = useState<'list' | 'form'>('list')
  const [editing, setEditing] = useState<Achievement | null>(null)
  const [form, setForm] = useState(EMPTY)
  const [deleteTarget, setDeleteTarget] = useState<Achievement | null>(null)
  const [filterCat, setFilterCat] = useState('')
  const [memberInput, setMemberInput] = useState('')
  const toast = useToast()

  const columns: TableColumn<Achievement>[] = [
    { key: 'title', label: 'Title' },
    { key: 'category', label: 'Category', render: (v) => <span className="px-2 py-0.5 rounded-full bg-white/5 text-xs text-gray-400 capitalize">{v}</span> },
    { key: 'date', label: 'Date' },
    { key: 'members', label: 'Members', render: (v) => <span className="text-gray-500">{(v as string[]).length || '—'}</span> },
    { key: 'isHighlighted', label: 'Highlighted', render: (v, row) => (
      <button onClick={(e) => { e.stopPropagation(); toggleHighlight(row.id) }} className={`p-1 rounded transition-all ${v ? 'text-yellow-400' : 'text-gray-600 hover:text-yellow-400'}`}>
        <Star size={16} fill={v ? 'currentColor' : 'none'} />
      </button>
    )},
  ]

  const toggleHighlight = (id: string) => {
    setItems(prev => prev.map(a => a.id === id ? { ...a, isHighlighted: !a.isHighlighted } : a))
  }

  const filtered = filterCat ? items.filter(a => a.category === filterCat) : items

  const openNew = () => { setEditing(null); setForm(EMPTY); setView('form') }
  const openEdit = (a: Achievement) => { setEditing(a); setForm({ ...a }); setView('form') }

  const handleSave = () => {
    if (!form.title || !form.description || !form.date) { toast.error('Please fill required fields'); return }
    if (editing) {
      setItems(prev => prev.map(a => a.id === editing.id ? { ...form, id: editing.id } : a))
      toast.success(`"${form.title}" updated`)
    } else {
      setItems(prev => [...prev, { ...form, id: crypto.randomUUID() }])
      toast.success(`"${form.title}" created`)
    }
    setView('list')
  }

  const handleDelete = () => {
    if (!deleteTarget) return
    setItems(prev => prev.filter(a => a.id !== deleteTarget.id))
    toast.success(`"${deleteTarget.title}" deleted`)
    setDeleteTarget(null)
  }

  const addMember = () => {
    const m = memberInput.trim()
    if (m && !form.members.includes(m)) setForm({ ...form, members: [...form.members, m] })
    setMemberInput('')
  }

  if (view === 'form') {
    return (
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="p-4 md:p-6 pb-24 md:pb-6">
        <button onClick={() => setView('list')} className="flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-6 transition-colors"><ArrowLeft size={16} /> Back</button>
        <h2 className="text-white text-xl mb-6">{editing ? 'Edit Achievement' : 'New Achievement'}</h2>
        <div className="bg-[#12122a] border border-white/5 rounded-xl p-6 max-w-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Title" required><input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className={inputCls} /></FormField>
            <FormField label="Category" required>
              <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className={selectCls}>
                {CATEGORIES.map(c => <option key={c} value={c} className="capitalize">{c}</option>)}
              </select>
            </FormField>
            <FormField label="Date" required><input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} className={inputCls} /></FormField>
            <FormField label="Link"><input value={form.link} onChange={e => setForm({ ...form, link: e.target.value })} className={inputCls} placeholder="https://..." /></FormField>
            <div className="md:col-span-2">
              <FormField label="Description" required charCount={{ current: form.description.length, max: 500 }}>
                <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value.slice(0, 500) })} rows={4} className={textareaCls} />
              </FormField>
            </div>
            <FormField label="Image URL"><input value={form.imageUrl} onChange={e => setForm({ ...form, imageUrl: e.target.value })} className={inputCls} placeholder="https://..." /></FormField>
            <div />
            <div className="md:col-span-2">
              <FormField label="Members">
                <div className="flex flex-wrap gap-2 mb-2">
                  {form.members.map(m => (
                    <span key={m} className="flex items-center gap-1 px-2 py-1 rounded-lg bg-cyan-400/10 text-cyan-400 text-xs">
                      {m}<button onClick={() => setForm({ ...form, members: form.members.filter(x => x !== m) })}><X size={12} /></button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input value={memberInput} onChange={e => setMemberInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addMember())} className={inputCls} placeholder="Add member name..." />
                  <button type="button" onClick={addMember} className="px-3 py-2 rounded-lg bg-white/5 text-gray-400 text-sm hover:bg-white/10 transition-all">Add</button>
                </div>
              </FormField>
            </div>
            <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={form.isHighlighted} onChange={e => setForm({ ...form, isHighlighted: e.target.checked })} className="w-4 h-4 rounded accent-yellow-400" /><span className="text-sm text-gray-300">Highlighted on homepage</span></label>
          </div>
          <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-white/5">
            <button onClick={() => setView('list')} className="px-4 py-2 rounded-lg text-sm text-gray-400 hover:bg-white/5 transition-all">Cancel</button>
            <button onClick={handleSave} className="px-6 py-2 rounded-lg text-sm bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-400 hover:to-blue-500 transition-all">{editing ? 'Update' : 'Create'}</button>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="p-4 md:p-6 pb-24 md:pb-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-white text-xl">Achievements</h2>
        <button onClick={openNew} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm hover:from-cyan-400 hover:to-blue-500 transition-all"><Plus size={16} /> Add Achievement</button>
      </div>
      <DataTable
        data={filtered}
        columns={columns}
        searchPlaceholder="Search achievements..."
        onEdit={openEdit}
        onDelete={setDeleteTarget}
        filterElement={
          <select value={filterCat} onChange={e => setFilterCat(e.target.value)} className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-gray-300 focus:outline-none [&>option]:bg-[#12122a]">
            <option value="">All Categories</option>
            {CATEGORIES.map(c => <option key={c} value={c} className="capitalize">{c}</option>)}
          </select>
        }
      />
      <ConfirmDialog isOpen={!!deleteTarget} title="Delete Achievement" message={`Delete "${deleteTarget?.title}"?`} onConfirm={handleDelete} onCancel={() => setDeleteTarget(null)} />
    </motion.div>
  )
}
