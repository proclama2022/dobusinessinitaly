import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const baseUrl = 'https://yourbusinessinitaly.com'
const languages = ['it', 'en', 'de', 'fr', 'es']
const sections = [
  '',
  '/services',
  '/services/open-company-italy',
  '/services/open-vat-number-italy',
  '/services/tax-accounting-expats',
  '/pillar/how-to-start-business-in-italy-2025',
  '/about',
  '/blog',
  '/contact',
  '/media'
]
const DEFAULT_LANG = 'en'

const normalizePath = (pathValue: string) => {
  const withLeading = pathValue.startsWith('/') ? pathValue : `/${pathValue}`
  const trimmed = withLeading.replace(/\/+$/, '')
  return trimmed === '' ? '/' : trimmed
}

const buildLocalizedPath = (lang: string, pathValue: string) => {
  const normalized = normalizePath(pathValue)
  if (lang === DEFAULT_LANG) return normalized
  return normalized === '/' ? `/${lang}` : `/${lang}${normalized}`
}

const stripLangPrefix = (pathValue: string) => normalizePath(pathValue.replace(/^\/(it|en|de|fr|es)(?=\/|$)/, '') || '/')

const toAbsoluteUrl = (pathValue: string) => `${baseUrl}${pathValue === '/' ? '' : pathValue}`

// Helper to ensure directory exists
function ensureDir(p: string) {
  fs.mkdirSync(p, { recursive: true })
}

