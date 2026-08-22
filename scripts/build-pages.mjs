import { cpSync, existsSync, mkdirSync, rmSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(new URL('..', import.meta.url).pathname);
const output = resolve(root, 'dist');
const assets = [
  'index.html',
  'about.html',
  'admin.html',
  'contact.html',
  'learn.html',
  'read-the-record.html',
  'record-builder.html',
  'the-record.html',
  'toolkit.html',
  'updates.html',
  'style.css',
  'main.js',
  'posts.js',
  'logo.svg'
];

rmSync(output, { recursive: true, force: true });
mkdirSync(output, { recursive: true });

for (const asset of assets) {
  const source = resolve(root, asset);
  if (!existsSync(source)) throw new Error(`Required deploy asset is missing: ${asset}`);
  cpSync(source, resolve(output, asset));
}

console.log(`Staged ${assets.length} production assets in dist/.`);
