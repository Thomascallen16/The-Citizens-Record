import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { resolve, dirname, extname } from 'node:path';

export const root = resolve(new URL('..', import.meta.url).pathname);

export const requiredFiles = [
  'index.html',
  'toolkit.html',
  'record-builder.html',
  'style.css',
  'main.js',
  'logo.svg',
  'deployment/DEPLOYMENT_GUIDE.md',
  'skills/citizens-record-workbench-builder/SKILL.md'
];

export const requiredContent = {
  'index.html': [
    'The Law Belongs to <em>the People</em>.',
    'Evidence Before Opinion',
    'Primary Sources Over Headlines',
    'Politically Independent',
    "The Citizen's Forensics",
    'Featured Legislation',
    'Latest Court Cases',
    'Daily Log'
  ],
  'toolkit.html': [
    'Learn how to investigate.',
    'record-builder.html?guide=verify-a-claim',
    'Truth Standard'
  ],
  'record-builder.html': [
    'id="record-form"',
    'id="record-question"',
    'id="record-source"',
    'saved locally',
    'not legal advice'
  ],
  'main.js': [
    "localStorage.getItem('cr-record-draft')",
    "localStorage.setItem('cr-record-draft'",
    'record-form'
  ]
};

export function read(relativePath) {
  return readFileSync(resolve(root, relativePath), 'utf8');
}

export function htmlFiles() {
  return readdirSync(root).filter(file => extname(file) === '.html');
}

export function localReferences(html) {
  const references = [];
  const expression = /(?:href|src)=["']([^"']+)["']/g;
  let match;
  while ((match = expression.exec(html))) {
    const reference = match[1].trim();
    if (!reference || reference.startsWith('#') || /^(?:https?:|mailto:|tel:|data:|javascript:)/i.test(reference)) continue;
    references.push(reference.split('#')[0].split('?')[0]);
  }
  return references.filter(Boolean);
}

export function validate() {
  const failures = [];

  for (const file of requiredFiles) {
    if (!existsSync(resolve(root, file))) failures.push(`Missing required file: ${file}`);
  }

  for (const [file, fragments] of Object.entries(requiredContent)) {
    if (!existsSync(resolve(root, file))) continue;
    const content = read(file);
    for (const fragment of fragments) {
      if (!content.includes(fragment)) failures.push(`${file} is missing required content: ${fragment}`);
    }
  }

  for (const file of htmlFiles()) {
    const content = read(file);
    if (!/<!DOCTYPE html>/i.test(content)) failures.push(`${file} is missing a doctype.`);
    if (!/<title>[^<]+<\/title>/i.test(content)) failures.push(`${file} is missing a document title.`);
    if (['index.html', 'toolkit.html', 'record-builder.html'].includes(file) && !/<main\b/i.test(content)) failures.push(`${file} is missing a main landmark.`);
    if (/css\/style\.css|assets\/logo\.svg|data\/posts\.js|js\/main\.js/.test(content)) failures.push(`${file} still contains a legacy asset path.`);

    for (const reference of localReferences(content)) {
      const target = resolve(dirname(resolve(root, file)), reference);
      if (!existsSync(target)) failures.push(`${file} references a missing local target: ${reference}`);
    }
  }

  return failures;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const failures = validate();
  if (failures.length) {
    console.error('Static site validation failed:');
    failures.forEach(failure => console.error(`- ${failure}`));
    process.exit(1);
  }
  console.log(`Static site validation passed for ${htmlFiles().length} HTML pages.`);
}
