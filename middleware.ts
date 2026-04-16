import { getIronSession } from 'iron-session'
import { NextRequest, NextResponse } from 'next/server'
import { sessionOptions, SessionData } from './lib/auth'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  // iron-session v8: pass req/res when not using next/headers (edge runtime)
  const session = await getIronSession<SessionData>(
    req as unknown as Request,
    res as unknown as Response,
    sessionOptions
  )
  if (!session.user) {
    return NextResponse.redirect(new URL('/', req.url))
  }
  return res
}

export const config = {
  matcher: ['/orbital', '/ground-max'],
}
