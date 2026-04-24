'use client'
import { useState } from 'react'
import Link from 'next/link'

type Tab = 'modules' | 'video' | 'docs'

export default function HomeTabs() {
  const [tab, setTab] = useState<Tab>('modules')

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
              <div className="btn-name">Arcana Precision</div>
              <div className="btn-sub">AI Threat Detection with Satellite</div>
            </a>
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
          </div>
        )}

        {tab === 'video' && (
          <div className="tab-empty">
            <div className="tab-empty-title">Video Material</div>
            <div className="tab-empty-sub">No videos uploaded yet.</div>
          </div>
        )}

        {tab === 'docs' && (
          <div className="btn-row">
            <Link href="/docs/introduction" className="btn">
              <div className="btn-tag">Doc 01</div>
              <div className="btn-name">Arcana Mace Introduction + Capabilities</div>
              <div className="btn-sub">OVERVIEW</div>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
