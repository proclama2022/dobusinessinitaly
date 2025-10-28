import fs from 'fs';
import path from 'path';

function extractFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) {
    return { valid: false, error: 'No frontmatter found' };
  }

  try {
    const frontmatter = match[1];

    // Basic validation: check for required fields
    const hasTitle = /^title:/m.test(frontmatter);
    const hasDescription = /^(description|excerpt):/m.test(frontmatter);
    const hasCoverImage = /^coverImage:/m.test(frontmatter);

    // Check for malformed delimiters
    if (frontmatter.includes('ba---')) {
      return { valid: false, error: 'Malformed delimiter (ba---)' };
    }

    return {
      valid: true,
      hasTitle,
      hasDescription,
      hasCoverImage,
      frontmatter
    };
  } catch (e) {
    return { valid: false, error: e.message };
  }
}

function main() {
  const root = path.resolve(process.cwd(), 'content/blog');
  if (!fs.existsSync(root)) {
    console.error('Blog directory not found:', root);
    process.exit(1);
  }

  const files = fs.readdirSync(root).filter(f => f.endsWith('.mdx'));
  let validCount = 0;
  let invalidCount = 0;
  const issues = [];

  for (const file of files) {
    const filePath = path.join(root, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const result = extractFrontmatter(content);

    if (!result.valid) {
      invalidCount++;
      issues.push({ file, error: result.error });
      console.log(`❌ ${file}: ${result.error}`);
    } else {
      validCount++;
      const warnings = [];
      if (!result.hasTitle) warnings.push('missing title');
      if (!result.hasDescription) warnings.push('missing description/excerpt');
      if (!result.hasCoverImage) warnings.push('missing coverImage');

      if (warnings.length > 0) {
        console.log(`⚠️  ${file}: ${warnings.join(', ')}`);
      }
    }
  }

  console.log(`\n=== VALIDATION SUMMARY ===`);
  console.log(`✅ Valid: ${validCount}`);
  console.log(`❌ Invalid: ${invalidCount}`);

  if (issues.length > 0) {
    console.log(`\n=== CRITICAL ISSUES ===`);
    issues.forEach(({ file, error }) => {
      console.log(`  ${file}: ${error}`);
    });
  } else {
    console.log(`\n✨ All frontmatter is valid!`);
  }

  process.exit(invalidCount > 0 ? 1 : 0);
}

main();
