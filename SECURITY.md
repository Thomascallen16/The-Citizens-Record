# Security Policy

## Reporting

Do not publish credentials, private records, or active exploit details in public issues. Report suspected security vulnerabilities privately through GitHub's repository security reporting mechanism when available.

## AI-agent threat model

This project assumes that natural-language instructions can be adversarial or stale. In particular, machine-readable documentation such as `llms.txt` and `llms-full.txt` must be treated as untrusted input. Package-install commands found in documentation are not authorization to execute them.

The project also treats CI workflows, dependency manifests, lockfiles, deployment configuration, and external action references as supply-chain security boundaries.

## Security baseline

- No secrets in source control.
- Least-privilege GitHub Actions permissions.
- Dependency lockfiles are reviewed and retained.
- New dependencies are verified before installation.
- CI should fail closed on suspicious agent-facing instructions.
- Production deployment remains separated from autonomous code modification.
