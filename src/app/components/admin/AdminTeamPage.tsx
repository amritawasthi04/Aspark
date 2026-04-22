import { useState } from 'react'
import { motion } from 'motion/react'
import { Plus, ArrowLeft } from 'lucide-react'
import { DataTable, TableColumn } from './DataTable'
import { ConfirmDialog } from './ConfirmDialog'
import { FormField, inputCls, selectCls, textareaCls } from './FormField'
import { useToast } from './ToastProvider'

interface Member {
  id: string; name: string; role: string; department: string; year: string
  bio: string; imageUrl: string; linkedin: string; github: string; instagram: string
  isLead: boolean; isActive: boolean
}

const DEPARTMENTS = ['Technical', 'Design', 'Marketing', 'Management', 'Content', 'Operations']
const YEARS = ['1st Year', '2nd Year', '3rd Year', '4th Year', 'Alumni']

const INITIAL: Member[] = [
  { id: '1', name: 'Arjun Mehta', role: 'President', department: 'Management', year: '3rd Year', bio: 'Leading ASPARK to new heights.', imageUrl: '', linkedin: '', github: '', instagram: '', isLead: true, isActive: true },
  { id: '2', name: 'Priya Sharma', role: 'VP Technical', department: 'Technical', year: '3rd Year', bio: 'Full-stack developer and ML enthusiast.', imageUrl: '', linkedin: '', github: '', instagram: '', isLead: true, isActive: true },
  { id: '3', name: 'Rohan Gupta', role: 'Design Lead', department: 'Design', year: '2nd Year', bio: 'Creating beautiful experiences.', imageUrl: '', linkedin: '', github: '', instagram: '', isLead: true, isActive: true },
  { id: '4', name: 'Ananya Patel', role: 'Marketing Head', department: 'Marketing', year: '2nd Year', bio: 'Spreading the word about ASPARK.', imageUrl: '', linkedin: '', github: '', instagram: '', isLead: true, isActive: true },
  { id: '5', name: 'Vikram Singh', role: 'AI/ML Lead', department: 'Technical', year: '4th Year', bio: 'Deep learning researcher.', imageUrl: '', linkedin: '', github: '', instagram: '', isLead: true, isActive: true },
  { id: '6', name: 'Sneha Reddy', role: 'Content Writer', department: 'Content', year: '1st Year', bio: 'Tech writing and documentation.', imageUrl: '', linkedin: '', github: '', instagram: '', isLead: false, isActive: true },
  { id: '7', name: 'Karan Joshi', role: 'Web Developer', department: 'Technical', year: '2nd Year', bio: 'React & Next.js developer.', imageUrl: '', linkedin: '', github: '', instagram: '', isLead: false, isActive: true },
  { id: '8', name: 'Meera Nair', role: 'Operations Coord', department: 'Operations', year: '3rd Year', bio: 'Logistics and event planning.', imageUrl: '', linkedin: '', github: '', instagram: '', isLead: false, isActive: false },
]

const EMPTY: Omit<Member, 'id'> = { name: '', role: '', department: 'Technical', year: '1st Year', bio: '', imageUrl: '', linkedin: '', github: '', instagram: '', isLead: false, isActive: true }

