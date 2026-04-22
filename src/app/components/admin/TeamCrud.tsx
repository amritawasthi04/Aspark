import { useState } from 'react'
import { Plus, Shield } from 'lucide-react'
import { DataTable, Column } from './DataTable'
import { FormModal, FormField, FormInput, FormTextarea, FormSelect, FormToggle } from './FormModal'
import { ConfirmDialog } from './ConfirmDialog'
import { useToast } from './ToastProvider'
import { TeamMember, teamStore, DEPARTMENTS, YEARS } from './crud-data'

const emptyMember = (): Omit<TeamMember, 'id'> => ({
  name: '', role: '', department: '', year: '', bio: '', imageUrl: '',
  linkedin: '', github: '', instagram: '', isLead: false, isActive: true,
})

const columns: Column<TeamMember>[] = [
  { key: 'name', label: 'Name', render: (v, row) => (
    <div className="flex items-center gap-2">
      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-cyan-400/30 to-blue-600/30 flex items-center justify-center text-[10px] text-cyan-300 flex-shrink-0">
        {String(v).split(' ').map(w => w[0]).join('').slice(0, 2)}
      </div>
      <span>{String(v)}</span>
    </div>
  )},
  { key: 'role', label: 'Role' },
  { key: 'department', label: 'Department', render: (v) => <span className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-gray-400">{v}</span> },
  { key: 'year', label: 'Year' },
  { key: 'isLead', label: 'Lead', render: (v) => v ? <Shield size={14} className="text-cyan-400" /> : <span className="text-gray-600">—</span> },
  { key: 'isActive', label: 'Active', render: (v) => (
    <span className={`text-xs px-2 py-0.5 rounded-full ${v ? 'bg-green-500/10 text-green-400' : 'bg-gray-500/10 text-gray-500'}`}>{v ? 'Active' : 'Inactive'}</span>
  )},
]

export function TeamCrud() {
  const toast = useToast()
  const [data, setData] = useState(teamStore.getAll)
  const [form, setForm] = useState<Omit<TeamMember, 'id'>>(emptyMember())
  const [editId, setEditId] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<TeamMember | null>(null)
  const [deptFilter, setDeptFilter] = useState('')
  const [activeOnly, setActiveOnly] = useState(false)

  const refresh = () => setData(teamStore.getAll())
  let filtered = deptFilter ? data.filter(m => m.department === deptFilter) : data
  if (activeOnly) filtered = filtered.filter(m => m.isActive)

  const openNew = () => { setForm(emptyMember()); setEditId(null); setShowForm(true) }
  const openEdit = (row: TeamMember) => { const { id, ...rest } = row; setForm(rest); setEditId(id); setShowForm(true) }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.role || !form.department) { toast.error('Fill required fields'); return }
    if (editId) { teamStore.update(editId, form); toast.success('Member updated') }
    else { teamStore.add(form); toast.success('Member added') }
    setShowForm(false); refresh()
  }

  return (
    <div className="p-4 md:p-6 pb-24 md:pb-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-white text-2xl">Team</h1>
          <p className="text-gray-500 text-sm mt-1">{data.length} members</p>
        </div>
        <button onClick={openNew} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm hover:from-cyan-400 hover:to-blue-500 transition-all">
          <Plus size={16} /> Add Member
        </button>
      </div>

      <DataTable
        data={filtered}
        columns={columns}
        searchPlaceholder="Search members..."
        onEdit={openEdit}
        onDelete={(row) => setDeleteTarget(row)}
        filterElement={
          <div className="flex items-center gap-3">
            <select value={deptFilter} onChange={e => setDeptFilter(e.target.value)} className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-gray-300 focus:border-cyan-400/50 focus:outline-none appearance-none">
              <option value="" className="bg-[#0f0f23]">All Departments</option>
              {DEPARTMENTS.map(d => <option key={d} value={d} className="bg-[#0f0f23]">{d}</option>)}
            </select>
            <label className="flex items-center gap-2 cursor-pointer text-xs text-gray-400">
              <input type="checkbox" checked={activeOnly} onChange={e => setActiveOnly(e.target.checked)} className="accent-cyan-400" />
              Active only
            </label>
          </div>
        }
      />

      <FormModal isOpen={showForm} title={editId ? 'Edit Member' : 'New Member'} onClose={() => setShowForm(false)} onSubmit={handleSubmit}>
        <FormField label="Name *"><FormInput value={form.name} onChange={v => setForm(f => ({ ...f, name: v }))} placeholder="Full name" /></FormField>
        <FormField label="Role *"><FormInput value={form.role} onChange={v => setForm(f => ({ ...f, role: v }))} placeholder="e.g. Technical Lead" /></FormField>
        <div className="grid grid-cols-2 gap-3">
          <FormField label="Department *"><FormSelect value={form.department} onChange={v => setForm(f => ({ ...f, department: v }))} options={DEPARTMENTS} placeholder="Select..." /></FormField>
          <FormField label="Year"><FormSelect value={form.year} onChange={v => setForm(f => ({ ...f, year: v }))} options={YEARS} placeholder="Select..." /></FormField>
        </div>
        <FormField label="Bio"><FormTextarea value={form.bio} onChange={v => setForm(f => ({ ...f, bio: v }))} maxLength={300} placeholder="Short bio..." /></FormField>
        <FormField label="Image URL"><FormInput value={form.imageUrl} onChange={v => setForm(f => ({ ...f, imageUrl: v }))} placeholder="https://..." /></FormField>
        <FormField label="LinkedIn"><FormInput value={form.linkedin} onChange={v => setForm(f => ({ ...f, linkedin: v }))} placeholder="https://linkedin.com/in/..." /></FormField>
        <div className="grid grid-cols-2 gap-3">
          <FormField label="GitHub"><FormInput value={form.github} onChange={v => setForm(f => ({ ...f, github: v }))} placeholder="https://github.com/..." /></FormField>
          <FormField label="Instagram"><FormInput value={form.instagram} onChange={v => setForm(f => ({ ...f, instagram: v }))} placeholder="@handle" /></FormField>
        </div>
        <div className="flex gap-6">
          <FormToggle checked={form.isLead} onChange={v => setForm(f => ({ ...f, isLead: v }))} label="Team Lead" />
          <FormToggle checked={form.isActive} onChange={v => setForm(f => ({ ...f, isActive: v }))} label="Active" />
        </div>
      </FormModal>

      <ConfirmDialog isOpen={!!deleteTarget} title="Delete Member" message={`Remove "${deleteTarget?.name}" from the team?`} confirmLabel="Delete" isDangerous onConfirm={() => { if (deleteTarget) { teamStore.remove(deleteTarget.id); toast.success('Member removed'); setDeleteTarget(null); refresh() } }} onCancel={() => setDeleteTarget(null)} />
    </div>
  )
}
