import { useState } from 'react'
import { motion } from 'motion/react'
import { Plus, Pencil, Trash2, Users } from 'lucide-react'
import { FormModal, FormField, FormInput, FormTextarea, FormToggle } from './FormModal'
import { ConfirmDialog } from './ConfirmDialog'
import { useToast } from './ToastProvider'
import { DomainItem, domainsStore, DOMAIN_COLORS } from './crud-data'

const emptyDomain = (): Omit<DomainItem, 'id'> => ({
  name: '', slug: '', icon: '🔧', shortDescription: '', fullDescription: '',
  color: '#4F6EF7', techStack: [], isActive: true, memberCount: 0,
})

export function DomainsCrud() {
  const toast = useToast()
  const [data, setData] = useState(domainsStore.getAll)
  const [form, setForm] = useState<Omit<DomainItem, 'id'>>(emptyDomain())
  const [editId, setEditId] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<DomainItem | null>(null)
  const [techInput, setTechInput] = useState('')
  const [search, setSearch] = useState('')

  const refresh = () => setData(domainsStore.getAll())
  const filtered = search ? data.filter(d => d.name.toLowerCase().includes(search.toLowerCase())) : data

  const openNew = () => { setForm(emptyDomain()); setEditId(null); setTechInput(''); setShowForm(true) }
  const openEdit = (d: DomainItem) => { const { id, ...rest } = d; setForm(rest); setEditId(id); setTechInput(''); setShowForm(true) }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.shortDescription) { toast.error('Fill required fields'); return }
    const slug = form.slug || form.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
    if (editId) { domainsStore.update(editId, { ...form, slug }); toast.success('Domain updated') }
    else { domainsStore.add({ ...form, slug }); toast.success('Domain created') }
    setShowForm(false); refresh()
  }

  const addTech = () => {
    if (techInput.trim() && !form.techStack.includes(techInput.trim())) {
      setForm(f => ({ ...f, techStack: [...f.techStack, techInput.trim()] }))
      setTechInput('')
    }
  }

  return (
    <div className="p-4 md:p-6 pb-24 md:pb-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-white text-2xl">Domains</h1>
          <p className="text-gray-500 text-sm mt-1">{data.length} domains</p>
        </div>
        <button onClick={openNew} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm hover:from-cyan-400 hover:to-blue-500 transition-all">
          <Plus size={16} /> Add Domain
        </button>
      </div>

      <div className="relative max-w-xs mb-4">
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search domains..." className="w-full bg-white/5 border border-white/10 rounded-lg pl-3 pr-3 py-2 text-sm text-white placeholder:text-gray-600 focus:border-cyan-400/50 focus:outline-none" />
      </div>

      {/* Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((domain, i) => (
          <motion.div
            key={domain.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-[#12122a] border border-white/5 rounded-xl p-5 hover:border-white/10 transition-all group relative"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{domain.icon}</span>
                <div>
                  <h3 className="text-white text-sm">{domain.name}</h3>
                  <p className="text-gray-600 text-xs">/{domain.slug}</p>
                </div>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full ${domain.isActive ? 'bg-green-500/10 text-green-400' : 'bg-gray-500/10 text-gray-500'}`}>
                {domain.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>
            <p className="text-gray-400 text-xs mb-3 line-clamp-2">{domain.shortDescription}</p>
            <div className="flex items-center gap-1.5 mb-3">
              <Users size={12} className="text-gray-500" />
              <span className="text-gray-500 text-xs">{domain.memberCount} members</span>
            </div>
            <div className="flex flex-wrap gap-1 mb-3">
              {domain.techStack.map(t => (
                <span key={t} className="text-[10px] px-2 py-0.5 rounded-full border border-white/10 text-gray-400">{t}</span>
              ))}
            </div>
            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity absolute top-4 right-4">
              <button onClick={() => openEdit(domain)} className="p-1.5 rounded-lg text-gray-500 hover:text-cyan-400 hover:bg-cyan-400/10 transition-all"><Pencil size={13} /></button>
              <button onClick={() => setDeleteTarget(domain)} className="p-1.5 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-400/10 transition-all"><Trash2 size={13} /></button>
            </div>
            <div className="h-0.5 rounded-full mt-2" style={{ background: domain.color, opacity: 0.5 }} />
          </motion.div>
        ))}
      </div>

      <FormModal isOpen={showForm} title={editId ? 'Edit Domain' : 'New Domain'} onClose={() => setShowForm(false)} onSubmit={handleSubmit}>
        <FormField label="Name *"><FormInput value={form.name} onChange={v => setForm(f => ({ ...f, name: v }))} placeholder="Domain name" /></FormField>
        <div className="grid grid-cols-2 gap-3">
          <FormField label="Slug"><FormInput value={form.slug} onChange={v => setForm(f => ({ ...f, slug: v }))} placeholder="auto-generated" /></FormField>
          <FormField label="Icon (emoji)"><FormInput value={form.icon} onChange={v => setForm(f => ({ ...f, icon: v }))} placeholder="🔧" /></FormField>
        </div>
        <FormField label="Short Description *"><FormTextarea value={form.shortDescription} onChange={v => setForm(f => ({ ...f, shortDescription: v }))} maxLength={150} placeholder="Brief description..." /></FormField>
        <FormField label="Full Description"><FormTextarea value={form.fullDescription} onChange={v => setForm(f => ({ ...f, fullDescription: v }))} maxLength={1000} placeholder="Detailed description..." /></FormField>
        <FormField label="Color">
          <div className="flex gap-2">
            {DOMAIN_COLORS.map(c => (
              <button key={c} type="button" onClick={() => setForm(f => ({ ...f, color: c }))} className={`w-8 h-8 rounded-lg transition-all ${form.color === c ? 'ring-2 ring-white scale-110' : 'opacity-60 hover:opacity-100'}`} style={{ background: c }} />
            ))}
          </div>
        </FormField>
        <FormField label="Tech Stack">
          <div className="flex gap-2">
            <input value={techInput} onChange={e => setTechInput(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addTech() } }} placeholder="Add technology..." className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-gray-600 focus:border-cyan-400/50 focus:outline-none" />
            <button type="button" onClick={addTech} className="px-3 py-2 rounded-lg bg-white/5 text-gray-400 hover:text-white text-sm transition-colors">Add</button>
          </div>
          <div className="flex flex-wrap gap-1 mt-2">
            {form.techStack.map(t => (
              <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-cyan-400/10 text-cyan-400 flex items-center gap-1">
                {t}
                <button type="button" onClick={() => setForm(f => ({ ...f, techStack: f.techStack.filter(x => x !== t) }))} className="hover:text-white">&times;</button>
              </span>
            ))}
          </div>
        </FormField>
        <FormToggle checked={form.isActive} onChange={v => setForm(f => ({ ...f, isActive: v }))} label="Active" />
      </FormModal>

      <ConfirmDialog isOpen={!!deleteTarget} title="Delete Domain" message={`Delete "${deleteTarget?.name}"?`} confirmLabel="Delete" isDangerous onConfirm={() => { if (deleteTarget) { domainsStore.remove(deleteTarget.id); toast.success('Domain deleted'); setDeleteTarget(null); refresh() } }} onCancel={() => setDeleteTarget(null)} />
    </div>
  )
}
