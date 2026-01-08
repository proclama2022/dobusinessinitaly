import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const baseUrl = 'https://yourbusinessinitaly.com'
const languages = ['it', 'en', 'de', 'fr', 'es']
const sections = ['', '/services', '/about', '/blog', '/contact', '/media']

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
function buildHead(route: string) {
  const canonical = `${baseUrl}${route || '/'}`
  const isLang = /^\/(it|en|de|fr|es)(\/.*)?$/.test(route)
  const baseSuffix = route.replace(/^\/[a-z]{2}/, '') || ''
  
  // Create hreflang for main pages
  const alternates = languages
    .map(l => `<link rel="alternate" hreflang="${l}" href="${baseUrl}/${l}${baseSuffix}" />`)
    .join('')
  
  const xdef = `<link rel="alternate" hreflang="x-default" href="${baseUrl}/it${baseSuffix}" />`
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
  const currentUrl = `${baseUrl}/${lang}/blog/${slug}`

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
  
  let alternates = ''
  // Try to find same filenames with different lang extensions if they exist?
  // The current structure seems to be `filename.lang.mdx` OR `filename.mdx` (default it).
  // Let's try to find siblings.
  const baseName = post.filename.replace(/\.(it|en|de|fr|es)?\.mdx$/, '')
  
  const siblings = allPosts.filter(p => {
    const pBase = p.filename.replace(/\.(it|en|de|fr|es)?\.mdx$/, '')
    return pBase === baseName && p.lang !== lang
  })

  if (siblings.length > 0) {
    alternates = siblings.map(s => 
      `<link rel="alternate" hreflang="${s.lang}" href="${baseUrl}/${s.lang}/blog/${s.slug}" />`
    ).join('')
    // Add self
    alternates += `<link rel="alternate" hreflang="${lang}" href="${currentUrl}" />`
  }

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

  return metaTags + canonicalTag + alternates
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
    return {
      ...data,
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
      const route = `/${lang}${sec}`.replace(/\/$/, '') || `/${lang}`
      const outDir = path.join(dist, lang, sec.replace(/^\//, ''))
      ensureDir(outDir)
      
      const outFile = path.join(outDir, 'index.html')
      // Inject generic head logic
      const headTags = buildHead(route)
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

    const outDir = path.join(dist, lang, 'blog', slug)
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