export function AdminTeamPage() {
  const [members, setMembers] = useState<Member[]>(INITIAL)
  const [view, setView] = useState<'list' | 'form'>('list')
  const [editing, setEditing] = useState<Member | null>(null)
  const [form, setForm] = useState(EMPTY)
  const [deleteTarget, setDeleteTarget] = useState<Member | null>(null)
  const [filterDept, setFilterDept] = useState('')
  const [showActiveOnly, setShowActiveOnly] = useState(false)
  const toast = useToast()

  const columns: TableColumn<Member>[] = [
    { key: 'name', label: 'Name', render: (_, row) => (
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white text-[10px]">{row.name.split(' ').map((n: string) => n[0]).join('')}</div>
        <span>{row.name}</span>
      </div>
    )},
    { key: 'role', label: 'Role' },
    { key: 'department', label: 'Department', render: (v) => <span className="px-2 py-0.5 rounded-full bg-white/5 text-xs text-gray-400">{v}</span> },
    { key: 'year', label: 'Year' },
    { key: 'isLead', label: 'Lead', render: (v) => v ? <span className="text-cyan-400 text-xs">Lead</span> : <span className="text-gray-600 text-xs">—</span> },
    { key: 'isActive', label: 'Active', render: (v) => <span className={`px-2 py-0.5 rounded-full text-xs ${v ? 'bg-green-500/10 text-green-400' : 'bg-gray-500/10 text-gray-500'}`}>{v ? 'Yes' : 'No'}</span> },
  ]

  let filtered = filterDept ? members.filter(m => m.department === filterDept) : members
  if (showActiveOnly) filtered = filtered.filter(m => m.isActive)

  const openNew = () => { setEditing(null); setForm(EMPTY); setView('form') }
  const openEdit = (m: Member) => { setEditing(m); setForm({ ...m }); setView('form') }

  const handleSave = () => {
    if (!form.name || !form.role || !form.department) { toast.error('Please fill required fields'); return }
    if (editing) {
      setMembers(prev => prev.map(m => m.id === editing.id ? { ...form, id: editing.id } : m))
      toast.success(`"${form.name}" updated`)
    } else {
      setMembers(prev => [...prev, { ...form, id: crypto.randomUUID() }])
      toast.success(`"${form.name}" added`)
    }
    setView('list')
  }

  const handleDelete = () => {
    if (!deleteTarget) return
    setMembers(prev => prev.filter(m => m.id !== deleteTarget.id))
    toast.success(`"${deleteTarget.name}" removed`)
    setDeleteTarget(null)
  }

  if (view === 'form') {
    return (
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="p-4 md:p-6 pb-24 md:pb-6">
        <button onClick={() => setView('list')} className="flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-6 transition-colors"><ArrowLeft size={16} /> Back to Team</button>
        <h2 className="text-white text-xl mb-6">{editing ? 'Edit Member' : 'New Member'}</h2>
        <div className="bg-[#12122a] border border-white/5 rounded-xl p-6 max-w-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Name" required><input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className={inputCls} placeholder="Full name" /></FormField>
            <FormField label="Role" required><input value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} className={inputCls} placeholder="e.g. Web Developer" /></FormField>
            <FormField label="Department" required>
              <select value={form.department} onChange={e => setForm({ ...form, department: e.target.value })} className={selectCls}>
                {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </FormField>
            <FormField label="Year" required>
              <select value={form.year} onChange={e => setForm({ ...form, year: e.target.value })} className={selectCls}>
                {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
              </select>
            </FormField>
            <div className="md:col-span-2">
              <FormField label="Bio" charCount={{ current: form.bio.length, max: 300 }}>
                <textarea value={form.bio} onChange={e => setForm({ ...form, bio: e.target.value.slice(0, 300) })} rows={3} className={textareaCls} placeholder="Short bio..." />
              </FormField>
            </div>
            <FormField label="Image URL"><input value={form.imageUrl} onChange={e => setForm({ ...form, imageUrl: e.target.value })} className={inputCls} placeholder="https://..." /></FormField>
            <FormField label="LinkedIn"><input value={form.linkedin} onChange={e => setForm({ ...form, linkedin: e.target.value })} className={inputCls} placeholder="https://linkedin.com/in/..." /></FormField>
            <FormField label="GitHub"><input value={form.github} onChange={e => setForm({ ...form, github: e.target.value })} className={inputCls} placeholder="https://github.com/..." /></FormField>
            <FormField label="Instagram"><input value={form.instagram} onChange={e => setForm({ ...form, instagram: e.target.value })} className={inputCls} placeholder="https://instagram.com/..." /></FormField>
            <div className="md:col-span-2 flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={form.isLead} onChange={e => setForm({ ...form, isLead: e.target.checked })} className="w-4 h-4 rounded accent-cyan-400" /><span className="text-sm text-gray-300">Domain Lead</span></label>
              <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={form.isActive} onChange={e => setForm({ ...form, isActive: e.target.checked })} className="w-4 h-4 rounded accent-cyan-400" /><span className="text-sm text-gray-300">Active</span></label>
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-white/5">
            <button onClick={() => setView('list')} className="px-4 py-2 rounded-lg text-sm text-gray-400 hover:bg-white/5 transition-all">Cancel</button>
            <button onClick={handleSave} className="px-6 py-2 rounded-lg text-sm bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-400 hover:to-blue-500 transition-all">{editing ? 'Update' : 'Add'} Member</button>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="p-4 md:p-6 pb-24 md:pb-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-white text-xl">Team</h2>
        <button onClick={openNew} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm hover:from-cyan-400 hover:to-blue-500 transition-all"><Plus size={16} /> Add Member</button>
      </div>
      <DataTable
        data={filtered}
        columns={columns}
        searchPlaceholder="Search members..."
        onEdit={openEdit}
        onDelete={setDeleteTarget}
        filterElement={
          <div className="flex items-center gap-3">
            <select value={filterDept} onChange={e => setFilterDept(e.target.value)} className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-gray-300 focus:outline-none [&>option]:bg-[#12122a]">
              <option value="">All Departments</option>
              {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
            <label className="flex items-center gap-2 text-xs text-gray-400 cursor-pointer whitespace-nowrap">
              <input type="checkbox" checked={showActiveOnly} onChange={e => setShowActiveOnly(e.target.checked)} className="w-3.5 h-3.5 rounded accent-cyan-400" />
              Active only
            </label>
          </div>
        }
      />
      <ConfirmDialog isOpen={!!deleteTarget} title="Remove Member" message={`Remove "${deleteTarget?.name}" from the team?`} onConfirm={handleDelete} onCancel={() => setDeleteTarget(null)} />
    </motion.div>
  )
}