// Helper to escape HTML special characters for meta tags
function escapeHtml(str: string) {
  if (!str) return ''
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

// Build head tags for main static routes (generic)
function buildHead(route: string, lang: string) {
  const cleanRoute = normalizePath(route || '/')
  const baseSuffix = stripLangPrefix(cleanRoute)
  const canonical = toAbsoluteUrl(buildLocalizedPath(lang, baseSuffix))

  // Create hreflang for main pages
  const alternates = languages
    .map(l => `<link rel="alternate" hreflang="${l}" href="${toAbsoluteUrl(buildLocalizedPath(l, baseSuffix))}" />`)
    .join('')

  const xdef = `<link rel="alternate" hreflang="x-default" href="${toAbsoluteUrl(buildLocalizedPath(DEFAULT_LANG, baseSuffix))}" />`
  const canonicalTag = `<link rel="canonical" href="${canonical}" />`

  return canonicalTag + alternates + xdef
}

// Build head tags specifically for blog posts
function buildBlogHead(post: any, allPosts: any[]) {
  const { lang, slug, title, description, metaTitle, metaDescription, coverImage, date, author, category } = post
  
  // Use meta fields if available, otherwise fallbacks
  const finalTitle = metaTitle || title
  const finalDesc = metaDescription || description
  const imageUrl = coverImage ? `${baseUrl}${coverImage}` : `${baseUrl}/images/og-image.jpg`
  const currentUrl = toAbsoluteUrl(buildLocalizedPath(lang, `/blog/${slug}`))

  // Find translations of this post (same base slug logic or manual linking?)
  // Assuming the project uses a naming convention or 'slug' field effectively. 
  // If we don't have a reliable way to link translations from frontmatter, 
  // we try to match by 'slug' if it's shared (rare in this repo) or we skip detailed hreflang for posts 
  // and only provide self-reference + canonical.
  // HOWEVER, looking at the repo, filenames like 'aprire-partita-iva...en.mdx' suggest a pattern.
  // Let's try to group by a "base slug" if possible, but for now, we will be safe and generate 
  // at least the Canonical and correct Metadata.
  
  // Strategy: Group posts by a "group ID" if it existed. Since it doesn't clearly, 
  // we will iterate all posts to find those that might be translations.
  // *Heuristic*: many posts seem to share a semantic slug or are translations. 
  // If we can't be 100% sure, we omit hreflang for *other* languages to avoid SEO errors, 
  // but we MUST have self-referencing canonical.
  
  const alternatesMap = new Map<string, string>()
  alternatesMap.set(lang, currentUrl)
  // Try to find same filenames with different lang extensions if they exist?
  // The current structure seems to be `filename.lang.mdx` OR `filename.mdx` (default it).
  // Let's try to find siblings.
  const baseName = post.filename.replace(/\.(it|en|de|fr|es)?\.mdx$/, '')
  
  const siblings = allPosts.filter(p => {
    const pBase = p.filename.replace(/\.(it|en|de|fr|es)?\.mdx$/, '')
    return pBase === baseName && p.lang !== lang
  })

  if (siblings.length > 0) {
    siblings.forEach(s => {
      alternatesMap.set(s.lang, toAbsoluteUrl(buildLocalizedPath(s.lang, `/blog/${s.slug}`)))
    })
  }

  const alternates = Array.from(alternatesMap.entries())
    .map(([altLang, href]) => `<link rel="alternate" hreflang="${altLang}" href="${href}" />`)
    .join('')
  const xdef = `<link rel="alternate" hreflang="x-default" href="${toAbsoluteUrl(buildLocalizedPath(DEFAULT_LANG, `/blog/${slug}`))}" />`

  const canonicalTag = `<link rel="canonical" href="${currentUrl}" />`
  
  // Meta tags
  const metaTags = `
    <title>${escapeHtml(finalTitle)}</title>
    <meta name="description" content="${escapeHtml(finalDesc)}" />
    <meta property="og:title" content="${escapeHtml(finalTitle)}" />
    <meta property="og:description" content="${escapeHtml(finalDesc)}" />
    <meta property="og:image" content="${imageUrl}" />
    <meta property="og:url" content="${currentUrl}" />
    <meta property="og:type" content="article" />
    <meta name="twitter:card" content="summary_large_image" />
    ${date ? `<meta property="article:published_time" content="${date}" />` : ''}
    ${author ? `<meta name="author" content="${escapeHtml(author)}" />` : ''}
  `

  return metaTags + canonicalTag + alternates + xdef
}

function injectHead(html: string, headContent: string) {
  // Remove existing title/meta that might be in the template
  let cleaned = html
    .replace(/<title>.*?<\/title>/, '')
    .replace(/<meta name="description".*?>/, '')
    .replace(/<link[^>]+rel=["']canonical["'][^>]*>/gi, '')
    .replace(/<link[^>]+rel=["']alternate["'][^>]*>/gi, '')

  // Insert new content before </head>
  return cleaned.replace('</head>', `${headContent}\n</head>`)
}

function getAllPosts() {
  const blogDir = path.resolve(process.cwd(), 'content/blog')
  if (!fs.existsSync(blogDir)) return []
  
  const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.mdx'))
  return files.map(f => {
    const content = fs.readFileSync(path.join(blogDir, f), 'utf-8')
    const { data } = matter(content)
    const langFromFile = f.match(/\.([a-z]{2})\.mdx$/)?.[1]
    const lang = (data.lang || langFromFile || 'it').toLowerCase()
    const slug = data.slug || f.replace(/(\.[a-z]{2})?\.mdx$/, '')
    return {
      ...data,
      lang,
      slug,
      filename: f
    }
  }).filter(p => p.slug && p.lang) // Ensure valid post
}

function main() {
  const dist = path.resolve(process.cwd(), 'dist', 'public')
  const indexPath = path.join(dist, 'index.html')
  
  if (!fs.existsSync(indexPath)) {
    console.error('[postbuild-head] index.html non trovato:', indexPath)
    // In dev mode or before build this might fail, but we expect it to run AFTER vite build
    process.exit(0)
  }
  
  const templateHtml = fs.readFileSync(indexPath, 'utf-8')

  console.log('[postbuild-head] Generazione pagine statiche principali...')
  
  // 1. Genera pagine base (Home, About, etc.)
  for (const lang of languages) {
    for (const sec of sections) {
      const route = buildLocalizedPath(lang, sec)
      const sectionDir = sec.replace(/^\//, '')
      const outDir = lang === DEFAULT_LANG ? path.join(dist, sectionDir) : path.join(dist, lang, sectionDir)
      ensureDir(outDir)
      
      const outFile = path.join(outDir, 'index.html')
      // Inject generic head logic
      const headTags = buildHead(route, lang)
      // Add a title fallback if needed
      const pageTitle = sec ? `${sec.replace('/', '')} | YourBusinessInItaly` : 'YourBusinessInItaly'
      const titleTag = `<title>${pageTitle.charAt(0).toUpperCase() + pageTitle.slice(1)}</title>`
      
      const outHtml = injectHead(templateHtml, titleTag + headTags)
      fs.writeFileSync(outFile, outHtml, 'utf-8')
    }
  }

  console.log('[postbuild-head] Generazione pagine blog...')
  
  // 2. Genera pagine Blog specifiche
  const posts = getAllPosts()
  let postsCount = 0
  
  for (const post of posts) {
    const { lang, slug } = post
    if (!lang || !slug) continue

    const outDir = lang === DEFAULT_LANG ? path.join(dist, 'blog', slug) : path.join(dist, lang, 'blog', slug)
    ensureDir(outDir)
    
    const outFile = path.join(outDir, 'index.html')
    const headTags = buildBlogHead(post, posts)
    
    // Inject logic
    const outHtml = injectHead(templateHtml, headTags)
    fs.writeFileSync(outFile, outHtml, 'utf-8')
    postsCount++
  }
  
  console.log(`[postbuild-head] Completato! Generate ${languages.length * sections.length} pagine base e ${postsCount} articoli blog.`)
}

main()
