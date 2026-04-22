import { useState } from 'react'
import { motion } from 'motion/react'
import { Plus, ArrowLeft, Pencil, Trash2, X } from 'lucide-react'
import { ConfirmDialog } from './ConfirmDialog'
import { FormField, inputCls, selectCls, textareaCls } from './FormField'
import { useToast } from './ToastProvider'

interface Domain {
  id: string; name: string; slug: string; icon: string; shortDescription: string
  fullDescription: string; color: string; techStack: string[]; isActive: boolean; memberCount: number
}

const COLORS = ['#4F6EF7', '#22c55e', '#EF9F27', '#E24B4A', '#a855f7', '#06b6d4']
const ICONS = ['🤖', '🌐', '🔒', '📡', '🎨', '⚙️', '📱', '🧬']

const INITIAL: Domain[] = [
  { id: '1', name: 'AI/ML', slug: 'ai-ml', icon: '🤖', shortDescription: 'Artificial Intelligence & Machine Learning', fullDescription: 'Research and projects in deep learning, NLP, and computer vision.', color: '#4F6EF7', techStack: ['Python', 'TensorFlow', 'PyTorch'], isActive: true, memberCount: 12 },
  { id: '2', name: 'Web Development', slug: 'web-dev', icon: '🌐', shortDescription: 'Full-stack web applications', fullDescription: 'Building modern web apps with React, Next.js, and Node.js.', color: '#22c55e', techStack: ['React', 'Next.js', 'TypeScript'], isActive: true, memberCount: 8 },
  { id: '3', name: 'Cybersecurity', slug: 'cybersecurity', icon: '🔒', shortDescription: 'Security research and CTF', fullDescription: 'Ethical hacking, vulnerability research, and security audits.', color: '#EF9F27', techStack: ['Kali Linux', 'Wireshark', 'Burp Suite'], isActive: true, memberCount: 6 },
  { id: '4', name: 'IoT', slug: 'iot', icon: '📡', shortDescription: 'Internet of Things projects', fullDescription: 'Hardware and software for connected devices.', color: '#E24B4A', techStack: ['Arduino', 'Raspberry Pi', 'MQTT'], isActive: true, memberCount: 4 },
  { id: '5', name: 'Design', slug: 'design', icon: '🎨', shortDescription: 'UI/UX and graphic design', fullDescription: 'User-centered design, prototyping, and visual identity.', color: '#a855f7', techStack: ['Figma', 'Photoshop', 'Illustrator'], isActive: true, memberCount: 5 },
  { id: '6', name: 'Robotics', slug: 'robotics', icon: '⚙️', shortDescription: 'Autonomous systems and robots', fullDescription: 'Building and programming autonomous robots for competitions.', color: '#06b6d4', techStack: ['ROS', 'C++', 'OpenCV'], isActive: false, memberCount: 3 },
]

const EMPTY: Omit<Domain, 'id'> = { name: '', slug: '', icon: '🤖', shortDescription: '', fullDescription: '', color: '#4F6EF7', techStack: [], isActive: true, memberCount: 0 }

