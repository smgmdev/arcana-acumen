import { getIronSession } from 'iron-session'
import { cookies } from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'
import { sessionOptions, SessionData } from '@/lib/auth'
import LoginModal from '@/components/LoginModal'

export default async function HomePage() {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions)
  const isLoggedIn = !!session.user

  return (
    <>
      {/* Animated scan line */}
      <div id="scan" />

      {/* Top-left branding */}
      <div className="main-title">
        <Image
          src="/favicon.png"
          alt="Arcana"
          width={32}
          height={32}
          style={{
            height: 32,
            width: 'auto',
            filter: 'brightness(0) invert(1)',
            opacity: 0.4,
          }}
        />
        <span
          className="main-sub"
          style={{
            fontSize: '1.6rem',
            fontWeight: 700,
            color: 'rgba(255,255,255,0.4)',
            alignSelf: 'flex-end',
            paddingBottom: '0.15rem',
          }}
        >
          Government Services
        </span>
      </div>

      {/* Main content */}
      <div id="page">
        {isLoggedIn && (
          <div style={{
            position: 'fixed',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
            zIndex: 0,
          }}>
            <span style={{
              fontSize: 'clamp(12rem, 30vw, 22rem)',
              fontWeight: 900,
              color: 'rgba(255,255,255,0.03)',
              letterSpacing: '-0.05em',
              lineHeight: 1,
              userSelect: 'none',
            }}>GOV</span>
          </div>
        )}
        <div className="btn-row" style={{ marginTop: '2.4rem', position: 'relative', zIndex: 1 }}>
          {isLoggedIn ? (
            <>
              <Link href="/orbital" className="btn">
                <div className="btn-tag">Module 01</div>
                <div className="btn-name">
                  Arcana Mace
                  <br />+ Empower
                </div>
                <div className="btn-sub">AIR ORB MAX</div>
              </Link>
              <Link href="/ground-max" className="btn">
                <div className="btn-tag">Module 02</div>
                <div className="btn-name">
                  Arcana Mace
                  <br />+ Empower
                </div>
                <div className="btn-sub">GROUND ORB MAX</div>
              </Link>
            </>
          ) : (
            <>
              {/* Disabled-looking buttons before auth */}
              <div className="btn" style={{ opacity: 0.4, cursor: 'default' }}>
                <div className="btn-tag">Module 01</div>
                <div className="btn-name">
                  Arcana Mace
                  <br />+ Empower
                </div>
                <div className="btn-sub">AIR ORB MAX</div>
              </div>
              <div className="btn" style={{ opacity: 0.4, cursor: 'default' }}>
                <div className="btn-tag">Module 02</div>
                <div className="btn-name">
                  Arcana Mace
                  <br />+ Empower
                </div>
                <div className="btn-sub">GROUND ORB MAX</div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Show login modal when not authenticated */}
      {!isLoggedIn && <LoginModal />}

      <div
        className="version"
        style={{
          position: 'fixed',
          bottom: '1.5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: '0.42rem',
          letterSpacing: '0.2em',
          color: 'rgba(255,255,255,0.15)',
          textTransform: 'uppercase',
          zIndex: 2,
          whiteSpace: 'nowrap',
        }}
      >
        ARCANA MACE CLASSIFIED
      </div>
    </>
  )
}
