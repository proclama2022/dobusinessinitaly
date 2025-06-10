import type { VercelRequest, VercelResponse } from '@vercel/node';
import { put, list } from '@vercel/blob';
import matter from 'gray-matter';
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface TranslationRequest {
  slug: string;
  targetLang: string;
}

async function translateMetadata(frontmatter: any, targetLang: string): Promise<any> {
  const languageNames: Record<string, string> = {
    en: 'English',
    de: 'German', 
    fr: 'French',
    es: 'Spanish'
  };

  const languageName = languageNames[targetLang] || 'English';

  try {
    // Traduci solo title e excerpt se esistono
    const fieldsToTranslate: string[] = [];
    if (frontmatter.title) fieldsToTranslate.push(`Title: ${frontmatter.title}`);
    if (frontmatter.excerpt) fieldsToTranslate.push(`Excerpt: ${frontmatter.excerpt}`);
    
    if (fieldsToTranslate.length === 0) return frontmatter;

    const prompt = `Translate the following metadata fields to ${languageName}. Return ONLY the translated text for each field, one per line, in the same order:

${fieldsToTranslate.join('\n')}

Important:
- Maintain the same meaning and tone
- Keep it professional and SEO-friendly
- Return only the translated content without labels`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.3,
    });

    const translatedText = completion.choices[0].message?.content?.trim();
    if (!translatedText) {
      console.warn('[Translate API] No metadata translation returned, using original');
      return frontmatter;
    }

    const translatedLines = translatedText.split('\n').filter(line => line.trim());
    const translatedFrontmatter = { ...frontmatter };

    let lineIndex = 0;
    if (frontmatter.title && translatedLines[lineIndex]) {
      translatedFrontmatter.title = translatedLines[lineIndex].trim();
      lineIndex++;
    }
    if (frontmatter.excerpt && translatedLines[lineIndex]) {
      translatedFrontmatter.excerpt = translatedLines[lineIndex].trim();
    }

    // Traduci anche i leadMagnet se esistono
    if (frontmatter.leadMagnet) {
      const leadMagnetTranslations = {
        en: {
          title: "Complete Guide: How to Open a Business in Italy as a Foreigner",
          description: "Receive the complete PDF guide with all details, necessary documents and step-by-step procedures to open your business in Italy."
        },
        de: {
          title: "Vollständiger Leitfaden: Wie man als Ausländer ein Unternehmen in Italien eröffnet",
          description: "Erhalten Sie den vollständigen PDF-Leitfaden mit allen Details, notwendigen Dokumenten und Schritt-für-Schritt-Verfahren zur Eröffnung Ihres Unternehmens in Italien."
        },
        fr: {
          title: "Guide Complet : Comment Ouvrir une Entreprise en Italie en tant qu'Étranger",
          description: "Recevez le guide PDF complet avec tous les détails, documents nécessaires et procédures étape par étape pour ouvrir votre entreprise en Italie."
        },
        es: {
          title: "Guía Completa: Cómo Abrir un Negocio en Italia siendo Extranjero",
          description: "Recibe la guía PDF completa con todos los detalles, documentos necesarios y procedimientos paso a paso para abrir tu negocio en Italia."
        }
      };

      if (leadMagnetTranslations[targetLang as keyof typeof leadMagnetTranslations]) {
        translatedFrontmatter.leadMagnet = {
          ...frontmatter.leadMagnet,
          ...leadMagnetTranslations[targetLang as keyof typeof leadMagnetTranslations]
        };
      }
    }

    console.log(`[Translate API] Metadata translation completed`);
    return translatedFrontmatter;
  } catch (error: any) {
    console.error(`[Translate API] Metadata translation error:`, error);
    return frontmatter; // Fallback to original if translation fails
  }
}

async function translateContent(content: string, targetLang: string): Promise<string> {
  const languageNames = {
    'en': 'English',
    'de': 'German',
    'fr': 'French',
    'es': 'Spanish'
  };

  const targetLanguageName = languageNames[targetLang as keyof typeof languageNames] || targetLang;

  try {
    console.log(`[Translate API] Starting OpenAI translation to ${targetLanguageName}`);
    console.log(`[Translate API] Content length: ${content.length} characters`);
    
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY environment variable is not set');
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { 
          role: "system", 
          content: `You are a professional translator. Translate the following Italian content to ${targetLanguageName}, preserving the markdown formatting and structure. Only translate the content, do not change frontmatter keys or metadata.` 
        },
        { role: "user", content: content }
      ],
      temperature: 0.3,
    });

    const translatedContent = completion.choices[0].message?.content?.trim();
    if (!translatedContent) {
      throw new Error("No translation returned from OpenAI");
    }

    console.log(`[Translate API] OpenAI translation completed successfully`);
    return translatedContent;
  } catch (error: any) {
    console.error(`[Translate API] OpenAI translation error:`, error);
    console.error(`[Translate API] Error details:`, {
      message: error.message,
      type: error.type,
      code: error.code,
      status: error.status
    });
    throw new Error(`Failed to translate content: ${error.message}`);
  }
}

