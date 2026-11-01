# Security

HAI, ORACLE! is a local static toy with no accounts, backend, durable user data, analytics, or secrets. This narrow surface reduces risk without claiming the project is vulnerability-free.

## Supported versions

| Version or branch | Security fixes |
| --- | --- |
| `main` before the first tagged release | supported |

## Report a vulnerability

Until a public reporting address exists, contact the repository maintainer privately. Include impact, affected commit, reproduction steps, and any workaround. Do not include real credentials or personal data. Public disclosure timing is coordinated with the maintainer.

## Assets and boundaries

| Asset or boundary | Threat | Protection | Owner |
| --- | --- | --- | --- |
| Phrase input | oversized input or DOM injection | 72-character control limit, normalization, text-only DOM assignment | score boundary |
| LOLCODE source | malformed or expanded program | same-origin asset, narrow interpreter, unsupported syntax fails closed | interpreter |
| Score output | unknown keys, duplicate fields, invalid values | allowlist, exact required set, integer and range checks | score parser |
| Audio output | startling or persistent playback | user gesture, visible mute, low master gain, clean stop on mute or replacement | browser host |
| User privacy | phrase disclosure | no outbound requests, logs, analytics, or persistence | whole application |

## Secure development rules

- Keep credentials, personal data, and production-derived material out of the repository.
- Insert user-controlled text with `textContent` or form values, never HTML parsing.
- Preserve score validation between interpreter and renderers.
- Keep audio user-controlled, moderate in level, and immediately stoppable.
- Treat any proposed remote asset, analytics call, storage, or dependency as a boundary change requiring a decision and review.
- Do not describe the deterministic seed as cryptographic or globally unique.

## Verification

`tests/static.test.mjs` rejects remote runtime URLs. `tests/oracle.test.mjs` covers malformed and out-of-range score rejection. Manual release review must inspect network traffic and browser behavior. There is no automated dependency scan because the project has no dependency manifest.

## Incident response

For suspected active exploitation or accidental data disclosure, stop publishing the affected revision, preserve a minimal reproduction without personal data, notify the maintainer, patch the boundary, and document the user-visible fix after coordinated disclosure.
