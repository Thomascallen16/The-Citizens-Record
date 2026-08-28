# The Citizen's Record — Public Civic Portal

**Evidence Before Opinion.**

The Citizen's Record is the public, static civic portal of the Accountability ecosystem. It organizes primary-source material, civic education, public records, legislation, court decisions, and practical citizen tools in plain language.

## Live website

https://thomascallen16.github.io/The-Citizens-Record/

## Editing the site

The public site is intentionally simple: its pages are ordinary HTML, with shared CSS and JavaScript.

1. Open the page you want to change.
2. Click the pencil icon on GitHub.
3. Edit the page content or link.
4. Commit the change to `main`.
5. Static Site CI validates the change.
6. After validation succeeds, GitHub Pages deploys the site.

### Common files

| Purpose | File |
|---|---|
| Home | `index.html` |
| The Record | `the-record.html` |
| Read the Record | `read-the-record.html` |
| Learn | `learn.html` |
| Citizen Toolkit | `toolkit.html` |
| About / standards | `about.html` |
| Contact | `contact.html` |
| Daily Log | `updates.html` |
| Daily Log content | `posts.js` |
| Shared behavior | `main.js` |
| Shared styling | `style.css` |
| Site validation | `scripts/validate-site.mjs` |
| Page build | `scripts/build-pages.mjs` |
| Tests | `tests/site.test.mjs` |

## Site identity

The public experience should remain editorial, source-first, independent, nonpartisan, and useful without an account.

Core principles:

- **Evidence Before Opinion** — show the document first; label analysis as analysis.
- **Primary Sources Over Headlines** — trace claims to bills, rulings, filings, transcripts, and official records.
- **Politically Independent** — the site does not endorse candidates or parties.
- **Verification over trust** — give readers enough source material to check important claims themselves.

## Architecture

The ecosystem is intentionally separated into layers:

- **`The-Citizens-Record`** — public static Civic Portal.
- **`citizens-record`** — full-stack Accountability Platform / future Record Workspace.
- **`ProofFlow`** — evidence and provenance project; currently blocked pending recovery of its actual application source.
- **`watchtower`** — consent-based privacy/exposure intelligence project.
- **`docs`** — ecosystem documentation.
- **`The-Citizen-Main-File`** — preserved historical source/design archive.

Do not turn this public portal into the full-stack application. The public site should remain fast, account-free, and independently useful.

## Quality checks

Run locally with Node.js 20+:

```bash
npm run validate
npm test
npm run check
npm run build:pages
```

GitHub Actions runs validation and tests on pushes and pull requests to `main`. A successful validation is required before the Pages deployment workflow proceeds.

## Safety and maintenance

Do not commit passwords, API keys, private evidence, authentication tokens, or other secrets.

Do not delete historical repositories or source material merely because they are no longer production. Archive or clearly document obsolete material first.

The production standard is:

**Clean → Validated → Deployed → Verified Live → Maintainable.**
