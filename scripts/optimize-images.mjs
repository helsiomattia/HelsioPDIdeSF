import { mkdir, readdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const sourceDirectory = path.join(process.cwd(), 'images');
const outputDirectory = path.join(sourceDirectory, 'optimized');

await mkdir(outputDirectory, { recursive: true });

const files = (await readdir(sourceDirectory))
  .filter((file) => /^mepic \(\d+\)\.jpeg$/i.test(file))
  .sort((a, b) => Number(a.match(/\((\d+)\)/)?.[1] || 0) - Number(b.match(/\((\d+)\)/)?.[1] || 0));

for (const file of files) {
  const imageNumber = file.match(/\((\d+)\)/)?.[1];
  const source = path.join(sourceDirectory, file);
  const baseName = `mepic-${imageNumber}`;

  await sharp(source)
    .rotate()
    .resize({ width: 480, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(path.join(outputDirectory, `${baseName}.webp`));

  await sharp(source)
    .rotate()
    .resize({ width: 480, withoutEnlargement: true })
    .avif({ quality: 55 })
    .toFile(path.join(outputDirectory, `${baseName}.avif`));
}

console.log(`Optimized ${files.length} images into ${path.relative(process.cwd(), outputDirectory)}.`);
