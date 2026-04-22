import React from 'react'

interface FormFieldProps {
  label: string
  required?: boolean
  children: React.ReactNode
  error?: string
  charCount?: { current: number; max: number }
}

export function FormField({ label, required, children, error, charCount }: FormFieldProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <label className="text-gray-400 text-xs">
          {label}{required && <span className="text-red-400 ml-0.5">*</span>}
        </label>
        {charCount && (
          <span className={`text-[10px] ${charCount.current > charCount.max ? 'text-red-400' : 'text-gray-600'}`}>
            {charCount.current}/{charCount.max}
          </span>
        )}
      </div>
      {children}
      {error && <p className="text-red-400 text-[11px] mt-1">{error}</p>}
    </div>
  )
}

export const inputCls = "w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-gray-600 focus:border-cyan-400/50 focus:outline-none transition-colors"
export const selectCls = "w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-cyan-400/50 focus:outline-none transition-colors appearance-none [&>option]:bg-[#12122a]"
export const textareaCls = "w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-gray-600 focus:border-cyan-400/50 focus:outline-none transition-colors resize-none"
