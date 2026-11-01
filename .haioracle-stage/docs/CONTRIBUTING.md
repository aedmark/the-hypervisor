# Contributing

## Before changing code

1. Read the README, relevant roadmap item, architecture, decisions, and test guidance.
2. Check `git status` and preserve unrelated work.
3. Run the current automated checks from the repository root.
4. Agree with the maintainer before adding dependencies, changing phrase determinism, collecting data, or publishing.

## Make the change

- Keep each change focused on one observable outcome.
- Preserve the zero-dependency and local-processing boundaries.
- Add or update tests for changed interpreter and score behavior.
- Update documentation according to [the documentation triggers](README.md#update-triggers).
- Keep caches, credentials, personal data, and local settings out of commits.

## Verify

```bash
node --test tests/*.test.mjs
python3 tools/check_docs.py
```

Rendering, audio, or control changes also require the manual evidence listed in [TESTING.md](TESTING.md).

## Submit and review

The prototype currently uses direct-to-main development. Use `feature/<topic>` when a change needs separate review. Write an imperative commit summary and include the roadmap ID when completing planned work. A change is ready when checks pass, user impact is clear, sensitive data is absent, and invalidated documents are updated.

## Compatibility

The same normalized phrase should keep its score across compatible releases. Any change to normalization, hashing, formula constants, scale mapping, or name tables requires a superseding decision and clear release note.

## Reporting security issues

Follow [SECURITY.md](SECURITY.md). Do not open a public issue for an uncoordinated vulnerability report.
