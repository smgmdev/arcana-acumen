import { SessionOptions } from 'iron-session'

export const VALID_HASHES: Record<string, string> = {
  '7b5fe22b5446f7c62ea27b8bd71cef94e03f3df2a6f1dce9ec955bb19ecffd6d': 'gov',
}

export interface SessionData {
  user?: { label: string }
}

export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_SECRET!,
  cookieName: 'am_session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 60 * 60 * 8,
  },
}
