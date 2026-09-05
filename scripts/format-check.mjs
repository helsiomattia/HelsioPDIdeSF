import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const ignored = new Set(['.git', 'node_modules', 'dist']);
const ignoredFiles = new Set(['projects/NewProjs.txt']);
const checkedExtensions = new Set(['.js', '.jsx', '.json', '.md', '.html', '.css', '.yml', '.xml', '.txt']);
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
    const relativePath = path.relative(root, fullPath).replace(/\\/g, '/');
    if (ignoredFiles.has(relativePath)) continue;

    const content = await readFile(fullPath, 'utf8');
    const lines = content.split('\n');

    lines.forEach((line, index) => {
      if (/[ \t]$/.test(line.replace(/\r$/, ''))) {
        errors.push(`${relativePath}:${index + 1}: trailing whitespace`);
      }
    });
  }
}

await walk(root);

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log('Format check passed.');
