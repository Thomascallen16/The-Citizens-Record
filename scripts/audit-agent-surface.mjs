import { readdir, readFile } from 'node:fs/promises';
import { join, relative } from 'node:path';

const root = process.cwd();
const ignored = new Set(['.git', 'node_modules', 'dist', 'coverage']);
const allowedText = /\.(md|mdx|txt|yml|yaml|json|toml|ini|cfg|sh|bash|ps1|js|mjs|cjs|ts|tsx|html)$/i;
const agentNames = /(^|\/)(AGENTS\.md|CLAUDE\.md|GEMINI\.md|llms\.txt|llms-full\.txt)$/i;
const installCommand = /(^|[\s`])(?:npm\s+(?:install|i)|npm\s+exec|npx(?:\s|$)|pnpm\s+(?:add|install|dlx)|yarn\s+(?:add|install|dlx)|pip(?:3)?\s+install|pipx\s+install|(?:curl|wget)\b[^\n|]*\|\s*(?:sh|bash)|(?:curl|wget)\s+[^\n]+\.(?:sh|bash)(?:\s|$))/im;

const findings = [];

async function walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (ignored.has(entry.name)) continue;
    const full = join(dir, entry.name);
    if (entry.isDirectory()) await walk(full);
    else if (allowedText.test(entry.name)) {
      const text = await readFile(full, 'utf8');
      if (agentNames.test(relative(root, full)) && installCommand.test(text)) {
        findings.push(`${relative(root, full)} contains an executable installation command.`);
      }
      if (/\b(?:llms\.txt|llms-full\.txt)\b/i.test(text) && installCommand.test(text)) {
        findings.push(`${relative(root, full)} references machine-readable AI documentation and an installation command.`);
      }
    }
  }
}

await walk(root);

if (findings.length) {
  console.error('Agent supply-chain audit: REVIEW REQUIRED');
  for (const finding of findings) console.error(`- ${finding}`);
  console.error('\nDocumentation is not authorization to execute commands. Verify each finding before installation.');
  process.exitCode = 1;
} else {
  console.log('Agent supply-chain audit: no high-risk installation commands found in AI-facing documentation.');
}
