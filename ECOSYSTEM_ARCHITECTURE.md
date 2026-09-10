# Citizen's Record Ecosystem Architecture

## Canonical roles

This repository is the **canonical public/static Citizen's Record website**.

The separate `citizens-record` repository is the **canonical full-stack application**: authenticated workspaces, evidence/source records, chronology, exports, paid drafting boundaries, and related server/database functionality.

`The-Citizen-Main-File` is retained as a **legacy/source-preservation repository** for the earlier static implementation. It is not the canonical production source and should not receive independent feature development.

## Source-of-truth rule

- Public static site: `The-Citizens-Record`
- Full-stack application: `citizens-record`
- Legacy static source/archive: `The-Citizen-Main-File`
- Evidence/provenance instrument: `ProofFlow`
- Privacy/exposure instrument: `watchtower`

## Why the static and full-stack repositories remain separate

The static site is intentionally deployable without a database or server. It provides public education, the source-first method, the Accountability Charter, and the Record Builder/workbench entry path.

The full-stack application contains authenticated and externally dependent capabilities. Combining the repositories merely to make the names look cleaner would increase deployment coupling and could expose application infrastructure in a public static deployment.

## Duplication policy

Do not copy new application features into the legacy static repository merely because a page or concept has a similar name. New work should land in the canonical repository for that capability and be linked or integrated deliberately.

Legacy material may be recovered when it contains unique content or functionality, but recovery must preserve provenance and should be reviewed before becoming canonical.

## Accountability rule

Repository identity must describe reality. A repository is not considered production, canonical, recovered, or deployable merely because it contains code or a deployment workflow. Those states must be verified.
