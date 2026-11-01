# HAI, ORACLE!

HAI, ORACLE! is a zero-dependency browser toy that turns a short phrase into a deterministic looping audiovisual omen. A purpose-built browser interpreter executes the generative score in LOLCODE 1.2; Canvas and Web Audio render the score without sending data off-device.

This is the canonical instruction file for coding agents. `CLAUDE.md` imports it. Project facts belong in the documents linked below.

## Start here

1. Read `docs/HANDOFF.md` for current state and active work.
2. Read the relevant `ROADMAP.md` item and applicable parts of `docs/ARCHITECTURE.md` and `docs/TESTING.md`.
3. Inspect `git status` and recent history. Preserve work you did not create.
4. Verify important inherited claims with the fastest relevant check.
5. Work on one independently reviewable change at a time.

For an unfamiliar session, read `README.md` and `docs/README.md` first. Stop for maintainer direction when a request conflicts with these instructions or overlaps unrelated working-tree edits.

## While working

- Reference roadmap IDs where they exist. Do not invent one for an incidental fix.
- Keep changes scoped and preserve user work.
- Record durable, revisitable choices in `docs/DECISIONS.md`.
- Update documentation when behavior, interfaces, commands, risks, or structure change.
- Distinguish observations from inference. Date volatile claims.
- Prefer executable checks for important invariants.
- Treat phrase input and LOLCODE output as untrusted boundary data.
- Add discovered work to the roadmap only when it is genuinely out of scope.

## Finishing a change

1. Run the checks specified in `docs/TESTING.md`.
2. Review the diff for unrelated edits, generated files, credentials, stale names, and documentation drift.
3. Update `docs/HANDOFF.md` when current state materially changes or work pauses.
4. Update other documents only when their trigger in `docs/README.md` applies.
5. Run `python3 tools/check_docs.py`.

## Working agreement

This repository uses direct-to-main development for the current prototype. The maintainer and an agent explicitly asked to implement a change may edit and commit after relevant checks pass. Publishing, adding runtime dependencies, deleting user data, rewriting history, and changing the product premise require explicit maintainer permission.

- Default branch: `main`.
- Working branch pattern when branches become useful: `feature/<topic>`.
- Commit format: imperative summary, with a roadmap ID when the commit completes planned work.
- Release scheme: semantic versioning, with `docs/CHANGELOG.md` as the human-readable record.

Never force-push or rewrite shared history.

## Maintainer preferences

- **Writing:** Direct, playful, concrete. Preserve the LOLCODE voice without burying instructions in jokes.
- **Code comments:** Explain boundaries and surprising choices. Do not narrate obvious syntax.
- **Asking vs. doing:** Implement bounded reversible work. Ask before publishing, adding dependencies, or expanding data collection.
- **Reporting:** Lead with what now works, then exact verification and honest gaps.

## Protected areas

| Path or thing | Rule | Why |
| --- | --- | --- |
| `LICENSE` | Do not change without maintainer permission | Legal ownership and terms are maintainer-controlled |
| Determinism contract | Do not change casually | A phrase must summon the same creature across supported runs |
| Zero-dependency boundary | Requires an accepted decision | It defines portability, privacy, and the product's technical character |

## Names and terms

| Canonical term | Meaning | Avoid confusing with |
| --- | --- | --- |
| HAI, ORACLE! | The product | The generic concept of an oracle |
| spell | `src/oracle.lol`, the score-generating program | JavaScript rendering code |
| score | Validated parameters emitted by the spell | Rendered sound alone |
| creature | The combined named visual and musical result | A stored user profile |
| host | Browser adapters, interpreter, Canvas, and Web Audio | A server or remote service |

## Repository map

| Path | Purpose |
| --- | --- |
| `index.html` | Static application shell |
| `styles.css` | Responsive visual system |
| `src/oracle.lol` | Canonical LOLCODE score generator |
| `src/lolcode.mjs` | Purpose-built LOLCODE interpreter |
| `src/score.mjs` | Phrase hashing, score validation, and naming |
| `src/app.mjs` | Browser controls, Canvas creature, and Web Audio instrument |
| `tests/` | Dependency-free Node tests |
| `ROADMAP.md` | Planned work with stable IDs |
| `docs/` | Architecture, decisions, tests, risks, and current state |
| `tools/check_docs.py` | Documentation consistency checker |

## Engineering conventions

- Use browser-native HTML, CSS, Canvas, Web Audio, and ECMAScript modules.
- Support current evergreen browsers. A static HTTP origin is required because the app fetches `src/oracle.lol`.
- Keep `src/oracle.lol` causal: every audiovisual parameter originates in its score output.
- Reject malformed interpreter output before it reaches audio or rendering code.
- Add no runtime or build dependency without explicit maintainer approval and an accepted decision.
- Commit authored source. Do not commit caches, coverage output, or generated bundles.

## Environments

| Environment | Can access | Caveats |
| --- | --- | --- |
| Local development | Static files, local HTTP server, Node tests, browser APIs | Audio begins only after a user gesture |
| Static hosting | HTTPS, browser APIs, same-origin assets | No server runtime and no persistence |
| CI | Node's built-in test runner and documentation checker | Does not prove audio quality or visual composition |

## Run and verify

- Setup: none.
- Run: `python3 -m http.server 8000`.
- Fast checks: `node --test tests/*.test.mjs`.
- Full checks: `node --test tests/*.test.mjs && python3 tools/check_docs.py`.
- Detailed guidance: `docs/TESTING.md`.
