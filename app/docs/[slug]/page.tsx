import fs from 'node:fs'
import path from 'node:path'
import { notFound } from 'next/navigation'
import { allSlugs } from '@/lib/docPages'

export function generateStaticParams() {
  return allSlugs.map((slug: string) => ({ slug }))
}

export default function SlugPage({ params }: { params: { slug: string } }) {
  const { slug } = params
  if (!allSlugs.includes(slug)) notFound()

  const file = path.join(process.cwd(), 'content', `${slug}.html`)
  const html = fs.readFileSync(file, 'utf8')
  return <section className="page active" dangerouslySetInnerHTML={{ __html: html }} />
}
