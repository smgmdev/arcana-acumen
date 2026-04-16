import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
)

export async function logAccess(label: string, req: Request) {
  try {
    const geo = await fetch('https://ipapi.co/json/').then(r => r.json()).catch(() => ({}))
    await supabase.from('arcanamace_access_logs').insert({
      ts: new Date().toISOString(),
      ip: req.headers.get('x-forwarded-for') ?? geo.ip ?? 'unknown',
      country: geo.country_name ?? 'unknown',
      city: geo.city ?? 'unknown',
      region: geo.region ?? 'unknown',
      lat: geo.latitude ?? null,
      lng: geo.longitude ?? null,
      password_used: label,
      module: 'login',
    })
  } catch {}
}
