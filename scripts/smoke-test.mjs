import { readFile } from 'node:fs/promises';

const checks = [
  ['vite.config.js', "base: '/crm-specialist/'"],
  ['index.html', 'https://helsiomattia.github.io/crm-specialist/'],
  ['public/404.html', 'crm-specialist-redirect'],
  ['src/utils/routes.js', 'getAppRouteFromLocation'],
  ['src/data/portfolioProjects.js', 'loadPortfolioProjectEmbed'],
];

for (const [file, expected] of checks) {
  const content = await readFile(file, 'utf8');
  if (!content.includes(expected)) {
    console.error(`${file}: missing expected content: ${expected}`);
    process.exit(1);
  }
}

for (const file of ['src/locales/pt/common.json', 'src/locales/en/common.json', 'src/locales/es/common.json']) {
  JSON.parse(await readFile(file, 'utf8'));
}

console.log('Smoke tests passed.');
