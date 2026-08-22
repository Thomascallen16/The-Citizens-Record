---
name: citizens-record-workbench-builder
description: Audit and improve an existing civic-information website into a source-first public evidence-workbench. Use when a user provides an existing civic, legal-education, transparency, public-records, or accountability site and wants strategy review, conversion improvements, a Record Builder workflow, Truth Standard labeling, direct source-repository edits, visual verification, or deployment-safe GitHub delivery.
---

# Citizen’s Record Workbench Builder

Use this skill to turn an **existing** civic-information website into a trusted, source-first research workflow. Preserve the current project and design language. Do not create a parallel implementation unless the user explicitly asks for a new site.

## Operating principles

Keep the destination website deeper than social media. Optimize for qualified discovery, source clicks, repeat visits, questions generated, and structured records created—not follower count or raw views. Treat the site as editorial and research infrastructure, not as an outrage feed, partisan campaign, legal-help service, or substitute for an attorney.

Use the core promise: **Evidence Before Opinion.** Reinforce the product category **the public evidence-workbench**: a place where a person turns a question into a source-linked record of evidence, findings, and unknowns.

Use the Truth Standard throughout the experience:

| Label | Meaning |
|---|---|
| FACT | Verified by a reliable source. |
| LAW | Supported by an identified legal authority. |
| CLAIM | Attributed to a person or organization. |
| QUESTION | Specific and unresolved. |
| INFERENCE | A reasoned interpretation, not a direct source statement. |
| OPINION | A normative judgment. |
| UNKNOWN | The available record does not answer it yet. |

Never convert an allegation into a fact because it produces stronger copy. When evidence is incomplete, show the limitation.

## Required workflow

1. **Locate the existing source.** Prefer the attached/open WebDev project. If a repository is named, inspect it with the authorized GitHub workflow. Use the published URL only as a visual and content reference. Do not initialize a new project when an existing project or repository is identified.
2. **Inspect before planning implementation.** Read the README, entry page, stylesheet, shared JavaScript, routing/page structure, asset paths, and existing build/deploy conventions. Check whether published assets and source paths agree.
3. **Audit against the strategy.** Evaluate the hero promise, primary CTA, five-step method, Truth Standard, sample record, Toolkit, Record pages, onboarding, source links, privacy/legal boundary, accessibility, and analytics hooks. Record strengths and gaps before editing.
4. **Define the smallest high-impact change set.** Usually prioritize: a clear `Start a Record` CTA, `Question → Source → Evidence → Finding → Unknown`, a visible Truth Standard, a sample record, Toolkit-to-Builder links, and a lightweight Builder onboarding path.
5. **Implement in place.** Preserve the existing visual system, typography, palette, navigation conventions, and editorial voice. For static sites, use the existing HTML/CSS/JS structure. Add a `record-builder` route/page only when the project has no equivalent. Prefer local draft persistence for a static prototype; do not imply that local storage is a server-backed account.
6. **Harden the experience.** Normalize asset paths if the repository contains stale paths, preserve focus states and reduced-motion behavior, add descriptive labels, keep primary-source links visible, and include “not legal advice” and privacy boundaries where appropriate.
7. **Verify behavior.** Run repository checks such as `git diff --check`, scan for broken legacy asset paths, start a local preview, visually inspect the homepage, Toolkit, and Builder, exercise the primary form path with a harmless sample, and check the browser console for runtime errors.
8. **Commit and deliver safely.** Commit with a descriptive message. Push only to the existing repository and branch that owns the project. If HTTPS or SSH credentials fail, diagnose once with repository permission metadata, do not create another repository, and provide the local commit plus patch/archive while explaining the block.

## Recommended information architecture

The homepage should lead with a concrete hero: “Start with a question. Build a record you can check.” Make `Start a record` primary and `Learn the method` secondary. Show the five steps, a sample structured record with source/evidence/finding/unknown labels, three routes—Check a claim, Read a public document, Build a record—and a final repeated CTA.

The Toolkit should explain practical methods and let every guide pass context into the Builder, for example `record-builder.html?guide=verify-a-claim`. Record index and detail pages should offer `Build your own record` and show source metadata, evidence labels, and unknowns. About/Standards should explain independence, correction handling, sourcing, and the non-legal-advice boundary.

## Static Record Builder baseline

For a static prototype, implement a question textarea, an optional primary-source URL field, guidance to use an official order/docket/statute/meeting record/agency page/dataset, a saved summary, `localStorage` persistence under a project-specific key such as `cr-record-draft`, a visible step indicator, and a Truth Standard reminder. Do not imply that local data is synchronized across devices or visible to the project team. If a backend exists, follow its established authentication and database conventions instead.

## Quality gates

Before delivery, confirm the new visitor can understand the project quickly, begin a record in one click, identify how a fact differs from a claim or unknown, move from a learning guide into a record, and reach a primary source from a Record page. Confirm the existing project remains the source of truth, no parallel app was created, and the repository’s working tree, commit, and push status are reported accurately.
