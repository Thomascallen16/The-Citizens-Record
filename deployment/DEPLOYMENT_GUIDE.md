# Citizen’s Record Deployment Guide

## Purpose

This guide explains how to apply the existing Citizen’s Record implementation directly to the remote repository:

> `https://github.com/Thomascallen16/The-Citizens-Record`

The implementation is already committed locally as:

```text
b9e22ff Build evidence-workbench conversion experience
```

The patch updates the existing source project. It does **not** create a parallel site or repository.

## What this deployment contains

The commit includes the conversion-focused homepage, the five-step record method, the Truth Standard, the sample record, Toolkit-to-Builder pathways, the new `record-builder.html` page, local draft persistence for the Builder, responsive styling, normalized asset paths, and shared navigation updates.

The modified source files are:

```text
about.html
admin.html
contact.html
index.html
learn.html
main.js
read-the-record.html
record-builder.html
style.css
the-record.html
toolkit.html
updates.html
```

## Recommended deployment path: apply the commit locally

This is the preferred method because it preserves the single commit and gives the repository owner a clear review point.

### 1. Confirm prerequisites

Install Git and GitHub CLI, then authenticate with an account that has effective write permission to the repository.

```bash
git --version
gh --version
gh auth login
```

For a non-interactive environment, use the organization’s approved credential method. Do not paste access tokens into shell history, source files, or issue comments.

### 2. Clone the existing repository

```bash
git clone https://github.com/Thomascallen16/The-Citizens-Record.git
cd The-Citizens-Record
git fetch origin
git checkout main
git pull --ff-only origin main
```

If the repository already exists locally:

```bash
cd The-Citizens-Record
git fetch origin
git checkout main
git pull --ff-only origin main
```

### 3. Apply the patch

Download `Citizens_Record_implementation.patch` from this task, place it beside the repository directory, and run:

```bash
git apply --check ../Citizens_Record_implementation.patch
git apply ../Citizens_Record_implementation.patch
```

If the patch was saved elsewhere, replace the path accordingly. The `--check` command should complete without output before applying the patch.

### 4. Review the change set

```bash
git status
git diff --stat
git diff --check
```

Confirm that the changes are limited to the Citizen’s Record source files. The expected new page is:

```text
record-builder.html
```

### 5. Run a local preview

Because this is a static site, preview it with any static HTTP server. For example:

```bash
python3 -m http.server 4173
```

Open these routes in a browser:

```text
http://127.0.0.1:4173/index.html
http://127.0.0.1:4173/toolkit.html
http://127.0.0.1:4173/record-builder.html
```

Verify the following behaviors:

| Area | Expected result |
|---|---|
| Homepage | The hero says “Start with a question. Build a record you can check.” |
| Primary CTA | `Start a record` routes to `record-builder.html`. |
| Method | Question, Source, Evidence, Finding, and Unknown are visible. |
| Truth Standard | FACT, LAW, CLAIM, QUESTION, and UNKNOWN labels are visible. |
| Toolkit | Guide cards route to the Builder with a `guide` query parameter. |
| Builder | A question and optional source can be submitted. |
| Builder persistence | The draft is saved locally under `cr-record-draft`. |
| Builder result | The saved question and source appear in the record summary. |
| Navigation | All pages load the root `style.css`, `logo.svg`, `posts.js`, and `main.js` paths. |
| Console | No runtime errors appear during the Builder flow. |

Use a harmless sample during testing, such as:

```text
Question: What action did the agency formally take?
Source: https://example.gov/official-order
```

### 6. Commit the applied patch

If the patch is applied to a fresh clone, create a deployment commit:

```bash
git add about.html admin.html contact.html index.html learn.html main.js \
  read-the-record.html record-builder.html style.css the-record.html \
  toolkit.html updates.html

git commit -m "Build evidence-workbench conversion experience"
```

If you are applying the supplied commit object through a Git bundle or another repository-preserving workflow, do not create a duplicate commit. Prefer the existing commit `b9e22ff` when it is available locally.

### 7. Push to the existing main branch

```bash
git push origin main
```

If branch protection rejects a direct push, create a review branch instead:

```bash
git checkout -b deploy/evidence-workbench

git push -u origin deploy/evidence-workbench
```

Then open a pull request into `main`:

```bash
gh pr create \
  --base main \
  --head deploy/evidence-workbench \
  --title "Build evidence-workbench conversion experience" \
  --body-file deployment-pr-description.md
```

## Permission troubleshooting

During this task, repository reads succeeded, but write attempts returned:

```text
403 Permission to Thomascallen16/The-Citizens-Record.git denied
```

The repository metadata reported admin-level permission, but the active integration credential did not have effective write access. If the same error occurs, check the following:

```bash
gh auth status
gh repo view Thomascallen16/The-Citizens-Record \
  --json nameWithOwner,viewerPermission,defaultBranchRef,url
git remote -v
```

If `viewerPermission` is `ADMIN` but `git push` still returns `403`, authenticate again with the account that owns or administers the repository:

```bash
gh auth logout -h github.com
gh auth login -h github.com
gh auth setup-git
git push origin main
```

If the environment uses an organization-managed GitHub App or connector, ask the repository owner to grant that integration **Contents: Read and write** permission. A read-only token can inspect the repository but cannot create blobs, trees, commits, or update branch references.

Do not solve a write-permission failure by creating a fork or second repository unless the owner explicitly requests that workflow. The intended source of truth is:

```text
Thomascallen16/The-Citizens-Record
```

## Alternative: apply the supplied source archive

If applying the patch is not convenient, download `Citizens_Record_updated_source.zip`, extract it into a clean clone of the existing repository, and review the resulting diff:

```bash
unzip Citizens_Record_updated_source.zip -d /tmp/citizens-record-updated
cd /tmp/citizens-record-updated
git diff --no-index ../The-Citizens-Record . || true
```

Copy only the reviewed source files into the clone, then run the validation and commit steps above. Do not copy the `.git` directory from an archive over the existing repository.

## Post-deployment verification

After the hosting service rebuilds the site, verify the published URL rather than relying only on the local preview. Check the homepage, Toolkit, Builder, and at least one legacy page. Confirm that the published deployment contains the new `record-builder.html` route and that all navigation links resolve.

Use the following acceptance checklist:

- The homepage makes `Start a record` the dominant action.
- A first-time visitor can understand the five-step method without leaving the homepage.
- The Truth Standard is visible and does not overstate certainty.
- Toolkit guides move users toward a structured record.
- The Builder clearly states that it is an organizing tool and not legal advice.
- Local persistence is described accurately and is not presented as a synced account.
- No parallel repository or replacement deployment has been created.
- The remote `main` branch contains the implementation commit or an approved pull request contains the same changes.

## Rollback

If the deployed result is incorrect and the previous commit is known, revert through a reviewed GitHub pull request:

```bash
git checkout main
git pull --ff-only origin main
git revert b9e22ff
git push origin main
```

Do not use `git reset --hard` on a shared remote branch unless the repository owner explicitly directs that action. A revert preserves the history and makes the rollback visible.

## Source of truth

The active source repository for this build is:

> `Thomascallen16/The-Citizens-Record`

The local implementation commit is `b9e22ff`. The supplied patch and source archive are deployment aids; after successful deployment, the remote repository should be treated as the authoritative copy.
