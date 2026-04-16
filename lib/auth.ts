import { SessionOptions } from 'iron-session'

export const VALID_HASHES: Record<string, string> = {
  '7e6578c2e34b53136741c6efe7799a2dce739651c22404a7894b48d42aa88b41': 'blackrock',
  'f7f376a1fcd0d0e11a10ed1b6577c99784d3a6bbe669b1d13fae43eb64634f6e': 'adam',
  '7deead025aea61ac476bb9bb0d13b57a7306b15adea59c1f1b74e6f0abdaf7ad': 'stuart',
  'be879f7549cc80c04241dcfd933c6278c3a711ddc530961071f62c57324d6a9e': 'karim',
  '6ab84705e5d695efd532f462bc41ffc7a05f3a097b877dd2b95d168cd9f3b93d': 'igor',
  '3e513630faa2f3b8963ed4210ef2edec19e9ecb17182d1a6d4560f898e23d52a': 'brokers',
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
