import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import test from 'node:test';
import { htmlFiles, localReferences, read, requiredFiles, root, validate } from '../scripts/validate-site.mjs';

test('required source, deployment, and reusable-skill files are present', () => {
  for (const file of requiredFiles) {
    assert.equal(existsSync(resolve(root, file)), true, `${file} should exist`);
  }
});

test('homepage exposes the Citizen\'s Record editorial identity', () => {
  const homepage = read('index.html');
  for (const fragment of [
    'The Law Belongs to <em>the People</em>.',
    'Evidence Before Opinion',
    'Primary Sources Over Headlines',
    'Politically Independent',
    "The Citizen's Forensics",
    'Featured Legislation',
    'Latest Court Cases',
    'Daily Log'
  ]) {
    assert.ok(homepage.includes(fragment), `homepage should include ${fragment}`);
  }
});

test('Record Builder has the required accessible fields and local-draft behavior', () => {
  const builder = read('record-builder.html');
  const behavior = read('main.js');
  assert.match(builder, /<label for="record-question">/);
  assert.match(builder, /<label for="record-source">/);
  assert.match(builder, /id="record-form"/);
  assert.match(behavior, /localStorage\.getItem\('cr-record-draft'\)/);
  assert.match(behavior, /localStorage\.setItem\('cr-record-draft'/);
});

test('Toolkit routes guide users into the Record Builder', () => {
  const toolkit = read('toolkit.html');
  for (const guide of ['find-government-documents', 'read-a-docket', 'public-records-request', 'follow-public-money', 'verify-a-claim']) {
    assert.ok(toolkit.includes(`record-builder.html?guide=${guide}`), `toolkit should link ${guide}`);
  }
});

test('all internal HTML asset and navigation targets exist', () => {
  for (const file of htmlFiles()) {
    const references = localReferences(read(file));
    for (const reference of references) {
      const target = resolve(root, reference);
      assert.equal(existsSync(target), true, `${file} should not point to a missing target: ${reference}`);
    }
  }
});

test('static validator reports no structural regressions', () => {
  assert.deepEqual(validate(), []);
});
