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

async function translateContent(content: string, targetLang: string): Promise<string> {
  const languageNames = {
    'en': 'English',
    'de': 'German',
    'fr': 'French',
    'es': 'Spanish'
  };

  const targetLanguageName = languageNames[targetLang as keyof typeof languageNames] || targetLang;

  try {
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

    return translatedContent;
  } catch (error) {
    console.error("Translation error:", error);
    throw new Error("Failed to translate content");
  }
}

async function getFileFromBlob(fileName: string): Promise<string | null> {
  try {
    const { blobs } = await list({
      token: process.env.BLOB_READ_WRITE_TOKEN!,
    });

    const blob = blobs.find(b => b.pathname === fileName);
    if (!blob) {
      console.log(`[Translate API] File not found in blob: ${fileName}`);
      return null;
    }

    const response = await fetch(blob.url);
    if (!response.ok) {
      throw new Error(`Failed to fetch blob: ${response.statusText}`);
    }

    return await response.text();
  } catch (error) {
    console.error(`[Translate API] Error fetching file from blob:`, error);
    return null;
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  console.log(`[Translate API] Received request: ${req.method} ${req.url}`);

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
      return res.status(400).json({
        success: false,
        message: 'Missing slug or targetLang'
      });
    }

    if (!['en', 'de', 'fr', 'es'].includes(targetLang)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid target language. Use: en, de, fr, es'
      });
    }

    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      throw new Error('Missing BLOB_READ_WRITE_TOKEN environment variable');
    }

    // Get original file from Vercel Blob
    const originalFileName = `${slug}.mdx`;
    console.log(`[Translate API] Looking for original file: ${originalFileName}`);

    const originalContent = await getFileFromBlob(originalFileName);
    if (!originalContent) {
      return res.status(404).json({
        success: false,
        message: 'Original article not found'
      });
    }

    // Parse the original content
    const { data: frontmatter, content } = matter(originalContent);
    console.log(`[Translate API] Parsed frontmatter:`, frontmatter);

    // Translate the content
    console.log(`[Translate API] Starting translation to ${targetLang}`);
    const translatedContent = await translateContent(content, targetLang);

    // Create the translated file content with original frontmatter
    const translatedFileContent = matter.stringify(translatedContent, frontmatter);

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
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to generate translation'
    });
  }
}
