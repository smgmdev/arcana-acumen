'use client'
import { useState } from 'react'
import Link from 'next/link'

type Tab = 'modules' | 'video' | 'docs'

export default function HomeTabs() {
  const [tab, setTab] = useState<Tab>('video')
  const [videoSrc, setVideoSrc] = useState<string | null>(null)
  const [videoLoading, setVideoLoading] = useState(false)

  function openVideo(src: string) {
    setVideoSrc(src)
    setVideoLoading(true)
  }

  function closeVideo() {
    setVideoSrc(null)
    setVideoLoading(false)
  }

  return (
    <div className="tabs-wrap">
      <div className="tabs-bar">
        <button
          className={`tab ${tab === 'video' ? 'active' : ''}`}
          onClick={() => setTab('video')}
        >
          Video Material
        </button>
        <button
          className={`tab ${tab === 'docs' ? 'active' : ''}`}
          onClick={() => setTab('docs')}
        >
          Documentation
        </button>
        <button
          className={`tab ${tab === 'modules' ? 'active' : ''}`}
          onClick={() => setTab('modules')}
        >
          Modules
        </button>
      </div>

      <div className="tab-panel">
        {tab === 'modules' && (
          <div className="btn-row">
            <a href="https://arcanamace.com/arcana-precision" className="btn" target="_blank" rel="noopener noreferrer">
              <div className="btn-tag">Module 00</div>
              <div className="btn-content-row">
                <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 3L3 7.5v9L12 21l9-4.5v-9z" />
                  <path d="M3 7.5L12 12l9-4.5" />
                  <path d="M12 12v9" />
                </svg>
                <div>
                  <div className="btn-name">Arcana Precision</div>
                  <div className="btn-sub">AI Threat Detection with Satellite</div>
                </div>
              </div>
            </a>
            <Link href="/orbital" className="btn">
              <div className="btn-tag">Module 01</div>
              <div className="btn-content-row">
                <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 3L3 7.5v9L12 21l9-4.5v-9z" />
                  <path d="M3 7.5L12 12l9-4.5" />
                  <path d="M12 12v9" />
                </svg>
                <div>
                  <div className="btn-name">Arcana Mace + Empower</div>
                  <div className="btn-sub">AIR ORB MAX</div>
                </div>
              </div>
            </Link>
            <Link href="/ground-max" className="btn">
              <div className="btn-tag">Module 02</div>
              <div className="btn-content-row">
                <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 3L3 7.5v9L12 21l9-4.5v-9z" />
                  <path d="M3 7.5L12 12l9-4.5" />
                  <path d="M12 12v9" />
                </svg>
                <div>
                  <div className="btn-name">Arcana Mace + Empower</div>
                  <div className="btn-sub">GROUND ORB MAX</div>
                </div>
              </div>
            </Link>
          </div>
        )}

        {tab === 'video' && (
          <div className="btn-row">
            <button
              type="button"
              className="btn"
              onClick={() => openVideo('/videos/doc1.mp4')}
            >
              <div className="btn-tag">Video 01</div>
              <div className="btn-content-row">
                <svg className="btn-icon" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" aria-hidden="true">
                  <polygon points="6 4 20 12 6 20 6 4" />
                </svg>
                <div>
                  <div className="btn-name">Arcana Mace Software Overview</div>
                  <div className="btn-sub">WALKTHROUGH</div>
                </div>
              </div>
            </button>
            <button
              type="button"
              className="btn"
              onClick={() => openVideo('/videos/doc2.mp4')}
            >
              <div className="btn-tag">Video 02</div>
              <div className="btn-content-row">
                <svg className="btn-icon" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" aria-hidden="true">
                  <polygon points="6 4 20 12 6 20 6 4" />
                </svg>
                <div>
                  <div className="btn-name">Arcana Mace Capabilities Documentation</div>
                  <div className="btn-sub">OVERVIEW</div>
                </div>
              </div>
            </button>
          </div>
        )}

        {tab === 'docs' && (
          <div className="btn-row">
            <Link href="/docs/introduction" className="btn">
              <div className="btn-tag">Doc 01</div>
              <div className="btn-content-row">
                <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="8" y1="13" x2="16" y2="13" />
                  <line x1="8" y1="17" x2="16" y2="17" />
                  <line x1="8" y1="9" x2="10" y2="9" />
                </svg>
                <div>
                  <div className="btn-name">Arcana Mace Introduction + Capabilities</div>
                  <div className="btn-sub">INTRODUCTION</div>
                </div>
              </div>
            </Link>
          </div>
        )}
      </div>

      {videoSrc && (
        <div className="video-modal" onClick={closeVideo}>
          <button
            type="button"
            className="video-modal-close"
            onClick={closeVideo}
            aria-label="Close video"
          >
            ×
          </button>
          {videoLoading && (
            <div className="video-spinner" aria-label="Loading video">
              <div className="video-spinner-ring" />
            </div>
          )}
          <video
            className="video-modal-player"
            src={videoSrc}
            controls
            autoPlay
            onClick={(e) => e.stopPropagation()}
            onWaiting={() => setVideoLoading(true)}
            onCanPlay={() => setVideoLoading(false)}
            onPlaying={() => setVideoLoading(false)}
            onLoadedData={() => setVideoLoading(false)}
          />
        </div>
      )}
    </div>
  )
}