async function getFileFromBlob(fileName: string): Promise<string | null> {
  try {
    console.log(`[Translate API] Fetching file from blob: ${fileName}`);
    
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      throw new Error('BLOB_READ_WRITE_TOKEN environment variable is not set');
    }

    const { blobs } = await list({
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    console.log(`[Translate API] Found ${blobs.length} blobs in storage`);
    console.log(`[Translate API] Available blobs:`, blobs.map(b => b.pathname));

    const blob = blobs.find(b => b.pathname === fileName);
    if (!blob) {
      console.log(`[Translate API] File not found in blob: ${fileName}`);
      return null;
    }

    console.log(`[Translate API] Found blob: ${blob.pathname}, URL: ${blob.url}`);

    const response = await fetch(blob.url);
    if (!response.ok) {
      throw new Error(`Failed to fetch blob: ${response.status} ${response.statusText}`);
    }

    const content = await response.text();
    console.log(`[Translate API] Successfully fetched file content, length: ${content.length}`);
    return content;
  } catch (error: any) {
    console.error(`[Translate API] Error fetching file from blob:`, error);
    console.error(`[Translate API] Error details:`, {
      message: error.message,
      stack: error.stack
    });
    return null;
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  console.log(`[Translate API] Received request: ${req.method} ${req.url}`);
  console.log(`[Translate API] Request body:`, req.body);
  console.log(`[Translate API] Environment check:`, {
    hasOpenAIKey: !!process.env.OPENAI_API_KEY,
    hasBlobToken: !!process.env.BLOB_READ_WRITE_TOKEN,
    openAIKeyPrefix: process.env.OPENAI_API_KEY?.substring(0, 7) + '...',
    blobTokenPrefix: process.env.BLOB_READ_WRITE_TOKEN?.substring(0, 7) + '...'
  });

  // Handle CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ success: false, message: 'Method not allowed' });
    return;
  }

  try {
    const { slug, targetLang }: TranslationRequest = req.body;

    console.log(`[Translate API] Translation request - Slug: ${slug}, Target: ${targetLang}`);

    if (!slug || !targetLang) {
      console.log(`[Translate API] Missing required parameters`);
      return res.status(400).json({
        success: false,
        message: 'Missing slug or targetLang',
        received: { slug, targetLang }
      });
    }

    if (!['en', 'de', 'fr', 'es'].includes(targetLang)) {
      console.log(`[Translate API] Invalid target language: ${targetLang}`);
      return res.status(400).json({
        success: false,
        message: 'Invalid target language. Use: en, de, fr, es',
        received: targetLang
      });
    }

    // Check environment variables
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      console.error(`[Translate API] Missing BLOB_READ_WRITE_TOKEN`);
      return res.status(500).json({
        success: false,
        message: 'Server configuration error: Missing BLOB_READ_WRITE_TOKEN'
      });
    }

    if (!process.env.OPENAI_API_KEY) {
      console.error(`[Translate API] Missing OPENAI_API_KEY`);
      return res.status(500).json({
        success: false,
        message: 'Server configuration error: Missing OPENAI_API_KEY'
      });
    }

    // Get original file from Vercel Blob
    const originalFileName = `${slug}.mdx`;
    console.log(`[Translate API] Looking for original file: ${originalFileName}`);

    const originalContent = await getFileFromBlob(originalFileName);
    if (!originalContent) {
      console.log(`[Translate API] Original file not found: ${originalFileName}`);
      return res.status(404).json({
        success: false,
        message: 'Original article not found',
        fileName: originalFileName
      });
    }

    // Parse the original content
    console.log(`[Translate API] Parsing content with gray-matter`);
    const { data: frontmatter, content } = matter(originalContent);
    console.log(`[Translate API] Parsed frontmatter:`, frontmatter);
    console.log(`[Translate API] Content length: ${content.length} characters`);

    if (!content || content.trim().length === 0) {
      console.log(`[Translate API] No content to translate`);
      return res.status(400).json({
        success: false,
        message: 'No content found to translate'
      });
    }

    // Translate the content
    console.log(`[Translate API] Starting translation to ${targetLang}`);
    const translatedContent = await translateContent(content, targetLang);

    // Translate the metadata
    console.log(`[Translate API] Starting metadata translation to ${targetLang}`);
    const translatedFrontmatter = await translateMetadata(frontmatter, targetLang);

    // Create the translated file content with translated frontmatter
    console.log(`[Translate API] Creating translated file content`);
    const translatedFileContent = matter.stringify(translatedContent, translatedFrontmatter);

    // Save translated file to Vercel Blob
    const translatedFileName = `${slug}.${targetLang}.mdx`;
    console.log(`[Translate API] Saving translated file: ${translatedFileName}`);

    const { url } = await put(translatedFileName, translatedFileContent, {
      access: 'public',
      token: process.env.BLOB_READ_WRITE_TOKEN,
      allowOverwrite: true,
      addRandomSuffix: false
    });

    console.log(`[Translate API] Translation completed successfully: ${url}`);

    res.status(200).json({
      success: true,
      message: `Translation to ${targetLang} completed successfully`,
      url,
      fileName: translatedFileName
    });

  } catch (error: any) {
    console.error('[Translate API] Translation error:', error);
    console.error('[Translate API] Error stack:', error.stack);
    
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to generate translation',
      error: process.env.NODE_ENV === 'development' ? {
        message: error.message,
        stack: error.stack,
        name: error.name
      } : undefined
    });
  }
}
