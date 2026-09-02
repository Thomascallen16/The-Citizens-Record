# The Citizen's Record — Public Civic Portal

**Evidence Before Opinion.**

The Citizen's Record is the public, account-free civic portal of the Accountability ecosystem. It organizes primary-source material, civic education, public records, legislation, court decisions, and practical citizen tools in plain language.

## Two-product architecture

The ecosystem has two canonical user-facing products:

1. **The Citizen's Record** — this public civic portal.
2. **Open the Record** — the private, authenticated record/evidence workspace.

Watchtower remains a separate security/intelligence instrument protecting both products. It is not a third top-level civic product.

## Live website

https://thomascallen16.github.io/The-Citizens-Record/

## Repository consolidation

- `citizens-record` is the former full-stack application foundation and should be migrated into **Open the Record**, not into this public static portal.
- `ProofFlow` should be migrated into **Open the Record** as its evidence/provenance subsystem.
- `docs` should be split into canonical public/workspace documentation and migrated accordingly.
- `The-Citizen-Main-File` is a historical source/design archive; preserve unique material before archival.

The public portal must remain fast, account-free, source-first, and independently useful. Do not turn it into the private full-stack workspace.

## Editing the site

The public site is intentionally simple: its pages are ordinary HTML, with shared CSS and JavaScript.

1. Open the page you want to change.
2. Click the pencil icon on GitHub.
3. Edit the page content or link.
4. Commit the change to `main`.
5. Static Site CI validates the change.
6. After validation succeeds, GitHub Pages deploys the site.

## Core principles

- **Evidence Before Opinion** — show the document first; label analysis as analysis.
- **Primary Sources Over Headlines** — trace claims to bills, rulings, filings, transcripts, and official records.
- **Politically Independent** — the site does not endorse candidates or parties.
- **Verification over trust** — give readers enough source material to check important claims themselves.

## Safety and maintenance

Do not commit passwords, API keys, private evidence, authentication tokens, or other secrets.

Do not delete historical repositories or source material merely because they are no longer production. Archive or clearly document obsolete material first.

The production standard is:

**Clean → Validated → Deployed → Verified Live → Maintainable.**
