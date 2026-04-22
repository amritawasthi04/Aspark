import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { AlertTriangle } from 'lucide-react'

interface ConfirmDialogProps {
  isOpen: boolean
  title: string
  message: string
  confirmLabel?: string
  onConfirm: () => void
  onCancel: () => void
  isDangerous?: boolean
}

export function ConfirmDialog({ isOpen, title, message, confirmLabel = 'Confirm', onConfirm, onCancel, isDangerous }: ConfirmDialogProps) {
  const [typed, setTyped] = useState('')

  useEffect(() => {
    if (!isOpen) setTyped('')
  }, [isOpen])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!isOpen) return
      if (e.key === 'Escape') onCancel()
      if (e.key === 'Enter' && (!isDangerous || typed === 'DELETE')) onConfirm()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isOpen, isDangerous, typed, onConfirm, onCancel])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        >
          <div className="absolute inset-0 bg-black/60" onClick={onCancel} />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="relative bg-[#12122a] border border-white/10 rounded-xl p-6 max-w-sm w-full shadow-2xl"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isDangerous ? 'bg-red-500/10' : 'bg-amber-500/10'}`}>
                <AlertTriangle size={20} className={isDangerous ? 'text-red-400' : 'text-amber-400'} />
              </div>
              <h3 className="text-white">{title}</h3>
            </div>
            <p className="text-gray-400 text-sm mb-4">{message}</p>
            {isDangerous && (
              <div className="mb-4">
                <label className="text-gray-500 text-xs mb-1 block">Type DELETE to confirm</label>
                <input
                  value={typed}
                  onChange={e => setTyped(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-gray-600 focus:border-red-400/50 focus:outline-none"
                  placeholder="DELETE"
                  autoFocus
                />
              </div>
            )}
            <div className="flex justify-end gap-2">
              <button onClick={onCancel} className="px-4 py-2 rounded-lg text-sm text-gray-400 hover:bg-white/5 transition-colors">Cancel</button>
              <button
                onClick={onConfirm}
                disabled={isDangerous && typed !== 'DELETE'}
                className={`px-4 py-2 rounded-lg text-sm text-white transition-all disabled:opacity-40 disabled:pointer-events-none ${
                  isDangerous ? 'bg-red-500 hover:bg-red-600' : 'bg-cyan-500 hover:bg-cyan-600'
                }`}
              >
                {confirmLabel}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
