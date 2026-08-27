# The Citizen's Record — Permanent Civic Portal

The Citizen's Record is the **Permanent Civic Portal** of the Accountability Ecosystem: a civic education and source-navigation project, not a news outlet, advocacy organization, or legal-advice service.

## Purpose

**FIND → READ → VERIFY → GO TO THE SOURCE.**

The portal is intentionally public, static, and useful without an account. It organizes pathways to official government sources, courts, rules, forms, public records, public defenders, legal aid, and other legitimate civic resources.

The portal is deliberately not a case-management application. It does not require Stripe, user accounts, or the interactive platform database.

## Accountability principle

> **Don't ask people to trust the system. Give them the sources and the means to verify.**

The site distinguishes source material from interpretation and points visitors toward primary/official sources wherever practical.

## Repository role

This repository is the canonical public/static Citizen's Record workbench and deployment source. The separate `citizens-record` repository is the full-stack application foundation. `The-Citizen-Main-File` is preserved as a historical source archive and is not production.

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
