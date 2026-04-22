import { motion, AnimatePresence } from 'motion/react'
import { X } from 'lucide-react'

interface FormModalProps {
  isOpen: boolean
  title: string
  onClose: () => void
  onSubmit: (e: React.FormEvent) => void
  children: React.ReactNode
  submitLabel?: string
}

export function FormModal({ isOpen, title, onClose, onSubmit, children, submitLabel = 'Save' }: FormModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[90] flex items-start justify-center p-4 pt-16 overflow-y-auto">
          <div className="absolute inset-0 bg-black/60" onClick={onClose} />
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.25 }}
            className="relative bg-[#0f0f23] border border-white/10 rounded-xl w-full max-w-lg shadow-2xl mb-16"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
              <h2 className="text-white">{title}</h2>
              <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors p-1" aria-label="Close"><X size={18} /></button>
            </div>
            <form onSubmit={onSubmit}>
              <div className="px-6 py-5 space-y-4 max-h-[60vh] overflow-y-auto">{children}</div>
              <div className="flex justify-end gap-2 px-6 py-4 border-t border-white/5">
                <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg text-sm text-gray-400 hover:bg-white/5 transition-colors">Cancel</button>
                <button type="submit" className="px-5 py-2 rounded-lg text-sm text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 transition-all">{submitLabel}</button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Shared form field components
export function FormField({ label, children, error }: { label: string; children: React.ReactNode; error?: string }) {
  return (
    <div>
      <label className="text-gray-400 text-xs mb-1.5 block">{label}</label>
      {children}
      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </div>
  )
}

export function FormInput({ value, onChange, placeholder, type = 'text', ...props }: React.InputHTMLAttributes<HTMLInputElement> & { value: string; onChange: (val: string) => void }) {
  return (
    <input
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-gray-600 focus:border-cyan-400/50 focus:outline-none transition-colors"
      {...props}
    />
  )
}

export function FormTextarea({ value, onChange, placeholder, maxLength }: { value: string; onChange: (val: string) => void; placeholder?: string; maxLength?: number }) {
  return (
    <div>
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        rows={3}
        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-gray-600 focus:border-cyan-400/50 focus:outline-none transition-colors resize-none"
      />
      {maxLength && <p className="text-gray-600 text-xs text-right mt-0.5">{value.length}/{maxLength}</p>}
    </div>
  )
}

export function FormSelect({ value, onChange, options, placeholder }: { value: string; onChange: (val: string) => void; options: string[]; placeholder?: string }) {
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-cyan-400/50 focus:outline-none transition-colors appearance-none"
    >
      {placeholder && <option value="" className="bg-[#0f0f23]">{placeholder}</option>}
      {options.map(o => <option key={o} value={o} className="bg-[#0f0f23]">{o}</option>)}
    </select>
  )
}

export function FormToggle({ checked, onChange, label }: { checked: boolean; onChange: (val: boolean) => void; label: string }) {
  return (
    <label className="flex items-center gap-3 cursor-pointer">
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`w-10 h-5 rounded-full transition-colors relative ${checked ? 'bg-cyan-500' : 'bg-white/10'}`}
      >
        <div className={`w-4 h-4 rounded-full bg-white absolute top-0.5 transition-transform ${checked ? 'translate-x-5' : 'translate-x-0.5'}`} />
      </button>
      <span className="text-sm text-gray-300">{label}</span>
    </label>
  )
}
