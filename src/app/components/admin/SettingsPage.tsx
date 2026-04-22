import { useState } from 'react'
import { motion } from 'motion/react'
import { Save, Shield, Palette, Bell, AlertTriangle, Download, Trash2, CheckCircle, XCircle, Activity } from 'lucide-react'
import { useToast } from './ToastProvider'
import { ConfirmDialog } from './ConfirmDialog'

export function SettingsPage() {
  const toast = useToast()

  // Site Info
  const [siteName, setSiteName] = useState('ASPARK SOCIETY')
  const [tagline, setTagline] = useState('Igniting Innovation')
  const [contactEmail, setContactEmail] = useState('contact@aspark.com')
  const [socialLinks, setSocialLinks] = useState({ instagram: '@aspark_society', github: 'aspark-society', linkedin: 'aspark-society', twitter: '@aspark_tech' })

  // Account
  const [currentPass, setCurrentPass] = useState('')
  const [newPass, setNewPass] = useState('')
  const [confirmPass, setConfirmPass] = useState('')

  // Appearance
  const [theme, setTheme] = useState<'dark' | 'light' | 'system'>('dark')
  const [accentColor, setAccentColor] = useState('#4F6EF7')
  const [sidebarDefault, setSidebarDefault] = useState<'expanded' | 'collapsed'>('expanded')

  // Notifications
  const [emailAlerts, setEmailAlerts] = useState({ newContact: true, newMember: false, eventReminder: true, weeklyReport: true })

  // Danger zone
  const [showExportConfirm, setShowExportConfirm] = useState(false)
  const [showClearSessions, setShowClearSessions] = useState(false)

  const ACCENT_PRESETS = ['#4F6EF7', '#22c55e', '#EF9F27', '#E24B4A', '#a855f7', '#06b6d4']

  const HEALTH_ISSUES = [
    { status: 'error' as const, text: '75 empty communities (isolation)' },
    { status: 'error' as const, text: '7 pages disconnected from nav' },
    { status: 'success' as const, text: 'tailwind.config.ts — added' },
    { status: 'success' as const, text: 'breakpoints.ts — added' },
    { status: 'success' as const, text: 'navigation.ts — added' },
    { status: 'success' as const, text: 'useMediaQuery.ts — added' },
  ]

  const saveSiteInfo = () => { toast.success('Site information saved') }

  const changePassword = (e: React.FormEvent) => {
    e.preventDefault()
    if (!currentPass || !newPass || !confirmPass) { toast.error('Fill all password fields'); return }
    if (newPass.length < 8) { toast.error('Password must be at least 8 characters'); return }
    if (newPass !== confirmPass) { toast.error('Passwords do not match'); return }
    toast.success('Password changed successfully')
    setCurrentPass(''); setNewPass(''); setConfirmPass('')
  }

  return (
    <div className="p-4 md:p-6 pb-24 md:pb-6 max-w-3xl space-y-8">
      <div>
        <h1 className="text-white text-2xl">Settings</h1>
        <p className="text-gray-500 text-sm mt-1">Manage your admin panel preferences</p>
      </div>

      {/* Section 1: Site Information */}
      <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-[#12122a] border border-white/5 rounded-xl p-6">
        <h2 className="text-white mb-4 flex items-center gap-2"><Activity size={18} className="text-cyan-400" /> Site Information</h2>
        <div className="space-y-4">
          <Field label="Site Name">
            <input value={siteName} onChange={e => setSiteName(e.target.value)} className="admin-input" />
          </Field>
          <Field label="Tagline">
            <input value={tagline} onChange={e => setTagline(e.target.value)} className="admin-input" />
          </Field>
          <Field label="Contact Email">
            <input value={contactEmail} onChange={e => setContactEmail(e.target.value)} type="email" className="admin-input" />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(socialLinks).map(([key, val]) => (
              <Field key={key} label={key.charAt(0).toUpperCase() + key.slice(1)}>
                <input value={val} onChange={e => setSocialLinks(s => ({ ...s, [key]: e.target.value }))} className="admin-input" />
              </Field>
            ))}
          </div>
          <button onClick={saveSiteInfo} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm hover:from-cyan-400 hover:to-blue-500 transition-all">
            <Save size={14} /> Save Changes
          </button>
        </div>
      </motion.section>

      {/* Section 2: Admin Account */}
      <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-[#12122a] border border-white/5 rounded-xl p-6">
        <h2 className="text-white mb-4 flex items-center gap-2"><Shield size={18} className="text-cyan-400" /> Admin Account</h2>
        <Field label="Email">
          <input value="admin@aspark.com" disabled className="admin-input opacity-50 cursor-not-allowed" />
        </Field>
        <form onSubmit={changePassword} className="space-y-4 mt-4">
          <h3 className="text-gray-300 text-sm">Change Password</h3>
          <Field label="Current Password"><input type="password" value={currentPass} onChange={e => setCurrentPass(e.target.value)} className="admin-input" placeholder="Current password" /></Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="New Password"><input type="password" value={newPass} onChange={e => setNewPass(e.target.value)} className="admin-input" placeholder="Min 8 characters" /></Field>
            <Field label="Confirm Password"><input type="password" value={confirmPass} onChange={e => setConfirmPass(e.target.value)} className="admin-input" placeholder="Repeat password" /></Field>
          </div>
          <button type="submit" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 text-gray-300 text-sm hover:bg-white/10 transition-all border border-white/10">
            Update Password
          </button>
        </form>
      </motion.section>

      {/* Section 3: Appearance */}
      <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-[#12122a] border border-white/5 rounded-xl p-6">
        <h2 className="text-white mb-4 flex items-center gap-2"><Palette size={18} className="text-cyan-400" /> Appearance</h2>
        <div className="space-y-5">
          <Field label="Theme">
            <div className="flex gap-2">
              {(['dark', 'light', 'system'] as const).map(t => (
                <button key={t} onClick={() => { setTheme(t); toast.info(`Theme set to ${t}`) }} className={`px-4 py-2 rounded-lg text-sm capitalize transition-all ${theme === t ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-400/30' : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10'}`}>
                  {t}
                </button>
              ))}
            </div>
          </Field>
          <Field label="Accent Color">
            <div className="flex gap-2">
              {ACCENT_PRESETS.map(c => (
                <button key={c} onClick={() => { setAccentColor(c); toast.info('Accent color updated') }} className={`w-9 h-9 rounded-lg transition-all ${accentColor === c ? 'ring-2 ring-white scale-110' : 'opacity-60 hover:opacity-100'}`} style={{ background: c }} />
              ))}
            </div>
          </Field>
          <Field label="Sidebar Default">
            <div className="flex gap-2">
              {(['expanded', 'collapsed'] as const).map(s => (
                <button key={s} onClick={() => setSidebarDefault(s)} className={`px-4 py-2 rounded-lg text-sm capitalize transition-all ${sidebarDefault === s ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-400/30' : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10'}`}>
                  {s}
                </button>
              ))}
            </div>
          </Field>
        </div>
      </motion.section>

      {/* Section 4: Notifications */}
      <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-[#12122a] border border-white/5 rounded-xl p-6">
        <h2 className="text-white mb-4 flex items-center gap-2"><Bell size={18} className="text-cyan-400" /> Notifications</h2>
        <div className="space-y-3">
          {[
            { key: 'newContact', label: 'New contact form submission' },
            { key: 'newMember', label: 'New member registration' },
            { key: 'eventReminder', label: 'Upcoming event reminders' },
            { key: 'weeklyReport', label: 'Weekly summary report' },
          ].map(item => (
            <label key={item.key} className="flex items-center justify-between py-2 cursor-pointer">
              <span className="text-sm text-gray-300">{item.label}</span>
              <button
                type="button"
                onClick={() => setEmailAlerts(a => ({ ...a, [item.key]: !a[item.key as keyof typeof a] }))}
                className={`w-10 h-5 rounded-full transition-colors relative ${emailAlerts[item.key as keyof typeof emailAlerts] ? 'bg-cyan-500' : 'bg-white/10'}`}
              >
                <div className={`w-4 h-4 rounded-full bg-white absolute top-0.5 transition-transform ${emailAlerts[item.key as keyof typeof emailAlerts] ? 'translate-x-5' : 'translate-x-0.5'}`} />
              </button>
            </label>
          ))}
        </div>
      </motion.section>

      {/* Section 5: Codebase Health */}
      <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="bg-[#12122a] border border-white/5 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white flex items-center gap-2"><Activity size={18} className="text-cyan-400" /> Codebase Health</h2>
          <span className="text-gray-600 text-xs">Last scan: 2026-04-20</span>
        </div>
        <div className="flex flex-wrap gap-3 mb-4">
          {[{ l: 'Nodes', v: '133' }, { l: 'Edges', v: '57' }, { l: 'Communities', v: '82' }, { l: 'Health', v: '38/100' }].map(m => (
            <span key={m.l} className="px-3 py-1.5 rounded-lg bg-white/5 text-xs text-gray-300"><span className="text-gray-500">{m.l}: </span>{m.v}</span>
          ))}
        </div>
        <div className="w-full bg-white/5 rounded-full h-2 mb-4">
          <div className="h-2 rounded-full bg-gradient-to-r from-amber-500 to-amber-400" style={{ width: '38%' }} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
          {HEALTH_ISSUES.map((issue, i) => (
            <div key={i} className="flex items-center gap-2 text-xs">
              {issue.status === 'success' ? <CheckCircle size={14} className="text-green-500 flex-shrink-0" /> : <XCircle size={14} className="text-red-500 flex-shrink-0" />}
              <span className="text-gray-400">{issue.text}</span>
            </div>
          ))}
        </div>
        <button onClick={() => toast.info('Viewing full report...')} className="px-4 py-1.5 rounded-lg border border-cyan-400/20 text-cyan-400 text-xs hover:bg-cyan-400/10 transition-all">
          View full report
        </button>
      </motion.section>

      {/* Section 6: Danger Zone */}
      <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="bg-[#12122a] border border-red-500/20 rounded-xl p-6">
        <h2 className="text-red-400 mb-4 flex items-center gap-2"><AlertTriangle size={18} /> Danger Zone</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-white/5">
            <div>
              <p className="text-sm text-gray-300">Export All Data</p>
              <p className="text-xs text-gray-600">Download all site data as a JSON file</p>
            </div>
            <button onClick={() => {
              const blob = new Blob([JSON.stringify({ exported: new Date().toISOString(), note: 'Mock export data' }, null, 2)], { type: 'application/json' })
              const url = URL.createObjectURL(blob)
              const a = document.createElement('a')
              a.href = url; a.download = 'aspark-export.json'; a.click()
              URL.revokeObjectURL(url)
              toast.success('Data exported successfully')
            }} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 text-gray-300 text-sm hover:bg-white/10 transition-all border border-white/10">
              <Download size={14} /> Export
            </button>
          </div>
          <div className="flex items-center justify-between py-3">
            <div>
              <p className="text-sm text-gray-300">Clear All Sessions</p>
              <p className="text-xs text-gray-600">Log out all active admin sessions</p>
            </div>
            <button onClick={() => setShowClearSessions(true)} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/10 text-red-400 text-sm hover:bg-red-500/20 transition-all border border-red-500/20">
              <Trash2 size={14} /> Clear
            </button>
          </div>
        </div>
      </motion.section>

      <ConfirmDialog isOpen={showClearSessions} title="Clear All Sessions" message="This will log out all active sessions. You will need to sign in again." confirmLabel="Clear Sessions" isDangerous onConfirm={() => { toast.success('All sessions cleared'); setShowClearSessions(false) }} onCancel={() => setShowClearSessions(false)} />

      {/* Shared input styles */}
      <style>{`
        .admin-input {
          width: 100%;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 8px;
          padding: 8px 12px;
          font-size: 14px;
          color: white;
          outline: none;
          transition: border-color 0.2s;
        }
        .admin-input:focus {
          border-color: rgba(34,211,238,0.4);
        }
        .admin-input::placeholder {
          color: #4b5563;
        }
      `}</style>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-gray-400 text-xs mb-1.5 block">{label}</label>
      {children}
    </div>
  )
}
