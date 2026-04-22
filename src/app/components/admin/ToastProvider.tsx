import React, { createContext, useContext, useState, useCallback } from 'react'
import { ToastType } from './types'
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'

interface ToastContextType {
  success: (msg: string) => void
  error: (msg: string) => void
  warning: (msg: string) => void
  info: (msg: string) => void
  dismiss: (id: string) => void
}

const ToastContext = createContext<ToastContextType | null>(null)

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}

const ICONS = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertTriangle,
  info: Info,
}

const COLORS = {
  success: { border: '#22c55e', bg: 'rgba(34,197,94,0.1)' },
  error: { border: '#E24B4A', bg: 'rgba(226,75,74,0.1)' },
  warning: { border: '#EF9F27', bg: 'rgba(239,159,39,0.1)' },
  info: { border: '#4F6EF7', bg: 'rgba(79,110,247,0.1)' },
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastType[]>([])

  const addToast = useCallback((type: ToastType['type'], message: string) => {
    const id = crypto.randomUUID()
    setToasts(prev => {
      const next = [{ id, type, message }, ...prev]
      return next.slice(0, 3)
    })
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, 4000)
  }, [])

  const dismiss = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  const value: ToastContextType = {
    success: (msg) => addToast('success', msg),
    error: (msg) => addToast('error', msg),
    warning: (msg) => addToast('warning', msg),
    info: (msg) => addToast('info', msg),
    dismiss,
  }

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-2 w-80">
        <AnimatePresence>
          {toasts.map(toast => {
            const Icon = ICONS[toast.type]
            const color = COLORS[toast.type]
            return (
              <motion.div
                key={toast.id}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                transition={{ duration: 0.3 }}
                role="status"
                aria-live="polite"
                className="rounded-xl p-4 flex items-start gap-3 shadow-lg"
                style={{
                  background: '#1a1a2e',
                  borderLeft: `3px solid ${color.border}`,
                }}
              >
                <Icon size={18} style={{ color: color.border, flexShrink: 0, marginTop: 2 }} />
                <span className="flex-1 text-sm text-gray-200">{toast.message}</span>
                <button onClick={() => dismiss(toast.id)} className="text-gray-500 hover:text-gray-300 transition-colors">
                  <X size={14} />
                </button>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}
