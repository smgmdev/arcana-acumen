import { createHash } from 'crypto'
import { getIronSession } from 'iron-session'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { sessionOptions, SessionData, VALID_HASHES } from '@/lib/auth'
import { logAccess } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  let body: { password?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 })
  }

  const password = body.password?.trim().toLowerCase() ?? ''
  if (!password) {
    return NextResponse.json({ ok: false }, { status: 400 })
  }

  const hash = createHash('sha256').update(password).digest('hex')
  const label = VALID_HASHES[hash]

  if (!label) {
    return NextResponse.json({ ok: false }, { status: 401 })
  }

  const session = await getIronSession<SessionData>(cookies(), sessionOptions)
  session.user = { label }
  await session.save()

  // fire-and-forget access log
  logAccess(label, req)

  return NextResponse.json({ ok: true })
}
