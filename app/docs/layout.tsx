import './docs.css'
import DocShell from '@/components/DocShell'

export const metadata = {
  title: 'Arcana Mace — Capabilities',
}

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return <DocShell>{children}</DocShell>
}
