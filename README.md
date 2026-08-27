# The Citizen's Record — Permanent Civic Portal

The Citizen's Record is the **Permanent Civic Portal** of the Accountability Ecosystem: a civic education and source-navigation project, not a news outlet, advocacy organization, or legal-advice service.

## Purpose

**FIND → READ → VERIFY → GO TO THE SOURCE.**

The portal is intentionally public, static, and useful without an account. It organizes pathways to official government sources, courts, rules, forms, public records, public defenders, legal aid, and other legitimate civic resources.

The portal is deliberately not a case-management application. It does not require Stripe, user accounts, or the interactive platform database.

## Accountability principle

> **Don't ask people to trust the system. Give them the sources and the means to verify.**

The site distinguishes source material from interpretation and points visitors toward primary/official sources wherever practical.

## Two-site architecture

The ecosystem has two user-facing products:

1. **The Citizen's Record** — this permanent public/static portal.
2. **The Record Workspace** — the separate interactive Accountability Platform in `Thomascallen16/citizens-record`.

The Workspace is the destination for authenticated record-building and application functionality such as evidence management, provenance, verification, chronology, authority mapping, records requests, exports, and related tools. Supporting repositories such as `ProofFlow` and `watchtower` are application/source components, not additional public portals.

The portal must remain useful even when the interactive platform is unavailable.

## Repository role

This repository is the canonical public/static Citizen's Record workbench and deployment source. The separate `citizens-record` repository is the canonical full-stack application source. `The-Citizen-Main-File` is preserved as a historical source archive and is not production.

The legacy static `record-builder.html` remains source/history in this repository; it is **not** the canonical interactive Workspace. The canonical Workspace destination must only be published once its application URL has been verified.

## Quality checks

The repository includes dependency-free structural validation and Node-native tests for the source-first civic-workbench experience.

```bash
npm run validate
npm test
npm run check
```

GitHub Actions runs the validation on pull requests to `main`, pushes to `main`, and manual workflow dispatches.

## Deployment

The static production assets are staged with:

```bash
npm run build:pages
```

After Static Site CI passes for `main`, the Deploy GitHub Pages workflow deploys the staged `dist/` assets to GitHub Pages. The deployment workflow can also be run manually from the repository's Actions tab.

The deployment contains public website assets only and intentionally excludes deployment archives, reusable skill packages, tests, and repository documentation.

A successful workflow is not treated as proof of live browser availability. Deployment state is tracked separately as **Configured → Deployed → Verified Live**.
