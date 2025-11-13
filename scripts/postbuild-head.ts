import fs from 'fs'
import path from 'path'

const baseUrl = 'https://yourbusinessinitaly.com'
const languages = ['it','en','de','fr','es']
const sections = ['', '/services', '/about', '/blog', '/contact', '/media']

function buildHead(route: string) {
  const canonical = `${baseUrl}${route || '/'}`
  const isLang = /^\/(it|en|de|fr|es)(\/.*)?$/.test(route)
  const lang = isLang ? route.split('/')[1] : 'it'
  const baseSuffix = route.replace(/^\/[a-z]{2}/, '') || ''
  const alternates = languages
    .map(l => `<link rel="alternate" hreflang="${l}" href="${baseUrl}/${l}${baseSuffix}" />`)
    .join('')
  const xdef = `<link rel="alternate" hreflang="x-default" href="${baseUrl}/it${baseSuffix}" />`
  const canonicalTag = `<link rel="canonical" href="${canonical}" />`
  return canonicalTag + alternates + xdef
}

function injectHead(html: string, route: string) {
  const cleaned = html
    .replace(/<link[^>]+rel=["']canonical["'][^>]*>/gi, '')
    .replace(/<link[^>]+rel=["']alternate["'][^>]*>/gi, '')
  const tags = buildHead(route)
  return cleaned.replace('</head>', `${tags}\n</head>`)
}

function ensureDir(p: string) {
  fs.mkdirSync(p, { recursive: true })
}

function main() {
  const dist = path.resolve(process.cwd(), 'dist', 'public')
  const indexPath = path.join(dist, 'index.html')
  if (!fs.existsSync(indexPath)) {
    console.error('[postbuild-head] index.html non trovato:', indexPath)
    process.exit(0)
  }
  const html = fs.readFileSync(indexPath, 'utf-8')

  // Genera pagine base per ogni lingua e sezione
  for (const lang of languages) {
    for (const sec of sections) {
      const route = `/${lang}${sec}`.replace(/\/$/, '') || `/${lang}`
      const outDir = path.join(dist, lang, sec.replace(/^\//, ''))
      ensureDir(outDir)
      const outFile = path.join(outDir, 'index.html')
      const outHtml = injectHead(html, route)
      fs.writeFileSync(outFile, outHtml, 'utf-8')
      console.log('[postbuild-head] scritto', outFile)
    }
  }
}

main()

