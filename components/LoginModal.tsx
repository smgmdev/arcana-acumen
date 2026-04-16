'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function LoginModal() {
  const router = useRouter()
  const [pw, setPw] = useState('')
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit() {
    if (!pw || loading) return
    setLoading(true)
    setError(false)
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: pw.trim().toLowerCase() }),
      })
      if (res.ok) {
        router.refresh()
      } else {
        setError(true)
        setPw('')
      }
    } catch {
      setError(true)
      setPw('')
    } finally {
      setLoading(false)
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') handleSubmit()
  }

  return (
    <div className="auth-overlay active">
      <div className="auth-box">
        <div className="auth-heading">Log into Arcana Government Services</div>
        <div className="auth-sub">You will need your access code to log in.</div>
        <div className="auth-input-wrap">
          <Image
            className="auth-input-icon"
            src="/favicon.png"
            alt=""
            width={18}
            height={18}
            style={{ height: 18, width: 'auto', opacity: 0.5, filter: 'brightness(0) invert(1)' }}
          />
          <input
            className="auth-input"
            type="password"
            placeholder="Enter access code"
            autoComplete="off"
            spellCheck={false}
            value={pw}
            onChange={e => setPw(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
          />
        </div>
        <div className={`auth-err${error ? ' visible' : ''}`}>Invalid access code</div>
        <button
          className="auth-submit"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? 'Verifying…' : 'Login'}
        </button>
      </div>
    </div>
  )
}
