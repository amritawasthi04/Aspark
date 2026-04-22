import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { Mail, Lock, Eye, EyeOff, Zap, ArrowRight } from 'lucide-react'

interface AdminLoginPageProps {
  onLogin: () => void
}

export function AdminLoginPage({ onLogin }: AdminLoginPageProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [particles] = useState(() =>
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 15 + 10,
      delay: Math.random() * 5,
    }))
  )

  const validateEmail = (v: string) => {
    if (!v) return 'Email is required'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return 'Invalid email format'
    return ''
  }

  const validatePassword = (v: string) => {
    if (!v) return 'Password is required'
    if (v.length < 8) return 'Must be at least 8 characters'
    return ''
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const eErr = validateEmail(email)
    const pErr = validatePassword(password)
    setEmailError(eErr)
    setPasswordError(pErr)
    if (eErr || pErr) return

    setLoading(true)
    setError('')

    // Simulated login - accepts any valid format
    await new Promise(r => setTimeout(r, 1200))

    if (email === 'admin@aspark.com' && password === 'aspark2026') {
      onLogin()
    } else {
      setError('Invalid credentials. Try admin@aspark.com / aspark2026')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex bg-[#0a0a0a]">
      {/* Left Panel */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="hidden lg:flex flex-1 flex-col items-center justify-center relative overflow-hidden"
      >
        {/* Particles */}
        {particles.map(p => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-cyan-400/30"
            style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}

        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'linear-gradient(rgba(0,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,255,0.3) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center mb-8 shadow-lg shadow-cyan-500/20">
            <Zap size={36} className="text-white" />
          </div>
          <h1 className="text-white text-4xl tracking-[0.3em] mb-2">ASPARK</h1>
          <h2 className="text-white text-lg tracking-[0.2em] mb-1">SOCIETY</h2>
          <p className="text-cyan-400/70 text-sm tracking-widest mt-4 mb-10">Admin Control Center</p>
          <div className="flex flex-wrap gap-3 justify-center max-w-xs">
            {['Manage Events', 'Control Content', 'Monitor Health', 'Track Growth'].map(pill => (
              <span key={pill} className="px-4 py-1.5 rounded-full border border-cyan-400/20 text-cyan-400/60 text-xs tracking-wider">
                {pill}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Right Panel */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="flex-1 flex items-center justify-center p-6"
        style={{ background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 100%)' }}
      >
        <div className="w-full max-w-sm">
          <div className="lg:hidden flex items-center gap-3 mb-10 justify-center">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
              <Zap size={20} className="text-white" />
            </div>
            <span className="text-white tracking-[0.2em]">ASPARK</span>
          </div>

          <h2 className="text-white text-2xl mb-1">Welcome back</h2>
          <p className="text-gray-500 text-sm mb-8">Sign in to your admin account</p>

          {error && (
            <motion.div
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: [0, -6, 6, -4, 4, 0] }}
              transition={{ duration: 0.4 }}
              className="mb-6 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {[
              { label: 'Email', value: email, onChange: setEmail, type: 'email', icon: Mail, error: emailError, onBlur: () => setEmailError(validateEmail(email)), placeholder: 'admin@aspark.com' },
              { label: 'Password', value: password, onChange: setPassword, type: showPassword ? 'text' : 'password', icon: Lock, error: passwordError, onBlur: () => setPasswordError(validatePassword(password)), placeholder: 'Enter password' },
            ].map((field, i) => (
              <motion.div
                key={field.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.08 }}
              >
                <label className="text-gray-400 text-xs mb-1.5 block">{field.label}</label>
                <div className="relative">
                  <field.icon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    type={field.type}
                    value={field.value}
                    onChange={e => field.onChange(e.target.value)}
                    onBlur={field.onBlur}
                    placeholder={field.placeholder}
                    className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-10 py-2.5 text-white text-sm placeholder:text-gray-600 focus:border-cyan-400/50 focus:outline-none transition-colors"
                  />
                  {field.label === 'Password' && (
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300">
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  )}
                </div>
                {field.error && <p className="text-red-400 text-xs mt-1">{field.error}</p>}
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.36 }}
              className="flex items-center gap-2"
            >
              <input type="checkbox" id="remember" className="w-3.5 h-3.5 rounded border-white/20 bg-white/5 accent-cyan-400" />
              <label htmlFor="remember" className="text-gray-500 text-xs cursor-pointer">Remember me</label>
            </motion.div>

            <motion.button
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.44 }}
              whileActive={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm flex items-center justify-center gap-2 hover:from-cyan-400 hover:to-blue-500 transition-all disabled:opacity-50 disabled:pointer-events-none"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>Sign In <ArrowRight size={16} /></>
              )}
            </motion.button>
          </form>

          <p className="text-gray-600 text-xs text-center mt-8">
            Hint: admin@aspark.com / aspark2026
          </p>
        </div>
      </motion.div>
    </div>
  )
}
