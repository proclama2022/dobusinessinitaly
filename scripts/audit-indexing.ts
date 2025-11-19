import fs from 'fs'
import path from 'path'

const BASE = 'http://localhost:3000'

const normalize = (u: string) => u.replace(/\/+$/, '')

const extractTags = (html: string, regex: RegExp) => {
  const out: string[] = []
  let m: RegExpExecArray | null
  while ((m = regex.exec(html)) !== null) out.push(m[1])
  return out
}

const getSitemaps = async (): Promise<string[]> => {
  const res = await fetch(`${BASE}/sitemap-index.xml`)
  const xml = await res.text()
  const locs = extractTags(xml, /<loc>([^<]+)<\/loc>/g)
  return locs.map(url => url.replace('https://yourbusinessinitaly.com', BASE))
}

const getUrlsFromSitemap = async (sitemapUrl: string): Promise<string[]> => {
  const res = await fetch(sitemapUrl)
  const xml = await res.text()
  const locs = extractTags(xml, /<loc>([^<]+)<\/loc>/g)
  return locs.map(url => url.replace('https://yourbusinessinitaly.com', BASE))
}

type UrlAudit = {
  url: string
  status: number
  contentType: string | null
  robotsHeader: string | null
  canonical: string | null
  robotsMeta: string | null
  alternates: string[]
  soft404: boolean
  canonicalMismatch: boolean
  hasHtml: boolean
}

const auditUrl = async (url: string): Promise<UrlAudit> => {
  let status = 0
  let contentType: string | null = null
  let robotsHeader: string | null = null
  try {
    const head = await fetch(url, { method: 'HEAD' })
    status = head.status
    contentType = head.headers.get('content-type')
    robotsHeader = head.headers.get('x-robots-tag')
  } catch { }

  let html = ''
  try {
    const res = await fetch(url)
    html = await res.text()
  } catch { }

  const canonicalMatch = html.match(/<link[^>]+rel=["']canonical["'][^>]*href=["']([^"']+)["']/i)
  const canonical = canonicalMatch ? canonicalMatch[1] : null
  const robotsMetaMatch = html.match(/<meta[^>]+name=["']robots["'][^>]*content=["']([^"']+)["']/i)
  const robotsMeta = robotsMetaMatch ? robotsMetaMatch[1] : null
  const alternates = extractTags(html, /<link[^>]+rel=["']alternate["'][^>]*href=["']([^"']+)["']/gi)
  const soft404 = /Articolo non trovato|Post not found|Page not found|404/i.test(html)
  const canonicalMismatch = canonical ? normalize(canonical) !== normalize(url) : false
  const hasHtml = contentType ? /text\/html|application\/xhtml\+xml/i.test(contentType) : false

  return { url, status, contentType, robotsHeader, canonical, robotsMeta, alternates, soft404, canonicalMismatch, hasHtml }
}

const run = async () => {
  const sitemaps = await getSitemaps()
  const urlsSets = await Promise.all(sitemaps.map(getUrlsFromSitemap))
  const allUrls = Array.from(new Set(urlsSets.flat()))
  const results: UrlAudit[] = []

  const limit = 10
  for (let i = 0; i < allUrls.length; i += limit) {
    const batch = allUrls.slice(i, i + limit)
    const audited = await Promise.all(batch.map(auditUrl))
    results.push(...audited)
    process.stdout.write(`Checked ${Math.min(i + limit, allUrls.length)}/${allUrls.length}\n`)
  }

  const issues = results.filter(r => r.status !== 200 || r.soft404 || r.canonicalMismatch || (r.robotsHeader && /noindex/i.test(r.robotsHeader)) || (r.robotsMeta && /noindex/i.test(r.robotsMeta)))
  const byType = {
    non200: results.filter(r => r.status !== 200).map(r => r.url),
    soft404: results.filter(r => r.soft404).map(r => r.url),
    canonicalMismatch: results.filter(r => r.canonicalMismatch).map(r => ({ url: r.url, canonical: r.canonical })),
    robotsNoindexHeader: results.filter(r => r.robotsHeader && /noindex/i.test(r.robotsHeader as string)).map(r => r.url),
    robotsNoindexMeta: results.filter(r => r.robotsMeta && /noindex/i.test(r.robotsMeta as string)).map(r => r.url),
    noAlternates: results.filter(r => r.hasHtml && r.alternates.length === 0).map(r => r.url)
  }

  const outDir = path.join(process.cwd(), 'audit')
  try { fs.mkdirSync(outDir, { recursive: true }) } catch { }
  fs.writeFileSync(path.join(outDir, 'indexing-audit.json'), JSON.stringify({ total: results.length, issuesCount: issues.length, issuesByType: byType }, null, 2))
  fs.writeFileSync(path.join(outDir, 'sitemap-urls.txt'), allUrls.join('\n'))
  fs.writeFileSync(path.join(outDir, 'pages-without-alternates.txt'), byType.noAlternates.join('\n'))

  console.log('Total URLs:', results.length)
  console.log('Issues:', issues.length)
  console.log('Non-200:', byType.non200.length)
  console.log('Soft404:', byType.soft404.length)
  console.log('Canonical mismatches:', byType.canonicalMismatch.length)
  console.log('Robots noindex (header):', byType.robotsNoindexHeader.length)
  console.log('Robots noindex (meta):', byType.robotsNoindexMeta.length)
  console.log('Pages without alternates:', byType.noAlternates.length)
}

run()