import { getIronSession } from 'iron-session'
import { cookies } from 'next/headers'
import { sessionOptions, SessionData } from '@/lib/auth'

export async function POST() {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions)
  session.destroy()
  return Response.json({ ok: true })
}
