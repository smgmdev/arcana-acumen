'use client'
import { useRouter } from 'next/navigation'

export default function LogoutButton() {
  const router = useRouter()

  async function handleLogout() {
    await fetch('/api/logout', { method: 'POST' })
    router.refresh()
  }

  return (
    <button
      onClick={handleLogout}
      className="logout-btn"
      style={{
        position: 'fixed',
        top: '1.5rem',
        right: '1.8rem',
        zIndex: 10,
        background: 'transparent',
        border: '1px solid rgba(255,255,255,0.2)',
        color: 'rgba(255,255,255,0.4)',
        fontFamily: 'Arial,sans-serif',
        fontSize: '0.58rem',
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        padding: '5px 14px',
        borderRadius: '2px',
        cursor: 'pointer',
        transition: 'color .15s, border-color .15s',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLButtonElement).style.color = '#fff'
        ;(e.currentTarget as HTMLButtonElement).style.borderColor = '#fff'
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.4)'
        ;(e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.2)'
      }}
    >
      Logout
    </button>
  )
}
