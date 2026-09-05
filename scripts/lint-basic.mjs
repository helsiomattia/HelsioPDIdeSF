import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const ignored = new Set(['.git', 'node_modules', 'dist']);
const checkedExtensions = new Set(['.js', '.jsx', '.html']);
const errors = [];

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });

  for (const entry of entries) {
    if (ignored.has(entry.name)) continue;
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      await walk(fullPath);
      continue;
    }

    if (!checkedExtensions.has(path.extname(entry.name))) continue;
    const content = await readFile(fullPath, 'utf8');
    const relativePath = path.relative(root, fullPath);

    if (content.includes('personal-page')) {
      errors.push(`${relativePath}: contains obsolete personal-page reference`);
    }

    if (/target=["']_blank["']/.test(content) && !/rel=["'][^"']*noopener[^"']*noreferrer[^"']*["']/.test(content)) {
      errors.push(`${relativePath}: target="_blank" without noopener noreferrer`);
    }
  }
}

await walk(root);

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log('Basic lint passed.');
