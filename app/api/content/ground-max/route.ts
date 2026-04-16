import { getIronSession } from 'iron-session'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { readFileSync } from 'fs'
import { join } from 'path'
import { sessionOptions, SessionData } from '@/lib/auth'

export async function GET(req: NextRequest) {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions)

  if (!session.user) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  const html = readFileSync(join(process.cwd(), 'content', 'ground-max.html'), 'utf8')

  return new Response(html, {
    headers: {
      'Content-Type': 'text/html',
      'X-Frame-Options': 'SAMEORIGIN',
    },
  })
}