export function AdminDomainsPage() {
  const [domains, setDomains] = useState<Domain[]>(INITIAL)
  const [view, setView] = useState<'list' | 'form'>('list')
  const [editing, setEditing] = useState<Domain | null>(null)
  const [form, setForm] = useState(EMPTY)
  const [deleteTarget, setDeleteTarget] = useState<Domain | null>(null)
  const [search, setSearch] = useState('')
  const [tagInput, setTagInput] = useState('')
  const toast = useToast()

  const filtered = search
    ? domains.filter(d => d.name.toLowerCase().includes(search.toLowerCase()) || d.slug.toLowerCase().includes(search.toLowerCase()))
    : domains

  const openNew = () => { setEditing(null); setForm(EMPTY); setView('form') }
  const openEdit = (d: Domain) => { setEditing(d); setForm({ ...d }); setView('form') }

  const handleSave = () => {
    if (!form.name || !form.shortDescription) { toast.error('Please fill required fields'); return }
    const slug = form.slug || form.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    if (editing) {
      setDomains(prev => prev.map(d => d.id === editing.id ? { ...form, id: editing.id, slug } : d))
      toast.success(`"${form.name}" updated`)
    } else {
      setDomains(prev => [...prev, { ...form, id: crypto.randomUUID(), slug }])
      toast.success(`"${form.name}" created`)
    }
    setView('list')
  }

  const handleDelete = () => {
    if (!deleteTarget) return
    setDomains(prev => prev.filter(d => d.id !== deleteTarget.id))
    toast.success(`"${deleteTarget.name}" deleted`)
    setDeleteTarget(null)
  }

  const addTag = () => {
    const tag = tagInput.trim()
    if (tag && !form.techStack.includes(tag)) {
      setForm({ ...form, techStack: [...form.techStack, tag] })
    }
    setTagInput('')
  }

  if (view === 'form') {
    return (
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="p-4 md:p-6 pb-24 md:pb-6">
        <button onClick={() => setView('list')} className="flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-6 transition-colors"><ArrowLeft size={16} /> Back to Domains</button>
        <h2 className="text-white text-xl mb-6">{editing ? 'Edit Domain' : 'New Domain'}</h2>
        <div className="bg-[#12122a] border border-white/5 rounded-xl p-6 max-w-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Name" required>
              <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className={inputCls} placeholder="Domain name" />
            </FormField>
            <FormField label="Slug">
              <input value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} className={inputCls} placeholder="auto-generated" />
            </FormField>
            <FormField label="Icon">
              <div className="flex flex-wrap gap-2">
                {ICONS.map(icon => (
                  <button key={icon} onClick={() => setForm({ ...form, icon })} className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg transition-all ${form.icon === icon ? 'bg-cyan-500/20 border border-cyan-400/50' : 'bg-white/5 border border-white/10 hover:bg-white/10'}`}>{icon}</button>
                ))}
              </div>
            </FormField>
            <FormField label="Color">
              <div className="flex flex-wrap gap-2">
                {COLORS.map(c => (
                  <button key={c} onClick={() => setForm({ ...form, color: c })} className={`w-8 h-8 rounded-full transition-all ${form.color === c ? 'ring-2 ring-white ring-offset-2 ring-offset-[#12122a]' : ''}`} style={{ background: c }} />
                ))}
              </div>
            </FormField>
            <div className="md:col-span-2">
              <FormField label="Short Description" required charCount={{ current: form.shortDescription.length, max: 150 }}>
                <textarea value={form.shortDescription} onChange={e => setForm({ ...form, shortDescription: e.target.value.slice(0, 150) })} rows={2} className={textareaCls} />
              </FormField>
            </div>
            <div className="md:col-span-2">
              <FormField label="Full Description" charCount={{ current: form.fullDescription.length, max: 1000 }}>
                <textarea value={form.fullDescription} onChange={e => setForm({ ...form, fullDescription: e.target.value.slice(0, 1000) })} rows={4} className={textareaCls} />
              </FormField>
            </div>
            <div className="md:col-span-2">
              <FormField label="Tech Stack">
                <div className="flex flex-wrap gap-2 mb-2">
                  {form.techStack.map(tag => (
                    <span key={tag} className="flex items-center gap-1 px-2 py-1 rounded-lg bg-cyan-400/10 text-cyan-400 text-xs">
                      {tag}
                      <button onClick={() => setForm({ ...form, techStack: form.techStack.filter(t => t !== tag) })}><X size={12} /></button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input value={tagInput} onChange={e => setTagInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTag())} className={inputCls} placeholder="Add technology..." />
                  <button type="button" onClick={addTag} className="px-3 py-2 rounded-lg bg-white/5 text-gray-400 text-sm hover:bg-white/10 transition-all">Add</button>
                </div>
              </FormField>
            </div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.isActive} onChange={e => setForm({ ...form, isActive: e.target.checked })} className="w-4 h-4 rounded accent-cyan-400" />
              <span className="text-sm text-gray-300">Active</span>
            </label>
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
        <h2 className="text-white text-xl">Domains</h2>
        <button onClick={openNew} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm hover:from-cyan-400 hover:to-blue-500 transition-all"><Plus size={16} /> Add Domain</button>
      </div>
      <div className="mb-4">
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search domains..." className={`${inputCls} max-w-sm`} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(d => (
          <div key={d.id} className="bg-[#12122a] border border-white/5 rounded-xl p-5 hover:border-white/10 transition-all group relative">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center text-xl" style={{ background: `${d.color}15` }}>{d.icon}</div>
                <div>
                  <h3 className="text-white text-sm">{d.name}</h3>
                  <p className="text-gray-600 text-[11px]">/{d.slug}</p>
                </div>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-[10px] ${d.isActive ? 'bg-green-500/10 text-green-400' : 'bg-gray-500/10 text-gray-500'}`}>{d.isActive ? 'Active' : 'Inactive'}</span>
            </div>
            <p className="text-gray-400 text-xs mb-3 line-clamp-2">{d.shortDescription}</p>
            <div className="flex items-center justify-between">
              <span className="text-gray-500 text-xs">{d.memberCount} members</span>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => openEdit(d)} className="p-1.5 rounded-lg text-gray-500 hover:text-cyan-400 hover:bg-cyan-400/10 transition-all"><Pencil size={13} /></button>
                <button onClick={() => setDeleteTarget(d)} className="p-1.5 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-all"><Trash2 size={13} /></button>
              </div>
            </div>
            <div className="flex flex-wrap gap-1 mt-3">
              {d.techStack.slice(0, 3).map(t => <span key={t} className="px-2 py-0.5 rounded-full bg-white/5 text-[10px] text-gray-500">{t}</span>)}
            </div>
          </div>
        ))}
      </div>
      <ConfirmDialog isOpen={!!deleteTarget} title="Delete Domain" message={`Delete "${deleteTarget?.name}"? This cannot be undone.`} onConfirm={handleDelete} onCancel={() => setDeleteTarget(null)} />
    </motion.div>
  )
}
