import 'dotenv/config';
import fs from "fs/promises";
import path from "path";
import { OpenAI } from "openai";
import matter from 'gray-matter';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Generates translations for a given article content in Italian,
 * producing translated MDX files for specified target languages.
 * 
 * @param originalFilePath Path to the original Italian MDX article
 * @param targetLanguages Array of language codes to translate to (e.g. ['en', 'de', 'fr'])
 */
export async function translatePost(content: string, targetLang: string): Promise<string> {
  try {
    const prompt = `Traduci il seguente contenuto in ${targetLang} mantenendo il formato markdown:\n\n${content}`;
    
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "Sei un assistente che traduce contenuti dall'italiano mantenendo accuratamente la formattazione markdown." },
        { role: "user", content: prompt }
      ],
      temperature: 0.3,
    });

    const translatedContent = completion.choices[0].message?.content?.trim();
    if (!translatedContent) {
      throw new Error("Nessun contenuto tradotto ricevuto");
    }

    return translatedContent;
  } catch (error) {
    console.error("Errore durante la traduzione:", error);
    throw new Error("Errore durante la traduzione del contenuto");
  }
}

export async function generateArticleTranslations(
  originalFilePath: string,
  targetLanguages: string[]
): Promise<void> {
  try {
    const originalContent = await fs.readFile(originalFilePath, 'utf-8');
    const { data: originalMeta, content: originalBody } = matter(originalContent);

    for (const lang of targetLanguages) {
      /* ---------- TRADUCI BODY ---------- */
      const bodyPrompt = `Translate this markdown article body from Italian to ${lang}. Keep markdown format, do NOT translate front-matter.\n\n${originalBody}`;
      const bodyRes = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You translate Italian markdown keeping formatting.' },
          { role: 'user', content: bodyPrompt }
        ],
        temperature: 0.3,
      });
      const translatedBody = bodyRes.choices[0].message?.content?.trim();
      if (!translatedBody) throw new Error(`Empty body translation for ${lang}`);

      /* ---------- TRADUCI METADATA (title/excerpt) ---------- */
      const fieldsToTranslate: string[] = [];
      if (originalMeta.title) fieldsToTranslate.push(originalMeta.title);
      if (originalMeta.excerpt) fieldsToTranslate.push(originalMeta.excerpt);

      const translatedMeta = { ...originalMeta } as any;
      if (fieldsToTranslate.length) {
        const metaPrompt = `Translate the following lines from Italian to ${lang}. Keep same order, return only the translations each on its own line:\n${fieldsToTranslate.join('\n')}`;
        const metaRes = await openai.chat.completions.create({
          model: 'gpt-4o-mini',
          messages: [{ role: 'user', content: metaPrompt }],
          temperature: 0.3,
        });
        const lines = metaRes.choices[0].message?.content?.trim().split('\n') || [];
        let idx = 0;
        if (originalMeta.title && lines[idx]) translatedMeta.title = lines[idx++].trim();
        if (originalMeta.excerpt && lines[idx]) translatedMeta.excerpt = lines[idx].trim();
      }

      const translatedContent = matter.stringify(translatedBody, translatedMeta);

      const dir = path.dirname(originalFilePath);
      const baseName = path.basename(originalFilePath, '.mdx');
      const outPath = path.join(dir, `${baseName}.${lang}.mdx`);
      await fs.writeFile(outPath, translatedContent, 'utf-8');
      console.log(`✔ Saved translation ${outPath}`);
    }
  } catch (err) {
    console.error('Error generating translations:', err);
    throw err;
  }
}
