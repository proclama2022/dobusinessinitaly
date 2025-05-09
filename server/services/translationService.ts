import 'dotenv/config';
import fs from "fs/promises";
import path from "path";
import { OpenAI } from "openai";

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
export async function generateArticleTranslations(
  originalFilePath: string,
  targetLanguages: string[]
): Promise<void> {
  try {
    const originalContent = await fs.readFile(originalFilePath, "utf-8");

    // Extract frontmatter and body separately
    const frontmatterMatch = originalContent.match(/^---\n([\s\S]*?)\n---/);
    if (!frontmatterMatch) {
      throw new Error("Frontmatter not found in the original article.");
    }
    const frontmatter = frontmatterMatch[0];
    const body = originalContent.slice(frontmatterMatch[0].length).trim();

    for (const lang of targetLanguages) {
      // Prepare prompt for OpenAI to translate the body preserving markdown and structure
      const prompt = `Translate the following Italian article content to ${lang} language, preserving the markdown and frontmatter structure. Only translate the content, do not change frontmatter keys or metadata.\n\n${body}`;

      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are a helpful assistant that translates Italian markdown articles preserving formatting." },
          { role: "user", content: prompt },
        ],
        temperature: 0.3,
      });

      const translatedBody = completion.choices[0].message?.content?.trim();
      if (!translatedBody) {
        throw new Error(`No translation returned for language ${lang}`);
      }

      // Compose translated article content with original frontmatter (optionally adjust frontmatter for language)
      // Here we keep frontmatter as is, but you may want to add/update language key
      const translatedContent = `${frontmatter}\n\n${translatedBody}\n`;

      // Determine output path for translated article
      const dir = path.dirname(originalFilePath);
      const baseName = path.basename(originalFilePath, ".mdx");
      const translatedFileName = `${baseName}.${lang}.mdx`;
      const translatedFilePath = path.join(dir, translatedFileName);

      await fs.writeFile(translatedFilePath, translatedContent, "utf-8");
      console.log(`Translated article saved: ${translatedFilePath}`);
    }
  } catch (error) {
    console.error("Error generating translations:", error);
    throw error;
  }
}
